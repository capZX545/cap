# 🧮 ماشین حساب مهندسی پیشرفته - نسخه دسکتاپ ویندوز

## روش ساخت فایل EXE

### پیش‌نیازها
1. نصب [Node.js](https://nodejs.org/) (نسخه 18 یا بالاتر)
2. نصب [Git](https://git-scm.com/) (اختیاری)

### مراحل ساخت

#### روش 1: استفاده از اسکریپت خودکار (ساده‌ترین)

1. فایل `build.bat` را اجرا کنید (دابل کلیک)
2. صبر کنید تا فرآیند تمام شود
3. فایل exe در پوشه `dist` ساخته می‌شود

#### روش 2: دستی

1. Command Prompt یا PowerShell را باز کنید
2. به پوشه `desktop-app` بروید:
   ```
   cd desktop-app
   ```

3. وابستگی‌ها را نصب کنید:
   ```
   npm install
   ```

4. فایل exe را بسازید:
   ```
   npm run build
   ```

5. فایل exe در پوشه `dist` ساخته می‌شود!

### فایل‌های خروجی

پس از ساخت موفق، این فایل‌ها در پوشه `dist` قرار می‌گیرند:
- `Engineering Calculator Setup.exe` - نصب‌کننده (Installer)
- `Engineering Calculator.exe` - نسخه پرتابل (در پوشه `win-unpacked`)

### عیب‌یابی

اگر با خطا مواجه شدید:

1. **خطای npm**: مطمئن شوید Node.js نصب است
   ```
   node --version
   npm --version
   ```

2. **خطای دسترسی**: Command Prompt را با دسترسی Administrator اجرا کنید

3. **خطای حافظه**: فضای کافی (حداقل 500MB) داشته باشید

### سیستم مورد نیاز
- Windows 7/8/10/11
- حداقل 100MB فضای دیسک
- 2GB RAM

---
Made with ❤️ for Engineers
