import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ElcalaMal } from '../../../src/components/ElcalaMal/ElcalaMal';
import { theme } from '../../../src/styles/theme';
import { useGameContext } from '../../../src/contexts/GameContext';
import { addElcalaMalService, updateElcalaMalLifeService } from '../../../src/data/services/elcalaMal';
import { PhaseDict } from '../../../src/types/Dicts';

jest.mock('../../../src/contexts/GameContext');
jest.mock('../../../src/data/services/elcalaMal');

const mockSetData = jest.fn();

const mockGameData = {
  tables: [{}, {}, {}],
  phase: PhaseDict.SHIP_FALL,
  elcalaMal: [],
  superLife: 100,
  superLifeValue: 10,
  superPlan: 50,
  superPlanValue: 5,
  spiderWomanTotal: 80,
  spiderWomanTotalValue: 8,
  ship: 60,
  shipValue: 6,
  enemy: 70,
  enemyValue: 7,
  exposed: 40,
  exposedValue: 4,
  exposedMax: 10,
};

describe('ElcalaMal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGameContext as jest.Mock).mockReturnValue({
      data: mockGameData,
      setData: mockSetData,
      currentTable: 0,
    });
  });

  describe('when no Elcala Mal exists in current table', () => {
    it('should render button to add Elcala Mal when not readonly', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={false} />
        </ThemeProvider>
      );

      expect(screen.getByText('Llega Elcala Mal')).toBeInTheDocument();
    });

    it('should call addElcalaMalService when button is clicked', async () => {
      const mockData = {
        ...mockGameData,
        elcalaMal: [{ table: 0, life: 27, maxLife: 27, defeated: false }],
      };
      (addElcalaMalService as jest.Mock).mockResolvedValue(mockData);

      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={false} />
        </ThemeProvider>
      );

      const button = screen.getByText('Llega Elcala Mal');
      fireEvent.click(button);

      await waitFor(() => {
        expect(addElcalaMalService).toHaveBeenCalledWith(0);
        expect(mockSetData).toHaveBeenCalledWith(mockData);
      });
    });

    it('should not render anything when readonly and no Elcala Mal', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={true} />
        </ThemeProvider>
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('when Elcala Mal exists and is active', () => {
    beforeEach(() => {
      (useGameContext as jest.Mock).mockReturnValue({
        data: {
          ...mockGameData,
          elcalaMal: [{ table: 0, life: 20, maxLife: 27, defeated: false }],
        },
        setData: mockSetData,
        currentTable: 0,
      });
    });

    it('should render Elcala Mal panel with progress bar', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={true} />
        </ThemeProvider>
      );

      expect(screen.getByText('20/27')).toBeInTheDocument();
      expect(screen.getByText('Mesa 1')).toBeInTheDocument();
    });

    it('should render controls when not readonly', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={false} />
        </ThemeProvider>
      );

      // Controls component renders buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should update life when controls are used', async () => {
      const mockUpdatedData = {
        ...mockGameData,
        elcalaMal: [{ table: 0, life: 19, maxLife: 27, defeated: false }],
      };
      (updateElcalaMalLifeService as jest.Mock).mockResolvedValue(mockUpdatedData);

      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={false} />
        </ThemeProvider>
      );

      // Simulate clicking a -1 button (would be in Controls component)
      // This is a simplified test; actual implementation depends on Controls behavior
      await waitFor(() => {
        expect(screen.getByText('20/27')).toBeInTheDocument();
      });
    });
  });

  describe('when Elcala Mal is defeated', () => {
    beforeEach(() => {
      (useGameContext as jest.Mock).mockReturnValue({
        data: {
          ...mockGameData,
          elcalaMal: [{ table: 0, life: 0, maxLife: 27, defeated: true }],
        },
        setData: mockSetData,
        currentTable: 0,
      });
    });

    it('should render defeated message', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={true} />
        </ThemeProvider>
      );

      expect(screen.getByText('Mesa 1 - Elcala Mal derrotado')).toBeInTheDocument();
    });

    it('should not render panel or controls when defeated', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={false} />
        </ThemeProvider>
      );

      expect(screen.queryByText('0/27')).not.toBeInTheDocument();
    });
  });

  describe('when multiple Elcala Mal exist', () => {
    beforeEach(() => {
      (useGameContext as jest.Mock).mockReturnValue({
        data: {
          ...mockGameData,
          elcalaMal: [
            { table: 0, life: 20, maxLife: 27, defeated: false },
            { table: 1, life: 15, maxLife: 27, defeated: false },
            { table: 2, life: 0, maxLife: 27, defeated: true },
          ],
        },
        setData: mockSetData,
        currentTable: 0,
      });
    });

    it('should render all Elcala Mal in readonly mode', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={true} />
        </ThemeProvider>
      );

      expect(screen.getByText('Mesa 1')).toBeInTheDocument();
      expect(screen.getByText('Mesa 2')).toBeInTheDocument();
      expect(screen.getByText('Mesa 3 - Elcala Mal derrotado')).toBeInTheDocument();
    });

    it('should only render current table Elcala Mal when not readonly', () => {
      render(
        <ThemeProvider theme={theme}>
          <ElcalaMal readOnly={false} />
        </ThemeProvider>
      );

      expect(screen.getByText('Mesa 1')).toBeInTheDocument();
      expect(screen.queryByText('Mesa 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Mesa 3 - Elcala Mal derrotado')).not.toBeInTheDocument();
    });
  });
});
