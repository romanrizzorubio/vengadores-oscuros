import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function initGame(end: number): GameData {
  const state = updateGameState((data) => {
    data.tables = [];
    data.phase = PhaseDict.TABLES;
    data.end = end;
    data.elcalaMal = [];
    data.minionsMax = 0;
    data.darkAvengersThreatIni = 0;
    data.darkAvengersThreatMax = 0;
    data.ironPatriotLife = 0;
    data.ironPatriotMaxLife = 0;
    data.exposedThreatIni = 0;
    data.exposedThreatMax = 0;
  });

  broadcastGame();
  return state;
}
