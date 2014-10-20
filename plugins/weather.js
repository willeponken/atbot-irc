var debug = require('debug')('atbot:plugin:hello'),
    Tools = require(__dirname + '/../lib/tools'),
    tools = new Tools(),
    request = require('request');

var weather = {
  name: 'weather',
  author: 'William Wennerström',
  command: 'weather',
  description: 'Get the weather for locations "weather <location>"',
  module: function(bot, info) {

    bot.addListener('atbot:message', function(info) {
      debug('atbot:message recieved');
     

      if(tools.searchCmd(info.message, weather.command)) {
        var args = tools.getArgs(info.message),
            weatherLocation = args[1];

        debug('Weather request', weatherLocation);
        request('http://api.openweathermap.org/data/2.5/weather?q=' + weatherLocation, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            try {
              var weather = JSON.parse(body);
              
              if (typeof weather === 'object') {
                weatherData = weather.weather[0];
                weatherTemp = Math.round(weather.main.temp - 272.15);

                bot.say(info.channel, tools.humanizeString(weatherData.description) + ' (' + weatherTemp + '\u00B0C)');
              } else {
                bot.say(info.channel, 'Unable to find that location.');
              }
            } catch (err) {
              bot.say(info.channel, 'Unable to fetch weather for that location.');
            }
          }
        });

      }
    });
    return true;
  }
};

module.exports = weather;
