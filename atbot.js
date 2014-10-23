var irc = require('irc'),
    config = require(__dirname + '/config'),
    debug  = require('debug')('atbot'),
    util = require('util'),
    plugins,
    loadPlugins = require(__dirname + '/lib/plugins');

function toMe(message) {
  var result = message.indexOf(config.resStr);
  debug('toMe', message, result);
  if (result === 0) {
    return true;
  } else {
    return false;
  }
}

function respondMsg(info) {
  debug('respondMsg', info);
  bot.emit('atbot:message', info);
}

var bot = new irc.Client(config.server, config.name, {
  channels: config.channels
});

/*
 * EMITTERS
 */
bot.addListener('join', function(channel, user) {
  /*
   * PLUGINS
   */
  loadPlugins(bot, config.pluginDir, function(err, pluginList) {
    if (err) {
      return debug('loadPlugins', 'err:', err);
    } else {
      plugins = pluginList; // Save plugins to plugins variable
      return debug('loadPlugins', 'plugins:', pluginList.length);
    }
  });

  debug('join', user, 'joined.');
  bot.emit('atbot:join', user, channel);
});

bot.addListener('error', function(err) {
  debug('error', err);
  bot.emit('atbot:error', err);
});

bot.addListener('message', function(from, to, message, raw) {
  debug('message', from, to, message);
  if (toMe(message)) {
    respondMsg({
      user: from,
      channel: to,
      message: message,
      plugins: plugins,
      config: config,
      raw: raw
    });
    return;
  }
});
