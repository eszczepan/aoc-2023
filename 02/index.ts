const path = './02/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');
const bag: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function getTurns(str: string): string[] {
  return str.split(': ').slice(1, str.length)[0].split(';');
}

function extractCube(cube: string) {
  const cubeArray = cube.trim().split(' ');
  const cubeColor = cubeArray[1];
  const cubeNumber = Number(cubeArray[0]);

  return { cubeColor, cubeNumber };
}

function multiplyValuesInObject(obj: Record<string, number>): number {
  return Object.values(obj).reduce((acc, value) => acc * value, 1);
}

function getGamesIdSum(): number {
  const result = puzzleArray.reduce((acc, curr, index) => {
    let isValidGame = true;
    const gameIndex = index + 1;
    const turns = getTurns(curr);

    turns.forEach((turn) => {
      turn.split(',').forEach((cube) => {
        const { cubeColor, cubeNumber } = extractCube(cube);

        if (bag[cubeColor] < cubeNumber) {
          return (isValidGame = false);
        }
      });
    });

    if (isValidGame) {
      return acc + gameIndex;
    }

    return acc;
  }, 0);

  return result;
}

function getPowerOfCubes() {
  const result = puzzleArray.reduce((acc, curr) => {
    const minimalBag: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const turns = getTurns(curr);

    turns.forEach((turn) => {
      turn.split(',').forEach((cube) => {
        const { cubeColor, cubeNumber } = extractCube(cube);

        if (minimalBag[cubeColor] < cubeNumber) {
          minimalBag[cubeColor] = cubeNumber;
        }
      });
    });

    return acc + multiplyValuesInObject(minimalBag);
  }, 0);

  return result;
}

const gamesIdSum = getGamesIdSum();
const gamesPowerSum = getPowerOfCubes();

console.log({ gamesIdSum, gamesPowerSum });
