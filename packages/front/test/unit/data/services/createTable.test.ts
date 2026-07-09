import { createTableService } from '../../../../src/data/services/createTable';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('createTableService', () => {
  const mockTable = {
    players: [
      { name: 'Player 1', hero: 'Hero 1' },
      { name: 'Player 2', hero: 'Hero 2' },
    ],
    expert: true,
    saved: false,
    ironPatriotDamage: 0,
    exposed: 0,
    uatu: false,
    aron: false,
    minions: 0,
    darkAvengersThreat: 0,
    exposedThreat: 0,
  };

  const mockPlayers = [
    { hero: { value: 'hero-1', label: 'Hero 1' } },
    { hero: { value: 'hero-2', label: 'Hero 2' } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct endpoint and parameters', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    await createTableService(1, mockPlayers, true);

    expect(post).toHaveBeenCalledWith('/init-table', {
      table: 1,
      players: mockPlayers,
      expert: true,
    });
  });

  it('should call post with expert=false', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    await createTableService(2, mockPlayers, false);

    expect(post).toHaveBeenCalledWith('/init-table', {
      table: 2,
      players: mockPlayers,
      expert: false,
    });
  });

  it('should return table data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    const result = await createTableService(1, mockPlayers, true);

    expect(result).toEqual(mockTable);
  });

  it('should handle empty players array', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    await createTableService(1, [], false);

    expect(post).toHaveBeenCalledWith('/init-table', {
      table: 1,
      players: [],
      expert: false,
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to create table');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(createTableService(1, mockPlayers, true)).rejects.toThrow(
      'Failed to create table',
    );
  });
});
