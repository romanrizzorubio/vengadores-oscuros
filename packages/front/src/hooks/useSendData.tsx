import { useCallback } from 'react';
import { superLifeService } from '../data/services/superLife';
import { superPlanService } from '../data/services/superPlan';
import { advanceService } from '../data/services/advance';
import { useGameContext } from '../contexts/GameContext';
import { exposedService } from '../data/services/exposed';
import { endTimeService } from '../data/services/endTime';
import { minionsService } from '../data/services/minions';
import { darkAvengersThreatService } from '../data/services/darkAvengersThreat';
import { ironPatriotLifeService } from '../data/services/ironPatriotLife';
import { exposedThreatService } from '../data/services/exposedThreat';

export const useSendData = () => {
  const { currentTable } = useGameContext();

  const sendEndTime = useCallback(async () => {
    try {
      return await endTimeService();
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, []);

  const sendAdvance = useCallback(async () => {
    try {
      return await advanceService(currentTable);
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [currentTable]);

  const sendSuperLife = useCallback(
    async (value: number) => {
      try {
        return await superLifeService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendSuperPlan = useCallback(
    async (value: number) => {
      try {
        return await superPlanService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendExposed = useCallback(
    async (value: number) => {
      try {
        return await exposedService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendMinions = useCallback(
    async (value: number) => {
      try {
        return await minionsService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los dados', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendDarkAvengersThreat = useCallback(
    async (value: number) => {
      try {
        return await darkAvengersThreatService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendIronPatriotLife = useCallback(
    async (value: number) => {
      try {
        return await ironPatriotLifeService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendExposedThreat = useCallback(
    async (value: number) => {
      try {
        return await exposedThreatService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  return {
    sendAdvance,
    sendEndTime,
    sendSuperLife,
    sendSuperPlan,
    sendExposed,
    sendMinions,
    sendDarkAvengersThreat,
    sendIronPatriotLife,
    sendExposedThreat,
  };
};
