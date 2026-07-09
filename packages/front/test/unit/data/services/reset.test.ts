import { resetService } from '../../../../src/data/services/reset';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('resetService', () => {
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
    phase: 'INIT',
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

  it('should call post with correct endpoint', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await resetService();

    expect(post).toHaveBeenCalledWith('/reset');
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await resetService();

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('INIT');
    expect(result.superLife).toBe(100);
    expect(result.superPlan).toBe(0);
    expect(result.exposed).toBe(0);
  });

  it('should handle errors', async () => {
    const error = new Error('Reset error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(resetService()).rejects.toThrow('Reset error');
  });
});
