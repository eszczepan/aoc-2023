const path = './03/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');
const isDigitRegex = /^\d+$/;

interface Elements {
  previousElement: string;
  elementsToCheck: string[];
  nextElement: string;
}

function isDigit(str: string): boolean {
  return isDigitRegex.test(str);
}

function checkIsEnginePart(elementsToCheck: string[]): boolean {
  let isEnginePart = false;
  elementsToCheck.forEach((element) => {
    if (element && !isDigit(element) && element !== '.') {
      isEnginePart = true;
    }
  });

  return isEnginePart;
}

function getElements(
  elementIndex: number,
  rowIndex: number,
  currentRow: string
): Elements {
  const previousRow = puzzleArray[rowIndex - 1] || '';
  const nextRow = puzzleArray[rowIndex + 1] || '';

  const previousElement = currentRow[elementIndex - 1] || '';
  const nextElement = currentRow[elementIndex + 1] || '';
  const topLeftElement = previousRow[elementIndex - 1] || '';
  const topElement = previousRow[elementIndex] || '';
  const topRightElement = previousRow[elementIndex + 1] || '';
  const bottomLeftElement = nextRow[elementIndex - 1] || '';
  const bottomElement = nextRow[elementIndex] || '';
  const bottomRightElement = nextRow[elementIndex + 1] || '';
  const elementsToCheck = [
    previousElement,
    nextElement,
    topLeftElement,
    topElement,
    topRightElement,
    bottomLeftElement,
    bottomElement,
    bottomRightElement,
  ];

  return {
    previousElement,
    elementsToCheck,
    nextElement,
  };
}

function getEnginePartsSum(): number {
  let result = 0;
  let currentNumber = '';
  let isEnginePart = false;

  for (let i = 0; i < puzzleArray.length; i++) {
    const currentRow = puzzleArray[i];

    for (let j = 0; j < currentRow.length; j++) {
      const currentElement = currentRow[j];

      if (!isDigit(currentElement)) {
        continue;
      }

      const elements = getElements(j, i, currentRow);
      const { previousElement, elementsToCheck, nextElement } = elements;

      // FIRST ELEMENT OF ROW - clear state
      if (previousElement === undefined) {
        isEnginePart = false;
        currentNumber = '';
      }

      // SET CURRENT NUMBER
      currentNumber += currentElement;

      // CHECK IF ENGINE PART
      if (checkIsEnginePart(elementsToCheck)) {
        isEnginePart = true;
      }

      // LAST ELEMENT OF NUMBER - add to result + clear state
      if (!isDigit(nextElement)) {
        if (isEnginePart) {
          result += Number(currentNumber);
        }

        isEnginePart = false;
        currentNumber = '';
      }
    }
  }

  return result;
}

const enginePartsSum = getEnginePartsSum();

console.log({ enginePartsSum });
