const spaces = '     ';
const newLine = '\n';
const space = ' ';

const countWords = function(contents) {
  let lines = contents.split(newLine).length;
  let words = contents.split(newLine).join(space).split(space).length;
  let chars = contents.length;
  return `${spaces} ${lines}${spaces} ${words}${spaces}${chars}`
};

module.exports = {
  countWords, 
};