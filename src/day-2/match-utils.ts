export const MATCH_PLAY_SCORES = {
  rock: 1,
  paper: 2,
  scissors: 3
};

export const MATCH_RESULT_SCORES = {
  win: 6,
  draw: 3,
  loss: 0
};

export interface CodeMatchPlayMap {
  A: 'rock';
  B: 'paper';
  C: 'scissors';
  X: 'rock';
  Y: 'paper';
  Z: 'scissors';
  [others: string]: MatchPlay;
}
export const CODE_TO_MATCHPLAY_MAP: CodeMatchPlayMap = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
};

export type Pair<T, K> = [T, K];

export type MatchPlay = 'rock' | 'paper' | 'scissors';

export type MatchResult = 'win' | 'loss' | 'draw';

export function calcMatchScore(
  matchResult: MatchResult,
  playerChoice: MatchPlay
): number {
  const choiceScore = MATCH_PLAY_SCORES[playerChoice];
  const matchResultScore = MATCH_RESULT_SCORES[matchResult];
  return choiceScore + matchResultScore;
}

// For each match result for the player, the key-value pair represents the
// requisite opponent  and player match plays respectively to achieve that
// result.
export const MATCH_PLAY_BY_RESULT: Record<
  MatchResult,
  Record<MatchPlay, MatchPlay>
> = {
  draw: {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
  },
  win: {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
  },
  loss: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  }
};

export function getMatchPlayByOpponentMove(
  play: MatchPlay,
  result: MatchResult
): MatchPlay {
  return MATCH_PLAY_BY_RESULT[result][play];
}
