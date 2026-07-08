import { PhaseDict } from "../types/dicts";
import { updateGameState, getGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { isCompleted } from "../model/veranke";

export function advanceGame(): GameData {
  const currentPhase = getGameState().phase;
  console.log("advanceGame called. Current phase:", currentPhase);
  const state = updateGameState((data) => {
    if (data.phase === PhaseDict.SHIP_FALL) {
      data.phase = PhaseDict.ENEMY;
    } else if (data.phase === PhaseDict.ENEMY) {
      data.phase = PhaseDict.OSBORN_REVEAL;
    } else if (data.phase === PhaseDict.OSBORN_REVEAL) {
      const threat = isCompleted(data);
      if (threat) {
        data.phase = PhaseDict.VERANKE_WIN;
      } else {
        data.phase = PhaseDict.VERANKE_LOSE;
      }
    } else if (data.phase === PhaseDict.KINGDOM_DEFEATED) {
      data.phase = PhaseDict.EXPOSED;
    } else {
      console.log("No transition defined for phase:", data.phase);
    }
  });

  if (state.phase === currentPhase) {
    console.warn("Phase did not change after advanceGame call");
  }

  console.log("advanceGame finished. New phase:", state.phase);
  broadcastGame();
  return state;
}
