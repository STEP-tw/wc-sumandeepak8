const newLine = '\n';

const fileReader = function (reader, file) {
  return reader(file, 'utf-8');
};

const spaceJustifier = function (arg) {
  let length = arg.toString().length;
  let space = new Array(8 - length).fill(' ').join('');
  return `${space + arg}`;
};

const formatter = function (lines, words, chars) {
  return `${spaceJustifier(lines) + spaceJustifier(words) + spaceJustifier(chars)}`;
};

const countLines = (content) => content.split(newLine).length - 1;

const wordCounter = function (content) {
  let words = content.split(/ |\n/);
  words = words.filter((x) => {
    return x != '';
  });
  return words.length;
};

const countBytes = (content) => content.length;

const countWordsOutputDetails = function (content) {
  let lines = countLines(content);
  let words = wordCounter(content);
  let chars = countBytes(content);
  return formatter(lines, words, chars);
};

const wc = function (inputArgs, fs) {
  let firstArg = inputArgs[0];
  let { readFileSync } = fs;
  let readContent = fileReader.bind(null, readFileSync);
  if(firstArg == '-w'){
    let file = inputArgs[1];
    let content = readContent(file);
    return spaceJustifier(wordCounter(content)) +' '+ file;
  };
  if(firstArg == '-c'){
    let file = inputArgs[1];
    let content = readContent(file);
    return spaceJustifier(countBytes(content)) +' '+ file;
  };

  if(firstArg == '-l'){
    let file = inputArgs[1];
    let content = readContent(file);
    return spaceJustifier(countLines(content)) +' '+ file;
  };

  let file = firstArg;
  let fileContent = readContent(file);
  return `${countWordsOutputDetails(fileContent)} ${file}`;
};

module.exports = {
  countWordsOutputDetails,
  wc
};