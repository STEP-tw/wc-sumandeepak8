const { parser, optionsParser } = require('./parser.js');
const {
  countBytes,
  countLines,
  wordCounter,
  spaceJustifier
} = require('./util.js');

const fileReader = function (reader, file) {
  return reader(file, 'utf-8');
};

const fetchCount = function (file, option, readContent) {
  let content = readContent(file);
  let countDetails = {
    '-w': wordCounter(content),
    '-c': countBytes(content),
    '-l': countLines(content)
  };
  return countDetails[option];
};

const spaceCountReducer = function (inputArgs) {
  let { options, file, readContent, possibleOptions } = inputArgs;
  return possibleOptions.reduce(
    (accumulator, option) => {
      if (options.includes(option)) {
        let count = fetchCount(file, option, readContent);
        accumulator.spacedCounts += spaceJustifier(count);
        accumulator.fileCountValues.push(count);
      }
      return accumulator;
    },
    { spacedCounts: '', fileCountValues: [] }
  );
};

const getCountDetails = function (options, readContent, file) {
  let possibleOptions = ['-l', '-w', '-c'];
  options = optionsParser(options, possibleOptions);
  let inputArgs = { options, file, readContent, possibleOptions };
  let fileCountOutput = spaceCountReducer(inputArgs);
  fileCountOutput.spacedCounts += ` ${file}`;
  return fileCountOutput;
};

const spacedCountsOutput = function (countWordResult) {
  return countWordResult.map(x => {
    return x['spacedCounts'];
  });
};

const getlastLineDetails = function (countWordResult) {
  return countWordResult.map(x => {
    return x['fileCountValues'];
  });
};

const formattedCounts = function (spacedCountWithFileName, countWordResult) {
  if (spacedCountWithFileName.length > 1) {
    let totalCount = getlastLineDetails(countWordResult);
    spacedCountWithFileName.push(getLastLine(totalCount));
  }
  return spacedCountWithFileName.join('\n');
};

const wc = function (inputArgs, fs) {
  let { readFileSync } = fs;
  let { options, files } = parser(inputArgs);
  let readContent = fileReader.bind(null, readFileSync);
  let spacesAndCounts = getCountDetails.bind(null, options, readContent);
  let countWordResult = files.map(function (file) {
    return spacesAndCounts(file);
  });
  let spacedCountWithFileName = spacedCountsOutput(countWordResult);
  return formattedCounts(spacedCountWithFileName, countWordResult);
};

const zipper = function (countDetails) {
  let cd = countDetails.map(x => x.slice());
  return cd.reduce((acc, countArray) => {
    countArray.forEach((element, index) => {
      acc[index] += element;
    });
    return acc;
  });
};

const getLastLine = function (countDetails) {
  let counts = zipper(countDetails);
  let spacedLastLine = counts.map(count => {
    return spaceJustifier(count);
  });
  return spacedLastLine.join('') + ' total';
};

module.exports = {
  wc
};
