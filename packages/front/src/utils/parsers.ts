import { Data, DataService } from '../types/Data';
import { Table, TableService } from '../types/Table';
import { Option, OptionService } from '../types/Option';

export const parseOptions = (options: OptionService[]): Option[] =>
  options.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const parseTable = (table: TableService, currentTable: number): Table => ({
  currentTable,
  players: table.players,
  expert: table.expert,
  saved: table.saved,
  completeVeranke: table.completeVeranke,
  exposed: table.exposed,
});

export const parseData = (
  {
    end,
    tables,
    phase,
    superLifeMax,
    superPlanIni,
    superPlanMax,
    spiderWomanMax,
    shipMax,
    enemyInit,
    exposedMax,
    elcalaMal,
    minionsMax,
    darkAvengersThreatIni,
    darkAvengersThreatMax,
    ironPatriotLife,
    ironPatriotMaxLife,
    exposedThreatIni,
    exposedThreatMax,
  }: DataService,
  currentTable?: number,
): Data => {
  const sumSpiderWoman = tables.reduce((acc, table) => (table ? acc + table.spiderWoman : acc), 0);
  const ownSpiderWoman =
    currentTable !== undefined && currentTable >= 0 ? tables[currentTable]?.spiderWoman : undefined;
  const sumSuperDamage = tables.reduce((acc, table) => (table ? acc + table.superDamage : acc), 0);
  const sumSuperPlan = tables.reduce((acc, table) => (table ? acc + table.superThreat : acc), 0);
  const sumShip = tables.reduce((acc, table) => (table ? acc + table.ship : acc), 0);
  const sumExposed = tables.reduce((acc, table) => (table ? acc + table.exposed : acc), 0);
  const sumEnemy = tables.reduce((acc, table) => (table ? acc + table.enemy : acc), 0);
  const sumMinions = tables.reduce((acc, table) => (table ? acc + table.minions : acc), 0);
  const sumDarkAvengersThreat = tables.reduce((acc, table) => (table ? acc + table.darkAvengersThreat : acc), 0);
  const sumExposedThreat = tables.reduce((acc, table) => (table ? acc + table.exposedThreat : acc), 0);

  const spiderWoman = spiderWomanMax - sumSpiderWoman;
  const spiderWomanOwn = ownSpiderWoman !== undefined ? spiderWomanMax - ownSpiderWoman : undefined;
  const superLife = superLifeMax - sumSuperDamage;
  const superPlan = superPlanIni + sumSuperPlan;
  const ship = shipMax - sumShip;
  const exposed = sumExposed;
  const enemy = enemyInit - sumEnemy;
  const minions = sumMinions;
  const darkAvengersThreat = darkAvengersThreatIni + sumDarkAvengersThreat;
  const exposedThreat = exposedThreatIni + sumExposedThreat;

  return {
    tables: tables.map((table, index) => (table ? parseTable(table, index) : undefined)),
    end: new Date(end),
    phase,
    spiderWomanTotal: (spiderWoman * 100) / spiderWomanMax,
    spiderWomanTotalValue: spiderWoman,
    spiderWomanOwn:
      spiderWomanOwn !== undefined ? (spiderWomanOwn * 100) / spiderWomanMax : undefined,
    spiderWomanOwnValue: spiderWomanOwn,
    superLife: (superLife * 100) / superLifeMax,
    superLifeValue: superLife,
    superPlan: (superPlan * 100) / superPlanMax,
    superPlanValue: superPlan,
    ship: (ship * 100) / shipMax,
    shipValue: ship,
    enemy: (enemy * 100) / enemyInit,
    enemyValue: enemy,
    exposed: (exposed * 100) / exposedMax,
    exposedValue: exposed,
    exposedMax,
    elcalaMal,
    minions: (minions * 100) / minionsMax,
    minionsValue: minions,
    darkAvengersThreat: (darkAvengersThreat * 100) / darkAvengersThreatMax,
    darkAvengersThreatValue: darkAvengersThreat,
    ironPatriotLife: ironPatriotMaxLife > 0 ? (ironPatriotLife * 100) / ironPatriotMaxLife : 0,
    ironPatriotLifeValue: ironPatriotLife,
    ironPatriotMaxLife,
    exposedThreat: exposedThreatMax > 0 ? (exposedThreat * 100) / exposedThreatMax : 0,
    exposedThreatValue: exposedThreat,
    exposedThreatMax,
  };
};
