import { GameData } from '../types/GameData';

export const getMinions = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.minions, 0);

export const getDarkAvengersThreat = (data: GameData) =>
  data.darkAvengersThreatIni +
  data.tables.reduce((acc, table) => acc + table.darkAvengersThreat, 0);

export const isMinionsCompleted = (data: GameData) => {
  const minions = getMinions(data);
  return minions >= data.minionsMax;
};

export const isDarkAvengersThreatDefeated = (data: GameData) => {
  const threat = getDarkAvengersThreat(data);
  return threat >= data.darkAvengersThreatMax;
};
