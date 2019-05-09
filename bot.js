// Ye Olde Declaration of Variables
var Discord = require('discord.io');
var logger = require('winston');
var colors = require('colors');
var auth = require('./auth.json');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localstorage');
var bulges = new LocalStorage('./localstorage/bulges');
var vores = new LocalStorage('./localstorage/vores');
var startTimes = new LocalStorage('./localstorage/startTimes');

var bulgecount;
var startTime;

var vorecount;
var globalBulgeCount = localStorage.getItem('globalBulges');
var globalVoreCount = localStorage.getItem('globalVore');

var endTime;
var seconds;

var chatlog = true;

// Logger stuff (I don't fully understand this)
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Hack into the Matrix (connect to discord)
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
// once connected, spit out some info to the debug console
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    console.log("Ready!");
});

bot.on('disconnect', function(erMsg, code) {
    console.log('------ Oopsie woopsie uwu, we make a fucky wucky, I disconnected with code'.red, code, 'for reason:'.red, erMsg, '------ '.red);
    bot.connect();
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
	if (chatlog == true) {
		console.log(user + ": " + message);
	}

        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // testing command, pls ignore
			case 'bepis':
				bot.sendMessage({
					to: channelID,
					message: 'Have some Bepis'
                });
                bulgecount = 68;
                globalBulgeCount += 68;
                localStorage.setItem('globalBulges', globalBulgeCount);
                console.log("Setting bulgecount to 68");
                bulges.setItem(channelID, bulgecount);

			break;
			// Displays how many bulges have been noticed on a specific channel OwO
			// end my suffering
            case 'bulgecount':
                bulgecount = bulges.getItem(channelID);
                bot.sendMessage({
                    to: channelID,
                    message: bulges.getItem(channelID) + ' Bulges noticed on this channel!'
                });
            break;

            case 'forbiddenwordcount':
                vorecount = vores.getItem(channelID);
                bot.sendMessage({
                    to: channelID,
                    message: vorecount + ' times the forbidden word has been spoken.'
                });
            break
            // A very important statistic
            case 'globalbulgecount':
                bot.sendMessage({
                    to: channelID,
                    message: localStorage.getItem('globalBulges') + ' Bulges noticed globally!'
                });
            break;

            case 'globalforbiddenwordcount':
                bot.sendMessage({
                    to: channelID,
                    message: localStorage.getItem('globalVore') + ' times the forbidden word has been spoken globally.'
                });
            break;

            // yet another testing command (use with caution as this affects the global bluge count)
            case 'reset':
                bot.sendMessage({
                    to: channelID,
                    message: 'RESETTING COUNT FOR CHANNEL ' + channelID
                });
                console.log("RESETTING COUNT FOR CHANNEL " + channelID);
                bulgecount = bulges.getItem(channelID);
                bulges.setItem(channelID, 0);
                globalBulgeCount -= bulgecount;
                localStorage.setItem('globalBulges', globalBulgeCount);
            break;

	    case 'owohelp':
                bot.sendMessage({
			to: channelID,
			message: 'OwO Bot Help:\n```\nShow bulge count for channel: !bulgecount \nShow global bulge count: !globalbulgecount\n```\n DiscordBots Page:https://discordbots.org/bot/517201738646945803'
		})
        break;
        
        case 'cease':
                bot.sendMessage({
                    to: channelID,
                    message: 'bye bye',
                });

                bot.disconnect();
        break;
        }
    }
    // yeet the caps from the incoming string
    var messageLowercase = message.toLowerCase();
    // the magic code which appends the local and global bulgecounts
    if (message.includes("bulge")) {
	if (chatlog == true) {
		console.log(user + ": " + message);
	}

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
        
	// lil' easter egg ;)
        if(bulgecount == 34) {
            console.log("Halfway to 69");
            bot.sendMessage({
                to: channelID,
                message: "♪ - uwu We're halfway there\nOWO, LIVIN ON A PRAYER! - ♪"
            });
        }
        if(bulgecount == 69) {
            console.log("69 reached!");
            bot.sendMessage({
                to: channelID,
                message: '69 BULGES DETECTED!\nOWOWOWOWOWOWOWOWOWOWOWOWOWO'
            });
        }
    }
    // Custom messages for certain phrases
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

    // So this part logs how long a server can go without saying the word 'vore'
    // oooh boy this took ages to make
    if (messageLowercase.includes("vore")) {
        vorecount = vores.getItem(channelID);
        vorecount++
        vores.setItem(channelID, vorecount);
        globalVoreCount++;
        localStorage.setItem('globalVore', globalVoreCount);
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
// Timer Functions
// AKA where I discovered my hatred for working with objects.
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
