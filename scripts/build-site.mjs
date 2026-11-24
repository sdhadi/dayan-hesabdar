import { copyFile, cp, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const htmlPath = path.join(root, 'index.html');
const data = JSON.parse(await readFile(path.join(root, 'site_content.json'), 'utf8'));
const template = await readFile(htmlPath, 'utf8');
const snapshotOnly = process.argv.includes('--refresh-snapshot');
const archiveOnly = process.argv.includes('--archive');
const dastkhatDirectory = path.join(root, 'media', 'fonts', 'dastkhat');

// Only published records enter the distributable HTML or the offline snapshot.
function publishedItems(items = []) {
  const records = items.filter(item => item.published === true);
  const routes = new Set();
  for (const record of records) {
    if (!record.id || !record.title?.trim()) throw new Error('Published entry requires an ID and title.');
    for (const route of new Set([record.id, record.slug].filter(Boolean))) {
      if (routes.has(route)) throw new Error('Duplicate content route: ' + route);
      routes.add(route);
    }
  }
  return records;
}

async function embeddedPortrait(value) {
  if (!value) return '';
  const relative = value.replace(/^\//, '');
  const segments = relative.split('/');
  const types = { '.png': 'png', '.jpg': 'jpeg', '.jpeg': 'jpeg', '.webp': 'webp' };
  const format = types[path.extname(relative).toLowerCase()];
  if (segments[0] !== 'media' || segments[1] !== 'portraits' || !format ||
      segments.some(part => !part || part === '.' || part === '..' || /[\\:]/.test(part))) {
    throw new Error('Choose a portrait from the CMS image library.');
  }
  try {
    const directory = await realpath(path.join(root, 'media', 'portraits'));
    const image = await realpath(path.join(root, relative));
    if (!image.startsWith(directory + path.sep)) throw new Error('Invalid portrait location.');
    const bytes = await readFile(image);
    return 'data:image/' + format + ';base64,' + bytes.toString('base64');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.warn('The selected portrait is missing. Using the original embedded photo.');
    return '';
  }
}

async function buildArchive(html) {
  const filename = html.match(/^ @archive_filename ([^\r\n]+\.html)\r?$/m)?.[1];
  if (!filename || path.basename(filename) !== filename) throw new Error('Expected an archive filename in provenance.');

  const fontUrl = /url\("\.\/media\/fonts\/dastkhat\/(Dastkhat[A-Za-z]*-Variable\.woff2)"\)/g;
  const urls = await Promise.all(Array.from(html.matchAll(fontUrl), async ([url, font]) => {
    const bytes = await readFile(path.join(dastkhatDirectory, font));
    return [url, 'url("data:font/woff2;base64,' + bytes.toString('base64') + '")'];
  }));
  if (urls.length) {
    const licenses = await Promise.all(['OFL.txt', 'THIRD-PARTY-NOTICES.txt'].map(name =>
      readFile(path.join(dastkhatDirectory, name), 'utf8')
    ));
    const embedded = new Map(urls);
    html = html.replace(fontUrl, url => embedded.get(url));
    html = html.replace('<html dir="rtl" lang="fa">', tag =>
      '<!--\nDastkhat font license and third-party notices\n' + licenses.join('\n\n') + '\n-->\n' + tag
    );
  }
  const directory = path.join(root, 'خروجی‌ها و نسخه‌های سامانه و مستندات (Deliverables_Archive)');
  await writeFile(path.join(directory, filename), html);
}

const payload = {
  academy: { ...data.academy, portrait: await embeddedPortrait(data.academy?.portrait) },
  courses: publishedItems(data.courses),
  articles: publishedItems(data.articles)
};
const marker = /<script id="academy-content" type="application\/json"(?: data-source="site_content\.json")?>[\s\S]*?<\/script>/g;
if (Array.from(template.matchAll(marker)).length !== 1) throw new Error('Expected one academy content snapshot.');
// Keep editorial text literal even when it contains HTML or dollar signs.
const json = JSON.stringify(payload).replace(/</g, '\\u003c');
const source = snapshotOnly ? ' data-source="site_content.json"' : '';
const html = template.replace(marker, () => '<script id="academy-content" type="application/json"' + source + '>\n' + json + '\n  </script>');
if (snapshotOnly) {
  await writeFile(htmlPath, html);
} else if (archiveOnly) {
  await buildArchive(html);
} else {
  const dist = path.join(root, 'dist');
  await mkdir(path.join(dist, 'admin'), { recursive: true });
  await writeFile(path.join(dist, 'index.html'), html);
  await copyFile(path.join(root, 'admin', 'index.html'), path.join(dist, 'admin', 'index.html'));
  await cp(dastkhatDirectory, path.join(dist, 'media', 'fonts', 'dastkhat'), { recursive: true });
}
console.log('Published content: ' + payload.courses.length + ' course(s), ' + payload.articles.length + ' article(s).');
