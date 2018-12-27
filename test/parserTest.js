const { filterOption, parser, optionsSpliter } = require('../src/parser.js');
const assert = require('assert');

describe('filterOption', function () {
  it('should return only first input element -w ', function () {
    let inputArgs = ['-w', 'file', '-c'];
    assert.deepEqual(filterOption(inputArgs), ['-w']);
  });

  it("should return ['-w','-c'] ", function () {
    let inputArgs = ['-w', '-c', 'file', 'file2'];
    assert.deepEqual(filterOption(inputArgs), ['-w', '-c']);
  });
});

describe('parser', function () {
  it("should return { options : ['-w'], files : ['file','file1'] } ", function () {
    let inputArgs = ['-w', 'file', 'file1'];
    let expectedOut = {
      options: ['-w'],
      files: ['file', 'file1']
    };
    assert.deepEqual(parser(inputArgs), expectedOut);
  });

  it("should return { options : ['-w','-c'], files : ['file','file1'] } ", function () {
    let inputArgs = ['-w', '-c', 'file', 'file1'];
    let expectedOut = {
      options: ['-w', '-c'],
      files: ['file', 'file1']
    };
    assert.deepEqual(parser(inputArgs), expectedOut);
  });

  it("should return { options : ['-w'], files : ['file','file1','-l'] } ", function () {
    let inputArgs = ['-w', 'file', 'file1', '-l'];
    let expectedOut = {
      options: ['-w'],
      files: ['file', 'file1', '-l']
    };
    assert.deepEqual(parser(inputArgs), expectedOut);
  });
});

describe('optionSpliter', function () {
  it('should return splitted array of options', function () {
    let options = ['-w', '-lc'];
    let expectedOut = ['-w', '-l', '-c'];
    assert.deepEqual(optionsSpliter(options), expectedOut);
  });

  it("should return ['-l','-c','-w'] when input is ['-lcw'] ", function () {
    let options = ['-lcw'];
    let expectedOut = ['-l', '-c', '-w'];
    assert.deepEqual(optionsSpliter(options), expectedOut);
  });

  it("should return  ['-w', '-l', '-l', '-c'] when input is ['-wl','-lc'] ", function () {
    let options = ['-wl', '-lc'];
    let expectedOut = ['-w', '-l', '-l', '-c'];
    assert.deepEqual(optionsSpliter(options), expectedOut);
  });
});