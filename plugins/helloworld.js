var debug = require('debug')('atbot:plugin:hello'),
    tools = require(__dirname + '/../lib/tools');

helloworld = {
  name: 'helloworld',
  author: 'William Wennerström',
  command: 'hello',
  module: function(bot, info) {

    bot.addListener('atbot:message', function(info) {
      debug('atbot:message recieved');

      if(tools.searchCmd(info.message, helloworld.command)) {
        bot.say(info.channel, 'Hello there, ' + info.user);
      }
    });
    return true;
  }
}

module.exports = helloworld;
