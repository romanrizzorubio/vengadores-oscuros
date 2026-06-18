import { Phase } from "./dicts";
import { TableData } from "./TableData";

export type ElcalaMalData = {
  table: number;
  life: number;
  maxLife: number;
  defeated: boolean;
};

export type GameData = {
  tables: TableData[];
  phase: Phase;
  spiderWomanMax: number;
  superLifeMax: number;
  superPlanIni: number;
  superPlanMax: number;
  shipMax: number;
  enemyInit: number;
  exposedMax: number;
  end: number;
  elcalaMal: ElcalaMalData[];
};
