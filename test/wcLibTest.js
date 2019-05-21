const assert = require('assert');
const { wc } = require('../src/wcLib.js');

const files = {
  alphabets: 'abcd\nefgh\nijkl\nmnop\nqrst\nuvwx\nyz\n',
  numbers: '01\n23\n46\n789\n',
  words: 'hello world let\nconst function are\nkeywords'
};

const readFileSync = function(file) {
  return files[file];
};

let fs = { readFileSync };

describe('wc for single file without option', function() {
  it('should return the detail of total lines words and characters and file name', function() {
    let inputFile = ['alphabets'];
    let expectedOutput = '       7       7      33 alphabets';
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should return the  details of lines bytes and words also and it should count for /n also', function() {
    let inputFile = ['numbers'];
    let expectedOutput = '       4       4      13 numbers';
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should count for spaces also', function() {
    let inputFile = ['words'];
    let expectedOutput = '       2       7      43 words';
    assert.equal(wc(inputFile, fs), expectedOutput);
  });

  it('should return only word count detail when first arg is -w', function() {
    let inputArgs = ['-w', 'alphabets'];
    let expectedOutput = '       7 alphabets';
    assert.equal(wc(inputArgs, fs), expectedOutput);
  });

  it('should return only word count detail when first arg is -c', function() {
    let inputArgs = ['-c', 'words'];
    let expectedOutput = '      43 words';
    assert.equal(wc(inputArgs, fs), expectedOutput);
  });

  it('should return only word count detail when first arg is -l', function() {
    let inputArgs = ['-l', 'numbers'];
    let expectedOutput = '       4 numbers';
    assert.equal(wc(inputArgs, fs), expectedOutput);
  });
});

describe('wc with multiple option', function() {
  it("should return first word counts and then second bytes count where input will be ['-c','-w','alphabets'] ", function() {
    let inputArgs = ['-c', '-w', 'alphabets'];
    let expectedOutput = '       7      33 alphabets';
    assert.deepEqual(wc(inputArgs, fs), expectedOutput);
  });

  it("should return same output for input ['-c','-w','alphabets'] and input ['-w','-c','alphabets'] ", function() {
    let input = wc(['-c', '-w', 'alphabets'], fs);
    let expectedOutput = wc(['-w', '-c', 'alphabets'], fs);
    assert.deepEqual(input, expectedOutput);
  });
  it("should return first word counts and then second bytes count where input will be ['-c','-w','-l',alphabets'] ", function() {
    let input = wc(['-c', '-w', '-l', 'alphabets'], fs);
    let expectedOutput = wc(['-w', '-c', '-l', 'alphabets'], fs);
    assert.deepEqual(input, expectedOutput);
  });
});

describe('wc for multiple files and multiple options', function() {
  it("should return  same output for ['-c','-w','-l',alphabets', 'numbers'] and [ '-w', '-c', '-l', 'alphabets', 'numbers'] ", function() {
    let input = wc(['-c', '-w', '-l', 'alphabets', 'numbers'], fs);
    let expectedOutput = wc(['-w', '-c', '-l', 'alphabets', 'numbers'], fs);
    assert.deepEqual(input, expectedOutput);
  });

  it("should return same for ['-c','-w','-l',alphabets', 'words' ] and ['-w', '-c', '-l', 'alphabets', 'words' ] ", function() {
    let input = wc(['-c', '-w', '-l', 'alphabets', 'words'], fs);
    let expectedOutput = wc(['-w', '-c', '-l', 'alphabets', 'words'], fs);
    assert.deepEqual(input, expectedOutput);
  });
});

describe('wc for single option and multiple option', function() {
  it('wc return expected output for multiple file and single option', function() {
    let input = ['-l', 'alphabets', 'numbers'];
    let expectedOutput = '       7 alphabets\n       4 numbers\n      11 total';
    assert.deepEqual(wc(input, fs), expectedOutput);
  });
  it('wc return expected output for multiple file and two  option -l -c ', function() {
    let input = ['-l', '-c', 'alphabets', 'numbers'];
    let expectedOutput =
      '       7      33 alphabets\n       4      13 numbers\n      11      46 total';
    assert.deepEqual(wc(input, fs), expectedOutput);
  });
  it('wc return expectedOutput for three files and four options ', function() {
    let input = ['-lcw', '-l', 'alphabets', 'numbers', 'words'];
    let expectedOutput =
      '       7       7      33 alphabets\n       4       4      13 numbers\n       2       7      43 words\n      13      18      89 total';
    assert.deepEqual(wc(input, fs), expectedOutput);
  });
});
