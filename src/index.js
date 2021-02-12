const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

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
ipcRenderer.on('cpuSpeedMax',(event,data) => {
    document.getElementById('cpuSpeedMax').innerHTML = data+ " GHz";
});
ipcRenderer.on('avgCpuSpeed',(event,data) => {
    document.getElementById('currentCpuSpeed').innerHTML = data+ " GHz";
});
ipcRenderer.on('cpuLoad',(event,data) => {
    document.getElementById('cpuLoad').innerHTML = data.toFixed(2) + " %";
});
ipcRenderer.on('avgTemp',(event,data) => {
    document.getElementById('avTemp').innerHTML = data+ " °C";
});
ipcRenderer.on('coresTemp',(event,data) => {

    let cpu0 = "Core 1: " + data[0]+ " °C";
    let cpu1 = "Core 2: " +data[1]+ " °C";
    let cpu2 = "Core 3: " +data[2]+ " °C";
    let cpu3 = "Core 4: " +data[3]+ " °C";

    document.getElementById('coreTemp1').innerHTML = cpu0;
    document.getElementById('coreTemp2').innerHTML = cpu1;
    document.getElementById('coreTemp3').innerHTML = cpu2;
    document.getElementById('coreTemp4').innerHTML = cpu3;
});
ipcRenderer.on('processes',(event,data) => {
    document.getElementById('processes').innerHTML = data;
});
ipcRenderer.on('totalRam',(event,data) => {
    document.getElementById('totalRam').innerHTML = data.toFixed(2)+ " GB";
});
ipcRenderer.on('usedRam',(event,data) => {
    document.getElementById('usedRam').innerHTML = data.toFixed(2)+ " GB";
});
ipcRenderer.on('onBattery',(event,data) => {
    if(data){
        ipcRenderer.on('batterryCycles',(event,data) => {
            document.getElementById('batterryCycles').innerHTML = data;
        });
        ipcRenderer.on('batteryType',(event,data) => {
            document.getElementById('batteryType').innerHTML = data;
        });
        ipcRenderer.on('batteryModel',(event,data) => {
            document.getElementById('batteryModel').innerHTML = data;
        });
    }
});