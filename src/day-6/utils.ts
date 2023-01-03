export function containsDuplicateChars(input: string): boolean {
  return input.split('').findIndex((v, i, arr) => arr.indexOf(v) !== i) > 0;
}
export function findDistinctCharSequenceIndex(
  input: string,
  length: number
): number {
  for (let index = 0; index < input.length; index++) {
    const slice = input.slice(index, index + length);
    if (!containsDuplicateChars(slice)) {
      return index;
    }
  }
  return -1;
}
