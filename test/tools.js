var assert = require('assert'),
    config = require(__dirname + '/assets/config'),
    testTools = require(__dirname + '/../lib/tools'),
    tools = new testTools(config),
    fs = require('fs');

describe('tools', function() {
  
  describe('.searchCmd(search, string)', function() {
    it('should return true if string exists in beggining of search string else return false', function(done) {
      var searchString = '@bar foo baz',
          exampleString = 'bar',
          errorString = 'foo';

      var result = tools.searchCmd(searchString, exampleString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, true);
      
      result = tools.searchCmd(searchString, errorString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, false);
    
      done();  

    });
  });
  
  describe('.searchWord(search, string)', function() {
    it('should search case-insesitive in string and return true if exists else return false', function(done) {
      var searchString = 'BaR zOo bAZ',
          exampleString = 'bAr',
          errorString = 'foO';

      var result = tools.searchWord(searchString, exampleString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, true);
      
      result = tools.searchWord(searchString, errorString);
      assert.equal(typeof result, 'boolean');
      assert.equal(result, false);
    
      done();  

    });
  });
});
