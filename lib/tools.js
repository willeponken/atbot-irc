var debug = require('debug')('atbot:tools');

var Tools = function Tools(config) {
  // Fallback config
  debug('Loading config');
  if (!config) {
    this.config = require(__dirname + '/../config');
  } else {
    this.config = config;
  }
};


Tools.prototype.searchCmd = function searchCmd(search, string) {
  var result = search.indexOf(string);
  debug('searchCmd', search, string, result);
  debug(this.config.resStr);
  if (result === this.config.resStr.length) {
    return true;
  } else {
    return false;
  }
};

Tools.prototype.searchWord = function searchWord(search, string) {
  var result = search.toLowerCase().indexOf(string.toLowerCase());
  debug('searchWord', search, string, result);
  if(result > -1) {
    return true;
  } else {
    return false;
  }
};

Tools.prototype.extractVar = function extractVar(string) {
  return string.split(' ');
};

Tools.prototype.remCmd = function remCmd(cmd, string) {
  var index = string.indexOf(cmd);
  return string.substr((cmd.length + index));
};

module.exports = Tools;
