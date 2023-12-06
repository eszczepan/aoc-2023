import { getInput } from '../utils';

const input = await getInput('06/input.txt');

function parseInput(input: string[]) {
  const convertedInput = input.map((s) => s.split(': ')[1].split(' ').filter(Boolean).map(Number));
  return convertedInput[0].map((_, i) => convertedInput.map((row) => row[i]));
}

function getWinOptions(input: string[]) {
  const races = parseInput(input);
  let totalWinOptions = 1;

  races.forEach(([time, record]) => {
    let winOptions = 0;
    for (let i = 1; i < time; i++) {
      const speed = i;
      const duration = time - i;

      const distanceCovered = speed * duration;
      if (distanceCovered > record) {
        winOptions++;
      }
    }
    totalWinOptions *= winOptions;
  });

  return totalWinOptions;
}

const winOptions = getWinOptions(input);

console.log({ winOptions });
