export const PhaseDict = {
  INIT: 0,
  TABLES: 1,
  SHIP_FALL: 2,
  ENEMY: 3,
  OSBORN_REVEAL: 4,
  VERANKE_LOSE: 5,
  VERANKE_WIN: 6,
  KINGDOM: 7,
  KINGDOM_DEFEATED: 8,
  EXPOSED: 9,
  CAPTAIN_LOSE: 10,
  CAPTAIN_WIN: 11,
} as const;
export type Phase = (typeof PhaseDict)[keyof typeof PhaseDict];

export const PanelTypeDict = {
  OSBORN: 1,
  ELCALA_MAL: 2,
  DARK_REIGN: 3,
  DARK_AVENGERS: 4,
  KINGDOM_DEFEATED: 5,
  IRON_PATRIOT: 6,
  EXPOSED: 7,
  CAPTAIN_AMERICA: 8,
  NORMAN_OSBORN: 9,
} as const;
export type PanelType = (typeof PanelTypeDict)[keyof typeof PanelTypeDict];

export const StatusBarDict = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
} as const;
export type StatusBar = (typeof StatusBarDict)[keyof typeof StatusBarDict];

export const SizeDict = {
  S: 0,
  M: 1,
  L: 2,
} as const;
export type Size = (typeof SizeDict)[keyof typeof SizeDict];
