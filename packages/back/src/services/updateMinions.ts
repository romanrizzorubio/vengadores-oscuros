import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { isMinionsCompleted } from "../model/darkReign";

export function updateMinions(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    if (!table) throw new Error("Table not found");

    if (value > 0) {
      table.minions += value;

      if (isMinionsCompleted(data)) {
        // Avanzar a la siguiente fase
        data.phase = PhaseDict.SPIDER_WOMAN_LEAVES;
      }
    }
  });

  broadcastGame();
  return state;
}
