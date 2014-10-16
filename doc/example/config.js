/*
 * CONFIG.JS
 * This is an example configuration file, it should be put
 * in the root of atbot-irc.
 * 
 * Ex.
 *  ~/atbot-irc/config.js
 */ 

module.exports = {
  server: 'irc.example.com',
  channels: ['#example', '#example2'],
  name: 'atbot',
  resStr: '@ ',
  pluginDir: __dirname + '/plugins'
};
