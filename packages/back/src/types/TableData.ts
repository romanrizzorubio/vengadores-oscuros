import { PlayerData } from './PlayerData';

export type TableData = {
  players: PlayerData[];
  saved: boolean;
  expert: boolean;
  ironPatriotDamage: number;
  exposed: number;
  minions: number;
  darkAvengersThreat: number;
  exposedThreat: number;
};
