const { parser, optionsSpliter } = require('./parser.js');
const {
  countBytes,
  countLines,
  wordCounter,
  spaceJustifier,
} = require('./util.js')

const fileReader = function (reader, file) {
  return reader(file, 'utf-8');
};

const fetchContent = function (file, option, readContent) {
  let content = readContent(file);
  let countDetails = {
    '-w': wordCounter(content),
    '-c': countBytes(content),
    '-l': countLines(content)
  };
  return countDetails[option];
};

const formattedOutput = function (options, readContent, file) {
  let possibleOptions = ['-l', '-w', '-c'];
  if (!options.length) {
    options = possibleOptions;
  };
  options = optionsSpliter(options);
  let singlefileCountValues = [];
  let spacedCounts = '';
  for (let option of possibleOptions) {
    if (options.includes(option)) {
      let count = fetchContent(file, option, readContent);
      spacedCounts += spaceJustifier(count);
      singlefileCountValues.push(count);
    }
  };
  let fileOuput = spacedCounts + ' ' + file;
  return { fileOuput, singlefileCountValues };
};

const wordCountOutput = function (countWordResult) {
  return countWordResult.map((x) => {
    return x['fileOuput'];
  });
};

const lastLineOutput = function (countWordResult) {
  return countWordResult.map((x) => {
    return x['singlefileCountValues'];
  });
};

const wc = function (inputArgs, fs) {
  let { readFileSync } = fs;
  let { options, files } = parser(inputArgs);
  let readContent = fileReader.bind(null, readFileSync);
  let format = formattedOutput.bind(null, options, readContent);
  let countWordResult = files.map(function (file) {
    return format(file);
  });
  let filesCount = wordCountOutput(countWordResult);
  let totalCount = lastLineOutput(countWordResult);

  if (files.length > 1) {
    filesCount.push(getLastLine(totalCount));
  };
  return filesCount.join('\n');
};

const getLastLine = function (countDetails) {
  let counts = countDetails;
  counts = counts.reduce((acc, x) => {
    x.forEach((e,i)=>{
      acc[i] += e
    });
    return acc;
  },);
  let spacedLastLine = counts.map((x) => {
    return spaceJustifier(x);
  });
  return spacedLastLine.join('') + ' total';
};

module.exports = {
  wc,
  fetchContent,
};