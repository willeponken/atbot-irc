var debug = require('debug')('atbot:tools'),
    config = require(__dirname + '/../config');

module.exports = {
  searchCmd: function searchCmd(search, string) {
    var result = search.indexOf(string);
    debug('searchCmd', search, string, result);
    debug(config.resStr);
    if (result === config.resStr.length) {
      return true;
    } else {
      return false;
    }
  }
};
