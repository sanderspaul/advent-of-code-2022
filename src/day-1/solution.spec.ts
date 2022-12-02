import { logElfWithMostCalories } from './solution-1';

const caloriesByElfMock = [1000, 2000, 3000];

describe('Day 1', () => {
  describe('Solution 1', () => {
    describe('logElfWithMostCalories', () => {
      expect(logElfWithMostCalories(caloriesByElfMock)).toBe({
        index: 3,
        calories: 3000
      });
    });
  });
});
