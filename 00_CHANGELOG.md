# 📒 فهرست جامع نسخه‌ها و شناسنامه تغییرات پروژه «دایان حسابداری» (`00_CHANGELOG.md`)

تمامی نسخه‌های تولیدشده برای وب‌سایت و مستندات پروژه **دایان حسابداری (`dayanhesabdar.ir`)** با استاندارد **شناسنامه ۸ فیلدی تبارشناسی چندایجنتی (8-Field Multi-Agent Provenance)** و **ثبت چرایی تصمیمات معماری (ADR)** در این سند ثبت می‌شوند.

- **پوشه اصلی پروژه:** [`#دایان حسابداری (Dayan_Hesabdar)#`](https://drive.google.com/drive/folders/1Q8hJh5Z5ysxc-TRr7Q50kv5MD2DodEXh)
- **پوشه آرشیو نسخه‌ها:** [`Deliverables_Archive`](https://drive.google.com/drive/folders/1Q1uWALkMPL7QxLqFehA296-w6GhvDfZ2)

---

## 🚀 نسخه `v1.0` — راه‌اندازی اولیه پروژه و انتشار نسخه اول وب‌سایت استاتیک (Static-First MVP)
- **تاریخ ثبت:** شنبه ۲۳ آبان ۱۴۰۵ (`2026-11-14`) — نوبت اول (`Turn 1`)

### ۱. جدول شناسنامه ۸ فیلدی نسخه (8-Field Provenance Header)

| ردیف | فیلد شناسنامه (Provenance Field) | مقدار ثبت‌شده (Recorded Value) |
| :--- | :--- | :--- |
| **۱** | **Agent / Harness** | `Argon (Gemini Cloud Task Mode)` |
| **۲** | **LLM Model** | `Argon (Google Gemini)` |
| **۳** | **Gateway / Account** | `Google Workspace Owner: sd.hadi.mousavi (sd.hadi.mousavi@gmail.com)` |
| **۴** | **Execution Mode** | `Cloud Workspace + Sandbox VM` |
| **۵** | **Base Version** | `None (Greenfield Project Initialization)` |
| **۶** | **Output Version & Schema** | `Website v1.0 (SCHEMA_VERSION: schema_v1)` |
| **۷** | **Change Scope** | `[Project Scaffolding + Static-First MVP Website (index.html) + JSON SSOT + Domain Migration Guide]` |
| **۸** | **Archive Filename** | `01_Website_Static_v1.0_14050823_T01_Argon-Gemini-sd.hadi.mousavi_Initial_MVP_Release.html` |

### ۲. شرح تغییرات و چرایی معماری (What & Why - ADR)
- **طراحی دوگانه‌محور (Dual-Purpose Portfolio + Academy):** پیاده‌سازی همزمان بخش معرفی رزومه و خدمات حسابداری/مالیاتی خانم مرضیه منتظری (جهت جذب کارفرمایان و پروژه‌های پیمانکاری مالی) و بخش کاتالوگ دوره‌های آموزشی کاربردی بازار کار.
- **حذف پیچیدگی درگاه پرداخت در فاز ۱ (Zero-Cart Lead-Gen Bridge):** به جای درگیر کردن فاز اول با سبد خرید و درگاه بانکی، سیستم هوشمند تولید پیام آماده و هدایت مستقیم به شماره `09139946615` (واتس‌اپ، پیامک، تماس و کپی متن برای ایتا/تلگرام) پیاده‌سازی شد.
- **جاسازی تصویر رسمی (Self-Contained Asset Embedding):** تصویر پرسنلی خانم مرضیه منتظری هم به صورت فایل مستقل (`marzieh_montazeri_profile.jpg`) در ریشه پروژه آرشیو شد و هم به صورت Base64 درون `index.html` جاسازی گردید تا فایل HTML بدون وابستگی خارجی در هر محیطی باز شود.

---

## ✨ نسخه `v2.1` — بازطراحی روشن و مدرن (Editorial Minimalist) + ساختار چندصفحه‌ای دوره‌ها و دمو ویدیو
- **تاریخ ثبت:** شنبه ۲۳ آبان ۱۴۰۵ (`2026-11-14`) — نوبت سوم (`Turn 3`)

### ۱. جدول شناسنامه ۸ فیلدی نسخه (8-Field Provenance Header)

| ردیف | فیلد شناسنامه (Provenance Field) | مقدار ثبت‌شده (Recorded Value) |
| :--- | :--- | :--- |
| **۱** | **Agent / Harness** | `Argon (Gemini Cloud Task Mode)` |
| **۲** | **LLM Model** | `Argon (Google Gemini)` |
| **۳** | **Gateway / Account** | `Google Workspace Owner: sd.hadi.mousavi (sd.hadi.mousavi@gmail.com)` |
| **۴** | **Execution Mode** | `Cloud Workspace + Sandbox VM` |
| **۵** | **Base Version** | `Website v1.0` |
| **۶** | **Output Version & Schema** | `Website v2.1 (SCHEMA_VERSION: schema_v1)` |
| **۷** | **Change Scope** | `[Bright Editorial Redesign + Multi-Page Courses & Demo Video Player + Persian Numerals + Multi-Font Switcher]` |
| **۸** | **Archive Filename** | `02_Website_Static_v2.1_14050823_T03_Argon-Gemini-sd.hadi.mousavi_Editorial_MultiPage_Courses.html` |

### ۲. شرح تغییرات و چرایی معماری (What & Why - ADR)
- **تغییر سبک از داشبورد به طراحی روشن و مدرن (Editorial Minimalist):** حذف کامل باکس‌های تو در تو، تب‌ها، فیلترهای شلوغ و دکمه‌های تکراری، و جایگزینی با پس‌زمینه روشن (`#FAF8F5`)، قاب کمانی ظریف برای پرتره خانم منتظری، ردیف‌های آکاردئونی خلوت برای خدمات و فرم زیرخط‌دار مینیمال.
- **معماری چندصفحه‌ای (Multi-Page SPA Experience):** حفظ صفحه اصلی یکپارچه و افزودن دو صفحه اختصاصی دیگر: ۱) **صفحه فهرست کامل دوره‌های آموزشی (`page-courses`)**، و ۲) **صفحه پروفایل اختصاصی هر دوره (`page-course-detail`)** مجهز به سرفصل‌های فصلی، دستاوردها و **پخش‌کننده نمونه فیلم آموزشی (دمو)** با قابلیت جایگزینی مستقیم فایل `.mp4`.
- **تایپوگرافی گرافیکی و فارسی‌سازی کامل اعداد:** افزودن فونت‌های مدرن وب فارسی (`Peyda`, `Dana`, `Kalameh`, `Yekan Bakh`, `Estedad`) به همراه انتخابگر زنده فونت، و تبدیل ۱۰۰٪ اعداد صفحه به ارقام فارسی (`۰-۹`) و حذف شماره‌های قبل از تیتر بخش‌ها و آدرس تکراری فوتر.
