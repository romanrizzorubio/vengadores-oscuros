import { initService } from '../../../../src/data/services/init';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('initService', () => {
  const mockDataService = {
    tables: [{
      players: [],
      expert: false,
      saved: false,
      ironPatriotDamage: 0,
      darkAvengersThreat: 0,
      exposed: 0,
      minions: 0,
      exposedThreat: 0,
    }],
    end: '2024-01-01T00:00:00.000Z',
    phase: 'PLAYING',
    elcalaMal: false,
    minionsMax: 10,
    darkAvengersThreatIni: 0,
    darkAvengersThreatMax: 10,
    ironPatriotLife: 10,
    ironPatriotMaxLife: 10,
    exposedThreatIni: 0,
    exposedThreatMax: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct endpoint and formatted date', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await initService(endDate);

    expect(post).toHaveBeenCalledWith('/init', {
      end: expect.any(Number),
    });
  });

  it('should format end date with correct hours and minutes', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await initService(endDate);

    const callArgs = (post as jest.Mock).mock.calls[0][1];
    const sentDate = new Date(callArgs.end);

    expect(sentDate.getHours()).toBe(endDate.getHours());
    expect(sentDate.getMinutes()).toBe(endDate.getMinutes());
    expect(sentDate.getSeconds()).toBe(59);
  });

  it('should set seconds to 59', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const endDate = new Date('2024-01-01T10:20:30.000Z');
    await initService(endDate);

    const callArgs = (post as jest.Mock).mock.calls[0][1];
    const sentDate = new Date(callArgs.end);

    expect(sentDate.getSeconds()).toBe(59);
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    const result = await initService(endDate);

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('PLAYING');
    expect(result.superLife).toBe(100);
    expect(result.superPlan).toBe(0);
    expect(result.exposed).toBe(0);
  });

  it('should handle errors', async () => {
    const error = new Error('Init error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await expect(initService(endDate)).rejects.toThrow('Init error');
  });
});
