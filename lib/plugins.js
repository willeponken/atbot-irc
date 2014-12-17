var debug  = require('debug')('atbot:plugin'),
    util = require('util'),
    fs = require('fs');

function testPlugin(bot, info, plugin, tools, callback) {

  debug('testPlugins', 'testing', plugin.name, 'plugins');
  try {
    var pluginTest = plugin.module(bot, info, tools);
    if (pluginTest.err) {
      debug('testPlugins', 'PLUGIN FAIL!', 'name:', plugin.name, 'err:', pluginTest.err);
      return callback(pluginTest.err);
    } else {
      debug('testPlugins', 'PLUGIN SUCCESS', 'name:', plugin.name, 'returned:',  pluginTest);
      return callback(null);
    }
  } catch (err) {
    debug('testPlugins', 'PLUGIN FAIL', 'name:', plugin.name, 'err:', err);
    return callback(err);
  }

}

module.exports = function loadPlugins(bot, info, dir, tools, callback) {
  var pluginList = [];
  fs.readdir(dir, function(err, plugins) {
    if (err) {
      return callback(err, null);
    } else {
      debug('loadPlugins', 'readdir', plugins);
      for (var i = 0; i < plugins.length; i++) {
        debug('loadPlugins', 'found plugin:', dir + '/' + plugins[i]);
        var pluginObj = require(dir + '/' + plugins[i]);
        testPlugin(bot, info, pluginObj, tools, function(err) {
          if (err) {
            debug('loadPlugins', 'will not add plugin:', pluginObj.name);
          } else {
            debug('loadPlugins', 'loading plugin:', pluginObj.name);
            pluginList.push(pluginObj);
          }
          return callback(null, pluginList);
        });
      }
    }
  });
}

