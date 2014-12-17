var debug = require('debug')('atbot:plugin:schoolsoft'),
    http = require('https');
    NodePie = require('nodepie'),
    c = require('irc-colors'),
    moment = require('moment');

schoolsoft = {
  name: 'schoolsoft',
  author: 'William Wennerström',
  command: 'ss',
  description: 'Get the 10 latest news from the SchoolSoft feed!',
  module: function(bot, config, tools) {
    
    const MAXITEMS = 10;
    var feedUrl = 'https://sms8.schoolsoft.se/hassleholm/jsp/public/right_public_student_rss.jsp?key=fcf94cbfa15407a4886415b75cdb754f';

    function loadFeed(url, callback) {
      http.get(url, function(res) {
        debug('got http response', res.statusCode);
        if(res.statusCode !== 200) {
          callback('Unable to download feed', null);
        } else {
          var buffer = '';
          res.on('data', function(data) {
            debug('Got data', data);
            buffer += data;
          });

          res.on('end', function() {
            var body = String(buffer);
            var feed = new NodePie(body);

            try {
              feed.init();
              var items = feed.getItems(0, feed.getItemQuantity());

              return callback(null, items);
            } catch (err) {
              debug(err);
              return callback('Unable to parse the feed', null);
            }
          });
        }
      });
    }

    function feedInterval(interval, url) {

      debug('interval', interval, 'url', url);
      var lastUpdate = new Date();
      var checkFeed = setInterval(function(url) {
        loadFeed(feedUrl, function(err, items) {
          if (err) {
            debug('unable to check for updates', err);
          } else {
            var itemLen = items.length, date;
            var chans = config.channels, chanLen = chans.length;
            debug('chans', chans);
            
            for(var i = 0; i < itemLen; i++) {
              if(items[i].getDate() > lastUpdate) {
                date = moment(items[i].getDate()).format('MMM Do YY, H:mm');
                title = items[i].getTitle();
                
                for(var j = 0; j < chanLen; j++) {
                  debug('posting in', chans[j]);
                  bot.say(chans[j], '[' + c.red(i) + '] ' + c.cyan(date) + ': ' + title);
                }
              }
            }
          }
        });
        lastUpdate = new Date();
      }, interval);
    }
    feedInterval(3600 * 1000, feedUrl);

    bot.addListener('atbot:message', function(info) {
      debug('atbot:message recieved');

      if(tools.searchCmd(info.message, schoolsoft.command)) {
        var message = tools.remCmd(info.config.resStr + schoolsoft.command, info.message),
            index = parseInt(message);
        debug('got the message', message);

        if(isNaN(index)) {

          loadFeed(feedUrl, function(err, items) {
            if (err) {
              bot.say(info.user, err);
            } else {
 
              bot.say(info.user, '### Write ' + info.config.resStr + 'ss <number> for more content ###');
              var item, date;
              var len = MAXITEMS < items.length ? MAXITEMS : items.length;

              for(var i = 0; i < len; i++) {
                date = moment(items[i].getDate()).format('MMM Do YY, H:mm');
                title = items[i].getTitle();

                bot.say(info.user, '[' + c.red(i) + '] ' + c.cyan(date) + ': ' + title);
              }
            }
          });
        } else {
          
          loadFeed(feedUrl, function(err, items) {
            if (err) {
              bot.say(info.user, err);
            } else {
              var date = moment(items[index].getDate()).format('MMM Do YY, H:mm');
              var title = items[index].getTitle();
              var desc = items[index].getDescription();
              var link = items[index].getLink();

              bot.say(info.user, '[' + c.red(index) + '] ' + c.cyan(date) + ': ' + title + '\n' + desc + '\n' + c.green(link));
            }
          });
        }
      }
    });
    return true;
  }
}

module.exports = schoolsoft;
