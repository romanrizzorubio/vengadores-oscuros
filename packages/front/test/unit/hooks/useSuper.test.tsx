import { renderHook, act, waitFor } from '@testing-library/react';
import { useSuper } from '../../../src/hooks/useSuper';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useSuper', () => {
  const mockSendSuperLife = jest.fn();
  const mockSendSuperPlan = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendSuperLife: mockSendSuperLife,
      sendSuperPlan: mockSendSuperPlan,
    });
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        superLife: 3,
        superLifeValue: 7,
        superPlan: 4,
        superPlanValue: 8,
      },
    });
  });

  it('should initialize values from context data', () => {
    const { result } = renderHook(() => useSuper());

    waitFor(() => {
      expect(result.current.superLife).toBe(3);
      expect(result.current.superLifeValue).toBe(7);
      expect(result.current.superPlan).toBe(4);
      expect(result.current.superPlanValue).toBe(8);
    });
  });

  it('should update values when context data changes', () => {
    const { result, rerender } = renderHook(() => useSuper());

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        superLife: 10,
        superLifeValue: 50,
        superPlan: 8,
        superPlanValue: 16,
      },
    });

    rerender();

    waitFor(() => {
      expect(result.current.superLife).toBe(10);
      expect(result.current.superLifeValue).toBe(50);
      expect(result.current.superPlan).toBe(8);
      expect(result.current.superPlanValue).toBe(16);
    });
  });

  it('should change super life and return true on success', async () => {
    mockSendSuperLife.mockResolvedValue({ superLife: 6, superLifeValue: 30 });

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperLife(6);
    });

    expect(mockSendSuperLife).toHaveBeenCalledWith(6);
    expect(result.current.superLife).toBe(6);
    expect(result.current.superLifeValue).toBe(30);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on super life failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendSuperLife.mockRejectedValue(error);

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperLife(5);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should change super plan and return true on success', async () => {
    mockSendSuperPlan.mockResolvedValue({ superPlan: 9, superPlanValue: 18 });

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperPlan(9);
    });

    expect(mockSendSuperPlan).toHaveBeenCalledWith(9);
    expect(result.current.superPlan).toBe(9);
    expect(result.current.superPlanValue).toBe(18);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on super plan failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendSuperPlan.mockRejectedValue(error);

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperPlan(7);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
