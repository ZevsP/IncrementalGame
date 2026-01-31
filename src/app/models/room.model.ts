/**
 * Room model for the Incremental Game
 */

export type RoomType = 'kitchen' | 'living_room' | 'bedroom' | 'hallway' | 'bathroom' | 'library';

export interface RoomDimensions {
  width: number;  // в метрах
  length: number; // в метрах
}

export interface RoomFeatures {
  windows: number;
  doors: number;
  furniture: string[];
  appliances: string[];
}

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  dimensions: RoomDimensions;
  features: RoomFeatures;
  isUnlocked: boolean;
  cleanliness: number;  // 0-100
  order: number;        // 0-100
  lastCleaned: number;  // timestamp
}

export function getRoomName(type: RoomType, locale: 'ru' | 'en' = 'ru'): string {
  const names: Record<RoomType, { ru: string; en: string }> = {
    kitchen: { ru: 'Кухня', en: 'Kitchen' },
    living_room: { ru: 'Гостиная', en: 'Living Room' },
    bedroom: { ru: 'Спальня', en: 'Bedroom' },
    hallway: { ru: 'Прихожая', en: 'Hallway' },
    bathroom: { ru: 'Санузел', en: 'Bathroom' },
    library: { ru: 'Библиотека', en: 'Library' }
  };
  return names[type][locale];
}

export function getRoomSpecialAbilities(type: RoomType): string[] {
  const abilities: Record<RoomType, string[]> = {
    kitchen: ['eat', 'drink', 'cook'],
    living_room: ['rest', 'entertainment', 'socialize'],
    bedroom: ['sleep', 'rest', 'change_clothes'],
    hallway: ['dress', 'leave_home'],
    bathroom: ['hygiene', 'wash', 'brush_teeth'],
    library: ['study', 'read', 'board_games', 'music']
  };
  return abilities[type];
}

export function createDefaultRoom(type: RoomType, unlocked: boolean = true): Room {
  const defaultDimensions: Record<RoomType, RoomDimensions> = {
    kitchen: { width: 3, length: 4 },
    living_room: { width: 5, length: 6 },
    bedroom: { width: 4, length: 4 },
    hallway: { width: 2, length: 4 },
    bathroom: { width: 2, length: 3 },
    library: { width: 3, length: 4 }
  };

  const defaultFeatures: Record<RoomType, RoomFeatures> = {
    kitchen: { 
      windows: 1, 
      doors: 1, 
      furniture: ['table', 'chairs'], 
      appliances: ['refrigerator', 'stove', 'microwave'] 
    },
    living_room: { 
      windows: 2, 
      doors: 1, 
      furniture: ['sofa', 'tv_stand', 'coffee_table'], 
      appliances: ['tv'] 
    },
    bedroom: { 
      windows: 1, 
      doors: 1, 
      furniture: ['bed', 'wardrobe', 'nightstand'], 
      appliances: [] 
    },
    hallway: { 
      windows: 0, 
      doors: 2, 
      furniture: ['shoe_rack', 'coat_hanger'], 
      appliances: [] 
    },
    bathroom: { 
      windows: 1, 
      doors: 1, 
      furniture: ['cabinet'], 
      appliances: ['washing_machine'] 
    },
    library: { 
      windows: 1, 
      doors: 1, 
      furniture: ['bookshelf', 'desk', 'chair'], 
      appliances: ['radio'] 
    }
  };

  return {
    id: crypto.randomUUID(),
    type,
    name: getRoomName(type),
    dimensions: defaultDimensions[type],
    features: defaultFeatures[type],
    isUnlocked: unlocked,
    cleanliness: 100,
    order: 100,
    lastCleaned: Date.now()
  };
}

export function calculateRoomArea(room: Room): number {
  return room.dimensions.width * room.dimensions.length;
}
