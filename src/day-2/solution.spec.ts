import { calcMatchScore } from './match-utils';
import {
  calcMatchResult,
  scoreStrategy as scoreStrategyByPlays
} from './solution-1';
import {
  convertCodeToPlayResultPair,
  scoreStrategyByPlayResult
} from './solution-2';

describe('Determining wins, losses and draws', () => {
  describe('when player picks ROCK', () => {
    it('should result in a draw when opponent picks ROCK', () => {
      expect(calcMatchResult('rock', 'rock')).toBe('draw');
    });
    it('should result in a loss when opponent picks PAPER', () => {
      expect(calcMatchResult('rock', 'paper')).toBe('loss');
    });
    it('should result in a win when opponent picks SCISSORS', () => {
      expect(calcMatchResult('rock', 'scissors')).toBe('win');
    });
  });
  describe('when player picks PAPER', () => {
    it('should result in a win when opponent picks ROCK', () => {
      expect(calcMatchResult('paper', 'rock')).toBe('win');
    });
    it('should result in a draw when opponent picks PAPER', () => {
      expect(calcMatchResult('paper', 'paper')).toBe('draw');
    });
    it('should result in a loss when opponent picks SCISSORS', () => {
      expect(calcMatchResult('paper', 'scissors')).toBe('loss');
    });
  });
  describe('when player picks SCISSORS', () => {
    it('should result in a loss when opponent picks ROCK', () => {
      expect(calcMatchResult('scissors', 'rock')).toBe('loss');
    });
    it('should result in a win when opponent picks PAPER', () => {
      expect(calcMatchResult('scissors', 'paper')).toBe('win');
    });
    it('should result in a draw when opponent picks SCISSORS', () => {
      expect(calcMatchResult('scissors', 'scissors')).toBe('draw');
    });
  });
});
describe('Scoring matches', () => {
  describe('A win (6pt)', () => {
    describe('with ROCK (1pt)', () => {
      it('the score should equal 7 points', () => {
        expect(calcMatchScore('win', 'rock')).toBe(7);
      });
    });
    describe('with PAPER (2pt)', () => {
      it('the score should equal 8 points', () => {
        expect(calcMatchScore('win', 'paper')).toBe(8);
      });
    });
    describe('with SCISSORS (3pt)', () => {
      it('the score should equal 9 points', () => {
        expect(calcMatchScore('win', 'scissors')).toBe(9);
      });
    });
  });
  describe('A draw (3pt)', () => {
    describe('with ROCK (1pt)', () => {
      it('the score should equal 4 points', () => {
        expect(calcMatchScore('draw', 'rock')).toBe(4);
      });
    });
    describe('with PAPER (2pt)', () => {
      it('the score should equal 5 points', () => {
        expect(calcMatchScore('draw', 'paper')).toBe(5);
      });
    });
    describe('with SCISSORS (3pt)', () => {
      it('the score should equal 6 points', () => {
        expect(calcMatchScore('draw', 'scissors')).toBe(6);
      });
    });
  });
  describe('A loss (0pt)', () => {
    describe('with ROCK (1pt)', () => {
      it('the score should equal 1 point', () => {
        expect(calcMatchScore('loss', 'rock')).toBe(1);
      });
    });
    describe('with PAPER (2pt)', () => {
      it('the score should equal 2 points', () => {
        expect(calcMatchScore('loss', 'paper')).toBe(2);
      });
    });
    describe('with SCISSORS (3pt)', () => {
      it('the score should equal 3 points', () => {
        expect(calcMatchScore('loss', 'scissors')).toBe(3);
      });
    });
  });
});
describe('Scoring a play strategy', () => {
  describe('with the [opponentPlay, playerPlay] method', () => {
    it('should score 15pt for the strategy: [rock, paper], [paper, rock], [scissors, scissors]', () => {
      expect(
        scoreStrategyByPlays([
          ['rock', 'paper'],
          ['paper', 'rock'],
          ['scissors', 'scissors']
        ])
      ).toEqual(15);
    });
  });

  describe('with the [opponentPlay, matchResult] method', () => {
    it('should score 12pt for the strategy: [rock, draw] [paper, loss] [scissors, win]', () => {
      expect(
        scoreStrategyByPlayResult([
          ['rock', 'draw'],
          ['paper', 'loss'],
          ['scissors', 'win']
        ])
      ).toEqual(12);
    });
  });
});

describe('Interpreting strategy codes as [opponentPlay, result]', () => {
  it('should interpret [A, Y] as [rock, draw]', () => {
    expect(convertCodeToPlayResultPair('A Y')).toEqual(['rock', 'draw']);
  });
  it('should interpret [B, X] as [paper, loss]', () => {
    expect(convertCodeToPlayResultPair('B X')).toEqual(['paper', 'loss']);
  });
  it('should interpret [C, Z] as [scissors, win]', () => {
    expect(convertCodeToPlayResultPair('C Z')).toEqual(['scissors', 'win']);
  });
});
