import { getInput } from '../utils';

const input = await getInput('06/input.txt');

function parseInputToMultiple(input: string[]): Array<Array<number>> {
  const convertedInput = input.map((s) => s.split(': ')[1].split(' ').filter(Boolean).map(Number));
  return convertedInput[0].map((_, i) => convertedInput.map((row) => row[i]));
}

function parseInputToOneRace(input: string[]): number[] {
  return input.map((input) => {
    const words = input.trim().replace(/\s+/g, ' ').split(' ').slice(1);
    return Number(words.join(''));
  });
}

function getWinOptions(input: string[]): number {
  const races = parseInputToMultiple(input);
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

function getLongRaceWinOptions(input: string[]): number {
  let winOptions = 0;
  const [time, record] = parseInputToOneRace(input);

  for (let i = 1; i < time; i++) {
    const speed = i;
    const duration = time - i;
    const distanceCovered = speed * duration;

    if (distanceCovered > record) {
      winOptions++;
    }
  }

  return winOptions;
}

const winOptions = getWinOptions(input);
const winOpitionsLongRace = getLongRaceWinOptions(input);
console.log({ winOptions, winOpitionsLongRace });
