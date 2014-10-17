var assert = require('assert'),
    tools,
    fs = require('fs');

describe('tools', function() {
 
  before(function(done) {
    fs.rename(__dirname + '/../config.js', __dirname + '/../config.js-b', function(err) {
      if (err) {
        throw new Error(err);
      }
      fs.rename(__dirname + '/assets/config.js', __dirname + '/../config.js', function(err) {
        if (err) {
          throw new Error(err);
        }
        tools = require(__dirname + '/../lib/tools'), // Require here due to moving of the config file before
        done();
      });
    });
  });
  
  after(function(done) {
    fs.rename(__dirname + '/../config.js', __dirname + '/assets/config.js', function(err) {
      if (err) {
        throw new Error(err);
      }
      fs.rename(__dirname + '/../config.js-b', __dirname + '/../config.js', function(err) {
        if (err) {
          throw new Error(err);
        }
        done();
      });
    });
  });

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
