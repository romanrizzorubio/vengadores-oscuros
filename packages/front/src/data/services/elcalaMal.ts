import { post } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { DataService } from '../../types/Data';

export const addElcalaMalService = async (table: number) => {
  const data: DataService = await post(endpoints.elcalaMalAdd, { table });
  return parseData(data, table);
};

export const updateElcalaMalLifeService = async (table: number, life: number) => {
  const data: DataService = await post(endpoints.elcalaMalLife, { table, value: life });
  return parseData(data, table);
};
