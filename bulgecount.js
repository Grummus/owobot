var colors = require('colors')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localstorage');

var globalBulgeCount = localStorage.getItem('globalBulges');
var globalVoreCount = localStorage.getItem('globalVore');

console.log(globalBulgeCount, 'bulges noticed globally!');
