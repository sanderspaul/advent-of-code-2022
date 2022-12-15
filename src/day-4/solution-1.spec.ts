import {
  rangeFullyContains,
  sumFullyOverlappedSectionAssignments,
  sumRangeOverlaps
} from './solution-1';
import {
  rangePartiallyContains,
  sumPartiallyOverlappedSectionAssignments,
  sumRangePartialOverlaps
} from './solution-2';
import {
  createAssignmentPairFromString,
  createTupleFromRangeString,
  Tuple
} from './utils';

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

  it('should return false when the first range DOES NOT partially contain the other', () => {
    const r1 = [5, 8] as Tuple;
    const r2 = [7, 9] as Tuple;
    expect(rangePartiallyContains(r1, r2)).toEqual(true);
  });

  it('should return true when the first range partially contain the other', () => {
    const r1 = [4, 6] as Tuple;
    const r2 = [7, 9] as Tuple;
    expect(rangePartiallyContains(r1, r2)).toEqual(false);
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

describe('Summing the number of partially overlapped ranges', () => {
  it('should sum 1 when one partially overlapped tuple is present in a collection', () => {
    const overlapping = [[[4, 90] as Tuple, [5, 99] as Tuple]];
    const notOverlapping = [[[52, 52] as Tuple, [3, 51] as Tuple]];
    expect(sumRangePartialOverlaps([...overlapping, ...notOverlapping])).toBe(
      1
    );
  });

  it('should sum "2" partially overlapped assignment when two have full or partial overlap', () => {
    const sum = sumPartiallyOverlappedSectionAssignments([
      '5-90,4-99', // full overlap
      '52-52,3-51', // no overlap
      '46-81,45-80' // partial overlap
    ]);
    expect(sum).toBe(2);
  });
});
