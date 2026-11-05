import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Dumbbell, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  FileText, 
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { WorkoutPeriodSnapshot, DayOfWeekId } from '../types/workout';

interface PeriodDetailModalProps {
  period: WorkoutPeriodSnapshot | null;
  onClose: () => void;
}

export const PeriodDetailModal: React.FC<PeriodDetailModalProps> = ({
  period,
  onClose,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<DayOfWeekId>(1);

  if (!period) return null;

  const currentDayData = period.daysData?.find((d) => d.dayId === selectedDayId) || period.daysData?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex items-start justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Range Date: {period.startDate} → {period.endDate}</span>
              </span>
              {period.isInitialBaseline && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300">
                  Scheda Iniziale
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {period.title}
            </h2>
            <p className="text-xs text-zinc-400">
              Copia esatta congelata della scheda mantenuta in questo periodo
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Notes Card if present */}
          {period.notes && (
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-amber-500/30 space-y-1 text-xs">
              <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Note e carichi mantenuti in questo periodo:</span>
              </span>
              <p className="text-zinc-200 leading-relaxed">
                {period.notes}
              </p>
            </div>
          )}

          {/* Day Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-2xl border border-zinc-800">
            {(period.daysData || []).map((day) => {
              const isSelected = selectedDayId === day.dayId;
              return (
                <button
                  key={day.dayId}
                  onClick={() => setSelectedDayId(day.dayId)}
                  className={`py-2 px-3 rounded-xl text-center transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-black font-black shadow-md'
                      : 'text-zinc-400 hover:text-white font-semibold'
                  }`}
                >
                  <span className="text-xs sm:text-sm block">{day.dayName}</span>
                  <span className="text-[10px] opacity-80 block truncate">{day.title}</span>
                </button>
              );
            })}
          </div>

          {/* Exercises List for Selected Day */}
          {currentDayData && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Esercizi salvati ({currentDayData.exercises.length})</span>
                </span>
                <span className="text-[11px] text-zinc-400">
                  {currentDayData.dayName}
                </span>
              </div>

              <div className="divide-y divide-zinc-900 rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
                {currentDayData.exercises.map((ex, idx) => (
                  <div
                    key={ex.exerciseId || idx}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-850/40 transition"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase">
                          {ex.category}
                        </span>
                        <span className="font-mono text-xs font-bold text-zinc-300">
                          {ex.prescription}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {ex.name}
                      </h4>
                    </div>

                    {/* Weight and Comparison in this period */}
                    <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                      {/* Inizio Mese */}
                      <div className="text-center min-w-[70px]">
                        <span className="text-[9px] uppercase font-bold text-zinc-500 block">
                          Inizio Mese
                        </span>
                        <span className="text-xs font-mono font-semibold text-zinc-400">
                          {ex.baselineText}
                        </span>
                        {ex.baselineSub && (
                          <span className="text-[9px] text-zinc-500 block">
                            {ex.baselineSub}
                          </span>
                        )}
                      </div>

                      <span className="text-zinc-600 text-xs">→</span>

                      {/* Weight In This Period */}
                      <div className="text-center min-w-[80px]">
                        <span className="text-[9px] uppercase font-bold text-amber-400 block">
                          In Questo Periodo
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-black text-white">
                          {ex.currentText}
                        </span>
                        {ex.currentSub && (
                          <span className="text-[10px] text-amber-300 font-bold block">
                            {ex.currentSub}
                          </span>
                        )}
                      </div>

                      {/* Status */}
                      <div className="w-20 text-right">
                        {ex.isTimeBased ? (
                          <span className="inline-block px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-[11px] font-bold">
                            Cardio
                          </span>
                        ) : ex.status === 'increased' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold">
                            <TrendingUp className="w-3 h-3" />
                            <span>Migliorato</span>
                          </span>
                        ) : ex.status === 'decreased' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 font-mono text-[11px] font-bold">
                            <TrendingDown className="w-3 h-3" />
                            <span>Diminuito</span>
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-400 font-mono text-[11px] font-semibold">
                            Costante
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Salvataggio cronologico: scheda congelata dal {period.startDate} al {period.endDate}
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition cursor-pointer"
          >
            Chiudi Scheda Salvata
          </button>
        </div>
      </div>
    </div>
  );
};
