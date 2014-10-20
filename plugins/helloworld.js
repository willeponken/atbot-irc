var debug = require('debug')('atbot:plugin:hello'),
    Tools = require(__dirname + '/../lib/tools'),
    tools = new Tools();

helloworld = {
  name: 'helloworld',
  author: 'William Wennerström',
  command: 'hello',
  description: 'Answers the user with a greeting',
  module: function(bot, info) {

    function greetMsg(user) {
      var greetings = [
        'Hello there, ' + user,
        'Who are you?',
        'I have a party in my pants, and the only one who isn\'t invited is ' + user,
        'Oh well, hello there kind Sir, ' + user,
        'Hey, ' + user,
        'Hi sexy!'
      ];
      return greetings[Math.floor((Math.random() * greetings.length))];
    }

    bot.addListener('atbot:message', function(info) {
      debug('atbot:message recieved');

      if(tools.searchCmd(info.message, helloworld.command)) {
        bot.say(info.channel, greetMsg(info.user));
      }
    });
    return true;
  }
}

module.exports = helloworld;
