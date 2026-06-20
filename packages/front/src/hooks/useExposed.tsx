import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useExposed = () => {
  const [ironPatriotLife, setIronPatriotLife] = useState(0);
  const [ironPatriotLifeValue, setIronPatriotLifeValue] = useState(0);
  const [ironPatriotMaxLife, setIronPatriotMaxLife] = useState(0);
  const [exposedThreat, setExposedThreat] = useState(0);
  const [exposedThreatValue, setExposedThreatValue] = useState(0);
  const [exposedThreatMax, setExposedThreatMax] = useState(0);

  const { data } = useGameContext();
  const { sendIronPatriotLife, sendExposedThreat } = useSendData();

  const changeIronPatriotLife = useCallback(
    async (value: number) => {
      try {
        const data = await sendIronPatriotLife(value);
        if (data) {
          setIronPatriotLife(data.ironPatriotLife ?? 0);
          setIronPatriotLifeValue(data.ironPatriotLifeValue ?? 0);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendIronPatriotLife],
  );

  const changeExposedThreat = useCallback(
    async (value: number) => {
      try {
        const data = await sendExposedThreat(value);
        if (data) {
          setExposedThreat(data.exposedThreat ?? 0);
          setExposedThreatValue(data.exposedThreatValue ?? 0);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendExposedThreat],
  );

  useEffect(() => {
    setIronPatriotLife(data.ironPatriotLife || 0);
    setIronPatriotLifeValue(data.ironPatriotLifeValue || 0);
    setIronPatriotMaxLife(data.ironPatriotMaxLifeValue || 0);
    setExposedThreat(data.exposedThreat || 0);
    setExposedThreatValue(data.exposedThreatValue || 0);
    setExposedThreatMax(data.exposedThreatMax || 0);
  }, [
    data.ironPatriotLife,
    data.ironPatriotLifeValue,
    data.ironPatriotMaxLifeValue,
    data.exposedThreat,
    data.exposedThreatValue,
    data.exposedThreatMax,
  ]);

  return {
    ironPatriotLife,
    ironPatriotLifeValue,
    ironPatriotMaxLife,
    exposedThreat,
    exposedThreatValue,
    exposedThreatMax,
    changeIronPatriotLife,
    changeExposedThreat,
  };
};
