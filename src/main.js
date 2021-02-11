const { app, BrowserWindow } = require('electron');
const path = require('path');
const si = require('systeminformation');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // setInterval(() => {
   
  // },3000);

  let pcManufacturer;
  let pcModel;
  let cpuManufacturer;
  let cpuBrand;
  let cpuSpeed;
  let cpuCores;
  let cpuThreads;
  let avgCpuSpeed;
  let avgTemp;
  let coresTemp;
  let maxTemp;
  let totalRam;
  let usedRam;
  let onBattery
  let batterryCycles;
  let batteryType;
  let batteryModel;
  let batteryManufacturer
  let osDistro;
  let osRelease;
  let cpuLoad;
  let processes;

  si.system()
  .then(data => {pcModel=data.model; pcManufacturer=data.manufacturer})
  .catch(error => console.error(error));

  si.cpu()
  .then(data => {cpuBrand=data.brand; cpuManufacturer=data.manufacturer; cpuSpeed=data.speed; cpuCores=data.physicalCores; cpuThreads=data.cores})
  .catch(error => console.error(error));

  si.cpuCurrentSpeed()
  .then(data => avgCpuSpeed=data.avg)
  .catch(error => console.error(error));

  si.cpuTemperature()
  .then(data => {avgTemp=data.main; coresTemp=data.cores; maxTemp=data.max})
  .catch(error => console.error(error));

  si.mem()
  .then(data => {totalRam=data.total*9.31*0.0000000001; usedRam=data.active*9.31*0.0000000001})
  .catch(error => console.error(error));

  si.battery()
  .then(data => {onBattery=data.hasBattery; batterryCycles=data.cycleCount; batteryType=data.type; batteryModel=data.model;  batteryManufacturer=data.manufacturer})
  .catch(error => console.error(error));
  
  si.osInfo()
  .then(data => {osDistro=data.distro; osRelease=data.release})
  .catch(error => console.error(error));

  si.currentLoad()
  .then(data => cpuLoad=data.currentLoad)
  .catch(error => console.error(error));

  si.processes()
  .then(data => processes=data.all)
  .catch(error => console.error(error));

  si.processes()
  .then(data => test=data.all)
  .catch(error => console.error(error));


  mainWindow.webContents.on('did-finish-load', () => {

    mainWindow.webContents.send('pcManufacturer', pcManufacturer);
    mainWindow.webContents.send('pcModel', pcModel);
    mainWindow.webContents.send('cpuBrand', cpuManufacturer + " "+ cpuBrand);
    mainWindow.webContents.send('cpuSpeed', cpuSpeed);
    mainWindow.webContents.send('cpuCores', cpuCores);
    mainWindow.webContents.send('cpuThreads', cpuThreads);
    mainWindow.webContents.send('avgCpuSpeed', avgCpuSpeed);
    mainWindow.webContents.send('processes', processes);
    mainWindow.webContents.send('avgTemp', avgTemp);
    mainWindow.webContents.send('coresTemp', coresTemp);
    mainWindow.webContents.send('maxTemp', maxTemp);
    mainWindow.webContents.send('totalRam', totalRam);
    mainWindow.webContents.send('usedRam', usedRam);
    mainWindow.webContents.send('onBattery', onBattery);
    mainWindow.webContents.send('batterryCycles', batterryCycles);
    mainWindow.webContents.send('batteryType', batteryType);
    mainWindow.webContents.send('batteryModel', batteryModel);
    mainWindow.webContents.send('batteryManufacturer', batteryManufacturer);
    mainWindow.webContents.send('osDistro', osDistro);
    mainWindow.webContents.send('osRelease', osRelease);
    mainWindow.webContents.send('cpuLoad', cpuLoad);
  })
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