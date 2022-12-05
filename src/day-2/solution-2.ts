import path from 'path';
import { readInputFileToStringArray } from '../../src/lib/utils';
import {
  Pair,
  MatchPlay,
  MatchResult,
  CODE_TO_MATCHPLAY_MAP,
  calcMatchScore,
  getMatchPlayByOpponentMove
} from './match-utils';

interface CodeMatchResultMap {
  X: 'loss';
  Y: 'draw';
  Z: 'win';
  [code: string]: MatchResult;
}

const CODE_TO_MATCHRESULTS: CodeMatchResultMap = {
  X: 'loss',
  Y: 'draw',
  Z: 'win'
};

export function convertCodeToPlayResultPair(
  code: string
): Pair<MatchPlay, MatchResult> {
  const [first, second] = code.split(' ');
  const play = CODE_TO_MATCHPLAY_MAP[first];
  const result = CODE_TO_MATCHRESULTS[second];
  return [play, result];
}

// Scores the strategy by interpreting code pairs as [opponentPlay, matchResult]
export function scoreStrategyByPlayResult(
  playResultPairs: Pair<MatchPlay, MatchResult>[]
): number {
  const score = playResultPairs.reduce(
    (current, [a, b]) =>
      current + calcMatchScore(b, getMatchPlayByOpponentMove(a, b)),
    0
  );
  return score;
}

export function run() {
  let matchCodes: string[];
  readInputFileToStringArray(
    path.resolve(__dirname, './input.txt'),
    (err, data) => {
      if (!err) {
        matchCodes = data;
        console.log(
          `If the opponent-result strategy plays out, my score will be: ${scoreStrategyByPlayResult(
            matchCodes.map((code) => convertCodeToPlayResultPair(code))
          )}`
        );
      } else {
        console.error(err);
      }
    }
  );
}
