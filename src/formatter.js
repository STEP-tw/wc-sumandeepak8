const spaceJustifier = function (arg) {
  let length = arg.toString().length;
  let space = new Array(8 - length).fill(' ').join('');
  return `${space + arg}`;
};

const formatter = function (lines, words, chars) {
  return `${spaceJustifier(lines) + spaceJustifier(words) + spaceJustifier(chars)}`;
};

module.exports = {
  formatter,
  spaceJustifier
};