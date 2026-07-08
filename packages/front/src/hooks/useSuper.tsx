import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useSuper = () => {
  const [superLife, setSuperLife] = useState(0);
  const [superLifeValue, setSuperLifeValue] = useState(0);
  const [superPlan, setSuperPlan] = useState(0);
  const [superPlanValue, setSuperPlanValue] = useState(0);

  const { data } = useGameContext();
  const { sendSuperPlan, sendSuperLife } = useSendData();

  const changeSuperLife = useCallback(
    async (value: number) => {
      try {
        const data = await sendSuperLife(value);
        if (data) {
          setSuperLife(data.superLife);
          setSuperLifeValue(data.superLifeValue);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [setSuperLife, sendSuperLife],
  );

  const changeSuperPlan = useCallback(
    async (value: number) => {
      try {
        const data = await sendSuperPlan(value);
        if (data) {
          setSuperPlan(data.superPlan);
          setSuperPlanValue(data.superPlanValue);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendSuperPlan, setSuperPlan],
  );

  useEffect(() => {
    setSuperLife(data.superLife);
    setSuperLifeValue(data.superLifeValue);
    setSuperPlan(data.superPlan);
    setSuperPlanValue(data.superPlanValue);
  }, [
    data.superLife,
    data.superLifeValue,
    data.superPlan,
    data.superPlanValue,
    setSuperLife,
    setSuperLifeValue,
    setSuperPlan,
    setSuperPlanValue,
  ]);

  return {
    superLife,
    superLifeValue,
    superPlan,
    superPlanValue,
    changeSuperLife,
    changeSuperPlan,
  };
};
