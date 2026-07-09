import { describe, it, expect } from 'vitest';
import {
  getDamage,
  getThreat,
  isDefeated,
  isCompleted,
} from '../../../src/model/darkAvengers';
import { GameData } from '../../../src/types/GameData';

describe('darkAvengers', () => {
  describe('getDamage', () => {
    it('should return 0 when there are no tables', () => {
      const data: GameData = {
        tables: [],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(getDamage(data)).toBe(0);
    });

    it('should return the sum of ironPatriotDamage from all tables', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 3,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 5,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 2,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(getDamage(data)).toBe(10);
    });
  });

  describe('getThreat', () => {
    it('should return darkAvengersThreatIni when there are no tables', () => {
      const data: GameData = {
        tables: [],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 5,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(getThreat(data)).toBe(5);
    });

    it('should return darkAvengersThreatIni plus sum of darkAvengersThreat from all tables', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 2,
            exposedThreat: 0,
          },
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 3,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 5,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(getThreat(data)).toBe(10); // 5 + 2 + 3
    });
  });

  describe('isDefeated', () => {
    it('should return false when damage is less than ironPatriotMaxLife', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 5,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(isDefeated(data)).toBe(false);
    });

    it('should return true when damage equals ironPatriotMaxLife', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 10,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(isDefeated(data)).toBe(true);
    });

    it('should return true when damage exceeds ironPatriotMaxLife', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 15,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(isDefeated(data)).toBe(true);
    });
  });

  describe('isCompleted', () => {
    it('should return false when threat is less than darkAvengersThreatMax', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 3,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 2,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(isCompleted(data)).toBe(false); // 2 + 3 = 5 < 10
    });

    it('should return true when threat equals darkAvengersThreatMax', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 8,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 2,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(isCompleted(data)).toBe(true); // 2 + 8 = 10
    });

    it('should return true when threat exceeds darkAvengersThreatMax', () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 10,
            exposedThreat: 0,
          },
        ],
        phase: 'planning',
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 2,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10,
      };

      expect(isCompleted(data)).toBe(true); // 2 + 10 = 12 > 10
    });
  });
});
