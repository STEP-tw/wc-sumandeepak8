const { parser, optionsParser } = require('./parser.js');
const {
  countBytes,
  countLines,
  wordCounter,
  spaceJustifier
} = require('./util.js');

const fetchCount = function(fileContent, option) {
  let countDetails = {
    w: wordCounter(fileContent),
    c: countBytes(fileContent),
    l: countLines(fileContent)
  };
  return countDetails[option];
};

const reducer = function(options, file, readContent, accumulator, option) {
  if (options.includes(option)) {
    let fileContent = readContent(file);
    let count = fetchCount(fileContent, option);
    accumulator.spacedCounts += spaceJustifier(count);
    accumulator.fileCountValues.push(count);
  }
  return accumulator;
};

const spaceAndCount = function(inputArgs) {
  let { options, file, readContent, possibleOptions } = inputArgs;
  let reducerFunc = reducer.bind(null, options, file, readContent);
  return possibleOptions.reduce(reducerFunc, {
    spacedCounts: '',
    fileCountValues: []
  });
};

const getCountDetails = function(options, readContent, file) {
  let possibleOptions = ['l', 'w', 'c'];
  options = optionsParser(options, possibleOptions);
  let inputArgs = { options, file, readContent, possibleOptions };
  let fileCountOutput = spaceAndCount(inputArgs);
  fileCountOutput.spacedCounts += ` ${file}`;
  return fileCountOutput;
};

const spacedCountsOutput = function(countWordResult) {
  return countWordResult.map(x => {
    return x['spacedCounts'];
  });
};

const getlastLineDetails = function(countWordResult) {
  return countWordResult.map(x => {
    return x['fileCountValues'];
  });
};

const formattedCounts = function(spacedCountWithFileName, countWordResult) {
  if (spacedCountWithFileName.length > 1) {
    let totalCount = getlastLineDetails(countWordResult);
    spacedCountWithFileName.push(getLastLine(totalCount));
  }
  return spacedCountWithFileName.join('\n');
};

const fileReader = function(reader, file) {
  return reader(file, 'utf-8');
};

const wc = function(inputArgs, fs) {
  let { readFileSync } = fs;
  let { options, files } = parser(inputArgs);
  let readContent = fileReader.bind(null, readFileSync);
  let spacesAndCounts = getCountDetails.bind(null, options, readContent);
  let countWordResult = files.map(function(file) {
    return spacesAndCounts(file);
  });
  let spacedCountWithFileName = spacedCountsOutput(countWordResult);
  return formattedCounts(spacedCountWithFileName, countWordResult);
};

const getTotalCounts = function(countDetails) {
  let cd = countDetails.map(x => x.slice());
  return cd.reduce((acc, countArray) => {
    countArray.forEach((element, index) => {
      acc[index] += element;
    });
    return acc;
  });
};

const getLastLine = function(countDetails) {
  let counts = getTotalCounts(countDetails);
  let spacedLastLine = counts
    .map(count => {
      return spaceJustifier(count);
    })
    .join('');
  return `${spacedLastLine} total`;
};

module.exports = {
  wc
};
