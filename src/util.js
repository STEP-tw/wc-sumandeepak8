const newLine = "\n";

const countLines = function(content) {
  return content.split(newLine).length - 1;
};

const wordCounter = function(content) {
  let words = content.split(/ |\n/);
  words = words.filter(x => {
    return x != "";
  });
  return words.length;
};

const countBytes = content => content.length;

const spaceJustifier = function(arg) {
  let length = arg.toString().length;
  let space = new Array(8 - length).fill(" ").join("");
  return `${space + arg}`;
};

module.exports = {
  countBytes,
  countLines,
  wordCounter,
  spaceJustifier
};
