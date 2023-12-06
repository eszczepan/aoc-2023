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

function getLocations(seeds: Array<string | number>, categories: Array<Array<string>>) {
  return seeds.map((seed) => {
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
  });
}

function getLowestLocation(input: string): number {
  const [s, ...categories] = getMap(input);
  const seeds = s[0].split(' ');
  const locations = getLocations(seeds, categories);

  return Math.min(...locations);
}

function getLowestLocationForRanges(input: string): number {
  const [s, ...categories] = getMap(input);

  const seedArr = s[0].split(' ');
  const seedsRange = seedArr.flatMap((seed, i) => {
    if (i % 2 === 0) {
      const start = Number(seed);
      const length = Number(seedArr[i + 1]);
      return Array.from({ length }, (_, i) => start + i);
    }
    return [];
  });

  const locations = getLocations(seedsRange, categories);

  return Math.min(...locations);
}

const lowestLocation = getLowestLocation(inputStr);
const lowestLocationFromRanges = getLowestLocationForRanges(inputStr);

console.log({ lowestLocation, lowestLocationFromRanges });
