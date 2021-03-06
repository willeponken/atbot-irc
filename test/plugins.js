var loadPlugins = require(__dirname + '/../lib/plugins'),
    irc = require('irc'),
    assert = require('assert');

describe('plugins', function() {
  describe('leadPlugins(bot, config, pluginDir, tools, callback)', function() {
    var bot = new irc.Client('irc.example.com', 'atbot', function() {
      channels: ['#example']
    });

    it('should load plugins and return array with plugins', function() {
      loadPlugins(bot, {}, __dirname + '/../plugins', function(){}, function(err, plugins) {
        assert.equal(err, null);
        assert.equal(typeof plugins, 'object');
      });
    });
  });
});
