import { getInput } from '../utils';

const input = await getInput('07/input.txt');
const cardsStrength: Record<string, number> = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1,
};

function getTotalWinnings(input: string[]) {
  const hands = input.map((pair) => pair.split(' '));
  const handsRank: Array<[string, string, number]> = [];

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

  handsRank.sort((a, b) => {
    if (a[2] !== b[2]) {
      return a[2] - b[2];
    } else {
      let strA = a[0];
      let strB = b[0];
      for (let i = 0; i < Math.min(strA.length, strB.length); i++) {
        if (strA[i] !== strB[i]) {
          return cardsStrength[strA[i]] - cardsStrength[strB[i]];
        }
      }
      return strA.length - strB.length;
    }
  });

  const totalWinnings = handsRank.reduce((acc, [cards, bid, cardsStrength], index) => {
    acc += Number(bid) * (index + 1);
    return acc;
  }, 0);

  return totalWinnings;
}

const totalWinnings = getTotalWinnings(input);

console.log({ totalWinnings });
