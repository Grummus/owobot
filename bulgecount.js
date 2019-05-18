var colors = require('colors')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localstorage');
var cowsay = require('cowsay');
var lolcatjs = require('lolcatjs');

var globalBulgeCount = localStorage.getItem('globalBulges');
var globalVoreCount = localStorage.getItem('globalVore');

exports.globalBulgeCount = globalBulgeCount;
exports.globalVoreCount = globalVoreCount;


lolcatjs.options.seed = 1000;
lolcatjs.options.colors = true;
lolcatjs.options.freq = 1;
process.stdout.write('\033c');
// process.stdout.write(globalBulgeCount + ' bulges noticed globally');
	var said = cowsay.say({
		text : globalBulgeCount + " bulges noticed globally",
		e : "oO",
		T : "U "
	});
	lolcatjs.fromString(said);
loop();


function loop() {
	setTimeout( function() {
	
		globalBulgeCount = localStorage.getItem('globalBulges');
		process.stdout.cursorTo(2, 1);
		// process.stdout.write(globalBulgeCount);
	//	console.log(cowsay.say({
	//			text : globalBulgeCount + " bulges noticed globally",
	//			e : "oO",
	//			T : "U "
	//	}));
		process.stdout.write(globalBulgeCount);
		process.stdout.cursorTo(0, 8);
		loop();
	}, 3000)
}
		// console.log(globalBulgeCount, 'bulges noticed globally!');
