import { parseData, parseOptions, parseTable } from '../../../src/utils/parsers';
import { PhaseDict } from '../../../src/types/Dicts';

describe('Parsers', () => {
  describe('parseOptions', () => {
    it('should parse options service to options format', () => {
      const optionsService = [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
      ];

      const result = parseOptions(optionsService);

      expect(result).toEqual([
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ]);
    });

    it('should handle empty array', () => {
      const result = parseOptions([]);

      expect(result).toEqual([]);
    });

    it('should handle single option', () => {
      const optionsService = [{ id: 'hero-1', name: 'Iron Man' }];

      const result = parseOptions(optionsService);

      expect(result).toEqual([{ value: 'hero-1', label: 'Iron Man' }]);
    });
  });

  describe('parseTable', () => {
    it('should parse table service to table format', () => {
      const tableService = {
        players: [{ hero: { value: '1', label: 'Hero' } }],
        expert: true,
        saved: false,
        ironPatriotDamage: 2,
        exposed: 6,
        minions: 0,
        darkAvengersThreat: 0,
        exposedThreat: 0,
      };

      const result = parseTable(tableService, 1);

      expect(result).toEqual({
        currentTable: 1,
        players: [{ hero: { value: '1', label: 'Hero' } }],
        expert: true,
        saved: false,
        exposed: 6,
      });
    });

    it('should handle table with no players', () => {
      const tableService = {
        players: [],
        expert: false,
        saved: true,
        ironPatriotDamage: 0,
        exposed: 0,
        minions: 0,
        darkAvengersThreat: 0,
        exposedThreat: 0,
      };

      const result = parseTable(tableService, 0);

      expect(result).toEqual({
        currentTable: 0,
        players: [],
        expert: false,
        saved: true,
        exposed: 0,
      });
    });
  });

  describe('parseData', () => {
    it('should parse data service correctly', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.KINGDOM,
        elcalaMal: false,
        minionsMax: 10,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.phase).toBe(PhaseDict.KINGDOM);
      expect(result.tables).toHaveLength(1);
      expect(result.superLife).toBe(100);
      expect(result.superPlan).toBe(0);
      expect(result.exposed).toBe(0); // (sumExposed: 0) / 10 * 100 = 0%
      expect(result.end).toBeInstanceOf(Date);
    });

    it('should handle empty tables', () => {
      const mockServiceData = {
        tables: [],
        end: 1704067200000,
        phase: PhaseDict.INIT,
        elcalaMal: false,
        minionsMax: 10,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.tables).toEqual([]);
      expect(result.phase).toBe(PhaseDict.INIT);
    });

    it('should calculate percentages correctly with damage', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            ironPatriotDamage: 3,
            exposed: 3,
            minions: 0,
            darkAvengersThreat: 4,
            exposedThreat: 0,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.KINGDOM,
        elcalaMal: false,
        minionsMax: 10,
        darkAvengersThreatIni: 5,
        darkAvengersThreatMax: 20,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.superLife).toBe(70);
      expect(result.superPlan).toBe(45); // (darkAvengersThreatIni: 5 + sumDarkAvengersThreat: 4) / 20 * 100 = 45%
      expect(result.exposed).toBe(30); // (sumExposed: 3) / 10 * 100 = 30%
    });

    it('should handle multiple tables correctly', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            ironPatriotDamage: 1,
            exposed: 2,
            minions: 0,
            darkAvengersThreat: 2,
            exposedThreat: 0,
          },
          {
            players: [],
            expert: true,
            saved: true,
            ironPatriotDamage: 2,
            exposed: 1,
            minions: 0,
            darkAvengersThreat: 1,
            exposedThreat: 0,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.EXPOSED,
        elcalaMal: false,
        minionsMax: 10,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.tables).toHaveLength(2);
      expect(result.superLife).toBe(70); // (10 - 3) / 10 = 70%
      expect(result.superPlan).toBe(30); // (darkAvengersThreatIni: 0 + sumDarkAvengersThreat: 3) / 10 * 100 = 30%
      expect(result.exposed).toBe(30); // (sumExposed: 3) / 10 * 100 = 30%
    });
  });
});
