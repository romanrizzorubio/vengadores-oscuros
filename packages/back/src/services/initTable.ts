import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import { TableData } from "../types/TableData";
import { PlayerData } from "../types/PlayerData";
import { GameData } from "../types/GameData";

export function initTable(tableNumber: number, players: PlayerData[], expert: boolean): GameData {
  const state = updateGameState((data) => {
    const currentTable = data.tables[tableNumber];

    if (currentTable) {
      throw new Error("Table already exists");
    } else {
      const table: TableData = {
        players,
        expert,
        saved: true,
        ironPatriotDamage: 0,
        exposed: 0,
        minions: 0,
        darkAvengersThreat: 0,
        exposedThreat: 0
      };

      data.tables[tableNumber] = table;
    }
  });

  broadcastGame();
  return state;
}
