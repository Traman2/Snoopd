import { app, BrowserWindow, globalShortcut } from 'electron'
import path from "path";
import { ipcHandle, isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { fileURLToPath } from "url";
import { createTray } from './tray.js';
import { screen } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on('ready', () => {
  const splash = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    show: false
  });

  splash.loadFile(path.join(__dirname, "splash.html"));
  splash.once("ready-to-show", () => splash?.show());

  const mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    width: 1200,
    height: 700,
    webPreferences: {
      preload: getPreloadPath()
    },
  });

  const popWindow = new BrowserWindow({
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    transparent: true,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    focusable: true,
    width: 500,
    height: 200,
    webPreferences: {
      preload: getPreloadPath()
    },
    icon: path.join(__dirname, 'desktopIconMain.ico')
  });

  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 500;
  const x = Math.round((screenWidth - windowWidth) / 2);
  const y = 20;

  popWindow.setPosition(x, y);

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123/main')
    popWindow.loadURL('http://localhost:5123/popup')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
  }

  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      if (splash) {
        splash.close();
      }
      mainWindow.show();
    }, 3000);
  });

  //Electron handlers
  ipcHandle("onClose", () => {
    mainWindow.close();
  })

  ipcHandle("onFullScreen", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  })

  ipcHandle("onMinimize", () => {
    mainWindow.minimize();
  })

  ipcHandle("onPopupClose", () => {
    popWindow.hide();
  })

  globalShortcut.register('Control+Shift+Q', () => {
    if (popWindow) {
      if (popWindow.isVisible()) {
        popWindow.hide();
      } else {
        popWindow.show();
      }
      return;
    }
  })

  globalShortcut.register('Control+Shift+A', () => {
    if (!popWindow.isVisible()) return;
    const [x, y] = popWindow.getPosition();
    const newX = Math.max(0, x - 50);
    popWindow.setPosition(newX, y);
  });

  globalShortcut.register('Control+Shift+D', () => {
    if (!popWindow.isVisible()) return;
    const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
    const [x, y] = popWindow.getPosition();
    const newX = Math.min(screenWidth - popWindow.getBounds().width, x + 50);
    popWindow.setPosition(newX, y);
  });

  handleCloseEvents(mainWindow);
  createTray(mainWindow);
})

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  })
}