import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function initGame(end: number): GameData {
  const state = updateGameState((data) => {
    data.tables = [];
    data.phase = PhaseDict.TABLES;
    data.end = end;
    data.elcalaMal = [];
  });

  broadcastGame();
  return state;
}
