import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { loadService } from '../data/services/load';
import { loadSocket } from '../data/sockets/load';
import { Data } from '../types/Data';
import { PhaseDict } from '../types/Dicts';

type GameContextValue = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  currentTable: number;
  setCurrentTable: Dispatch<SetStateAction<number>>;
};

const initialData: Data = {
  tables: [],
  phase: PhaseDict.INIT,
  superLife: 0,
  superLifeValue: 0,
  superPlan: 0,
  superPlanValue: 0,
  exposed: 0,
  exposedValue: 0,
  elcalaMal: [],
  minions: 0,
  minionsValue: 0,
  minionsMax: 0,
  darkAvengersThreat: 0,
  darkAvengersThreatValue: 0,
  darkAvengersThreatMax: 0,
  ironPatriotLife: 0,
  ironPatriotLifeValue: 0,
  ironPatriotMaxLifeValue: 0,
  exposedThreat: 0,
  exposedThreatValue: 0,
  exposedThreatMax: 0,
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const openingRef = useRef(false);
  const socketRef = useRef<Socket | null>(null);

  const [data, setData] = useState<Data>(initialData);
  const [currentTable, setCurrentTable] = useState(-1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await loadService(currentTable);
        setData(response);
      } catch (error) {
        console.error('Error al cargar los datos', error);
      }
    };

    loadData();

    return loadSocket({
      currentTable,
      socketRef,
      openingRef,
      handleData: setData,
      handleError: (error: Error) => console.error('Error en el socket', error),
    });
  }, [currentTable]);

  useEffect(() => {
    if (data.phase === PhaseDict.INIT && currentTable !== -1) {
      setCurrentTable(-1);
    }
  }, [data.phase, currentTable]);

  return (
    <GameContext.Provider
      value={{
        data,
        setData,
        currentTable,
        setCurrentTable,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
};
