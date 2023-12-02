const path = './01/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');

function convertWordsToDigits(str: string): string {
  const wordsToDigits: { [key: string]: string } = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
  };

  Object.keys(wordsToDigits).forEach((key) => {
    str = str.replaceAll(key, wordsToDigits[key]);
  });

  return str;
}

function getCalibrationSum(): number {
  const result = puzzleArray.reduce((acc, curr) => {
    const digits = curr.replace(/\D/g, '');

    return acc + getSumOfDigits(digits);
  }, 0);

  return result;
}

function getSumOfDigits(digits: string): number {
  const firstDigit = digits.charAt(0);
  const lastDigit = digits.charAt(digits.length - 1);
  const mergedDigits = firstDigit + lastDigit;

  return Number(mergedDigits);
}

function getCalibrationSum2() {
  const result = puzzleArray.reduce((acc, curr) => {
    const convertedString = convertWordsToDigits(curr);
    const digits = convertedString.replace(/\D/g, '');

    return acc + getSumOfDigits(digits);
  }, 0);

  return result;
}

const calibrationSum = getCalibrationSum();
const calibrationSum2 = getCalibrationSum2();

console.log({ calibrationSum, calibrationSum2 });
