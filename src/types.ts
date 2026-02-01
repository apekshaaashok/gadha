
export enum GameState {
  START = 'START',
  GYM = 'GYM',
  FOOTBALL = 'FOOTBALL',
  SLEEP = 'SLEEP',
  BURRITO = 'BURRITO',
  PROPOSAL = 'PROPOSAL',
  SUCCESS = 'SUCCESS'
}

export interface CommentaryResponse {
  message: string;
  energyLevel: number;
}
