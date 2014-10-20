var Cleverbot = require('cleverbot-node'),
    CBot = new Cleverbot,
    debug = require('debug')('atbot:plugin:hello'),
    Tools = require(__dirname + '/../lib/tools'),
    tools = new Tools(),
    ent = require('ent');

cleverbot = {
  name: 'cleverbot',
  author: 'William Wennerström',
  command: 'clever',
  description: 'Talk to the cleverbot!',
  module: function(bot, info) {
    
    bot.addListener('pm', function(from, message) {
      debug('pm', 'recieved');
      
      debug(from, message);

      CBot.write(message, function(resp) {
        bot.say(from, ent.decode(resp.message));
      });
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
