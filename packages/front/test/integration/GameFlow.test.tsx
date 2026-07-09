import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { GameProvider, useGameContext } from '../../src/contexts/GameContext';
import { loadService } from '../../src/data/services/load';
import { loadSocket } from '../../src/data/sockets/load';
import { Phase } from '../../src/types/Dicts';

jest.mock('../../src/data/services/load');
jest.mock('../../src/data/sockets/load');

describe('Game Flow Integration Tests', () => {
  const mockInitialData = {
    tables: [],
    phase: 'INIT',
    superLife: 0,
    superPlan: 0,
    ironPatriotDamageTotal: 0,
    exposed: 0,
  };

  const mockGameData = {
    tables: [
      {
        currentTable: 0,
        players: [
          { hero: { value: '1', label: 'Player 1' } },
          { hero: { value: '2', label: 'Player 2' } },
        ],
        saved: false,
        expert: false,
        exposed: 3,
      },
    ],
    phase: 2 as Phase,
    superLife: 15,
    superLifeValue: 15,
    superPlan: 10,
    superPlanValue: 10,
    exposed: 3,
    exposedValue: 3,
    elcalaMal: [],
    minions: 0,
    minionsValue: 0,
    minionsMax: 10,
    darkAvengersThreat: 0,
    darkAvengersThreatValue: 0,
    darkAvengersThreatMax: 10,
    ironPatriotLife: 100,
    ironPatriotLifeValue: 100,
    ironPatriotMaxLifeValue: 100,
    exposedThreat: 0,
    exposedThreatValue: 0,
    exposedThreatMax: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load initial game state', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockInitialData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { data } = useGameContext();
      return <div data-testid="phase">{data.phase}</div>;
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    await waitFor(() => {
      expect(loadService).toHaveBeenCalledWith(-1);
    });

    await waitFor(() => {
      expect(getByTestId('phase')).toHaveTextContent('INIT');
    });
  });

  it('should update game state when data changes', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockInitialData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { data, setData } = useGameContext();

      React.useEffect(() => {
        setTimeout(() => {
          setData(mockGameData);
        }, 100);
      }, [setData]);

      return (
        <div>
          <div data-testid="phase">{data.phase}</div>
          <div data-testid="exposed">{data.exposed}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('phase')).toHaveTextContent('2');
      expect(getByTestId('exposed')).toHaveTextContent('3');
    });
  });

  it('should handle table selection', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockGameData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { currentTable, setCurrentTable } = useGameContext();

      React.useEffect(() => {
        setCurrentTable(1);
      }, [setCurrentTable]);

      return <div data-testid="table">{currentTable}</div>;
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('table')).toHaveTextContent('1');
    });
  });

  it('should reset current table when phase is INIT', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockGameData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { data, setData, currentTable, setCurrentTable } = useGameContext();

      React.useEffect(() => {
        setCurrentTable(2);
        setTimeout(() => {
          setData({ ...data, phase: 0 });
        }, 100);
      }, [setCurrentTable, setData, data]);

      return <div data-testid="table">{currentTable}</div>;
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    await waitFor(
      () => {
        expect(getByTestId('table')).toHaveTextContent('-1');
      },
      { timeout: 3000 },
    );
  });

  it('should establish socket connection on mount', async () => {
    const mockSocketCleanup = jest.fn();
    (loadService as jest.Mock).mockResolvedValue(mockInitialData);
    (loadSocket as jest.Mock).mockReturnValue(mockSocketCleanup);

    const TestComponent = () => {
      return <div>Test</div>;
    };

    const { unmount } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    await waitFor(() => {
      expect(loadSocket).toHaveBeenCalled();
    });

    unmount();

    expect(mockSocketCleanup).toHaveBeenCalled();
  });
});
