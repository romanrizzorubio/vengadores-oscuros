import { PhaseDict } from '../types/dicts';
import { updateGameState, getGameState } from '../store/gameStore';
import { broadcastGame } from '../sockets/socket';
import type { GameData } from '../types/GameData';

const getThreat = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.exposed, 0);

const isExposedCompleted = (data: GameData) => {
  const threat = getThreat(data);
  return threat >= data.exposedThreatMax;
};

export function advanceGame(): GameData {
  const currentPhase = getGameState().phase;
  console.log('advanceGame called. Current phase:', currentPhase);
  const state = updateGameState((data) => {
    if (data.phase === PhaseDict.KINGDOM_DEFEATED) {
      data.phase = PhaseDict.EXPOSED;
    } else if (data.phase === PhaseDict.EXPOSED) {
      if (isExposedCompleted(data)) {
        data.phase = PhaseDict.CAPTAIN_LOSE;
      } else if (data.ironPatriotLife === 0) {
        data.phase = PhaseDict.CAPTAIN_WIN;
      }
    } else {
      console.log('No transition defined for phase:', data.phase);
    }
  });

  if (state.phase === currentPhase) {
    console.warn('Phase did not change after advanceGame call');
  }

  console.log('advanceGame finished. New phase:', state.phase);
  broadcastGame();
  return state;
}
