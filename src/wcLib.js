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

const formattedOutput = function (options, readContent, file) {
  let possibleOptions = ['-l', '-w', '-c'];
  if (!options.length) {
    options = possibleOptions;
  };
  options = optionsSpliter(options);
  let output = '';
  for (let option of possibleOptions) {
    if (options.includes(option)) {
      output += wordCountOutputData(file, option, readContent);
    }
  }
  return `${output} ${file}`;
};

const wc = function (inputArgs, fs) {
  let { readFileSync } = fs;
  let { options, files } = parser(inputArgs);
  let readContent = fileReader.bind(null, readFileSync);
  let format = formattedOutput.bind(null, options, readContent);
  let result = files.map(function (file) {
    return format(file);
  });
  if (files.length > 1) {
    result.push(getLastLine(result));
  };
  return result.join('\n');
};

const getLastLine = function (result) {
  let tmp = result.map((x) => {
    x = x.split(' ');
    x = x.filter((y) => {
      return isFinite(y) && y != '';
    })
    return x;
  });
  tmp = tmp.reduce((acc, x) => {
    acc[0] = +acc[0] + +x[0];
    acc[1] = +acc[1] + +x[1];
    acc[2] = +acc[2] + +x[2];
    return acc;
  });
  tmp = spaceJustifier(tmp[0]) + spaceJustifier(tmp[1]) + spaceJustifier(tmp[2]);
  return tmp + ' total';
};

module.exports = {
  wc,
  wordCountOutputData,
};