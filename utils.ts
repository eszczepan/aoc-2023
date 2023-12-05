export async function getInput(path: string): Promise<string[]> {
  const file = Bun.file(path);
  const input = await file.text();
  const inputArray = input.split('\n');

  return inputArray;
}
