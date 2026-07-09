import { Phase } from './dicts';
import { TableData } from './TableData';

export type ElcalaMalData = {
  table: number;
  life: number;
  maxLife: number;
  defeated: boolean;
};

export type GameData = {
  tables: TableData[];
  phase: Phase;
  end: number;
  elcalaMal: ElcalaMalData[];
  minionsMax: number;
  darkAvengersThreatIni: number;
  darkAvengersThreatMax: number;
  ironPatriotLife: number;
  ironPatriotMaxLife: number;
  exposedThreatIni: number;
  exposedThreatMax: number;
};
