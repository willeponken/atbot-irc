var assert = require('assert'),
    config = require(__dirname + '/assets/config'),
    testTools = require(__dirname + '/../lib/tools'),
    tools = new testTools(config),
    fs = require('fs');

describe('tools', function() {
  
  describe('.searchCmd(search, string)', function() {
    it('should return true if string exists in beggining of search string else return false', function() {
      var searchString = '@bar foo baz',
          exampleString = 'bar',
          errorString = 'foo';

      var result = tools.searchCmd(searchString, exampleString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, true);
      
      result = tools.searchCmd(searchString, errorString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, false);
    });
  });
  
  describe('.searchWord(search, string)', function() {
    it('should search case-insesitive in string and return true if exists else return false', function() {
      var searchString = 'BaR zOo bAZ',
          exampleString = 'bAr',
          errorString = 'foO';

      var result = tools.searchWord(searchString, exampleString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, true);
      
      result = tools.searchWord(searchString, errorString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, false);
    });
  });
  
  describe('.humanizeString(string)', function() {
    it('should return a trimed and cleaned string from whitespaces and a letter which is uppercase', function() {
      var exampleString = ' bar  foo   baz     ';

      var result = tools.humanizeString(exampleString);
      assert.equal(typeof result, 'string');
      assert.equal(result, 'Bar foo baz');
    });
  });
  
  describe('.getArgs(string)', function() {
    it('should return array with arguments', function() {
      var exampleString = ' bar  foo   baz     ';

      var result = tools.getArgs(exampleString);
      assert.equal(typeof result, 'object');
      assert.equal(result[0],'bar');
      assert.equal(result[1],'foo');
      assert.equal(result[2],'baz');
    });
  });
 
  describe('.cleanString(string)', function() {
    it('should return a trimed and cleaned string from whitespaces', function() {
      var exampleString = ' bar  foo   baz     ';

      var result = tools.cleanString(exampleString);
      assert.equal(typeof result, 'string');
      assert.equal(result, 'bar foo baz');
    });
  });

  describe('.remCmd(cmd, string)', function() {
    it('should return a string with the "cmd" string removed', function() {
      var exampleString = 'bar foo baz',
          cmdString = 'bar';

      var result = tools.remCmd(cmdString, exampleString);
      assert.equal(typeof result, 'string');
      assert.equal(result, 'foo baz');
    });
  });
});
