import { describe, it, expect, beforeEach, vi } from 'vitest';
import { advanceGame } from '../../../src/services/advanceGame';
import { resetGameState, updateGameState } from '../../../src/store/gameStore';
import { PhaseDict } from '../../../src/types/dicts';
import * as socket from '../../../src/sockets/socket';

vi.mock('../../../src/sockets/socket', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    broadcastGame: vi.fn(),
    setSocketServer: vi.fn(),
  };
});

describe('advanceGame', () => {
  beforeEach(() => {
    resetGameState();
    vi.clearAllMocks();
  });

  it('should not change phase for INIT and TABLES', () => {
    const phases = [PhaseDict.INIT, PhaseDict.TABLES];

    phases.forEach((phase) => {
      resetGameState();
      updateGameState((data) => {
        data.phase = phase;
      });

      const result = advanceGame();
      expect(result.phase).toBe(phase);
    });
  });

  it('should advance from KINGDOM_DEFEATED to EXPOSED', () => {
    updateGameState((data) => {
      data.phase = PhaseDict.KINGDOM_DEFEATED;
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.EXPOSED);
  });

  it('should advance from EXPOSED to CAPTAIN_LOSE if plan is completed', () => {
    updateGameState((data) => {
      data.phase = PhaseDict.EXPOSED;
      data.exposedThreatMax = 20;
      data.tables = [
        { exposed: 12, players: [] } as any,
        { exposed: 12, players: [] } as any,
      ];
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.CAPTAIN_LOSE);
  });

  it('should advance from EXPOSED to CAPTAIN_WIN if iron patriot is defeated', () => {
    updateGameState((data) => {
      data.phase = PhaseDict.EXPOSED;
      data.ironPatriotLife = 0;
      data.exposedThreatMax = 30;
      data.tables = [
        { exposed: 10, players: [] } as any,
        { exposed: 10, players: [] } as any,
      ];
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.CAPTAIN_WIN);
  });

  it('should call broadcastGame', () => {
    updateGameState((data) => {
      data.phase = PhaseDict.KINGDOM_DEFEATED;
    });

    advanceGame();
    expect(socket.broadcastGame).toHaveBeenCalledTimes(1);
  });
});
