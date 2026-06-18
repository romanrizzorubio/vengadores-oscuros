import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useKingdom = () => {
  const [minions, setMinions] = useState(0);
  const [minionsValue, setMinionsValue] = useState(0);
  const [darkAvengersThreat, setDarkAvengersThreat] = useState(0);
  const [darkAvengersThreatValue, setDarkAvengersThreatValue] = useState(0);

  const { data } = useGameContext();
  const { sendMinions, sendDarkAvengersThreat } = useSendData();

  const addMinion = useCallback(
    async (value: number) => {
      try {
        const data = await sendMinions(value);
        if (data) {
          setMinions(data.minions);
          setMinionsValue(data.minionsValue);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendMinions],
  );

  const changeDarkAvengersThreat = useCallback(
    async (value: number) => {
      try {
        const data = await sendDarkAvengersThreat(value);
        if (data) {
          setDarkAvengersThreat(data.darkAvengersThreat);
          setDarkAvengersThreatValue(data.darkAvengersThreatValue);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendDarkAvengersThreat],
  );

  useEffect(() => {
    setMinions(data.minions);
    setMinionsValue(data.minionsValue);
    setDarkAvengersThreat(data.darkAvengersThreat);
    setDarkAvengersThreatValue(data.darkAvengersThreatValue);
  }, [
    data.minions,
    data.minionsValue,
    data.darkAvengersThreat,
    data.darkAvengersThreatValue,
  ]);

  return {
    minions,
    minionsValue,
    darkAvengersThreat,
    darkAvengersThreatValue,
    addMinion,
    changeDarkAvengersThreat,
  };
};
