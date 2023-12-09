import { getInput } from '../utils';

const input = await getInput('07/input.txt');

type HandsRank = Array<[string, string, number]>;

function parseInput(input: string[]) {
  return input.map((pair) => pair.split(' '));
}

function calculateTotalWinnings(handsRank: HandsRank): number {
  return handsRank.reduce((acc, [, bid], index) => {
    acc += Number(bid) * (index + 1);
    return acc;
  }, 0);
}

function sortRank(handsRank: HandsRank, cards: string[]): HandsRank {
  return handsRank.sort((a, b) => {
    if (a[2] !== b[2]) {
      return a[2] - b[2];
    } else {
      let strA = a[0];
      let strB = b[0];
      for (let i = 0; i < Math.min(strA.length, strB.length); i++) {
        if (strA[i] !== strB[i]) {
          return cards.indexOf(strA[i]) - cards.indexOf(strB[i]);
        }
      }

      return strA.length - strB.length;
    }
  });
}

function calculateHandStrength(combination: Record<string, number>): number {
  const counts = Object.values(combination);
  const fiveOfAKind = counts.includes(5);
  const fourOfAKind = counts.includes(4);
  const fullHouse = counts.includes(3) && counts.includes(2);
  const threeOfAKind = counts.includes(3) && counts.length === 3;
  const twoPairs = counts.includes(2) && counts.length === 3;
  const onePair = counts.includes(2) && counts.length === 4;

  return fiveOfAKind ? 6 : fourOfAKind ? 5 : fullHouse ? 4 : threeOfAKind ? 3 : twoPairs ? 2 : onePair ? 1 : 0;
}

function calculateHandStrengthWithJokers(combination: Record<string, number>): number {
  const jokers = combination['J'];
  combination['J'] = 0;
  let counts = Object.values(combination);
  const fourOfAKind = counts.includes(4);
  const threeOfAKind = counts.includes(3);
  const twoPairs = counts.includes(2) && !counts.includes(1);
  const onePair = counts.includes(2);

  switch (jokers) {
    case 5:
    case 4:
      return 6;
    case 3:
      return onePair ? 6 : 5;
    case 2:
      return threeOfAKind ? 6 : onePair ? 5 : 3;
    case 1:
      if (fourOfAKind) {
        return 6;
      } else if (threeOfAKind) {
        return 5;
      } else if (twoPairs) {
        return 4;
      } else if (onePair) {
        return 3;
      } else {
        return 1;
      }
    default:
      return 0;
  }
}

function getTotalWinnings(input: string[]): number {
  const cardsStrength = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const hands = parseInput(input);
  const handsRank: HandsRank = [];

  hands.forEach(([cards, bid]) => {
    const combination: Record<string, number> = {};
    let handStrength = 0;

    for (let card of cards) {
      combination[card] = combination[card] + 1 || 1;
    }

    handStrength = calculateHandStrength(combination);
    handsRank.push([cards, bid, handStrength]);
  });

  return calculateTotalWinnings(sortRank(handsRank, cardsStrength));
}

function getTotalWinningsWithJokers(input: string[]): number {
  const cardsStrength = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  const hands = parseInput(input);
  const handsRank: HandsRank = [];

  hands.forEach(([cards, bid]) => {
    const combination: Record<string, number> = {};
    let handStrength = 0;

    for (let card of cards) {
      combination[card] = combination[card] + 1 || 1;
    }

    const isJokerInCombination = combination['J'] || 0;
    handStrength = isJokerInCombination
      ? calculateHandStrengthWithJokers(combination)
      : calculateHandStrength(combination);

    handsRank.push([cards, bid, handStrength]);
  });

  const onlyJ = handsRank.filter((rank) => rank[0].includes('J'));
  console.log(sortRank(onlyJ, cardsStrength));
  return calculateTotalWinnings(sortRank(handsRank, cardsStrength));
}
const totalWinnings = getTotalWinnings(input);
const totalWinningsWithJokers = getTotalWinningsWithJokers(input);

console.log({ totalWinnings, totalWinningsWithJokers });
