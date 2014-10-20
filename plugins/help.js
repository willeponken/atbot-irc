var debug = require('debug')('atbot:plugin:help'),
    Tools = require(__dirname + '/../lib/tools'),
    tools = new Tools();

help = {
  name: 'help',
  author: 'William Wennerström',
  command: 'help',
  description: 'Give a list of all the available plugins',
  module: function(bot, info) {

    bot.addListener('atbot:message', function(info) {
      debug('atbot:message recieved');

      if(tools.searchCmd(info.message, help.command)) {
        var plugins = info.plugins,
            resStr = info.config.resStr,
            text = '';
        for (var i = 0; i < plugins.length; i++) {
          text += plugins[i].name + ': ' + resStr + plugins[i].command + ' - ' + (plugins[i].description || 'No description available') + '\n';
        }
        bot.say(info.channel, text);
      }
    });
    return true;
  }
}

module.exports = help;
