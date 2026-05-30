# ساخت آیکون ICO

برای ساخت فایل `icon.ico` از فایل `icon.svg`:

## روش 1: آنلاین (ساده‌ترین)

1. به سایت [CloudConvert](https://cloudconvert.com/svg-to-ico) بروید
2. فایل `icon.svg` را آپلود کنید
3. تنظیمات:
   - Size: 256x256
   - همه سایزها را انتخاب کنید (16, 32, 48, 64, 128, 256)
4. دانلود کنید و در همین پوشه با نام `icon.ico` ذخیره کنید

## روش 2: با ImageMagick

اگر ImageMagick نصب دارید:

```bash
magick convert icon.svg -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

## روش 3: با GIMP

1. GIMP را باز کنید
2. فایل SVG را Import کنید (512x512)
3. Export As → icon.ico
4. همه سایزها را انتخاب کنید

---

**نکته:** اگر فایل `icon.ico` نداشته باشید، برنامه با آیکون پیش‌فرض Electron ساخته می‌شود.
