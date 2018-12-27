const newLine = '\n';

const countLines = function (content) {
  return content.split(newLine).length - 1;
};

const wordCounter = function (content) {
  let words = content.split(/ |\n/);
  words = words.filter((x) => {
    return x != '';
  });
  return words.length;
};

const countBytes = (content) => content.length;

module.exports = {
  countBytes,
  countLines,
  wordCounter,
}