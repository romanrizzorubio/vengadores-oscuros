import { PhaseDict } from '../types/dicts';
import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

export function updateIronPatriotLife(
  value: number,
  tableNumber: number,
): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    if (!table) throw new Error('Table not found');

    const newLife = data.ironPatriotLife + value;

    // No puede superar el máximo
    data.ironPatriotLife =
      newLife > data.ironPatriotMaxLife ? data.ironPatriotMaxLife : newLife;

    // Si baja de 0, lo dejamos en 0
    if (data.ironPatriotLife < 0) {
      data.ironPatriotLife = 0;
    }

    // Si llega a 0, avanzamos a CAPTAIN_WIN
    if (data.ironPatriotLife === 0 && data.phase === PhaseDict.EXPOSED) {
      data.phase = PhaseDict.CAPTAIN_WIN;
    }
  });

  broadcastGame();
  return state;
}
