var debug = require('debug')('atbot:tools');

function Tools(config) {

  // Fallback config
  if (!config) {
    config = require(__dirname + '/../config');
  }

  this.searchCmd = function searchCmd(search, string) {
    var result = search.indexOf(string);
    debug('searchCmd', search, string, result);
    debug(config.resStr);
    if (result === config.resStr.length) {
      return true;
    } else {
      return false;
    }
  };

  this.searchWord = function searchWord(search, string) {
    var result = search.toLowerCase().indexOf(string.toLowerCase());
    debug('searchWord', search, string, result);
    if(result > -1) {
      return true;
    } else {
      return false;
    }
  };

  this.getArgs = function getArgs(string) {
    string = this.cleanString(string);
    var result = string.split(' ');
    return result;
  };

  this.humanizeString = function humanizeString(string) {
    string = this.cleanString(string);
    var result = string.charAt(0).toUpperCase() + string.substr(1);
    return result;
  };

  this.cleanString = function cleanString(string) {
    var result = string.replace(/\s+/g, ' ').trim();
    return result;
  };

  this.remCmd = function remCmd(cmd, string) {
    var index = string.indexOf(cmd);
    var result = this.cleanString(string.substr((cmd.length + index)));
    return result;
  };
};

module.exports = Tools;
