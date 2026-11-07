import React, { useState } from 'react';
import { 
  ArrowLeft,
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
    <div 
      className="fixed inset-0 z-50 bg-[#09090b] text-zinc-100 flex flex-col overflow-y-auto animate-fade-in selection:bg-amber-500 selection:text-black"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 py-3.5 shrink-0 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500 stroke-[2.5]" />
            <span>← Torna a Un Mese Dopo</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>{period.startDate} → {period.endDate}</span>
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
        {/* Banner */}
        <div className="flex items-start gap-3.5 pb-2 border-b border-zinc-800/80">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/30">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {period.title}
              </h1>
              {period.isInitialBaseline && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300">
                  Scheda Iniziale
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              Copia esatta congelata della scheda mantenuta in questo periodo storico.
            </p>
          </div>
        </div>

        <div className="space-y-4">
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
                      <div className="w-24 sm:w-28 text-right">
                        {ex.status === 'time' || ex.isTimeBased ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-[11px] font-bold">
                            <Clock className="w-3 h-3" />
                            <span>{ex.customDiffText || 'Cardio'}</span>
                          </span>
                        ) : ex.status === 'increased' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold">
                            <TrendingUp className="w-3 h-3" />
                            <span>{ex.customDiffText || 'Migliorato'}</span>
                          </span>
                        ) : ex.status === 'decreased' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 font-mono text-[11px] font-bold">
                            <TrendingDown className="w-3 h-3" />
                            <span>{ex.customDiffText || 'Diminuito'}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-400 font-mono text-[11px] font-semibold">
                            <Minus className="w-2.5 h-2.5" />
                            <span>{ex.customDiffText || 'Costante'}</span>
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

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Salvataggio cronologico: scheda congelata dal {period.startDate} al {period.endDate}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-white font-bold transition active:scale-95 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span>← Torna a Un Mese Dopo</span>
          </button>
        </div>
      </main>
    </div>
  );
};
