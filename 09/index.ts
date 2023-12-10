import { getInput } from '../utils';

const input = await getInput('09/input.txt');

function isAllEqual(array: Array<number>): boolean {
  return array.every((val, _, arr) => val === arr[0]);
}

function getExtrapolatedValuesSum(input: string[]): number {
  const histories = input.map((el) => el.split(' '));
  const lastNumbers: Array<number> = [];

  for (let i = 0; i < histories.length; i++) {
    let history: Array<string | number> = histories[i];
    const historyLastNumber = Number(history[history.length - 1]);
    lastNumbers.push(historyLastNumber);
    let previousNumber = 0;
    let isAllZeros = false;
    const differences = [];

    while (true) {
      for (let j = 0; j < history.length; j++) {
        const currentNumber = Number(history[j]);
        const difference = currentNumber - previousNumber;
        previousNumber = currentNumber;

        differences.push(difference);
      }

      const diffLastNumber = differences[differences.length - 1];
      const nextSequence = differences.slice(1);

      lastNumbers.push(diffLastNumber);
      history = nextSequence;
      isAllZeros = isAllEqual(nextSequence);

      if (isAllZeros) break;

      differences.length = 0;
    }
  }

  return lastNumbers.reduce((acc, curr) => (acc += curr), 0);
}

const extrapolatedValuesSum = getExtrapolatedValuesSum(input);

console.log({ extrapolatedValuesSum });
