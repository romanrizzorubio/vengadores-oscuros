import { describe, it, expect, beforeEach, vi } from "vitest";
import { endGame } from "../../../src/services/endGame";
import { getGameState, resetGameState } from "../../../src/store/gameStore";
import { PhaseDict } from "../../../src/types/dicts";
import * as socket from "../../../src/sockets/socket";

vi.mock("../../../src/sockets/socket", async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    broadcastGame: vi.fn(),
  };
});

describe("endGame service", () => {
  beforeEach(() => {
    resetGameState();
    vi.clearAllMocks();
  });

  it("should change phase to CAPTAIN_LOSE regardless of current phase", () => {
    const state = getGameState();
    state.phase = PhaseDict.KINGDOM_DEFEATED;
    
    endGame();
    
    expect(getGameState().phase).toBe(PhaseDict.CAPTAIN_LOSE);
    expect(socket.broadcastGame).toHaveBeenCalled();
  });

  it("should change phase to CAPTAIN_LOSE even if in EXPOSED phase", () => {
    const state = getGameState();
    state.phase = PhaseDict.EXPOSED;
    
    endGame();
    
    expect(getGameState().phase).toBe(PhaseDict.CAPTAIN_LOSE);
  });
});
