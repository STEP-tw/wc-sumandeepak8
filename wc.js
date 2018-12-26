const { wc } = require('./src/wcLib.js');
const fs = require('fs');

const main = function() {
  let inputArgs = process.argv.slice(2);
  console.log(wc(inputArgs, fs));
}; 

main();