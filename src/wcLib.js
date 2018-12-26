const { parser } = require('./parser.js');
const { formatter, spaceJustifier } = require('./formatter.js')
const { 
  countBytes,
  countLines,
  wordCounter,
  hasDash
} = require('./util.js')

const fileReader = function (reader, file) {
  return reader(file, 'utf-8');
};

const countWordsOutputDetails = function (content) {
  let lines = countLines(content);
  let words = wordCounter(content);
  let chars = countBytes(content);
  return formatter(lines, words, chars);
};

const onlyWordOption = function (file, content) {
  return `${spaceJustifier(wordCounter(content))}`;
};

const onlyByteOption = function (file, content) {
  return `${spaceJustifier(countBytes(content))}`;
};

const onlyLineOption = function (file, content) {
  return `${spaceJustifier(countLines(content))}`;
};

const hasOptionOuputData = function (file, option, readContent) {
  let content = readContent(file);
  let countDetails = {
    '-w': onlyWordOption(file, content),
    '-c': onlyByteOption(file, content),
    '-l': onlyLineOption(file, content)
  };
  return countDetails[option];
};

const wc = function (inputArgs, fs) {
  let firstArg = inputArgs[0];
  let { readFileSync } = fs;
  let { options ,files } = parser(inputArgs);
  let readContent = fileReader.bind(null, readFileSync);
  if(options.length != 0){
    let output ='';
    let possibleOptions = ['-l', '-w', '-c'];
    for(let option of possibleOptions){
      if(options.includes(option)){
        output  += hasOptionOuputData(files[0], option, readContent);
      }
    }
   return `${output} ${files[0]}`;
  }
  let file = firstArg;
  let fileContent = readContent(file);
  return `${countWordsOutputDetails(fileContent)} ${file}`;
};

module.exports = {
  countWordsOutputDetails,
  wc,
  hasDash,
};