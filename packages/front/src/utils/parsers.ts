import { Data, DataService } from '../types/Data';
import { Table, TableService } from '../types/Table';
import { Option, OptionService } from '../types/Option';

export const parseOptions = (options: OptionService[]): Option[] =>
  options.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const parseTable = (table: TableService): Table => ({
  players: table.players,
  expert: table.expert,
  saved: table.saved,
  exposed: table.exposed,
});

export const parseData = ({
  end,
  tables,
  phase,
  elcalaMal,
  minionsMax,
  darkAvengersThreatIni,
  darkAvengersThreatMax,
  ironPatriotLife,
  ironPatriotMaxLife,
  exposedThreatIni,
  exposedThreatMax,
}: DataService): Data => {
  const sumIronPatriotDamage = tables.reduce(
    (acc, table) => (table ? acc + table.ironPatriotDamage : acc),
    0,
  );
  const sumExposed = tables.reduce(
    (acc, table) => (table ? acc + table.exposed : acc),
    0,
  );
  const sumMinions = tables.reduce(
    (acc, table) => (table ? acc + table.minions : acc),
    0,
  );
  const sumDarkAvengersThreat = tables.reduce(
    (acc, table) => (table ? acc + table.darkAvengersThreat : acc),
    0,
  );
  const sumExposedThreat = tables.reduce(
    (acc, table) => (table ? acc + table.exposedThreat : acc),
    0,
  );

  const superLife = ironPatriotMaxLife - sumIronPatriotDamage;
  const superPlan = darkAvengersThreatIni + sumDarkAvengersThreat;
  const exposed = sumExposed;
  const minions = sumMinions;
  const darkAvengersThreat = darkAvengersThreatIni + sumDarkAvengersThreat;
  const exposedThreat = exposedThreatIni + sumExposedThreat;

  return {
    tables: tables.map((table) => (table ? parseTable(table) : undefined)),
    end: new Date(end),
    phase,
    superLife: (superLife * 100) / ironPatriotMaxLife,
    superLifeValue: superLife,
    superPlan: (superPlan * 100) / darkAvengersThreatMax,
    superPlanValue: superPlan,
    exposed: exposedThreatMax > 0 ? (exposed * 100) / exposedThreatMax : 0,
    exposedValue: exposed,
    elcalaMal,
    minions: (minions * 100) / minionsMax,
    minionsValue: minions,
    minionsMax,
    darkAvengersThreat: (darkAvengersThreat * 100) / darkAvengersThreatMax,
    darkAvengersThreatValue: darkAvengersThreat,
    darkAvengersThreatMax,
    ironPatriotLife:
      ironPatriotMaxLife > 0 ? (ironPatriotLife * 100) / ironPatriotMaxLife : 0,
    ironPatriotLifeValue: ironPatriotLife,
    ironPatriotMaxLifeValue: ironPatriotMaxLife,
    exposedThreat:
      exposedThreatMax > 0 ? (exposedThreat * 100) / exposedThreatMax : 0,
    exposedThreatValue: exposedThreat,
    exposedThreatMax,
  };
};
