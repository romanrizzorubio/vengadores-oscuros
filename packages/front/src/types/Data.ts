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
  spiderWomanMax: number;
  superLifeMax: number;
  superPlanIni: number;
  superPlanMax: number;
  shipMax: number;
  enemyInit: number;
  exposedMax: number;
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
  spiderWomanTotal: number;
  spiderWomanTotalValue: number;
  spiderWomanOwn?: number;
  spiderWomanOwnValue?: number;
  superLife: number;
  superLifeValue: number;
  superPlan: number;
  superPlanValue: number;
  ship: number;
  shipValue: number;
  enemy: number;
  enemyValue: number;
  exposed: number;
  exposedValue: number;
  exposedMax: number;
  elcalaMal: ElcalaMalData[];
  minions: number;
  minionsValue: number;
  darkAvengersThreat: number;
  darkAvengersThreatValue: number;
  ironPatriotLife?: number;
  ironPatriotLifeValue?: number;
  ironPatriotMaxLifeValue?: number;
  exposedThreat?: number;
  exposedThreatValue?: number;
  exposedThreatMax?: number;
};
