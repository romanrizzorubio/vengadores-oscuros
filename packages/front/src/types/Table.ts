import { Player } from './Player';

export type TableService = {
  players: Player[];
  expert: boolean;
  saved: boolean;
  ironPatriotDamage: number;
  exposed: number;
  uatu: boolean;
  aron: boolean;
  minions: number;
  darkAvengersThreat: number;
  exposedThreat: number;
};

export type Table = {
  currentTable: number;
  players: Player[];
  saved: boolean;
  expert: boolean;
  exposed: number;
};
