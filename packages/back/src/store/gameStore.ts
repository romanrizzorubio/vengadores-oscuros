import type { GameData } from "../types/GameData";
import { PhaseDict } from "../types/dicts";

const INITIAL: GameData = {
  tables: [],
  phase: PhaseDict.INIT,
  end: Date.now(),
  elcalaMal: [],
  minionsMax: 0,
  darkAvengersThreatIni: 0,
  darkAvengersThreatMax: 0,
  ironPatriotLife: 0,
  ironPatriotMaxLife: 0,
  exposedThreatIni: 0,
  exposedThreatMax: 0
};

let gameState: GameData = {
  ...INITIAL
};

export function getGameState(): GameData {
  return gameState;
}

export function setGameState(nextState: GameData): GameData {
  gameState = nextState;
  return gameState;
}

export function updateGameState(updater: (state: GameData) => void): GameData {
  updater(gameState);
  return gameState;
}

export function resetGameState(): GameData {
  gameState = {
    ...INITIAL,
    tables: [],
    elcalaMal: []
  };

  return gameState;
}
