export async function getInput(path: string): Promise<string[]> {
  try {
    const file = Bun.file(path);
    const input = await file.text();
    const inputArray = input.split('\n');

    return inputArray;
  } catch (error) {
    throw Error('Wrong file path passed to the getInput function.');
  }
}
