const assert = require('assert');
const { countWordsOutputDetails, wc, hasDash } = require('../src/wcLib.js');

const files = {
  alphabets: 'abcd\nefgh\nijkl\nmnop\nqrst\nuvwx\nyz\n',
  numbers: '01\n23\n46\n789\n',
  words: 'hello world let\nconst function are\nkeywords'
};

const readFileSync = function (file) {
  return files[file];
};

let fs = { readFileSync };

describe('countWordsOutputDetails', function () {
  it("should return output like '        7       7      33' ", function () {
    let inputFile = files['alphabets'];
    let expectedOutput = '       7       7      33';
    assert.equal(countWordsOutputDetails(inputFile), expectedOutput);
  });

  it("should return '       4       4      13' and it should count for /n also", function () {
    let inputFile = files['numbers'];
    let expectedOutput = '       4       4      13';
    assert.equal(countWordsOutputDetails(inputFile), expectedOutput);
  });

  it("should count for spaces also and output should be '       2       6      43'", function () {
    let inputFile = files['words'];
    let expectedOutput = '       2       7      43';
    assert.equal(countWordsOutputDetails(inputFile), expectedOutput);
  });
});

describe('wc', function () {
  it('should return the detail of total lines words and characters and file name', function () {
    let inputFile = ["alphabets"];
    let expectedOutput = '       7       7      33 alphabets';
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should return the  details of lines bytes and words also and it should count for /n also', function () {
    let inputFile = ['numbers'];
    let expectedOutput = '       4       4      13 numbers';
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should count for spaces also', function () {
    let inputFile = ['words'];
    let expectedOutput = '       2       7      43 words';
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should return only word count detail when first arg is -w', function () {
    let inputArgs = ['-w', 'alphabets'];
    let expectedOutput = '       7 alphabets';
    assert.equal(wc(inputArgs, fs), expectedOutput);
  });

  it('should return only word count detail when first arg is -c', function () {
    let inputArgs = ['-c', 'words'];
    let expectedOutput = '      43 words';
    assert.equal(wc(inputArgs, fs), expectedOutput);
  });

  it('should return only word count detail when first arg is -l', function () {
    let inputArgs = ['-l', 'numbers'];
    let expectedOutput = '       4 numbers';
    assert.equal(wc(inputArgs, fs), expectedOutput);
  });
});

describe('hasDash', function () {
  it('should return true for input -w ', function () {
    assert.equal(hasDash('-w'), true);
  });

  it('should return false when input does not false', function () {
    assert.equal(hasDash('l'), false);
  })
});