const { app, BrowserWindow } = require('electron');
const path = require('path');
const si = require('systeminformation');
//const osxTemp = require('osx-temperature-sensor');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 810,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.removeMenu();
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  let pcManufacturer;
  let pcModel;
  let cpuManufacturer;
  let cpuBrand;
  let cpuSpeedMax;
  let cpuCores;
  let cpuThreads;
  let avgCpuSpeed;
  let avgTemp;
  let coresTemp;
  let totalRam;
  let usedRam;
  let storage;
  let storageType;
  let storageSize;
  let onBattery
  let batterryCycles;
  let batteryType;
  let batteryModel;
  let osDistro;
  let osRelease;
  let cpuLoad;
  let processes;
 
  si.system()
  .then(data => {pcModel=data.model; pcManufacturer=data.manufacturer})
  .catch(error => console.error(error));

  si.cpu()
  .then(data => {cpuBrand=data.brand; cpuManufacturer=data.manufacturer; cpuSpeedMax=data.speedMax; cpuCores=data.physicalCores; cpuThreads=data.cores})
  .catch(error => console.error(error));

  si.mem()
  .then(data => totalRam=data.total*9.31*0.0000000001)
  .catch(error => console.error(error));

  si.diskLayout()
  .then(data => {storage=data[0].name; storageType=data[0].type; storageSize=data[0].size*9.31*0.0000000001})
  .catch(error => console.error(error));

  si.battery()
  .then(data => {onBattery=data.hasBattery; batterryCycles=data.cycleCount; batteryType=data.type; batteryModel=data.model})
  .catch(error => console.error(error));
  
  si.osInfo()
  .then(data => {osDistro=data.distro; osRelease=data.release})
  .catch(error => console.error(error));

    setInterval(() => {
      si.currentLoad()
      .then(data => cpuLoad=data.currentLoad)
      .catch(error => console.error(error));

      si.processes()
      .then(data => processes=data.all)
      .catch(error => console.error(error));

      si.cpuTemperature()
      .then(data => {avgTemp=data.main; coresTemp=data.cores})
      .catch(error => console.error(error));

      si.cpuCurrentSpeed()
      .then(data => avgCpuSpeed=data.avg)
      .catch(error => console.error(error));

      si.mem()
      .then(data => usedRam=data.active*9.31*0.0000000001)
      .catch(error => console.error(error));
    
    },1000);
  
  mainWindow.webContents.on('did-finish-load', () => {
    setInterval(() => {
      mainWindow.webContents.send('processes', processes);
      mainWindow.webContents.send('cpuLoad', cpuLoad);
      mainWindow.webContents.send('avgTemp', avgTemp);
      mainWindow.webContents.send('coresTemp', coresTemp);
      mainWindow.webContents.send('avgCpuSpeed', avgCpuSpeed);
      mainWindow.webContents.send('usedRam', usedRam);
    },1000);

    // if windows
    if(process.platform === "win32"){
      setTimeout(() =>{
        mainWindow.webContents.send('pcManufacturer', pcManufacturer);
        mainWindow.webContents.send('pcModel', pcModel);
        mainWindow.webContents.send('cpuBrand', cpuManufacturer + " "+ cpuBrand);
        mainWindow.webContents.send('cpuSpeedMax', cpuSpeedMax);
        mainWindow.webContents.send('cpuCores', cpuCores);
        mainWindow.webContents.send('cpuThreads', cpuThreads);
        mainWindow.webContents.send('osDistro', osDistro);
        mainWindow.webContents.send('osRelease', osRelease);
      },1500);
      setTimeout(() =>{
        mainWindow.webContents.send('storage', storage);
        mainWindow.webContents.send('storageType', storageType);
        mainWindow.webContents.send('storageSize', storageSize);
      },2500);
    }

    // if macos
    if(process.platform === "darwin"){
      setTimeout(() =>{
        mainWindow.webContents.send('storage', storage);
        mainWindow.webContents.send('storageType', storageType);
        mainWindow.webContents.send('storageSize', storageSize);
      },1000);
    }

    mainWindow.webContents.send('pcManufacturer', pcManufacturer);
    mainWindow.webContents.send('pcModel', pcModel);
    mainWindow.webContents.send('cpuBrand', cpuManufacturer + " "+ cpuBrand);
    mainWindow.webContents.send('cpuSpeedMax', cpuSpeedMax);
    mainWindow.webContents.send('cpuCores', cpuCores);
    mainWindow.webContents.send('cpuThreads', cpuThreads);
    mainWindow.webContents.send('totalRam', totalRam);
    mainWindow.webContents.send('storage', storage);
    mainWindow.webContents.send('storageType', storageType);
    mainWindow.webContents.send('storageSize', storageSize);
    mainWindow.webContents.send('onBattery', onBattery);
    mainWindow.webContents.send('batterryCycles', batterryCycles);
    mainWindow.webContents.send('batteryType', batteryType);
    mainWindow.webContents.send('batteryModel', batteryModel);
    mainWindow.webContents.send('osDistro', osDistro);
    mainWindow.webContents.send('osRelease', osRelease);
    mainWindow.webContents.send('cpuLoad', cpuLoad);
  })
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.