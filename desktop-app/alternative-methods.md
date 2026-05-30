# روش‌های جایگزین ساخت EXE

اگر روش اصلی کار نکرد، این روش‌ها را امتحان کنید:

---

## روش 1: Nativefier (ساده‌ترین)

Nativefier هر صفحه وب را به اپلیکیشن دسکتاپ تبدیل می‌کند.

### نصب:
```bash
npm install -g nativefier
```

### ساخت از فایل HTML:
```bash
nativefier --name "Engineering Calculator" index.html
```

### یا از URL:
```bash
nativefier --name "Engineering Calculator" "file:///C:/path/to/index.html"
```

---

## روش 2: Electron Forge

### نصب:
```bash
npm install -g @electron-forge/cli
electron-forge init my-app
```

### کپی فایل‌ها و ساخت:
```bash
cd my-app
electron-forge make
```

---

## روش 3: Tauri (سبک‌تر از Electron)

Tauri اپلیکیشن‌های کوچک‌تری می‌سازد.

### نصب:
```bash
npm install -g @tauri-apps/cli
```

### ساخت:
```bash
npm tauri build
```

---

## روش 4: PWA + PWA Builder

1. اپلیکیشن را در مرورگر باز کنید
2. از منو "Install" یا "Add to Home Screen" را بزنید
3. یا به [PWABuilder.com](https://pwabuilder.com) بروید و URL را وارد کنید

---

## روش 5: استفاده آنلاین

اگر ساخت EXE سخت است، می‌توانید:

1. فایل `index.html` را مستقیماً در مرورگر باز کنید
2. میانبر روی دسکتاپ بسازید
3. مرورگر را در حالت Kiosk/App اجرا کنید:

```
chrome.exe --app="file:///C:/path/to/index.html"
```

---

## مقایسه روش‌ها

| روش | حجم خروجی | سختی | کیفیت |
|-----|----------|------|-------|
| Electron Builder | ~150MB | متوسط | عالی |
| Nativefier | ~150MB | آسان | خوب |
| Tauri | ~10MB | متوسط | عالی |
| PWA | ~0MB | آسان | خوب |

---

**توصیه:** برای اکثر کاربران، **روش 1 (Nativefier)** ساده‌ترین است.
