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

export interface NoteEntry {
  id: string;
  title: string;
  date: string; // e.g. "03/11/2026"
  time: string; // e.g. "12:24"
  timestamp: number;
  dayId?: DayOfWeekId;
  dayName?: string;
  content: string;
  badge?: string;
  isCustom?: boolean;
}

export interface DayMonthlyAnnotation {
  id: string;
  text: string;
  date: string;
  time: string;
  timestamp: number;
  dayId: DayOfWeekId;
  dayName: string;
}

export interface MonthlyProgressSnapshot {
  monthKey: string; // e.g. "2026-11"
  monthName: string; // e.g. "Novembre 2026"
  targetDate: string; // e.g. "2026-12-01T00:00:00"
  baselineWeights: Record<string, string>; // exerciseId -> baseline weight kg
  annotations: DayMonthlyAnnotation[];
}

export type ActiveViewMode = 'workout' | 'notes' | 'month-after' | 'weight';

export interface WorkoutCustomizations {
  appTitle?: string;
  appBadge?: string;
  appSubtitle?: string;
  completionMessage?: string;
  dayOverrides?: Record<number, {
    title?: string;
    subtitle?: string;
    dayName?: string;
    estimatedDuration?: string;
  }>;
  exerciseOverrides?: Record<string, {
    name?: string;
    prescription?: string;
    category?: any;
    weightNote?: string;
    gripType?: string;
    setupDescription?: string;
  }>;
}

export interface ExercisePeriodRecord {
  exerciseId: string;
  name: string;
  prescription: string;
  category: string;
  baselineText: string;
  baselineSub?: string;
  currentText: string;
  currentSub?: string;
  status: 'increased' | 'decreased' | 'stable' | 'time';
  customDiffText?: string;
  isTimeBased?: boolean;
}

export interface DayPeriodRecord {
  dayId: DayOfWeekId;
  dayName: string;
  title: string;
  exercises: ExercisePeriodRecord[];
}

export interface WorkoutPeriodSnapshot {
  id: string;
  title: string;
  startDate: string; // e.g. "01/11/2026"
  endDate: string; // e.g. "13/11/2026"
  notes?: string;
  createdAt: number;
  daysData: DayPeriodRecord[];
  isInitialBaseline?: boolean;
}

export interface WeightPeriodRecord {
  id: string;
  weight: string; // e.g. "74.0"
  startDate: string; // e.g. "01/11/2026"
  endDate: string; // e.g. "13/11/2026"
  notes?: string;
  createdAt: number;
}

