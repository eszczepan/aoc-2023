const path = './04/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');

function getScratchcardsPoints(): number {
  const scratchcardsTable = puzzleArray.map((line) => {
    const indexOfColon = line.indexOf(':');
    const convertedScratchcards = line.slice(indexOfColon + 2, line.length).split(' | ');

    return convertedScratchcards;
  });

  const score = scratchcardsTable.reduce((acc, scratchcards) => {
    let scoreCard = 0;
    const winningCard = scratchcards[0].split(' ');
    const scratchCard = scratchcards[1].split(' ');

    winningCard.forEach((card) => {
      if (card && scratchCard.includes(card)) {
        scoreCard === 0 ? (scoreCard += 1) : (scoreCard *= 2);
      }
    });

    return acc + scoreCard;
  }, 0);

  return score;
}

const scratchcardsPoints = getScratchcardsPoints();

console.log({ scratchcardsPoints });
