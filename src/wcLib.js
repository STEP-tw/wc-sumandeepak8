const spaces = '     ';
const newLine = '\n';
const space = ' ';

const fileReader = function(reader, file) {
  return reader(file, 'utf-8');
};

const countWords = function(content) {
  let lines = content.split(newLine).length;
  let words = content.split(newLine).join(space).split(space).length;
  let chars = content.length;
  return `${spaces} ${lines}${spaces} ${words}${spaces}${chars}`
};

const wc = function(file, fs) {
  let { readFileSync } = fs;
  let readContent = fileReader.bind(null, readFileSync);
  let fileContent = readContent(file);  
  return `${countWords(fileContent)} ${file}`; 
};

module.exports = {
  countWords, gst
  
  wc,
};