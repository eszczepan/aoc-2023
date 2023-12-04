const path = "./03/puzzle.txt";
const file = Bun.file(path);
const text = await file.text();
const puzzleArray = text.split("\n");
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
    if (element && !isDigit(element) && element !== ".") {
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
  const previousRow = puzzleArray[rowIndex - 1] || "";
  const nextRow = puzzleArray[rowIndex + 1] || "";

  const previousElement = currentRow[elementIndex - 1] || "";
  const nextElement = currentRow[elementIndex + 1] || "";
  const topLeftElement = previousRow[elementIndex - 1] || "";
  const topElement = previousRow[elementIndex] || "";
  const topRightElement = previousRow[elementIndex + 1] || "";
  const bottomLeftElement = nextRow[elementIndex - 1] || "";
  const bottomElement = nextRow[elementIndex] || "";
  const bottomRightElement = nextRow[elementIndex + 1] || "";
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
  let currentNumber = "";
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
        currentNumber = "";
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
        currentNumber = "";
      }
    }
  }

  return result;
}

/// PART 2
interface GearElements {
  previousElement: string;
  topElements: string[];
  bottomElements: string[];
  nextElement: string;
}

function isStarSign(element: string): boolean {
  return element === "*";
}

function getGearElements(
  elementIndex: number,
  rowIndex: number,
  currentRow: string
): GearElements {
  const previousRow = puzzleArray[rowIndex - 1] || "";
  const nextRow = puzzleArray[rowIndex + 1] || "";

  const previousElement = currentRow[elementIndex - 1] || "";
  const nextElement = currentRow[elementIndex + 1] || "";
  const topLeftElement = previousRow[elementIndex - 1] || "";
  const topElement = previousRow[elementIndex] || "";
  const topRightElement = previousRow[elementIndex + 1] || "";
  const bottomLeftElement = nextRow[elementIndex - 1] || "";
  const bottomElement = nextRow[elementIndex] || "";
  const bottomRightElement = nextRow[elementIndex + 1] || "";
  const topElements = [topLeftElement, topElement, topRightElement];
  const bottomElements = [bottomLeftElement, bottomElement, bottomRightElement];

  return {
    previousElement,
    topElements,
    bottomElements,
    nextElement,
  };
}

function getNumberForVertical(
  element: string,
  elementIndex: number,
  row: string
) {
  let number = element;
  const secondPreviousElement = row[elementIndex - 2] || "";
  const previousElement = row[elementIndex - 1] || "";
  const nextElement = row[elementIndex + 1] || "";
  const secondNextElement = row[elementIndex + 2] || "";

  if (isDigit(previousElement)) {
    number = previousElement + number;
  }
  if (isDigit(secondPreviousElement) && isDigit(previousElement)) {
    number = secondPreviousElement + number;
  }
  if (isDigit(nextElement)) {
    number = number + nextElement;
  }
  if (isDigit(secondNextElement) && isDigit(nextElement)) {
    number = number + secondNextElement;
  }

  return number;
}

function getDigitsFromElements(elements: string[]) {
  const digits = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const previousElement = elements[i - 1] || "";
    const nextElement = elements[i + 1] || "";
    if (
      isDigit(element) &&
      (previousElement === "." || nextElement === "." || i - 1 === 0)
    ) {
      digits.push({ element, position: i - 1 });
    }
  }

  return digits;
}

function getGearRatioSum() {
  let result = 0;

  for (let i = 0; i < puzzleArray.length; i++) {
    const currentRow = puzzleArray[i];

    for (let j = 0; j < currentRow.length; j++) {
      const currentElement = currentRow[j];
      let partNumbers: string[] = [];

      if (!isStarSign(currentElement)) {
        continue;
      }

      const { previousElement, topElements, bottomElements, nextElement } =
        getGearElements(j, i, currentRow);

      const topDigits = getDigitsFromElements(topElements);

      const bottomDigits = getDigitsFromElements(bottomElements);

      // CHECK TOP ELEMENTS
      if (topDigits.length > 0) {
        topDigits.forEach((digit) => {
          const topDigitIndex = digit.position + j;
          const previousRow = puzzleArray[i - 1] || "";

          const topNumber = getNumberForVertical(
            digit.element,
            topDigitIndex,
            previousRow
          );

          partNumbers.push(topNumber);
        });
      }

      // CHECK NEXT ELEMENT
      if (isDigit(nextElement)) {
        let nextNumber = nextElement;
        const secondNextElement = currentRow[j + 2] || "";
        const thirdNextElement = currentRow[j + 3] || "";

        if (isDigit(secondNextElement)) {
          nextNumber = nextNumber + secondNextElement;
        }

        if (isDigit(thirdNextElement) && isDigit(secondNextElement)) {
          nextNumber = nextNumber + thirdNextElement;
        }

        partNumbers.push(nextNumber);
      }

      // CHECK BOTTOM ELEMENTS
      if (bottomDigits.length > 0) {
        bottomDigits.forEach((digit) => {
          const bottomDigitIndex = digit.position + j;
          const nextRow = puzzleArray[i + 1] || "";
          const topNumber = getNumberForVertical(
            digit.element,
            bottomDigitIndex,
            nextRow
          );

          partNumbers.push(topNumber);
        });
      }

      // CHECK PREVIOUS ELEMENTS
      if (isDigit(previousElement)) {
        let previousNumber = previousElement;
        const secondPreviousElement = currentRow[j - 2] || "";
        const thirdPreviousElement = currentRow[j - 3] || "";

        if (isDigit(secondPreviousElement)) {
          previousNumber = secondPreviousElement + previousNumber;
        }

        if (isDigit(thirdPreviousElement) && isDigit(secondPreviousElement)) {
          previousNumber = thirdPreviousElement + previousNumber;
        }

        partNumbers.push(previousNumber);
      }

      if (partNumbers.length === 2) {
        result += Number(partNumbers[0]) * Number(partNumbers[1]);
      }
    }
  }
  return result;
}

const enginePartsSum = getEnginePartsSum();
const gearRatioSum = getGearRatioSum();

console.log({ enginePartsSum, gearRatioSum });
