const path = './03/puzzle.txt';
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split('\n');
const isDigitRegex = /^\d+$/;

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

function getEnginePartsSum(): number {
  let result = 0;
  let currentNumber = '';
  let isEnginePart = false;

  for (let i = 0; i < puzzleArray.length; i++) {
    const previousRow = puzzleArray[i - 1] || '';
    const currentRow = puzzleArray[i];
    const nextRow = puzzleArray[i + 1] || '';

    for (let j = 0; j < currentRow.length; j++) {
      const currentElement = currentRow[j];

      if (!isDigit(currentElement)) {
        continue;
      }

      const previousElement = currentRow[j - 1] || '';
      const nextElement = currentRow[j + 1] || '';
      const topLeftElement = previousRow[j - 1] || '';
      const topElement = previousRow[j] || '';
      const topRightElement = previousRow[j + 1] || '';
      const bottomLeftElement = nextRow[j - 1] || '';
      const bottomElement = nextRow[j] || '';
      const bottomRightElement = nextRow[j + 1] || '';
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
