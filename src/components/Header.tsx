import React from 'react';
import { Dumbbell, Timer, RotateCcw, CheckCircle, Flame } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onToggleTimer: () => void;
  isTimerOpen: boolean;
  onResetSession: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onToggleTimer,
  isTimerOpen,
  onResetSession,
}) => {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-black border border-red-500/40 flex items-center justify-center shadow-lg shadow-red-950/40">
              <Dumbbell className="w-5 h-5 text-white" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-black tracking-wider text-white uppercase">
                  Iron Routine
                </h1>
                <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-1.5 py-0.2 rounded border border-red-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium">
                Scheda Palestra 3 Giorni
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Rest Timer Button */}
            <button
              onClick={onToggleTimer}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer ${
                isTimerOpen
                  ? 'bg-red-600/20 border-red-500/50 text-red-400 shadow-sm'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
              title="Apri Cronometro di Recupero"
            >
              <Timer className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Recupero</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />
          </div>
        </div>

        {/* Workout Progress Bar */}
        <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800/80">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-zinc-300 whitespace-nowrap">
              {progressPercent}%
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs text-zinc-400">
            <span className="hidden sm:inline">
              Completati: <strong className="text-white">{completedCount}/{totalCount}</strong>
            </span>
            {completedCount > 0 && (
              <button
                onClick={onResetSession}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-red-400 transition cursor-pointer"
                title="Azzera spunte di questa giornata"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Azzera</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
