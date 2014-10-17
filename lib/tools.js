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
  },
  searchWord: function searchWord(search, string) {
    var result = search.toLowerCase().indexOf(string.toLowerCase());
    debug('searchWord', search, string, result);
    if(result > -1) {
      return true;
    } else {
      return false;
    }
  },
  extractVar: function extractVar(string) {
    return string.split(' ');
  },
  remCmd: function remCmd(cmd, string) {
    var index = string.indexOf(cmd);
    return string.substr((cmd.length + index));
  }
};
