import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HomePage from '../../../src/pages/HomePage/HomePage';
import { PhaseDict, Phase } from '../../../src/types/Dicts';
import { theme } from '../../../src/styles/theme';
import { useGameContext } from '../../../src/contexts/GameContext';

const mockGameData = {
  phase: PhaseDict.INIT,
  time: 0,
  players: [],
  tables: [
    {
      currentTable: 0,
      players: [],
      saved: true,
      expert: false,
      completeVeranke: true,
      exposed: 10,
    },
  ],
  enemies: { values: [], total: 0 },
  ship: { values: [], total: 0 },
  spiderWoman: { values: [], total: 0 },
  aron: { values: [], total: 0 },
  uatu: { values: [], total: 0 },
  superLife: 0,
  superDefeat: 0,
  superReveal: 0,
  superPlan: 0,
  heroes: { values: [], total: 0 },
  exposed: 0,
  exposedMax: 0,
};

jest.mock('../../../src/contexts/GameContext', () => ({
  useGameContext: jest.fn(),
}));

jest.mock('../../../src/hooks/useInit', () => ({
  useInit: () => ({
    end: null,
    changeEnd: jest.fn(),
    initGame: jest.fn(),
    resetData: jest.fn(),
    startTables: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useTimer', () => ({
  useTimer: () => ({ timer: '00:00', end: new Date() }),
}));

jest.mock('../../../src/hooks/useSuper', () => ({
  useSuper: () => ({
    spiderWomanTotal: 0,
    spiderWomanOwn: undefined,
    superLife: 0,
    superPlan: 0,
    changeSpiderWoman: jest.fn(),
    changeSuperLife: jest.fn(),
    changeSuperPlan: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useShip', () => ({
  useShip: () => ({
    ship: 0,
    exposed: 0,
    changeShip: jest.fn(),
    changeExposed: jest.fn(),
    completed: false,
  }),
}));

jest.mock('../../../src/hooks/useEnemy', () => ({
  useEnemy: () => ({
    enemy: 0,
    exposed: 0,
    changeEnemy: jest.fn(),
    changeExposed: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useVeranke', () => ({
  useVeranke: () => ({}),
}));

const renderWithProviders = (phase: Phase) => {
  (useGameContext as jest.Mock).mockReturnValue({
    data: {
      ...mockGameData,
      phase,
    },
    currentTable: 0,
    setCurrentTable: jest.fn(),
  });

  return render(
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
};

describe('HomePage Component', () => {
  it('should render InitPhase when phase is INIT', () => {
    renderWithProviders(PhaseDict.INIT);
    expect(screen.getByText('Hora de finalización')).toBeInTheDocument();
  });

  it('should not render Timer when phase is INIT', () => {
    renderWithProviders(PhaseDict.INIT);
    expect(screen.queryByText('Tiempo')).not.toBeInTheDocument();
  });

  it('should render Timer when phase is not INIT', () => {
    renderWithProviders(PhaseDict.SHIP_FALL);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should render WaitingTablesPhase when phase is TABLES', () => {
    renderWithProviders(PhaseDict.TABLES);
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('should render ShipFallPhase when phase is SHIP_FALL', () => {
    renderWithProviders(PhaseDict.SHIP_FALL);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render EnemyPhase when phase is ENEMY', () => {
    renderWithProviders(PhaseDict.ENEMY);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render KingdomDefeatedPhase when phase is KINGDOM_DEFEATED', () => {
    renderWithProviders(PhaseDict.KINGDOM_DEFEATED);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render OsbornPhase with hasWin when phase is VERANKE_WIN', () => {
    renderWithProviders(PhaseDict.VERANKE_WIN);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render ExposedPhase when phase is EXPOSED', () => {
    renderWithProviders(PhaseDict.EXPOSED);
    expect(screen.getByText(/Spiderwoman/i)).toBeInTheDocument();
  });

  it('should render EnemyPhase when phase is ENEMY (continued)', () => {
    renderWithProviders(PhaseDict.ENEMY);
    expect(screen.getByText(/nave/i)).toBeInTheDocument();
  });

  it('should render OsbornPhase when phase is VERANKE_LOSE', () => {
    renderWithProviders(PhaseDict.VERANKE_LOSE);
    expect(screen.getByText(/Norman Osborn/i)).toBeInTheDocument();
  });

  it('should render OsbornPhase with hasWin when phase is VERANKE_WIN', () => {
    renderWithProviders(PhaseDict.VERANKE_WIN);
    expect(screen.getByText(/Norman Osborn/i)).toBeInTheDocument();
  });

  it('should render OsbornChangePhase when phase is OSBORN_REVEAL', () => {
    renderWithProviders(PhaseDict.OSBORN_REVEAL);
    expect(screen.getByText(/¡Victoria! Muestra la carta de Norman Osborn/i)).toBeInTheDocument();
  });
});
