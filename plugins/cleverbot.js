var Cleverbot = require('cleverbot-node'),
    CBot = new Cleverbot,
    debug = require('debug')('atbot:plugin:cleverbot'),
    ent = require('ent');

cleverbot = {
  name: 'cleverbot',
  author: 'William Wennerström',
  command: 'clever',
  description: 'Talk to the cleverbot!',
  module: function(bot, config, tools) {
   
    bot.addListener('pm', function(from, message) {
      debug('pm', 'recieved');
      debug(from, message);
      debug('message', message, 'resstr', config.resStr);

      if(config.resStr.indexOf(message)) {
        debug('probably not for cleverbot');
      } else {
        CBot.write(message, function(resp) {
          bot.say(from, ent.decode(resp.message));
        });
      }
    });



    bot.addListener('atbot:message', function(info) {
      debug('atbot:message recieved');

      if(tools.searchCmd(info.message, cleverbot.command)) {
        var message = tools.remCmd(info.config.resStr + cleverbot.command, info.message);
        
        debug('got the message', message);

        CBot.write(message, function(resp) {
          bot.say(info.channel, ent.decode(resp.message));
        });
      }
    });
    return true;
  }
}

module.exports = cleverbot;
