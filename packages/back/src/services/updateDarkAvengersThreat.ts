import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { getDarkAvengersThreat, isDarkAvengersThreatDefeated } from "../model/darkReign";

export function updateDarkAvengersThreat(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const currentThreat = getDarkAvengersThreat(data);
    const table = data.tables[tableNumber];

    if (!table) throw new Error("Table not found");

    // Calcular el valor real que se puede aplicar (no bajar de 0)
    const actualValue = currentThreat + value < 0 ? -currentThreat : value;

    table.darkAvengersThreat += actualValue;

    if (isDarkAvengersThreatDefeated(data)) {
      // Fase de derrota
      data.phase = PhaseDict.KINGDOM_DEFEATED;
    }
  });

  broadcastGame();
  return state;
}
