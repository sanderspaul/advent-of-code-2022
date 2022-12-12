import {
  createAssignmentPairFromString,
  createTupleFromRangeString,
  rangeFullyContains,
  sumFullyOverlappedSectionAssignments,
  sumRangeOverlaps,
  Tuple
} from './solution-1';

describe('Creating ranges', () => {
  it('should create an assignment pair from an entry string', () => {
    expect(createAssignmentPairFromString('5-90,4-90')).toStrictEqual([
      '5-90',
      '4-90'
    ]);
  });

  it('should return a tuple of [1, 4] for a string of "1-4"', () => {
    expect(createTupleFromRangeString('1-4')).toEqual([1, 4]);
  });
});

describe('Detecting assignment overlaps', () => {
  it('should return false when the first range DOES NOT fully contain the other', () => {
    const r1 = [5, 7] as Tuple;
    const r2 = [7, 9] as Tuple;
    expect(rangeFullyContains(r1, r2)).toEqual(false);
  });

  it('should return true when the first range fully contains the other', () => {
    const r1 = [5, 9] as Tuple;
    const r2 = [7, 9] as Tuple;
    expect(rangeFullyContains(r1, r2)).toEqual(true);
  });
});

describe('Summing the number of fully overlapped ranges', () => {
  it('should sum 1 overlap when one overlapped tuple is present in a collection', () => {
    const overlapping = [[[4, 90] as Tuple, [5, 90] as Tuple]];
    const notOverlapping = [[[52, 52] as Tuple, [3, 51] as Tuple]];
    expect(sumRangeOverlaps([...overlapping, ...notOverlapping])).toBe(1);
  });

  it('should sum "1" overlapped assignment when one pair is "5-90,4-90"', () => {
    const sum = sumFullyOverlappedSectionAssignments([
      '5-90,4-90', // full overlap
      '52-52,3-51', // no overlap
      '46-81,45-80' // partial overlap
    ]);
    expect(sum).toBe(1);
  });
});
