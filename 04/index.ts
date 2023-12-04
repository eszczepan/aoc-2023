const path = './04/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');

function getScratchcardsPoints(): number {
  let score = 0;
  const scratchcardsTable = puzzleArray.map((line) => {
    const indexOfColon = line.indexOf(':');
    const convertedScratchcards = line.slice(indexOfColon + 2, line.length).split(' | ');

    return convertedScratchcards;
  });

  for (let i = 0; i < scratchcardsTable.length; i++) {
    let scoreCard = 0;
    const winningCard = scratchcardsTable[i][0].split(' ');
    const scratchCard = scratchcardsTable[i][1].split(' ');

    winningCard.forEach((card) => {
      if (card && scratchCard.includes(card)) {
        scoreCard === 0 ? (scoreCard += 1) : (scoreCard *= 2);
      }
    });

    score += scoreCard;
  }

  return score;
}

const scratchcardsPoints = getScratchcardsPoints();

console.log({ scratchcardsPoints });
