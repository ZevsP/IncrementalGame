/**
 * Player model for the Incremental Game
 */

export type Gender = 'male' | 'female';

export type PlayerRole = 'helper' | 'teenager' | 'adult' | 'parent';

export type Interest = 'sport' | 'music' | 'reading' | 'cooking' | 'gaming' | 'art';

export interface PlayerStats {
  health: number;       // 0-100: общее здоровье
  energy: number;       // 0-100: энергия от еды
  knowledge: number;    // 0-100: ум (знание)
  creativity: number;   // 0-100: творчество (смекалка и находчивость)
  endurance: number;    // 0-100: выносливость от спорта
  hygiene: number;      // 0-100: гигиена
  satisfaction: number; // 0-100: удовлетворённость
}

export interface Player {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  role: PlayerRole;
  interests: Interest[];
  stats: PlayerStats;
  hoursSlept: number;
  bonuses: PlayerBonus[];
}

export interface PlayerBonus {
  id: string;
  name: string;
  description: string;
  multiplier: number;     // множитель в процентах
  affectedStat: keyof PlayerStats;
  source: 'interest' | 'achievement' | 'family';
  active: boolean;
}

export function createDefaultPlayer(name: string, gender: Gender, age: number, interests: Interest[]): Player {
  return {
    id: crypto.randomUUID(),
    name,
    gender,
    age,
    role: age < 13 ? 'helper' : age < 18 ? 'teenager' : age < 30 ? 'adult' : 'parent',
    interests,
    stats: {
      health: 100,
      energy: 80,
      knowledge: 10,
      creativity: 10,
      endurance: 10,
      hygiene: 100,
      satisfaction: 80
    },
    hoursSlept: 8,
    bonuses: []
  };
}

export function getRoleByAge(age: number): PlayerRole {
  if (age < 13) return 'helper';
  if (age < 18) return 'teenager';
  if (age < 30) return 'adult';
  return 'parent';
}
