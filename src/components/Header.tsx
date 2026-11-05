import React from 'react';
import { Dumbbell, Timer, RotateCcw, CheckCircle, Flame, Database, Pencil } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { InlineEditable } from './InlineEditable';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onToggleTimer: () => void;
  isTimerOpen: boolean;
  onResetSession: () => void;
  onOpenBackup?: () => void;
  onToggleInlineEdit?: () => void;
  isInlineEditing?: boolean;
  restSeconds?: number;
  appTitle?: string;
  appBadge?: string;
  appSubtitle?: string;
  onUpdateAppTitle?: (val: string) => void;
  onUpdateAppSubtitle?: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onToggleTimer,
  isTimerOpen,
  onResetSession,
  onOpenBackup,
  onToggleInlineEdit,
  isInlineEditing = false,
  restSeconds = 90,
  appTitle = 'Iron Routine',
  appBadge = 'PRO',
  appSubtitle = 'Scheda Palestra 3 Giorni',
  onUpdateAppTitle,
  onUpdateAppSubtitle,
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
                <InlineEditable
                  isEditing={isInlineEditing}
                  value={appTitle}
                  onChange={(val) => onUpdateAppTitle && onUpdateAppTitle(val)}
                  as="h1"
                  className="text-sm sm:text-base font-black tracking-wider text-white uppercase"
                />
                <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-1.5 py-0.2 rounded border border-red-500/30">
                  {appBadge}
                </span>
              </div>
              <InlineEditable
                isEditing={isInlineEditing}
                value={appSubtitle}
                onChange={(val) => onUpdateAppSubtitle && onUpdateAppSubtitle(val)}
                as="p"
                className="text-[10px] text-zinc-400 font-medium"
              />
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Backup & Sync Button */}
            {onOpenBackup && (
              <button
                onClick={onOpenBackup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer shadow-sm"
                title="Backup e Sincronizzazione Dati (Scarica o Carica)"
              >
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Backup Dati</span>
              </button>
            )}

            {/* Rest Timer Button with time display */}
            <button
              onClick={onToggleTimer}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer ${
                isTimerOpen
                  ? 'bg-red-600/20 border-red-500/50 text-red-400 shadow-sm'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
              title="Apri Cronometro di Recupero (tempo personalizzabile)"
            >
              <Timer className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Recupero</span>
              <span className="font-mono text-[10px] text-zinc-400 hidden xs:inline">{restSeconds}s</span>
            </button>

            {/* Pencil Button to Toggle Inline Edit Mode */}
            {onToggleInlineEdit && (
              <button
                onClick={onToggleInlineEdit}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer shadow-sm ${
                  isInlineEditing
                    ? 'bg-amber-500 text-black border-amber-400 shadow-amber-500/30 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-amber-400 hover:text-amber-300 hover:bg-zinc-800'
                }`}
                title={isInlineEditing ? 'Modalità Modifica Attiva' : 'Tocca per modificare qualsiasi parola della scheda'}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isInlineEditing ? 'Modifica ON' : 'Modifica Testi'}
                </span>
              </button>
            )}

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
