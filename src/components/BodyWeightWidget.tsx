import React, { useState } from 'react';
import { Scale, Plus, Minus, Edit3, Check, TrendingUp, Sparkles, FileText, Clock, Calendar } from 'lucide-react';

interface BodyWeightWidgetProps {
  weight: string;
  onUpdateWeight: (newWeight: string) => void;
  hasNotesForDay?: boolean;
  onOpenNotes?: () => void;
  onOpenMonthAfter?: () => void;
  onOpenWeightView?: () => void;
  activeDayName?: string;
}

export const BodyWeightWidget: React.FC<BodyWeightWidgetProps> = ({
  weight,
  onUpdateWeight,
  hasNotesForDay = false,
  onOpenNotes,
  onOpenMonthAfter,
  onOpenWeightView,
  activeDayName = 'Lunedì',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(weight);

  const numericWeight = parseFloat(weight) || 74;

  const handleSave = () => {
    const parsed = parseFloat(inputValue.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 20 && parsed < 300) {
      onUpdateWeight(String(parsed));
    }
    setIsEditing(false);
  };

  const handleStep = (delta: number) => {
    const updated = Math.max(30, Math.min(250, +(numericWeight + delta).toFixed(1)));
    onUpdateWeight(String(updated));
    setInputValue(String(updated));
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-950/80 to-black border border-zinc-800/90 p-4 sm:p-5 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Subtle ambient glow in Apple Fitness style */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left: The "Palla Rotonda" (Apple Fitness / iPhone Health Ring) */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              if (onOpenWeightView) {
                onOpenWeightView();
              } else {
                setInputValue(weight);
                setIsEditing(true);
              }
            }}
            className="group relative cursor-pointer select-none"
            title="Tocca per aprire la sezione Peso Corporeo a tutto schermo"
          >
            {/* Round sphere container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-zinc-900 to-zinc-950 p-1.5 shadow-xl border border-zinc-800/80 flex items-center justify-center relative group-hover:scale-105 transition duration-300">
              {/* Outer SVG Ring Gauge */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-zinc-800/80"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#appleFitnessGradient)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="35"
                  fill="none"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="appleFitnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="60%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inside the round sphere: Big Bold Number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none group-hover:text-red-400 transition">
                  {weight}
                </span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 mt-0.5">
                  KG
                </span>
              </div>

              {/* Edit tooltip badge on hover */}
              <div className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-zinc-800/90 border border-zinc-700 text-[9px] font-bold text-zinc-300 opacity-0 group-hover:opacity-100 transition shadow">
                Tocca
              </div>
            </div>
          </div>

          {/* Text and schematic description */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                <Scale className="w-3 h-3" />
                <span>Peso Corporeo</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Attuale</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{weight} kg</span>
              <span className="text-xs font-medium text-zinc-400 hidden sm:inline">• Peso di partenza</span>
            </h3>

            <p className="text-xs text-zinc-400 max-w-xs leading-snug">
              Impostazione fissa in alto: sempre visibile in tutte le giornate di scheda.
            </p>
          </div>
        </div>

        {/* Right: Schematic Controls (iPhone Style Stepper & Edit) + Note & Un Mese Dopo */}
        <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2.5">
          {isEditing ? (
            <div className="flex items-center gap-2 bg-zinc-900 border border-red-500/50 p-2 rounded-2xl w-full sm:w-auto shadow-lg animate-fade-in">
              <input
                type="number"
                step="0.1"
                min="30"
                max="250"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className="w-24 bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-center font-mono font-bold text-white text-sm focus:outline-none focus:border-red-500"
                placeholder="74"
              />
              <span className="text-xs font-bold text-zinc-400">kg</span>
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Salva</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputValue(weight);
                  setIsEditing(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              {/* Stepper buttons (-0.5 / +0.5) */}
              <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-2xl p-1 gap-1">
                <button
                  type="button"
                  onClick={() => handleStep(-0.5)}
                  className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer text-xs font-bold"
                  title="Diminuisci di 0.5 kg"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-mono text-xs font-bold text-white min-w-[50px] text-center">
                  {weight} kg
                </span>
                <button
                  type="button"
                  onClick={() => handleStep(+0.5)}
                  className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer text-xs font-bold"
                  title="Aumenta di 0.5 kg"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Edit button: opens full-screen Weight Section */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenWeightView) {
                    onOpenWeightView();
                  } else {
                    setInputValue(weight);
                    setIsEditing(true);
                  }
                }}
                className="px-3 py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0"
                title="Apri Sezione Peso a tutto schermo"
              >
                <Edit3 className="w-3.5 h-3.5 text-red-500" />
                <span>Modifica</span>
              </button>

              {/* Storico Pesi Button: opens full-screen Weight Section */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenWeightView) {
                    onOpenWeightView();
                  }
                }}
                className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0"
                title="Apri Sezione Storico e Periodi del Peso a tutto schermo"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">Storico Pesi</span>
              </button>

              {/* Special Note Button that appears next to the weight increase controls when this day has notes */}
              {hasNotesForDay && onOpenNotes && (
                <button
                  type="button"
                  onClick={onOpenNotes}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm animate-fade-in"
                  title="Apri Sezione Note & Cronologia a Schermo Intero"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Note ({activeDayName})</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </button>
              )}

              {/* "Un Mese Dopo" Button with timer icon */}
              {onOpenMonthAfter && (
                <button
                  type="button"
                  onClick={onOpenMonthAfter}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
                  title="Apri Sezione 'Un Mese Dopo' (Confronto pesi e countdown)"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="whitespace-nowrap">Un Mese Dopo</span>
                </button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between sm:justify-end w-full text-[10px] text-zinc-400 gap-1.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Salvataggio permanente attivo</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
