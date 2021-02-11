const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('onBattery',(event,data) => {
console.log('onBattery ' + data);
});
ipcRenderer.on('batterryCycles',(event,data) => {
console.log('batterryCycles' + data);
});
ipcRenderer.on('batteryType',(event,data) => {
console.log('batteryType ' + data);
});
ipcRenderer.on('batteryModel',(event,data) => {
console.log('batteryModel ' + data);
});
ipcRenderer.on('batteryManufacturer',(event,data) => {
console.log('batteryManufacturer ' + data);
});

ipcRenderer.on('osDistro',(event,data) => {
    document.getElementById('os').innerHTML = data;
});
ipcRenderer.on('osRelease',(event,data) => {
    document.getElementById('osVersion').innerHTML = data;
});
ipcRenderer.on('pcManufacturer',(event,data) => {
    document.getElementById('pcBrand').innerHTML = data;
});
ipcRenderer.on('pcModel',(event,data) => {
    document.getElementById('pcModel').innerHTML = data;
});
ipcRenderer.on('cpuBrand',(event,data) => {
    document.getElementById('cpuBrand').innerHTML = data;
});
ipcRenderer.on('cpuCores',(event,data) => {
    document.getElementById('cpuCores').innerHTML = data;
});
ipcRenderer.on('cpuThreads',(event,data) => {
    document.getElementById('cpuThreads').innerHTML = data;
});
ipcRenderer.on('cpuSpeed',(event,data) => {
    document.getElementById('cpuSpeed').innerHTML = data;
});
ipcRenderer.on('avgCpuSpeed',(event,data) => {
    document.getElementById('currentCpuSpeed').innerHTML = data;
});
ipcRenderer.on('cpuLoad',(event,data) => {
    document.getElementById('cpuLoad').innerHTML = data.toFixed(2) + " %";
});
ipcRenderer.on('avgTemp',(event,data) => {
    document.getElementById('avTemp').innerHTML = data;
});
ipcRenderer.on('coresTemp',(event,data) => {
    console.log('coresTemp ' + data);
});
ipcRenderer.on('maxTemp',(event,data) => {
    document.getElementById('maxTemp').innerHTML = data;
});
ipcRenderer.on('processes',(event,data) => {
    document.getElementById('processes').innerHTML = data;
});
ipcRenderer.on('totalRam',(event,data) => {
    document.getElementById('totalRam').innerHTML = data.toFixed(2);
});
ipcRenderer.on('usedRam',(event,data) => {
    document.getElementById('usedRam').innerHTML = data.toFixed(2);
});