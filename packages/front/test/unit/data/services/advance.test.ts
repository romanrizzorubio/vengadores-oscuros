import { advanceService } from '../../../../src/data/services/advance';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('advanceService', () => {
  const mockDataService = {
    tables: [],
    end: '2024-01-01T00:00:00.000Z',
    phase: 'PLAYING',
    elcalaMal: [],
    minionsMax: 10,
    darkAvengersThreatIni: 0,
    darkAvengersThreatMax: 10,
    ironPatriotLife: 10,
    ironPatriotMaxLife: 10,
    exposedThreatIni: 0,
    exposedThreatMax: 10,
    currentTable: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct endpoint', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await advanceService();

    expect(post).toHaveBeenCalledWith('/advance');
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await advanceService();

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('PLAYING');
    expect(result.superLife).toBe(100);
    expect(result.superPlan).toBe(0);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(advanceService()).rejects.toThrow('Network error');
  });
});
