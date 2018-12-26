const assert = require('assert');
const { countWords, wc } = require('../src/wcLib.js');

let space = '     ';
const files = {
  alphabets: 'abcd\nefgh\nijkl\nmnop\nqrst\nuvwx\nyz',
  numbers: '01\n23\n46\n789',
  words: 'hello world let\nconst function are\nkeywords'
};

const readFileSync = function (file) {
  return files[file];
};

let fs = { readFileSync };

describe('countWords', function () {
  it("should return output like '      7      7     32' ", function () {
    let inputFile = files['alphabets'];
    let expectedOutput = `${space} 7${space} 7${space}32`;
    assert.equal(countWords(inputFile), expectedOutput);
  });

  it("should return '      4      4     12' and it should count for /n also", function () {
    let inputFile = files['numbers'];
    let expectedOutput = `${space} 4${space} 4${space}12`;
    assert.equal(countWords(inputFile), expectedOutput);
  });

  it("should count for spaces also and output should be '      3      7     43'", function () {
    let inputFile = files['words'];
    let expectedOutput = `${space} 3${space} 7${space}43`;
    assert.equal(countWords(inputFile), expectedOutput);
  });
});

describe('wc', function () {
  it('should return the detail of total lines words and characters and file name', function () {
    let inputFile = "alphabets";
    let expectedOutput = `${space} 7${space} 7${space}32 alphabets`;
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should return the  details of lines bytes and words also and it should count for /n also', function () {
    let inputFile = 'numbers';
    let expectedOutput = `${space} 4${space} 4${space}12 numbers`;
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should count for spaces also', function () {
    let inputFile = 'words';
    let expectedOutput = `${space} 3${space} 7${space}43 words`;
    assert.equal(wc(inputFile, fs), expectedOutput);
  });
});