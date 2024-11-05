import { app, BrowserWindow, ipcMain } from 'electron';
import 'reflect-metadata';
import path from 'path';
import Database from './database/Database';
// Right now this specifies a folder where database files will be stored.
export const defaultStorageFolder = app.getPath('downloads');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.

  global.database = new Database();

  ipcMain.removeHandler('database:insert');
  ipcMain.removeHandler('database:search');
  ipcMain.removeHandler('database:fetchall');
  ipcMain.removeHandler('database:fetch:paid');
  ipcMain.removeHandler('database:fetch:pending');


  ipcMain.handle('database:insert', async (event, arg) => {
    return await database.insert(arg);
  })

  ipcMain.handle('database:search', async (event, arg) => {
    return await database.fetchByNameOrMobile(arg);
  })

  ipcMain.handle('database:fetchall', async (event, arg) => {
    return await database.fetchAll();
  })

  ipcMain.handle('database:fetch:paid', async (event, arg) => {
    return await database.fetchTransactionsByDate(arg);
  })

  ipcMain.handle('database:fetch:pending', async (event, arg) => {
    return await database.fetchPendingTransactions();
  })

  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  if (!app.isPackaged) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }else {
    app.dock?.hide(); // Only mac
    mainWindow.setMenuBarVisibility(false); // Only Windows and Linux
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
