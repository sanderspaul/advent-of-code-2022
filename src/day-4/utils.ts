export type Tuple = [number, number];

export function createAssignmentPairFromString(str: string): string[] {
  return str.split(',');
}

export function createTupleFromRangeString(str: string): Tuple {
  const [start, end] = str.split('-').map((n) => parseInt(n, 10));
  return [start, end];
}
