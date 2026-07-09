import { loadService } from '../../../../src/data/services/load';
import { get } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('loadService', () => {
  const mockDataService = {
    tables: [
      {
        players: [],
        expert: false,
        saved: false,
        ironPatriotDamage: 0,
        darkAvengersThreat: 0,
        exposed: 0,
        minions: 0,
        exposedThreat: 0,
      },
    ],
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

  it('should call get with correct endpoint', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockDataService);

    await loadService(1);

    expect(get).toHaveBeenCalledWith('/data');
  });

  it('should parse and return the response data', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await loadService(1);

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('PLAYING');
    expect(result.superLife).toBe(100);
    expect(result.superPlan).toBe(0);
    expect(result.exposed).toBe(0);
  });

  it('should handle errors', async () => {
    const error = new Error('Load error');
    (get as jest.Mock).mockRejectedValueOnce(error);

    await expect(loadService(1)).rejects.toThrow('Load error');
  });
});
