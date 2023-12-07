import { getInput } from '../utils';

const input = await getInput('07/input.txt');
const cardsStrength = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', , 'J', 'Q', 'K', 'A'];
type HandsRank = Array<[string, string, number]>;

function calculateTotalWinnings(handsRank: HandsRank): number {
  return handsRank.reduce((acc, [, bid], index) => {
    acc += Number(bid) * (index + 1);
    return acc;
  }, 0);
}

function sortRank(handsRank: HandsRank): HandsRank {
  return handsRank.sort((a, b) => {
    if (a[2] !== b[2]) {
      return a[2] - b[2];
    } else {
      let strA = a[0];
      let strB = b[0];
      for (let i = 0; i < Math.min(strA.length, strB.length); i++) {
        if (strA[i] !== strB[i]) {
          return cardsStrength.indexOf(strA[i]) - cardsStrength.indexOf(strB[i]);
        }
      }

      return strA.length - strB.length;
    }
  });
}

function getTotalWinnings(input: string[]): number {
  const hands = input.map((pair) => pair.split(' '));
  const handsRank: HandsRank = [];

  hands.forEach(([cards, bid]) => {
    const combinations: Record<string, number> = {};
    let handStrength = 0;

    for (let card of cards) {
      combinations[card] = combinations[card] + 1 || 1;
    }

    const counts = Object.values(combinations);
    if (counts.includes(5)) {
      handStrength = 6;
    } else if (counts.includes(4)) {
      handStrength = 5;
    } else if (counts.includes(3) && counts.includes(2)) {
      handStrength = 4;
    } else if (counts.includes(3) && counts.length === 3) {
      handStrength = 3;
    } else if (counts.includes(2) && counts.length === 3) {
      handStrength = 2;
    } else if (counts.includes(2) && counts.length === 4) {
      handStrength = 1;
    }

    handsRank.push([cards, bid, handStrength]);
  });

  const totalWinnings = calculateTotalWinnings(sortRank(handsRank));

  return totalWinnings;
}

const totalWinnings = getTotalWinnings(input);

console.log({ totalWinnings });
