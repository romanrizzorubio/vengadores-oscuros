import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

const getThreat = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.exposed, 0);

export function updateExposed(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const threat = getThreat(data);
    const table = data.tables[tableNumber];

    if (!table) throw new Error('Table not found');

    const actualThreat = threat + value < 0 ? -threat : value;

    table.exposed += actualThreat;
  });

  broadcastGame();
  return state;
}
