import { getInput } from '../utils';

const input = await getInput('08/input.txt');

function parseInput(input: string[]) {
  const sequence = input[0];
  const elements = input.slice(2);

  return { sequence, elements };
}

function createElementsObject(elements: string[]) {
  const elementsObject: Record<string, Array<string>> = {};
  elements.forEach((element) => {
    const [el, L, R] = element
      .replace(/[=() ,]+/g, ' ')
      .trim()
      .split(' ');

    elementsObject[el] = [L, R];
  });

  return elementsObject;
}

function getStepsToZZZ(input: string[]): number {
  const { sequence, elements } = parseInput(input);
  const elementsObject = createElementsObject(elements);
  let currentElement = 'AAA';
  let steps = 0;

  while (currentElement !== 'ZZZ') {
    for (let i = 0; i < sequence.length; i++) {
      const direction = sequence[i] === 'L' ? 0 : 1;
      currentElement = direction ? elementsObject[currentElement][1] : elementsObject[currentElement][0];
      steps++;
      if (currentElement === 'ZZZ') break;
    }
  }

  return steps;
}

const stepsToZZZ = getStepsToZZZ(input);

console.log({ stepsToZZZ });
