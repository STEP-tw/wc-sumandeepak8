const newLine = '\n';

const fileReader = function(reader, file) {
  return reader(file, 'utf-8');
};

const spaceJustifier = function(arg) {
  let length = arg.toString().length;
  let space = new Array(8-length).fill(' ').join('');
  return `${space+arg}`;
};

const formatter = function(lines, words, chars) {
   return `${spaceJustifier(lines)+spaceJustifier(words)+spaceJustifier(chars)}`;
};

const countLines = (content)=> content.split(newLine).length - 1;
const wordCounter = (content)=> content.split(/ |\n/).length - 1;
const countBytes = (content)=> content.length;

const countWordsOutputDetails = function(content) {
  let lines =  countLines(content);
  let words = wordCounter(content);
  let chars = countBytes(content);
  return formatter(lines, words, chars);
};

const wc = function(file, fs) {
  let { readFileSync } = fs;
  let readContent = fileReader.bind(null, readFileSync);
  let fileContent = readContent(file);  
  return `${countWordsOutputDetails(fileContent)} ${file}`; 
};

module.exports = {
  countWordsOutputDetails, 
  wc
};