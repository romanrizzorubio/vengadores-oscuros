import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

const getExposedThreat = (data: GameData) =>
  data.exposedThreatIni + data.tables.reduce((acc, table) => acc + table.exposedThreat, 0);

const isExposedThreatDefeated = (data: GameData) => {
  const threat = getExposedThreat(data);
  return threat >= data.exposedThreatMax;
};

export function updateExposedThreat(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const currentThreat = getExposedThreat(data);
    const table = data.tables[tableNumber];

    if (!table) throw new Error("Table not found");

    // Calcular el valor real que se puede aplicar (no bajar de 0)
    const actualValue = currentThreat + value < 0 ? -currentThreat : value;

    table.exposedThreat += actualValue;

    if (isExposedThreatDefeated(data) && data.phase === PhaseDict.EXPOSED) {
      data.phase = PhaseDict.CAPTAIN_LOSE;
    }
  });

  broadcastGame();
  return state;
}
