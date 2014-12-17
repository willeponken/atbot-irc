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

Tools.prototype.getArgs = function getArgs(string) {
  string = this.cleanString(string);
  var result = string.split(' ');
  return result;
};

Tools.prototype.humanizeString = function humanizeString(string) {
  string = this.cleanString(string);
  var result = string.charAt(0).toUpperCase() + string.substr(1);
  return result;
};

Tools.prototype.cleanString = function cleanString(string) {
  var result = string.replace(/\s+/g, ' ').trim();
  return result;
};

Tools.prototype.remCmd = function remCmd(cmd, string) {
  var index = string.indexOf(cmd);
  var result = this.cleanString(string.substr((cmd.length + index)));
  return result;
};

module.exports = Tools;
