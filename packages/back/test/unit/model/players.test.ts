import { describe, it, expect } from "vitest";
import { getNumPlayers } from "../../../src/model/players";
import { GameData } from "../../../src/types/GameData";

describe("players", () => {
  describe("getNumPlayers", () => {
    it("should return 0 for both normal and expert when there are no tables", () => {
      const data: GameData = {
        tables: [],
        phase: "planning",
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10
      };

      expect(getNumPlayers(data)).toEqual({
        normal: 0,
        expert: 0
      });
    });

    it("should count normal players correctly", () => {
      const data: GameData = {
        tables: [
          {
            players: [{}, {}, {}] as any[],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          },
          {
            players: [{}, {}] as any[],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          }
        ],
        phase: "planning",
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10
      };

      expect(getNumPlayers(data)).toEqual({
        normal: 5,
        expert: 0
      });
    });

    it("should count expert players correctly", () => {
      const data: GameData = {
        tables: [
          {
            players: [{}, {}] as any[],
            saved: false,
            expert: true,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          },
          {
            players: [{}, {}, {}] as any[],
            saved: false,
            expert: true,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          }
        ],
        phase: "planning",
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10
      };

      expect(getNumPlayers(data)).toEqual({
        normal: 0,
        expert: 5
      });
    });

    it("should count both normal and expert players separately", () => {
      const data: GameData = {
        tables: [
          {
            players: [{}, {}] as any[],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          },
          {
            players: [{}, {}, {}] as any[],
            saved: false,
            expert: true,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          },
          {
            players: [{}] as any[],
            saved: false,
            expert: false,
            ironPatriotDamage: 0,
            exposed: 0,
            minions: 0,
            darkAvengersThreat: 0,
            exposedThreat: 0
          }
        ],
        phase: "planning",
        end: 0,
        elcalaMal: [],
        minionsMax: 0,
        darkAvengersThreatIni: 0,
        darkAvengersThreatMax: 10,
        ironPatriotLife: 10,
        ironPatriotMaxLife: 10,
        exposedThreatIni: 0,
        exposedThreatMax: 10
      };

      expect(getNumPlayers(data)).toEqual({
        normal: 3,
        expert: 3
      });
    });
  });
});
