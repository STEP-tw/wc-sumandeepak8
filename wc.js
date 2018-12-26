const { countWords } = require('./src/wcLib.js');
const fs = require('fs');

const reader = function(file){
  return fs.readFileSync(file, 'utf-8');
};

const main = function() {
  let inputArgs = process.argv.slice(2);
  let inputFile = inputArgs[0];
  let singleFileContent = reader(inputFile);
  console.log(countWords(singleFileContent) + ' ' + inputFile);
}; 

main();