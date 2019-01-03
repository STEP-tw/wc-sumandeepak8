const filterOption = function(inputArgs) {
  let optionCandidatesResult = inputArgs.map(function(x) {
    return x.startsWith("-");
  });
  let firstIndex = optionCandidatesResult.indexOf(false);
  return inputArgs.slice(0, firstIndex);
};

const optionsSpliter = function(options) {
  return options.reduce(function(acc, x) {
    if (x.length > 2) {
      x.split("")
        .slice(1)
        .map(e => {
          acc.push("-" + e);
        });
      return acc;
    }
    acc.push(x);
    return acc;
  }, []);
};

const optionsParser = function(options, possibleOptions) {
  if (!options.length) {
    options = possibleOptions;
  }
  return optionsSpliter(options);
};

const parser = function(inputArgs) {
  let options = filterOption(inputArgs);
  let files = inputArgs.slice(options.length);
  return { options, files };
};

module.exports = {
  parser,
  optionsParser,
  filterOption,
  optionsSpliter
};
