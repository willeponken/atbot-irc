var debug = require('debug')('atbot:plugin:facebook'),
    Tools = require(__dirname + '/../lib/tools'),
    FB = require('fbgraph'),
    tools = new Tools();

facebook = {
  name: 'facebook',
  author: 'William Wennerström',
  command: 'none',
  description: 'Join #facebook and get a feed from the "HTS IT" group on facebook',
  module: function(bot, info) {

    var settings = {
      token: '', // Token with access to group
      group: '', // Group ID
      channel: '', // The channel to post content to
      interval: 100000 // Update interval
    };

    var latestUpdate = new Date();

    function updateFeed() {
      FB.get(settings.group + '/feed', {access_token: settings.token}, function(err, res) {

        if (err) {
          debug(err);
        } else {
          function findPosts(cb) {
            var data = res['data'];

            for (var post in data) {
              if (new Date(data[post].created_time) >  latestUpdate && data[post]) {
                bot.say(settings.channel, data[post].from.name + ' posted a new status:\n' + data[post].message);
                debug(data[post]);
              } else if (data[post]) {

                var comments = data[post].comments.data;
                for (var comment in comments) {
                  if (new Date(comments[comment].created_time) > latestUpdate && comments[comment]) {
                    bot.say(settings.channel, comments[comment].from.name + ' commented the status "' + data[post].message + '":\n' + comments[comment].message);
                    debug(comments[comment]);
                  }
                }
              } else {
                debug('No posts');
              }
            }
            return cb();
          }

          if (res['error']) {
            debug(res['error']);
          } else {
            try {
              findPosts(function() {
                debug('Updating latestUpdate');
                latestUpdate = new Date();
              });
            } catch (err) {
              debug(err);
            }
          }
        }
      });
    }

    var timeoutID = setInterval(function() {
      updateFeed();
    }, settings.interval);

    updateFeed();

    return true;
  }
}

module.exports = facebook;
