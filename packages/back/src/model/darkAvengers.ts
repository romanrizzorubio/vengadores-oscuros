import { GameData } from "../types/GameData";

export const getDamage = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.ironPatriotDamage, 0);

export const getThreat = (data: GameData) =>
  data.darkAvengersThreatIni + data.tables.reduce((acc, table) => acc + table.darkAvengersThreat, 0);

export const isDefeated = (data: GameData) => {
  const damage = getDamage(data);

  return damage >= data.ironPatriotMaxLife;
};

export const isCompleted = (data: GameData) => {
  const threat = getThreat(data);

  return threat >= data.darkAvengersThreatMax;
};
