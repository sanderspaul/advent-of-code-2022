/**
 * --- Part Two ---
 * It seems like there is still quite a bit of duplicate work planned. Instead, the Elves would like to know the number of pairs that overlap at all.
 *
 * In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap, while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:
 *
 * 5-7,7-9 overlaps in a single section, 7.
 * 2-8,3-7 overlaps all of the sections 3 through 7.
 * 6-6,4-6 overlaps in a single section, 6.
 * 2-6,4-8 overlaps in sections 4, 5, and 6.
 * So, in this example, the number of overlapping assignment pairs is 4.
 *
 * In how many assignment pairs do the ranges overlap?
 */

import path from 'path';
import { readInputFileToStringArray } from '../../src/lib/utils';
import {
  createAssignmentPairFromString,
  createTupleFromRangeString,
  Tuple
} from './utils';

export function rangePartiallyContains(
  [start1, end1]: Tuple,
  [start2, end2]: Tuple
): boolean {
  // overlaps if
  // start1 >= start2 && start1 <= end2 || end1 >= start2 && end1 <= end2 ||
  // start2 >= start1 && start2 <= end1 || end2 >= start1 && end2 <= end1
  return (
    (start1 >= start2 && start1 <= end2) ||
    (end1 >= start2 && end1 <= end2) ||
    (start2 >= start1 && start2 <= end1) ||
    (end2 >= start1 && end2 <= end1)
  );
}

export function sumRangePartialOverlaps(tuplePairs: Tuple[][]): number {
  if (tuplePairs.length) {
    const booleans = tuplePairs.map(([range1, range2]) =>
      rangePartiallyContains(range1, range2)
    );

    const sum = booleans.filter((isOverlap) => isOverlap).length;
    return sum;
  }
  return 0;
}

export function sumPartiallyOverlappedSectionAssignments(
  assignments: string[]
): number {
  // split assignment string into pairs [[string, string]]
  const assignmentPairs = assignments.map((assn) =>
    createAssignmentPairFromString(assn)
  );

  // convert pairs to tuples of range start/end numbers [[[number, number],[number, number]]]
  const tuplePairs = assignmentPairs.map((containerRangeString) =>
    containerRangeString.map((a) => createTupleFromRangeString(a))
  );

  // sum the number of full overlaps that occur
  return sumRangePartialOverlaps(tuplePairs);
}

export function run() {
  readInputFileToStringArray(
    path.resolve(__dirname, './input.txt'),
    (err, data) => {
      if (!err) {
        console.log(
          `The sum of partially overlapped assignment pairs: ${sumPartiallyOverlappedSectionAssignments(
            data
          )}`
        );
      } else {
        console.error(err);
      }
    }
  );
}
