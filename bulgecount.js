var colors = require('colors')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localstorage');

var globalVoreCount = localStorage.getItem('globalBulges');
var globalBulgeCount = localStorage.getItem('globalVore');

console.log(globalBulgeCount, 'bulges noticed globally!');
