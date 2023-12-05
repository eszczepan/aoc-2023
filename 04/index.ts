import { getInput } from '../utils';

const input = await getInput('03/input.txt');

function getScratchcardsTable(input: string[]): Array<Array<string>> {
  return input.map((line) => {
    const indexOfColon = line.indexOf(':');
    const convertedScratchcards = line.slice(indexOfColon + 2, line.length).split(' | ');

    return convertedScratchcards;
  });
}

function getCards(scratchcards: string[]) {
  const winningCard = scratchcards[0].split(' ');
  const scratchCard = scratchcards[1].split(' ');

  return { winningCard, scratchCard };
}

function sumObjectValues(obj: Record<string, number>): number {
  return Object.values(obj).reduce((acc, value) => acc + value, 0);
}

function getScratchcardsPoints(input: string[]): number {
  const scratchcardsTable = getScratchcardsTable(input);

  const score = scratchcardsTable.reduce((acc, scratchcards) => {
    const { winningCard, scratchCard } = getCards(scratchcards);
    let scoreCard = 0;

    winningCard.forEach((card) => {
      if (card && scratchCard.includes(card)) {
        scoreCard === 0 ? (scoreCard += 1) : (scoreCard *= 2);
      }
    });

    return acc + scoreCard;
  }, 0);

  return score;
}

function getScratchcardsNumber(input: string[]): number {
  const scratchcardsTable = getScratchcardsTable(input);
  const scratchCardsCopies = scratchcardsTable.reduce(
    (cards: Record<string, number>, scratchcards: string[], index: number) => {
      const { winningCard, scratchCard } = getCards(scratchcards);
      const cardIndex = index + 1;
      let winningCardCount = 1;
      cards[cardIndex] = cards[cardIndex] + 1 || 1;

      winningCard.forEach((card) => {
        if (card && scratchCard.includes(card)) {
          const cardToIncrement = cardIndex + winningCardCount;
          for (let i = 0; i < cards[cardIndex]; i++) {
            cards[cardToIncrement] = cards[cardToIncrement] + 1 || 1;
          }
          winningCardCount += 1;
        }
      });

      return cards;
    },
    {}
  );

  const scratchcardsNumber = sumObjectValues(scratchCardsCopies);

  return scratchcardsNumber;
}

const scratchcardsPoints = getScratchcardsPoints(input);
const scratchcardsNumber = getScratchcardsNumber(input);
console.log({ scratchcardsPoints, scratchcardsNumber });
