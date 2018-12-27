const { parser, optionsSpliter } = require('./parser.js');
const { spaceJustifier } = require('./formatter.js')
const {
  countBytes,
  countLines,
  wordCounter,
} = require('./util.js')

const fileReader = function (reader, file) {
  return reader(file, 'utf-8');
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

const wordCountOutputData = function (file, option, readContent) {
  let content = readContent(file);
  let countDetails = {
    '-w': onlyWordOption(file, content),
    '-c': onlyByteOption(file, content),
    '-l': onlyLineOption(file, content)
  };
  return countDetails[option];
};

const formattedOutput = function (options, files, readContent) {
  let possibleOptions = ['-l', '-w', '-c'];
  if (!options.length) {
    options = possibleOptions;
  };
  options = optionsSpliter(options);
  let output = '';
  for (let option of possibleOptions) {
    if (options.includes(option)) {
      output += wordCountOutputData(files[0], option, readContent);
    }
  }
  return `${output} ${files[0]}`;
};

const wc = function (inputArgs, fs) {
  let { readFileSync } = fs;
  let { options, files } = parser(inputArgs);
  let readContent = fileReader.bind(null, readFileSync);
  return formattedOutput(options, files, readContent)
};

module.exports = {
  wc,
  wordCountOutputData,
};