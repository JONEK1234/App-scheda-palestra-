import React, { useState, useEffect } from 'react';
import { 
  WORKOUT_DAYS, 
  getTodayWorkoutDayId, 
  isActualWorkoutDay 
} from './data/workoutData';
import { 
  DayOfWeekId, 
  Exercise, 
  WorkoutSessionLogs, 
  StoredSetLog 
} from './types/workout';
import { Header } from './components/Header';
import { BodyWeightWidget } from './components/BodyWeightWidget';
import { DaySelector } from './components/DaySelector';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseModal } from './components/ExerciseModal';
import { RestTimer } from './components/RestTimer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  Clock, 
  Dumbbell, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Share2, 
  Award,
  Layers
} from 'lucide-react';

const STORAGE_KEY = 'ironroutine_user_logs_v1';

// Initialize logs with default sets and weights, merging with user's saved data
function getInitialWorkoutLogs(): WorkoutSessionLogs {
  let saved: WorkoutSessionLogs = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch {
    saved = {};
  }

  const result: WorkoutSessionLogs = { ...saved };

  WORKOUT_DAYS.forEach((day) => {
    day.exercises.forEach((ex) => {
      const setsCount = ex.isTimeBased ? 1 : ex.setsCount;
      const currentSets = result[ex.id] ? [...result[ex.id]] : [];

      for (let i = 0; i < setsCount; i++) {
        const existingSet = currentSets[i];
        if (!existingSet) {
          currentSets[i] = {
            reps: String(ex.defaultReps).split('+')[0].trim(),
            weight: ex.defaultWeightKg !== undefined ? String(ex.defaultWeightKg) : '',
            completed: false,
          };
        } else if (
          ex.defaultWeightKg !== undefined &&
          (existingSet.weight === '' || existingSet.weight === undefined)
        ) {
          // Pre-populate with default weight if not set by user
          currentSets[i] = {
            ...existingSet,
            weight: String(ex.defaultWeightKg),
          };
        }
      }
      result[ex.id] = currentSets;
    });
  });

  return result;
}

export default function App() {
  // Auto-detect initial day based on real-world today
  const [selectedDayId, setSelectedDayId] = useState<DayOfWeekId>(() => getTodayWorkoutDayId());
  
  // Stored sets and logs: exerciseId -> StoredSetLog[]
  const [logs, setLogs] = useState<WorkoutSessionLogs>(() => getInitialWorkoutLogs());

  // Modal for technical guide & tutorial video
  const [activeExerciseModal, setActiveExerciseModal] = useState<Exercise | null>(null);

  const BODYWEIGHT_STORAGE_KEY = 'ironroutine_user_bodyweight';

  // Body weight state (default 74 kg, permanent across days & sessions)
  const [bodyWeight, setBodyWeight] = useState<string>(() => {
    try {
      return localStorage.getItem(BODYWEIGHT_STORAGE_KEY) || '74';
    } catch {
      return '74';
    }
  });

  const handleUpdateBodyWeight = (newWeight: string) => {
    setBodyWeight(newWeight);
    try {
      localStorage.setItem(BODYWEIGHT_STORAGE_KEY, newWeight);
    } catch {
      // storage fallback
    }
  };

  // Rest Timer state
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [restTimerSeconds, setRestTimerSeconds] = useState(90);

  // Sync logs to localStorage permanently
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {
      // Storage error fallback
    }
  }, [logs]);

  // Current active workout day data
  const currentDay = WORKOUT_DAYS.find((d) => d.id === selectedDayId) || WORKOUT_DAYS[0];

  // Update a specific set for an exercise
  const handleUpdateSetLog = (
    exerciseId: string,
    setIndex: number,
    updated: Partial<StoredSetLog>
  ) => {
    setLogs((prev) => {
      const currentSets = prev[exerciseId] ? [...prev[exerciseId]] : [];
      while (currentSets.length <= setIndex) {
        currentSets.push({ reps: '', weight: '', completed: false });
      }
      currentSets[setIndex] = {
        ...currentSets[setIndex],
        ...updated,
      };
      return {
        ...prev,
        [exerciseId]: currentSets,
      };
    });
  };

  // Apply a weight to all sets of an exercise
  const handleApplyWeightToAllSets = (exerciseId: string, weight: string) => {
    setLogs((prev) => {
      const exercise = WORKOUT_DAYS.flatMap((d) => d.exercises).find((e) => e.id === exerciseId);
      const setsCount = exercise ? (exercise.isTimeBased ? 1 : exercise.setsCount) : 3;
      const currentSets = prev[exerciseId] ? [...prev[exerciseId]] : [];
      while (currentSets.length < setsCount) {
        currentSets.push({
          reps: exercise ? String(exercise.defaultReps).split('+')[0].trim() : '10',
          weight: '',
          completed: false,
        });
      }
      const updatedSets = currentSets.map((s) => ({
        ...s,
        weight,
      }));
      return {
        ...prev,
        [exerciseId]: updatedSets,
      };
    });
  };

  // Trigger rest timer
  const handleTriggerRestTimer = (seconds: number) => {
    setRestTimerSeconds(seconds);
    setIsRestTimerOpen(true);
  };

  // Reset current day's progress (keeps user saved weights and reps!)
  const handleResetCurrentDay = () => {
    if (window.confirm(`Vuoi azzerare tutte le spunte per ${currentDay.dayName}? (I tuoi kg e ripetizioni rimangono salvati)`)) {
      setLogs((prev) => {
        const next = { ...prev };
        currentDay.exercises.forEach((ex) => {
          if (next[ex.id]) {
            next[ex.id] = next[ex.id].map((s) => ({ ...s, completed: false }));
          }
        });
        return next;
      });
    }
  };

  // Compute completed exercises count for the current workout
  const completedExercisesCount = currentDay.exercises.filter((ex) => {
    const exLogs = logs[ex.id] || [];
    if (ex.isTimeBased) {
      return exLogs[0]?.completed === true;
    }
    return (
      exLogs.length >= ex.setsCount &&
      exLogs.slice(0, ex.setsCount).every((s) => s?.completed === true)
    );
  }).length;

  const totalExercisesCount = currentDay.exercises.length;
  const isDayFinished = completedExercisesCount === totalExercisesCount && totalExercisesCount > 0;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Offline Connectivity Toast */}
      <OfflineIndicator />

      {/* Main App Header */}
      <Header
        completedCount={completedExercisesCount}
        totalCount={totalExercisesCount}
        onToggleTimer={() => setIsRestTimerOpen(!isRestTimerOpen)}
        isTimerOpen={isRestTimerOpen}
        onResetSession={handleResetCurrentDay}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 space-y-6">
        {/* Permanent iPhone-Style Body Weight Widget */}
        <BodyWeightWidget
          weight={bodyWeight}
          onUpdateWeight={handleUpdateBodyWeight}
        />

        {/* Day Selector Navigation */}
        <DaySelector
          days={WORKOUT_DAYS}
          selectedDayId={selectedDayId}
          onSelectDay={(dayId) => setSelectedDayId(dayId)}
        />

        {/* Current Workout Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-5 sm:p-6 shadow-2xl overflow-hidden">
          {/* Subtle glowing orb in background */}
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: currentDay.accentColor }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
                  {currentDay.dayName}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{currentDay.estimatedDuration}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentDay.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                {currentDay.subtitle}
              </p>
            </div>

            {/* Workout Quick Summary Pill */}
            <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl shrink-0">
              <div className="text-center px-2">
                <span className="block text-lg font-black text-white">
                  {currentDay.exercises.length}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                  Esercizi
                </span>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div className="text-center px-2">
                <span className="block text-lg font-black text-emerald-400">
                  {completedExercisesCount}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                  Completati
                </span>
              </div>
            </div>
          </div>

          {/* Celebration banner when entire workout is finished */}
          {isDayFinished && (
            <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center gap-3 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/40 animate-fade-in text-emerald-300 text-xs">
              <Award className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <strong className="block font-bold text-white text-sm">
                  Ottimo lavoro! Sessione completata con successo! 🔥
                </strong>
                <span>
                  Hai completato tutti i movimenti di {currentDay.dayName}. I tuoi carichi sono salvati per la prossima volta.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* List of Exercises for the Day */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Dumbbell className="w-3.5 h-3.5 text-red-500" />
              <span>Sequenza Esercizi ({currentDay.exercises.length})</span>
            </h3>
            <span className="text-[11px] text-zinc-400">
              Tocca un esercizio per video tutorial e guida alla presa
            </span>
          </div>

          <div className="space-y-4">
            {currentDay.exercises.map((exercise, index) => {
              const currentExerciseLogs = logs[exercise.id] || [];

              return (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  exerciseIndex={index}
                  setLogs={currentExerciseLogs}
                  onUpdateSetLog={handleUpdateSetLog}
                  onApplyWeightToAllSets={handleApplyWeightToAllSets}
                  onOpenTutorial={(ex) => setActiveExerciseModal(ex)}
                  onTriggerRestTimer={handleTriggerRestTimer}
                  accentColor={currentDay.accentColor}
                />
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating / Minimized Rest Timer */}
      <RestTimer
        initialSeconds={restTimerSeconds}
        isOpen={isRestTimerOpen}
        onClose={() => setIsRestTimerOpen(false)}
        accentColor={currentDay.accentColor}
      />

      {/* Full Detailed Exercise Modal (Photo/Illustration, Video Tutorial, Grip, Errors) */}
      <ExerciseModal
        exercise={activeExerciseModal}
        onClose={() => setActiveExerciseModal(null)}
        accentColor={currentDay.accentColor}
      />

      {/* Clean Minimalist Footer */}
      <footer className="mt-12 py-6 border-t border-zinc-900 text-center text-xs text-zinc-400 space-y-1">
        <p className="font-semibold text-zinc-300">
          IronRoutine — La tua scheda palestra tascabile (PWA Offline)
        </p>
        <p className="text-[11px]">
          Lunedì (Push & Core) • Mercoledì (Pull & Cardio) • Venerdì (Legs & Polpacci)
        </p>
      </footer>
    </div>
  );
}
