import { renderHook, act, waitFor } from '@testing-library/react';
import { useTimer } from '../../../src/hooks/useTimer';
import { useGameContext } from '../../../src/contexts/GameContext';
import { useSendData } from '../../../src/hooks/useSendData';
import { PhaseDict } from '../../../src/types/Dicts';

jest.mock('../../../src/contexts/GameContext');
jest.mock('../../../src/hooks/useSendData');

describe('useTimer', () => {
  const mockSendEndTime = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useSendData as jest.Mock).mockReturnValue({
      sendEndTime: mockSendEndTime,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize timer with correct format', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 2);
    futureDate.setMinutes(futureDate.getMinutes() + 30);
    futureDate.setSeconds(futureDate.getSeconds() + 45);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: futureDate,
        phase: PhaseDict.KINGDOM,
      },
    });

    const { result } = renderHook(() => useTimer());

    expect(result.current.timer).toMatch(/\d+:\d{2}:\d{2}/);
    expect(result.current.end).toEqual(futureDate);
  });

  it('should update timer every second', async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);
    futureDate.setMinutes(futureDate.getMinutes() + 5);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: futureDate,
        phase: PhaseDict.KINGDOM,
      },
    });

    const { result } = renderHook(() => useTimer());
    const initialTimer = result.current.timer;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.timer).not.toBe(initialTimer);
    });
  });

  it('should call sendEndTime when time expires in any phase', async () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: pastDate,
        phase: PhaseDict.INIT,
      },
    });

    renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(mockSendEndTime).toHaveBeenCalled();
    });
  });

  it('should format minutes and seconds with leading zeros', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);
    futureDate.setMinutes(futureDate.getMinutes() + 5);
    futureDate.setSeconds(futureDate.getSeconds() + 3);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: futureDate,
        phase: PhaseDict.KINGDOM,
      },
    });

    const { result } = renderHook(() => useTimer());

    expect(result.current.timer).toMatch(/\d+:\d{2}:\d{2}/);
  });

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: new Date(),
        phase: PhaseDict.KINGDOM,
      },
    });

    const { unmount } = renderHook(() => useTimer());

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
