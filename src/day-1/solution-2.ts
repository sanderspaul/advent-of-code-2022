import { readCalorieTalliesFromFile } from './utils';

export async function getTopThreeValues(
  arr: number[]
): Promise<[number, number, number]> {
  const [one, two, three] = arr.sort((a, b) => b - a);
  return [one, two, three];
}

export function sumIntegerArray(arr: number[]): number {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

export async function logSolution2() {
  const tallies = await readCalorieTalliesFromFile();
  const sum = sumIntegerArray(await getTopThreeValues(tallies));
  console.log(`The top three elves are carrying ${sum} calories in total.`);
}
