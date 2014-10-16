var irc = require('irc'),
    config = require(__dirname + '/config'),
    debug  = require('debug')('atbot'),
    tools = require(__dirname + '/lib/tools'),
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
 * PLUGINS
 */
loadPlugins(bot, config.pluginDir, function(err, plugins) {
  if (err) {
    return debug('loadPlugins', 'err:', err);
  } else {
    return debug('loadPlugins', 'plugins:', plugins.length);
  }
});

/*
 * EMITTERS
 */
bot.addListener('join', function(channel, user) {
  debug('join', user, 'joined.');
  bot.emit('atbot:join', user);
});

bot.addListener('error', function(err) {
  debug('error', err);
  bot.emit('atbot:error', err);
});

bot.addListener('message', function(from, to, message) {
  debug('message', from, to, message);
  if (toMe(message)) {
    respondMsg({
      user: from,
      channel: to,
      message: message
    });
    return;
  }
});
