import { Phase } from './Dicts';
import { Table, TableService } from './Table';

export type ElcalaMalData = {
  table: number;
  life: number;
  maxLife: number;
  defeated: boolean;
};

export type DataService = {
  phase: Phase;
  tables: TableService[];
  currentTable: number;
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

export type Data = {
  tables: (Table | undefined)[];
  phase: Phase;
  end?: Date;
  superLife: number;
  superLifeValue: number;
  superPlan: number;
  superPlanValue: number;
  exposed: number;
  exposedValue: number;
  elcalaMal: ElcalaMalData[];
  minions: number;
  minionsValue: number;
  minionsMax: number;
  darkAvengersThreat: number;
  darkAvengersThreatValue: number;
  darkAvengersThreatMax: number;
  ironPatriotLife: number;
  ironPatriotLifeValue: number;
  ironPatriotMaxLifeValue: number;
  exposedThreat: number;
  exposedThreatValue: number;
  exposedThreatMax: number;
};
