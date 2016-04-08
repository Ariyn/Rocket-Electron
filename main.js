'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

var mainWindow = null;

app.on('window-all-closed', function() {
	if(process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({width:600, height:600});
	mainWindow.loadURL("file://"+__dirname+"/html/main.html")

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
