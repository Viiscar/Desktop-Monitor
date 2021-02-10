const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('pcManufacturer',(event,data) => {
console.log('pcManufacturer ' + data);
});
ipcRenderer.on('pcModel',(event,data) => {
console.log('pcModel ' + data);
});
ipcRenderer.on('cpuBrand',(event,data) => {
console.log('cpuBrand ' + data);
});
ipcRenderer.on('cpuManufacturer',(event,data) => {
console.log('cpuManufacturer ' + data);
});
ipcRenderer.on('cpuSpeed',(event,data) => {
console.log('cpuSpeed ' + data);
});
ipcRenderer.on('cpuCores',(event,data) => {
console.log('cpuCores' + data);
});
ipcRenderer.on('avgCpuSpeed',(event,data) => {
console.log('avgCpuSpeed GHz' + data);
});
ipcRenderer.on('avgTemp',(event,data) => {
console.log('avgTemp ' + data);
});
ipcRenderer.on('coresTemp',(event,data) => {
console.log('coresTemp ' + data);
});
ipcRenderer.on('maxTemp',(event,data) => {
console.log('maxTemp ' + data);
});
ipcRenderer.on('totalRam',(event,data) => {
console.log('total Ram ' + data);
});
ipcRenderer.on('usedRam',(event,data) => {
console.log('Used Ram ' + data);
});
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
console.log('osDistro ' + data);
});
ipcRenderer.on('osRelease',(event,data) => {
console.log('osRelease ' + data);
});
ipcRenderer.on('cpuLoad',(event,data) => {
console.log('cpuLoad ' + data);
});
ipcRenderer.on('processes',(event,data) => {
console.log('processes ' + data);
});



ipcRenderer.on('cpuLoad',(event,data) => {
document.getElementById('cpuLoad').innerHTML = data.toFixed(2);
});
ipcRenderer.on('usedRam',(event,data) => {
document.getElementById('usedRam').innerHTML = data.toFixed(2);
});
ipcRenderer.on('totalRam',(event,data) => {
document.getElementById('totalRam').innerHTML = data.toFixed(2);
});