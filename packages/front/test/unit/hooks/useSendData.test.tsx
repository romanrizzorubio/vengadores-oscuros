import { renderHook, act } from '@testing-library/react';
import { useSendData } from '../../../src/hooks/useSendData';
import { superLifeService } from '../../../src/data/services/superLife';
import { superPlanService } from '../../../src/data/services/superPlan';
import { advanceService } from '../../../src/data/services/advance';
import { exposedService } from '../../../src/data/services/exposed';
import { endTimeService } from '../../../src/data/services/endTime';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/data/services/superLife');
jest.mock('../../../src/data/services/superPlan');
jest.mock('../../../src/data/services/advance');
jest.mock('../../../src/data/services/exposed');
jest.mock('../../../src/data/services/endTime');
jest.mock('../../../src/contexts/GameContext');

describe('useSendData', () => {
  const mockCurrentTable = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameContext as jest.Mock).mockReturnValue({
      currentTable: mockCurrentTable,
    });
  });

  it('should send end time successfully', async () => {
    const mockData = { phase: 5 };
    (endTimeService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendEndTime();
    });

    expect(endTimeService).toHaveBeenCalledTimes(1);
    expect(returnValue).toEqual(mockData);
  });

  it('should send advance successfully', async () => {
    const mockData = { phase: 2 };
    (advanceService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendAdvance();
    });

    expect(advanceService).toHaveBeenCalledWith(mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send super life successfully', async () => {
    const mockData = { superLife: 3 };
    (superLifeService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendSuperLife(3);
    });

    expect(superLifeService).toHaveBeenCalledWith(3, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send super plan successfully', async () => {
    const mockData = { superPlan: 7 };
    (superPlanService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendSuperPlan(7);
    });

    expect(superPlanService).toHaveBeenCalledWith(7, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send exposed successfully', async () => {
    const mockData = { exposed: 4 };
    (exposedService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendExposed(4);
    });

    expect(exposedService).toHaveBeenCalledWith(4, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });



  it('should return false and log error on failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Service error');
    (advanceService as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendAdvance();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
