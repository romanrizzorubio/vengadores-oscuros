import { updateGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

const ELCALA_MAL_LIFE_PER_TABLE = 9;

export function addElcalaMal(table: number): GameData {
  const state = updateGameState((data) => {
    const exists = data.elcalaMal.find((e) => e.table === table);
    if (!exists) {
      const maxLife = ELCALA_MAL_LIFE_PER_TABLE * data.tables.length;
      data.elcalaMal.push({
        table,
        life: maxLife,
        maxLife: maxLife,
        defeated: false,
      });
    }
  });

  broadcastGame();
  return state;
}

export function updateElcalaMalLife(table: number, life: number): GameData {
  const state = updateGameState((data) => {
    const elcala = data.elcalaMal.find((e) => e.table === table);
    if (elcala) {
      elcala.life = Math.max(0, Math.min(life, elcala.maxLife));
      if (elcala.life === 0) {
        elcala.defeated = true;
      }
    }
  });

  broadcastGame();
  return state;
}
