import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function updateIronPatriotLife(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    if (!table) throw new Error("Table not found");

    const newLife = data.ironPatriotLife + value;

    // No puede bajar de 0
    if (newLife < 0) {
      return;
    }

    // No puede superar el máximo
    if (newLife > data.ironPatriotMaxLife) {
      return;
    }

    data.ironPatriotLife = newLife;

    // Si llega a 0, avanzamos a una fase futura (placeholder)
    if (data.ironPatriotLife === 0) {
      // TODO: Crear y avanzar a la siguiente fase
      console.log("Iron Patriot defeated - advance to next phase");
    }
  });

  broadcastGame();
  return state;
}
