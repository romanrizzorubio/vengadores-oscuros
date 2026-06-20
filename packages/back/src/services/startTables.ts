import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { PhaseDict } from "../types/dicts";
import {
  ENEMY_COMP,
  ENEMY_INIT,
  EXPOSED_MAX,
  SHIP_MAX,
  SPIDER_WOMAN_MAX,
  SUPER_LIFE_EXP_MAX,
  SUPER_LIFE_MAX,
  SUPER_PLAN_INI,
  SUPER_PLAN_MAX,
  WATCHER_TABLE,
  MINIONS_MAX_PER_PLAYER,
  DARK_AVENGERS_THREAT_INI_PER_PLAYER,
  DARK_AVENGERS_THREAT_MAX_PER_PLAYER,
  IRON_PATRIOT_LIFE_PER_PLAYER,
  IRON_PATRIOT_LIFE_EXP_PER_PLAYER,
  EXPOSED_THREAT_INI_PER_PLAYER,
  EXPOSED_THREAT_MAX_PER_PLAYER
} from "../types/constants";
import { getNumPlayers } from "../model/players";

export function startTables(): GameData {
  const state = updateGameState((data) => {
    const { normal, expert } = getNumPlayers(data);
    const numPlayers = normal + expert;

    data.phase = PhaseDict.KINGDOM;
    data.spiderWomanMax = SPIDER_WOMAN_MAX;
    data.superLifeMax = SUPER_LIFE_MAX * normal + SUPER_LIFE_EXP_MAX * expert;
    data.superPlanIni = SUPER_PLAN_INI * numPlayers;
    data.superPlanMax = SUPER_PLAN_MAX * numPlayers;
    data.shipMax = SHIP_MAX * numPlayers;
    data.exposedMax = EXPOSED_MAX * numPlayers;
    data.enemyInit = ENEMY_INIT * data.tables.length + ENEMY_COMP * numPlayers;
    data.minionsMax = MINIONS_MAX_PER_PLAYER * numPlayers;
    data.darkAvengersThreatIni = DARK_AVENGERS_THREAT_INI_PER_PLAYER * numPlayers;
    data.darkAvengersThreatMax = DARK_AVENGERS_THREAT_MAX_PER_PLAYER * numPlayers;
    data.ironPatriotLife = IRON_PATRIOT_LIFE_PER_PLAYER * normal + IRON_PATRIOT_LIFE_EXP_PER_PLAYER * expert;
    data.ironPatriotMaxLife = IRON_PATRIOT_LIFE_PER_PLAYER * normal + IRON_PATRIOT_LIFE_EXP_PER_PLAYER * expert;
    data.exposedThreatIni = EXPOSED_THREAT_INI_PER_PLAYER * numPlayers;
    data.exposedThreatMax = EXPOSED_THREAT_MAX_PER_PLAYER * numPlayers;

    // Elcala Mal will be added manually via API when needed
  });

  broadcastGame();
  return state;
}
