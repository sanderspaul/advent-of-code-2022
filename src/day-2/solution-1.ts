import { readInputFileToStringArray } from '../lib/utils';
import path from 'path';
import {
  calcMatchScore,
  CODE_TO_MATCHPLAY_MAP,
  MatchPlay,
  MatchResult,
  Pair
} from './match-utils';

/**
 * The keys of the top-level record are player choices, while the keys of each
 * nested record are the opponent choices, with the value being the match result
 * for that scenario.
 * Ex: The match result of POSSIBLE_MATCH_RESULTS['rock']['rock'] == 'draw'
 */
const POSSIBLE_MATCH_RESULTS: Record<
  MatchPlay,
  Record<MatchPlay, MatchResult>
> = {
  rock: {
    rock: 'draw',
    paper: 'loss',
    scissors: 'win'
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'loss'
  },
  scissors: {
    rock: 'loss',
    paper: 'win',
    scissors: 'draw'
  }
};

export function calcMatchResult(
  playerChoice: MatchPlay,
  opponentChoice: MatchPlay
): MatchResult {
  return POSSIBLE_MATCH_RESULTS[playerChoice][opponentChoice];
}

function convertCodeToMatchPlayPair(code: string): Pair<MatchPlay, MatchPlay> {
  const [play1, play2] = code.split(' ').map((c) => CODE_TO_MATCHPLAY_MAP[c]);
  return [play1, play2];
}

function convertCodesToMatchPlays(
  codes: string[]
): Pair<MatchPlay, MatchPlay>[] {
  return codes.map((code) => convertCodeToMatchPlayPair(code));
}

/**
 * Given a collection of pairs of match plays [opponent, player], returns
 * the resulting total score be for those matchups.
 */
export function scoreStrategy(strategy: Pair<MatchPlay, MatchPlay>[]): number {
  return strategy.reduce((current, [a, b]) => {
    const matchScore = calcMatchScore(calcMatchResult(b, a), b);
    return current + matchScore;
  }, 0);
}

export function run() {
  let matchCodes: string[];
  readInputFileToStringArray(
    path.resolve(__dirname, './input.txt'),
    (err, data) => {
      if (!err) {
        matchCodes = data;
        console.log(
          `If the rock-paper-scissors strategy plays out, my score will be: ${scoreStrategy(
            convertCodesToMatchPlays(matchCodes)
          )}`
        );
      } else {
        console.error(err);
      }
    }
  );
}
