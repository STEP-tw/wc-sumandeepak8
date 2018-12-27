const spaceJustifier = function (arg) {
  let length = arg.toString().length;
  let space = new Array(8 - length).fill(' ').join('');
  return `${space + arg}`;
};

module.exports = {
  spaceJustifier,
};