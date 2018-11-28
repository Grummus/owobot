var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var bulgecount = 0;
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
				bot.sendMessage({
					to: channelID,
					message: bulgecount + ' bulges noticed!'
				})
			break;
        }
    }
	
	if (message.includes("bulge")) {
		bot.sendMessage({
			to: channelID,
			message: 'OwO'
		})
		console.log('Bulge Noticed!');
		bulgecount++;
	}
	
	if (message.includes("good bot")) {
		bot.sendMessage({
			to: channelID,
			message: 'UwU'
		})
	}
	
	if (message.includes("bad bot")) {
		bot.sendMessage({
			to: channelID,
			message: 'ಥ_ಥ'
		})
	}
	
});