// Declaration of Variables
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localstorage');
var bulges = new LocalStorage('./localstorage/bulges');
var startTimes = new LocalStorage('./localstorage/startTimes');

var bulgecount;
var startTime;

var globalBulgeCount = localStorage.getItem('globalBulges');

var endTime;
var time;
var seconds;

var serverID = 

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    console.log("Ready!");
});

bot.on('message', function (user, userID, channelID, message, evt) {
	
    // OwO bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
			case 'bepis':
				bot.sendMessage({
					to: channelID,
					message: 'Have some Bepis'
				});
			break;
			
            case 'bulgecount':
                bulgecount = bulges.getItem(channelID);
                bot.sendMessage({
                    to: channelID,
                    message: bulges.getItem(channelID) + ' Bulges noticed on this channel!'
                });
            break;

            case 'globalbulgecount':
                bot.sendMessage({
                    to: channelID,
                    message: localStorage.getItem('globalBulges') + ' Bulges noticed globally!'
                });
            break;
        }
    }

    var messageLowercase = message.toLowerCase();

    if (message.includes("bulge")) {
        bulgecount = bulges.getItem(channelID);
        bot.sendMessage({
            to: channelID,
            message: 'OwO'
        });
        bulgecount++;
        bulges.setItem(channelID, bulgecount);
        console.log(bulgecount + ' Bulges Noticed on channel:');
        console.log(channelID);
        globalBulgeCount++;
        localStorage.setItem('globalBulges', globalBulgeCount);
    }

    if (messageLowercase.includes("whats this") || messageLowercase.includes("what's this")) {
        bot.sendMessage({
            to: channelID,
            message: 'OwO?'
        });
    }
	
	if (messageLowercase.includes("good bot")) {
        bot.sendMessage({
            to: channelID,
            message: 'UwU'
        });
	}
	
	if (messageLowercase.includes("bad bot")) {
        bot.sendMessage({
            to: channelID,
            message: 'ಥ_ಥ'
        });
    }


    if (messageLowercase.includes("fuck")) {
        bot.sendMessage({
            to: channelID,
            message: 'ÒwÓ'
        });
    }

    // So this part logs how long a server can go without saying the word 'vore'
    if (messageLowercase.includes("vore")) {
        seconds = stopTimer(channelID) / 1000;
        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;

        bot.sendMessage({
            to: channelID,
            message: user.toUpperCase() + ' HAS SPOKEN THE FORBIDDEN WORD!\nThis channel has gone:\n' + days + ' days,\n' + hrs + ' hours,\n' + mnts + ' minutes, and\n' + seconds + ' seconds\nwithout saying the forbidden word!'
        });
        startTimer(channelID);
    }
});

function startTimer(channelID) {
    startTime = new Date();
    startTimes.setItem(channelID, startTime.toISOString());
    console.log("Resetting timer on channel " + channelID);
}

function stopTimer(channelID) {
    startTime = new Date(startTimes.getItem(channelID));
    console.log(startTime);
    endTime = new Date();
    console.log(endTime);
    endTime -= startTime;
    console.log(endTime);
    return endTime;
}