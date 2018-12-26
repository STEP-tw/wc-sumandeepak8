const assert = require('assert');
const { countWords } = require('../src/wcLib.js');

let space = '     ';
let alphabets = 'abcd\nefgh\nijkl\nmnop\nqrst\nuvwx\nyz';
let numbers = '01\n23\n46\n789';
let words = 'hello world let\nconst function are\nkeywords';

describe('countWords', function () {
  it('should return the length of the total chars of file', function () {
    let inputFile = alphabets;
    let expectedOutput = `${space} 7${space} 7${space}32`; 
    assert.equal(countWords(inputFile), expectedOutput);
  });

  it('should return the length of total chars and it should count for /n also', function () {
    let inputFile = numbers;
    let expectedOutput = `${space} 4${space} 4${space}12`; 
    assert.equal(countWords(inputFile), expectedOutput);
  });

  it('should count for spaces also', function(){
    let inputFile = words;
    let expectedOutput = `${space} 3${space} 7${space}43`;
    assert.equal(countWords(inputFile), expectedOutput);
  });
});