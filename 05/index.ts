import { getInput } from '../utils';

const input = await getInput('05/sample.txt');
const inputStr = input.join('\n');
const categoriesHeaders = [
  'seeds',
  'seed-to-soil',
  'soil-to-fertilizer',
  'fertilizer-to-water',
  'water-to-light',
  'light-to-temperature',
  'temperature-to-humidity',
  'humidity-to-location',
];

function getMap(input: string): Array<Array<string>> {
  return categoriesHeaders.reduce((acc: any, header: string, index: number) => {
    const start = inputStr.indexOf(header) + header.length + 1;
    const end = index < categoriesHeaders.length - 1 ? input.indexOf(categoriesHeaders[index + 1]) : undefined;
    const values =
      index === 0
        ? input.slice(start, end).trim().split('\n')
        : input
            .slice(start + 4, end)
            .trim()
            .split('\n');

    acc.push(values);

    return acc;
  }, []);
}

function getLocation(seed: string | number, categories: Array<Array<string>>) {
  let location = Number(seed);

  categories.forEach((category) => {
    for (const line of category) {
      const [destination, source, range] = line.split(' ').map(Number);

      if (location >= source && location <= source + range) {
        location = destination + location - source;
        break;
      }
    }
  });

  return Number(location);
}

function getLowestLocation(input: string): number {
  const [s, ...categories] = getMap(input);
  const seeds = s[0].split(' ');
  const locations = seeds.map((seed) => getLocation(seed, categories));

  return Math.min(...locations);
}

function getLowestLocationForRanges(input: string) {
  const [s, ...categories] = getMap(input);
  const seedArr = s[0].split(' ').map(Number);
  const seedPairs = Array.from({ length: seedArr.length / 2 }, (_, i) => seedArr.slice(i * 2, i * 2 + 2));
  const seedCache: Record<number, boolean> = {};
  let lowestLocation = Infinity;

  seedPairs.forEach(([start, length]) => {
    for (let i = start; i < start + length; i++) {
      if (!seedCache[i]) {
        const location = getLocation(i, categories);
        if (location < lowestLocation) {
          lowestLocation = location;
        }
        seedCache[i] = true;
      }
    }
  });
  performance.now();
  return lowestLocation;
}

const lowestLocation = getLowestLocation(inputStr);
const lowestLocationFromRanges = getLowestLocationForRanges(inputStr);

console.log({ lowestLocation, lowestLocationFromRanges });
