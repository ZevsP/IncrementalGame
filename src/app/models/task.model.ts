/**
 * Task model for the Incremental Game
 */

import { PlayerStats } from './player.model';
import { RoomType } from './room.model';

export type TaskCategory = 'personal' | 'social';

export type TaskSubcategory = 'hygiene' | 'food' | 'study' | 'hobby' | 'sport' | 'sleep';

export type TaskPhase = 'preparation' | 'execution' | 'verification' | 'rest';

export interface TaskReward {
  stat: keyof PlayerStats;
  value: number;
}

export interface TaskRequirement {
  stat: keyof PlayerStats;
  minValue: number;
}

export interface Task {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  category: TaskCategory;
  subcategory: TaskSubcategory;
  roomType: RoomType | null;  // null = можно выполнить где угодно
  baseTime: number;           // минуты на выполнение
  currentPhase: TaskPhase;
  progress: number;           // 0-100
  frequency: 'daily' | 'weekly' | 'monthly';
  timesPerWeek: number;       // сколько раз в неделю нужно выполнять
  completedToday: boolean;
  completedThisWeek: number;
  rewards: TaskReward[];
  requirements: TaskRequirement[];
  toolBonus: number;          // множитель от инструментов (0-1)
}

export interface TaskDefinition {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  category: TaskCategory;
  subcategory: TaskSubcategory;
  roomType: RoomType | null;
  baseTime: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  timesPerWeek: number;
  rewards: TaskReward[];
  requirements: TaskRequirement[];
}

export const TASK_DEFINITIONS: TaskDefinition[] = [
  // Personal - Hygiene
  {
    id: 'brush_teeth',
    name: 'Brush Teeth',
    nameRu: 'Почистить зубы',
    description: 'Brush your teeth to maintain hygiene',
    category: 'personal',
    subcategory: 'hygiene',
    roomType: 'bathroom',
    baseTime: 5,
    frequency: 'daily',
    timesPerWeek: 14,
    rewards: [{ stat: 'hygiene', value: 10 }, { stat: 'health', value: 2 }],
    requirements: []
  },
  {
    id: 'wash_face',
    name: 'Wash Face',
    nameRu: 'Умыться',
    description: 'Wash your face',
    category: 'personal',
    subcategory: 'hygiene',
    roomType: 'bathroom',
    baseTime: 5,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'hygiene', value: 10 }],
    requirements: []
  },
  {
    id: 'take_shower',
    name: 'Take Shower',
    nameRu: 'Принять душ',
    description: 'Take a refreshing shower',
    category: 'personal',
    subcategory: 'hygiene',
    roomType: 'bathroom',
    baseTime: 15,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'hygiene', value: 30 }, { stat: 'satisfaction', value: 5 }],
    requirements: []
  },
  // Personal - Food
  {
    id: 'eat_breakfast',
    name: 'Have Breakfast',
    nameRu: 'Позавтракать',
    description: 'Eat a nutritious breakfast',
    category: 'personal',
    subcategory: 'food',
    roomType: 'kitchen',
    baseTime: 20,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'energy', value: 25 }, { stat: 'health', value: 5 }],
    requirements: []
  },
  {
    id: 'eat_lunch',
    name: 'Have Lunch',
    nameRu: 'Пообедать',
    description: 'Have a proper lunch',
    category: 'personal',
    subcategory: 'food',
    roomType: 'kitchen',
    baseTime: 30,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'energy', value: 30 }, { stat: 'health', value: 5 }],
    requirements: []
  },
  {
    id: 'eat_dinner',
    name: 'Have Dinner',
    nameRu: 'Поужинать',
    description: 'Have dinner',
    category: 'personal',
    subcategory: 'food',
    roomType: 'kitchen',
    baseTime: 30,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'energy', value: 25 }],
    requirements: []
  },
  {
    id: 'drink_water',
    name: 'Drink Water',
    nameRu: 'Попить воды',
    description: 'Stay hydrated',
    category: 'personal',
    subcategory: 'food',
    roomType: 'kitchen',
    baseTime: 2,
    frequency: 'daily',
    timesPerWeek: 21,
    rewards: [{ stat: 'energy', value: 5 }, { stat: 'health', value: 2 }],
    requirements: []
  },
  // Personal - Study
  {
    id: 'do_homework',
    name: 'Do Homework',
    nameRu: 'Делать домашнее задание',
    description: 'Complete your homework assignments',
    category: 'personal',
    subcategory: 'study',
    roomType: 'library',
    baseTime: 60,
    frequency: 'daily',
    timesPerWeek: 5,
    rewards: [{ stat: 'knowledge', value: 15 }],
    requirements: [{ stat: 'energy', minValue: 20 }]
  },
  {
    id: 'read_book',
    name: 'Read a Book',
    nameRu: 'Читать книгу',
    description: 'Read a book to gain knowledge',
    category: 'personal',
    subcategory: 'study',
    roomType: 'library',
    baseTime: 30,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'knowledge', value: 10 }, { stat: 'creativity', value: 5 }],
    requirements: [{ stat: 'energy', minValue: 10 }]
  },
  // Personal - Hobby
  {
    id: 'play_music',
    name: 'Play Music',
    nameRu: 'Играть музыку',
    description: 'Practice playing music',
    category: 'personal',
    subcategory: 'hobby',
    roomType: 'library',
    baseTime: 45,
    frequency: 'daily',
    timesPerWeek: 3,
    rewards: [{ stat: 'creativity', value: 15 }, { stat: 'satisfaction', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 15 }]
  },
  {
    id: 'draw',
    name: 'Draw',
    nameRu: 'Рисовать',
    description: 'Practice drawing and art',
    category: 'personal',
    subcategory: 'hobby',
    roomType: 'living_room',
    baseTime: 40,
    frequency: 'daily',
    timesPerWeek: 3,
    rewards: [{ stat: 'creativity', value: 15 }, { stat: 'satisfaction', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 10 }]
  },
  {
    id: 'play_games',
    name: 'Play Games',
    nameRu: 'Играть в игры',
    description: 'Play video or board games',
    category: 'personal',
    subcategory: 'hobby',
    roomType: 'living_room',
    baseTime: 60,
    frequency: 'daily',
    timesPerWeek: 3,
    rewards: [{ stat: 'satisfaction', value: 20 }, { stat: 'creativity', value: 5 }],
    requirements: [{ stat: 'energy', minValue: 10 }]
  },
  // Personal - Sport
  {
    id: 'exercise',
    name: 'Exercise',
    nameRu: 'Тренироваться',
    description: 'Do physical exercises',
    category: 'personal',
    subcategory: 'sport',
    roomType: 'living_room',
    baseTime: 45,
    frequency: 'daily',
    timesPerWeek: 5,
    rewards: [{ stat: 'endurance', value: 15 }, { stat: 'health', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 30 }]
  },
  // Personal - Sleep
  {
    id: 'sleep',
    name: 'Sleep',
    nameRu: 'Спать',
    description: 'Get a good night\'s sleep',
    category: 'personal',
    subcategory: 'sleep',
    roomType: 'bedroom',
    baseTime: 480,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'energy', value: 100 }, { stat: 'health', value: 20 }],
    requirements: []
  },
  {
    id: 'make_bed',
    name: 'Make Bed',
    nameRu: 'Заправить кровать',
    description: 'Make your bed in the morning',
    category: 'personal',
    subcategory: 'hygiene',
    roomType: 'bedroom',
    baseTime: 5,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'satisfaction', value: 5 }],
    requirements: []
  },
  {
    id: 'get_dressed',
    name: 'Get Dressed',
    nameRu: 'Одеться',
    description: 'Put on clothes for the day',
    category: 'personal',
    subcategory: 'hygiene',
    roomType: 'bedroom',
    baseTime: 10,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'satisfaction', value: 5 }],
    requirements: []
  },
  // Social - Cleaning tasks
  {
    id: 'vacuum',
    name: 'Vacuum',
    nameRu: 'Пылесосить',
    description: 'Vacuum the floors',
    category: 'social',
    subcategory: 'hygiene',
    roomType: null,
    baseTime: 30,
    frequency: 'weekly',
    timesPerWeek: 2,
    rewards: [{ stat: 'satisfaction', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 20 }]
  },
  {
    id: 'mop_floors',
    name: 'Mop Floors',
    nameRu: 'Мыть полы',
    description: 'Mop the floors',
    category: 'social',
    subcategory: 'hygiene',
    roomType: null,
    baseTime: 40,
    frequency: 'weekly',
    timesPerWeek: 1,
    rewards: [{ stat: 'satisfaction', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 25 }]
  },
  {
    id: 'dust',
    name: 'Dust Surfaces',
    nameRu: 'Вытирать пыль',
    description: 'Dust all surfaces',
    category: 'social',
    subcategory: 'hygiene',
    roomType: null,
    baseTime: 20,
    frequency: 'weekly',
    timesPerWeek: 2,
    rewards: [{ stat: 'satisfaction', value: 5 }],
    requirements: [{ stat: 'energy', minValue: 10 }]
  },
  {
    id: 'do_laundry',
    name: 'Do Laundry',
    nameRu: 'Стирать бельё',
    description: 'Wash and dry clothes',
    category: 'social',
    subcategory: 'hygiene',
    roomType: 'bathroom',
    baseTime: 30,
    frequency: 'weekly',
    timesPerWeek: 2,
    rewards: [{ stat: 'hygiene', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 15 }]
  },
  {
    id: 'wash_dishes',
    name: 'Wash Dishes',
    nameRu: 'Мыть посуду',
    description: 'Wash the dishes',
    category: 'social',
    subcategory: 'hygiene',
    roomType: 'kitchen',
    baseTime: 15,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'satisfaction', value: 5 }],
    requirements: [{ stat: 'energy', minValue: 5 }]
  },
  {
    id: 'take_out_trash',
    name: 'Take Out Trash',
    nameRu: 'Выносить мусор',
    description: 'Take out the garbage',
    category: 'social',
    subcategory: 'hygiene',
    roomType: 'kitchen',
    baseTime: 10,
    frequency: 'daily',
    timesPerWeek: 3,
    rewards: [{ stat: 'satisfaction', value: 5 }],
    requirements: [{ stat: 'energy', minValue: 5 }]
  },
  {
    id: 'cook_meal',
    name: 'Cook Meal',
    nameRu: 'Готовить еду',
    description: 'Prepare food for the family',
    category: 'social',
    subcategory: 'food',
    roomType: 'kitchen',
    baseTime: 45,
    frequency: 'daily',
    timesPerWeek: 7,
    rewards: [{ stat: 'creativity', value: 5 }, { stat: 'satisfaction', value: 10 }],
    requirements: [{ stat: 'energy', minValue: 20 }]
  },
  {
    id: 'change_bedding',
    name: 'Change Bedding',
    nameRu: 'Менять бельё',
    description: 'Change bed sheets and pillowcases',
    category: 'social',
    subcategory: 'hygiene',
    roomType: 'bedroom',
    baseTime: 20,
    frequency: 'weekly',
    timesPerWeek: 1,
    rewards: [{ stat: 'hygiene', value: 15 }, { stat: 'satisfaction', value: 5 }],
    requirements: [{ stat: 'energy', minValue: 15 }]
  }
];

export function createTaskFromDefinition(def: TaskDefinition): Task {
  return {
    id: def.id,
    name: def.name,
    nameRu: def.nameRu,
    description: def.description,
    category: def.category,
    subcategory: def.subcategory,
    roomType: def.roomType,
    baseTime: def.baseTime,
    currentPhase: 'preparation',
    progress: 0,
    frequency: def.frequency,
    timesPerWeek: def.timesPerWeek,
    completedToday: false,
    completedThisWeek: 0,
    rewards: def.rewards,
    requirements: def.requirements,
    toolBonus: 0
  };
}

export function getTaskEffectiveTime(task: Task): number {
  return Math.round(task.baseTime * (1 - task.toolBonus));
}

export function getSubcategoryIcon(subcategory: TaskSubcategory): string {
  const icons: Record<TaskSubcategory, string> = {
    hygiene: 'bi-droplet',
    food: 'bi-egg-fried',
    study: 'bi-book',
    hobby: 'bi-palette',
    sport: 'bi-bicycle',
    sleep: 'bi-moon'
  };
  return icons[subcategory];
}

export function getCategoryColor(category: TaskCategory): string {
  return category === 'personal' ? '#667eea' : '#f5576c';
}
