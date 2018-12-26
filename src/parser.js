const filterOption = function (inputArgs) {
  let optionCandidatesResult = inputArgs.map(function (x) {
    return x.startsWith('-');
  });
  let firstIndex = optionCandidatesResult.indexOf(false);
  return inputArgs.slice(0, firstIndex);
};

const parser = function (inputArgs) {
  let options = filterOption(inputArgs);
  let files = inputArgs.slice(options.length);
  return { options, files };
};

module.exports = {
  parser,
  filterOption,
};
