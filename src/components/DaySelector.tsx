import React from 'react';
import { Calendar, Dumbbell, Sparkles, Coffee } from 'lucide-react';
import { DayOfWeekId, WorkoutDay } from '../types/workout';
import { isActualWorkoutDay } from '../data/workoutData';

interface DaySelectorProps {
  days: WorkoutDay[];
  selectedDayId: DayOfWeekId;
  onSelectDay: (dayId: DayOfWeekId) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  selectedDayId,
  onSelectDay,
}) => {
  const currentStatus = isActualWorkoutDay();

  return (
    <div className="space-y-3">
      {/* Rest Day or Today Notice Banner */}
      {!currentStatus.isWorkoutDay ? (
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between text-xs text-zinc-300 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Oggi è {currentStatus.dayName}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  Riposo / Recupero
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Nessun allenamento programmato per oggi. Puoi consultare la scheda del prossimo giorno qui sotto.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-950 border border-red-500/30 rounded-2xl p-3 flex items-center justify-between text-xs text-zinc-200 shadow-lg shadow-red-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-red-500/40">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-white text-xs block">
                Oggi è {currentStatus.dayName} — Giorno di Allenamento!
              </span>
              <span className="text-[11px] text-zinc-400">
                La tua scheda del giorno è già caricata e pronta.
              </span>
            </div>
          </div>
          {currentStatus.workoutDayId && currentStatus.workoutDayId !== selectedDayId && (
            <button
              onClick={() => onSelectDay(currentStatus.workoutDayId as DayOfWeekId)}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold transition whitespace-nowrap cursor-pointer"
            >
              Vai alla scheda di oggi
            </button>
          )}
        </div>
      )}

      {/* Tabs for Day 1, Day 2, Day 3 */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-950/90 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        {days.map((day) => {
          const isSelected = selectedDayId === day.id;
          const isToday = currentStatus.isWorkoutDay && currentStatus.workoutDayId === day.id;

          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 text-white shadow-lg border border-red-500/40'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 border border-transparent'
              }`}
            >
              {isToday && (
                <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 rounded-full bg-red-600 text-[9px] font-black tracking-wider text-white uppercase shadow-sm">
                  Oggi
                </span>
              )}

              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                Giorno {day.id}
              </span>
              <span className={`text-xs sm:text-sm font-black tracking-tight ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {day.dayName}
              </span>
              <span className="text-[10px] text-zinc-400 hidden sm:block truncate max-w-full">
                {day.id === 1 ? 'Push & Core' : day.id === 2 ? 'Pull & Dorso' : 'Legs & Gambe'}
              </span>

              {isSelected && (
                <div 
                  className="w-6 h-0.5 rounded-full mt-1.5"
                  style={{ backgroundColor: day.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
