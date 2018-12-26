const { wc } = require('./src/wcLib.js');
const fs = require('fs');

const main = function() {
  let inputArgs = process.argv.slice(2);
  let inputFile = inputArgs[0];
  console.log(wc(inputFile, fs));
}; 

main();