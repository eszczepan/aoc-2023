import { getInput } from '../utils';

const input = await getInput('08/input.txt');

function parseInput(input: string[]) {
  const sequence = input[0];
  const nodes = input.slice(2);

  return { sequence, nodes };
}

function createnodesObject(nodes: string[]) {
  const nodesObject: Record<string, Array<string>> = {};
  nodes.forEach((node) => {
    const [el, L, R] = node
      .replace(/[=() ,]+/g, ' ')
      .trim()
      .split(' ');

    nodesObject[el] = [L, R];
  });

  return nodesObject;
}

function getStepsToZZZ(input: string[]): number {
  const { sequence, nodes } = parseInput(input);
  const nodesObject = createnodesObject(nodes);
  let currentNode = 'AAA';
  let steps = 0;

  while (currentNode !== 'ZZZ') {
    for (let i = 0; i < sequence.length; i++) {
      const direction = sequence[i] === 'L' ? 0 : 1;
      currentNode = direction ? nodesObject[currentNode][1] : nodesObject[currentNode][0];
      steps++;
      if (currentNode === 'ZZZ') break;
    }
  }

  return steps;
}

const stepsToZZZ = getStepsToZZZ(input);

console.log({ stepsToZZZ });
