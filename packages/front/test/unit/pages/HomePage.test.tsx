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
      exposed: 10,
    },
  ],
  enemies: { values: [], total: 0 },
  ship: { values: [], total: 0 },
  ironPatriotDamage: { values: [], total: 0 },
  aron: { values: [], total: 0 },
  uatu: { values: [], total: 0 },
  superLife: 0,
  superDefeat: 0,
  superReveal: 0,
  superPlan: 0,
  heroes: { values: [], total: 0 },
  exposed: 0,
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
    ironPatriotDamageTotal: 0,
    ironPatriotDamageOwn: undefined,
    superLife: 0,
    superPlan: 0,
    changeSpiderWoman: jest.fn(),
    changeSuperLife: jest.fn(),
    changeSuperPlan: jest.fn(),
  }),
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
    </ThemeProvider>,
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
    renderWithProviders(PhaseDict.TABLES);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should render WaitingTablesPhase when phase is TABLES', () => {
    renderWithProviders(PhaseDict.TABLES);
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('should render KingdomPhase when phase is KINGDOM', () => {
    renderWithProviders(PhaseDict.KINGDOM);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render KingdomDefeatedPhase when phase is KINGDOM_DEFEATED', () => {
    renderWithProviders(PhaseDict.KINGDOM_DEFEATED);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render ExposedPhase when phase is EXPOSED', () => {
    renderWithProviders(PhaseDict.EXPOSED);
    expect(screen.getByText(/Spiderwoman/i)).toBeInTheDocument();
  });

  it('should render CaptainPhase when phase is CAPTAIN_LOSE', () => {
    renderWithProviders(PhaseDict.CAPTAIN_LOSE);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render CaptainPhase with hasWin when phase is CAPTAIN_WIN', () => {
    renderWithProviders(PhaseDict.CAPTAIN_WIN);
    expect(document.querySelector('section')).toBeInTheDocument();
  });
});
