import React, { useState } from 'react';
import { 
  Check, 
  HelpCircle, 
  Layers, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Dumbbell, 
  Flame,
  ChevronRight
} from 'lucide-react';
import { Exercise, StoredSetLog } from '../types/workout';
import { ExerciseIllustration } from './ExerciseIllustration';

interface ExerciseCardProps {
  exercise: Exercise;
  exerciseIndex: number;
  setLogs: StoredSetLog[];
  onUpdateSetLog: (exerciseId: string, setIndex: number, log: Partial<StoredSetLog>) => void;
  onApplyWeightToAllSets?: (exerciseId: string, weight: string) => void;
  onOpenTutorial: (exercise: Exercise) => void;
  onTriggerRestTimer: (restSeconds: number) => void;
  accentColor?: string;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerciseIndex,
  setLogs,
  onUpdateSetLog,
  onApplyWeightToAllSets,
  onOpenTutorial,
  onTriggerRestTimer,
  accentColor = '#ef4444'
}) => {
  // Local state for countdown on time-based exercises (Tappeto, Plank, Cyclette, Vogatore)
  const [timeRemaining, setTimeRemaining] = useState<number>(exercise.timeDurationSeconds || 0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Sync timer if duration changes
  React.useEffect(() => {
    setTimeRemaining(exercise.timeDurationSeconds || 0);
  }, [exercise.timeDurationSeconds]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            onUpdateSetLog(exercise.id, 0, { completed: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining, exercise.id, onUpdateSetLog]);

  const allCompleted = exercise.isTimeBased
    ? setLogs[0]?.completed
    : setLogs.length === exercise.setsCount && setLogs.every((s) => s?.completed);

  const formatTimerString = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className={`relative rounded-2xl bg-zinc-950 border transition-all duration-200 overflow-hidden shadow-lg ${
        allCompleted
          ? 'border-emerald-500/40 bg-zinc-950/70 shadow-emerald-950/20'
          : exercise.isSuperset
          ? 'border-rose-600/40 shadow-rose-950/20'
          : 'border-zinc-800/90 hover:border-zinc-700/80'
      }`}
    >
      {/* Top Banner if Superset */}
      {exercise.isSuperset && (
        <div className="bg-gradient-to-r from-red-950/80 to-zinc-900 border-b border-red-500/30 px-3.5 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-red-400 font-bold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>SUPERSET</span>
          </div>
          <span className="text-[11px] text-zinc-400 truncate max-w-[220px]">
            {exercise.supersetNote || 'Esegui in sequenza senza pausa'}
          </span>
        </div>
      )}

      {/* Main Card Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Index Counter or Check Badge */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm transition-all ${
              allCompleted
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300'
            }`}
          >
            {allCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : exerciseIndex + 1}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {exercise.category}
              </span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-xs font-bold text-white tracking-wide"
                style={{ backgroundColor: `${accentColor}33`, color: accentColor }}
              >
                {exercise.prescription}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {exercise.name}
            </h3>

            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
              {exercise.setupDescription}
            </p>
          </div>
        </div>

        {/* Action Button: Open Tutorial & Guide */}
        <button
          onClick={() => onOpenTutorial(exercise)}
          className="self-stretch sm:self-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:text-white transition active:scale-95 cursor-pointer shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5 text-red-500" />
          <span>Guida & Video</span>
          <ChevronRight className="w-3 h-3 text-zinc-500" />
        </button>
      </div>

      {/* Visual illustration preview bar (compact interactive trigger) */}
      <div 
        onClick={() => onOpenTutorial(exercise)}
        className="px-4 sm:px-5 pb-3 cursor-pointer group"
      >
        <div className="relative rounded-xl overflow-hidden border border-zinc-900 group-hover:border-zinc-700/60 transition">
          <ExerciseIllustration
            illustrationKey={exercise.illustrationKey}
            className="w-full h-28 sm:h-32"
            accentColor={accentColor}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold border border-zinc-700 backdrop-blur-sm">
              Tocca per ingrandire & video
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Work Section */}
      <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-zinc-900">
        {exercise.isTimeBased ? (
          /* Time-based control for cardio or plank */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <Timer className="w-4 h-4 text-red-500" />
              <div>
                <span className="text-xs font-bold text-white block">Cronometro Esercizio</span>
                <span className="text-[11px] text-zinc-400">Target: {exercise.prescription}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-black text-white">
                {formatTimerString(timeRemaining)}
              </span>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 transition active:scale-95 ${
                  isTimerRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pausa
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> {timeRemaining === 0 ? 'Ricomincia' : 'Avvia'}
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimeRemaining(exercise.timeDurationSeconds || 0);
                  onUpdateSetLog(exercise.id, 0, { completed: false });
                }}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition"
                title="Resetta tempo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  const nowCompleted = !(setLogs[0]?.completed);
                  onUpdateSetLog(exercise.id, 0, { completed: nowCompleted });
                }}
                className={`p-1.5 rounded-lg border text-xs font-bold transition flex items-center gap-1 ${
                  setLogs[0]?.completed
                    ? 'bg-emerald-500 text-black border-emerald-400'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
                }`}
                title="Segna come completato"
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        ) : (
          /* Sets & Reps Table */
          <div className="space-y-2.5">
            {/* Weight note if defined (e.g. Rematore Manubri 5kg però aumenta) */}
            {exercise.weightNote && (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{exercise.weightNote}</span>
                </span>
                {onApplyWeightToAllSets && (
                  <button
                    type="button"
                    onClick={() => {
                      const current = parseFloat(setLogs[0]?.weight || String(exercise.defaultWeightKg || 5)) || 5;
                      onApplyWeightToAllSets(exercise.id, String(current + 1));
                    }}
                    className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
                    title="Aumenta di 1 kg su tutte le serie"
                  >
                    <span>+1 kg a tutte</span>
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400">
              <span className="font-bold uppercase tracking-wider">Tabella Serie & Carichi</span>
              {exercise.setsCount > 1 && onApplyWeightToAllSets && setLogs[0]?.weight && (
                <button
                  type="button"
                  onClick={() => onApplyWeightToAllSets(exercise.id, setLogs[0]?.weight)}
                  className="text-red-400 hover:text-red-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  title="Applica il carico della Serie 1 a tutte le serie"
                >
                  <span>Applica {setLogs[0]?.weight}kg a tutte</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 pb-1">
              <span className="col-span-3">Serie</span>
              <span className="col-span-4 sm:col-span-3 text-center">Carico (kg)</span>
              <span className="col-span-3 sm:col-span-3 text-center">Reps</span>
              <span className="col-span-2 sm:col-span-3 text-right">Fatto</span>
            </div>

            {Array.from({ length: exercise.setsCount }).map((_, sIdx) => {
              const currentLog = setLogs[sIdx] || {
                weight: exercise.defaultWeightKg !== undefined ? String(exercise.defaultWeightKg) : '',
                reps: String(exercise.defaultReps).split('+')[0].trim(),
                completed: false
              };

              return (
                <div
                  key={sIdx}
                  className={`grid grid-cols-12 gap-2 items-center px-3 py-2 rounded-xl transition border ${
                    currentLog.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-white'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-200'
                  }`}
                >
                  {/* Set Name */}
                  <div className="col-span-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                    <span className="text-xs font-bold text-zinc-200">
                      Serie {sIdx + 1}
                    </span>
                  </div>

                  {/* Weight Input with quick stepper buttons */}
                  <div className="col-span-4 sm:col-span-3 flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const currentVal = parseFloat(currentLog.weight || '0') || 0;
                        const nextVal = Math.max(0, currentVal - 1);
                        onUpdateSetLog(exercise.id, sIdx, { weight: nextVal === 0 ? '' : String(nextVal) });
                      }}
                      className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                      title="-1 kg"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder={exercise.defaultWeightKg !== undefined ? String(exercise.defaultWeightKg) : 'kg'}
                      value={currentLog.weight}
                      onChange={(e) =>
                        onUpdateSetLog(exercise.id, sIdx, { weight: e.target.value })
                      }
                      className="w-12 sm:w-14 text-center bg-zinc-950/80 border border-zinc-800 focus:border-red-500 rounded-lg py-1 text-xs font-mono font-bold text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const currentVal = parseFloat(currentLog.weight || '0') || 0;
                        const nextVal = currentVal + 1;
                        onUpdateSetLog(exercise.id, sIdx, { weight: String(nextVal) });
                      }}
                      className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                      title="+1 kg"
                    >
                      +
                    </button>
                  </div>

                  {/* Reps Input */}
                  <div className="col-span-3 sm:col-span-3 flex justify-center">
                    <div className="relative w-full max-w-[70px]">
                      <input
                        type="text"
                        placeholder={String(exercise.defaultReps)}
                        value={currentLog.reps}
                        onChange={(e) =>
                          onUpdateSetLog(exercise.id, sIdx, { reps: e.target.value })
                        }
                        className="w-full text-center bg-zinc-950/80 border border-zinc-800 focus:border-red-500 rounded-lg py-1 text-xs font-mono font-bold text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Complete Checkbox & Rest trigger */}
                  <div className="col-span-2 sm:col-span-3 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => {
                        const newCompleted = !currentLog.completed;
                        onUpdateSetLog(exercise.id, sIdx, { completed: newCompleted });
                        if (newCompleted) {
                          onTriggerRestTimer(exercise.defaultRestSeconds);
                        }
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-90 cursor-pointer ${
                        currentLog.completed
                          ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700'
                      }`}
                      aria-label={`Completata serie ${sIdx + 1}`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Quick Rest Note & Persistence notification */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-400 pt-1.5 px-2 gap-1">
              <span className="flex items-center gap-1">
                <Timer className="w-3 h-3 text-red-500" />
                <span>Recupero consigliato: <strong>{exercise.defaultRestSeconds}s</strong></span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400">💾 Salvataggio kg automatico</span>
                <button
                  onClick={() => onTriggerRestTimer(exercise.defaultRestSeconds)}
                  className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                >
                  Avvia timer ({exercise.defaultRestSeconds}s)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
