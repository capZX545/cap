const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'ماشین حساب مهندسی پیشرفته | Engineering Calculator',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#0f172a',
    show: false, // Don't show until ready
    autoHideMenuBar: false,
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Create application menu
  const menuTemplate = [
    {
      label: 'فایل | File',
      submenu: [
        {
          label: 'پنجره جدید | New Window',
          accelerator: 'CmdOrCtrl+N',
          click: () => createWindow()
        },
        { type: 'separator' },
        {
          label: 'خروج | Exit',
          accelerator: 'Alt+F4',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'ویرایش | Edit',
      submenu: [
        { label: 'برش | Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'کپی | Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'چسباندن | Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { type: 'separator' },
        { label: 'انتخاب همه | Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    },
    {
      label: 'نما | View',
      submenu: [
        {
          label: 'بارگذاری مجدد | Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.reload()
        },
        { type: 'separator' },
        {
          label: 'بزرگنمایی | Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(currentZoom + 0.1);
          }
        },
        {
          label: 'کوچکنمایی | Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(Math.max(0.5, currentZoom - 0.1));
          }
        },
        {
          label: 'اندازه پیش‌فرض | Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => mainWindow.webContents.setZoomFactor(1)
        },
        { type: 'separator' },
        {
          label: 'تمام صفحه | Fullscreen',
          accelerator: 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen())
        },
        { type: 'separator' },
        {
          label: 'ابزار توسعه‌دهنده | Developer Tools',
          accelerator: 'F12',
          click: () => mainWindow.webContents.toggleDevTools()
        }
      ]
    },
    {
      label: 'راهنما | Help',
      submenu: [
        {
          label: 'درباره | About',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'درباره | About',
              message: 'ماشین حساب مهندسی پیشرفته\nAdvanced Engineering Calculator',
              detail: 'نسخه 2.0.0\n\n501 فرمول در 14 دسته‌بندی\nدستیار هوشمند محاسباتی\nپشتیبانی از فارسی و انگلیسی\n\n© 2024',
              buttons: ['بستن | Close']
            });
          }
        },
        { type: 'separator' },
        {
          label: 'وب‌سایت | Website',
          click: () => shell.openExternal('https://github.com')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App ready
app.whenReady().then(() => {
  createWindow();

  // macOS: re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
});
