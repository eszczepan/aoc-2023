const path = './02/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');
const bag: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function getGamesIdSum(): number {
  const result = puzzleArray.reduce((acc, curr, index) => {
    let isValidGame = true;
    const gameIndex = index + 1;
    const turns = curr.split(': ').slice(1, curr.length)[0].split(';');

    turns.forEach((turn) => {
      turn.split(',').forEach((cube) => {
        const cubeArray = cube.trim().split(' ');
        const color = cubeArray[1];
        const number = Number(cubeArray[0]);

        if (bag[color] < number) {
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

const gamesIdSum = getGamesIdSum();

console.log({ gamesIdSum });
