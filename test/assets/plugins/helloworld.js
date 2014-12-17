var debug = require('debug')('atbot:plugin:hello'),
    Tools = require(__dirname + '/../../../lib/tools'),
    tools = new Tools(__dirname + '/../config');

test = {
  name: 'test',
  author: 'Test User',
  command: 'test',
  description: 'test',
  module: function(bot, info) {
    return true;
  }
}

module.exports = test;
