export type DayOfWeekId = 1 | 2 | 3; // 1 = Lunedì, 2 = Mercoledì, 3 = Venerdì

export interface ExerciseSet {
  setNumber: number;
  targetReps: number | string;
  weightKg?: number | string;
  completed?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'Riscaldamento' | 'Petto' | 'Spalle' | 'Tricipiti' | 'Dorso' | 'Bicipiti' | 'Addome' | 'Gambe' | 'Polpacci' | 'Cardio' | 'Defaticamento';
  targetMuscles: string[];
  prescription: string; // e.g. "3x10", "10' Tappeto", "45\""
  isTimeBased?: boolean;
  timeDurationSeconds?: number;
  isSuperset?: boolean;
  supersetPairId?: string;
  supersetPairName?: string;
  supersetNote?: string;
  setsCount: number;
  defaultReps: number | string;
  defaultWeightKg?: number | string;
  weightNote?: string;
  defaultRestSeconds: number;
  gripType: string; // "Presa prona", "Presa neutra", "Presa inversa / supina", etc.
  setupDescription: string;
  executionSteps: string[];
  keyTips: string[];
  commonMistakes: string[];
  videoTutorialUrl: string; // YouTube embed URL
  videoTitle: string;
  illustrationKey: string;
}

export interface WorkoutDay {
  id: DayOfWeekId;
  dayName: string; // "Lunedì", "Mercoledì", "Venerdì"
  dayNumber: number; // 1 = Mon, 3 = Wed, 5 = Fri in JavaScript getDay()
  title: string; // e.g. "Giorno 1: Push & Core"
  subtitle: string; // e.g. "Petto, Spalle, Tricipiti, Addome & Defaticamento"
  estimatedDuration: string; // e.g. "60-70 min"
  accentColor: string;
  exercises: Exercise[];
}

export interface StoredSetLog {
  reps: string;
  weight: string;
  completed: boolean;
}

export type WorkoutSessionLogs = Record<string, StoredSetLog[]>; // exerciseId -> sets
