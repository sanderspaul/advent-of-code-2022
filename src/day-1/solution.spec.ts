import { getElfWithMostCalories } from './solution-1';
import { getTopThreeValues } from './solution-2';
import { sumIntegerArray } from './solution-2';

const caloriesByElfMock = [1000, 2000, 3000];

describe('Day 1', () => {
  describe('Solution 1', () => {
    it('getElfWithMostCalories', async () => {
      const elf = await getElfWithMostCalories(caloriesByElfMock);
      expect(elf).toEqual({
        index: 2,
        calories: 3000
      });
    });
  });

  describe('Solution 2', () => {
    describe('sumIntegerArray', () => {
      it('should return a sum of 18 for array [6, 6, 6]', () => {
        const arr = [6, 6, 6];
        expect(sumIntegerArray(arr)).toEqual(18);
      });
    });

    describe('getTopThreeElvesCalories', () => {
      it('should return ', async () => {
        const top3 = [8, 9, 10];
        const arr = [1, 2, 3, 4, 5, 6, 7, ...top3];
        expect((await getTopThreeValues(arr)).sort()).toEqual(top3.sort());
      });
    });
  });
});
