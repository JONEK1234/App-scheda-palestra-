import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX, X, ChevronUp, ChevronDown } from 'lucide-react';
import { soundService } from '../utils/audio';

interface RestTimerProps {
  initialSeconds?: number;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds = 90,
  isOpen,
  onClose,
  accentColor = '#ef4444'
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTotalSeconds(initialSeconds);
    setSecondsRemaining(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            if (soundEnabled) {
              soundService.playFinishAlarm();
            }
            return 0;
          }
          if (soundEnabled && prev <= 4 && prev > 1) {
            soundService.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  const setPreset = (secs: number) => {
    setTotalSeconds(secs);
    setSecondsRemaining(secs);
    setIsRunning(true);
  };

  const toggleRunning = () => {
    if (secondsRemaining === 0) {
      setSecondsRemaining(totalSeconds);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(totalSeconds);
  };

  if (!isOpen) return null;

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsRemaining) / totalSeconds) * 100 : 0;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (isMinimized) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-md cursor-pointer hover:border-zinc-700 transition"
      >
        <div className="relative w-7 h-7 flex items-center justify-center">
          <svg className="w-7 h-7 -rotate-90">
            <circle cx="14" cy="14" r="11" stroke="#27272a" strokeWidth="2.5" fill="none" />
            <circle
              cx="14"
              cy="14"
              r="11"
              stroke={accentColor}
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={69.1}
              strokeDashoffset={69.1 - (69.1 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>
          <Timer className="w-3 h-3 text-white absolute" />
        </div>
        <span className="font-mono text-xs font-bold text-white">{formattedTime}</span>
        <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden text-zinc-100 animate-slide-up">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900/80 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wide">
          <Timer className="w-3.5 h-3.5 text-red-500" />
          <span>Timer di Recupero</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 text-zinc-400 hover:text-white transition rounded"
            title={soundEnabled ? 'Disattiva audio' : 'Attiva audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-zinc-400 hover:text-white transition rounded"
            title="Minimizza"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white transition rounded"
            title="Chiudi timer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Clock */}
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-28 h-28 flex items-center justify-center my-1">
          <svg className="w-28 h-28 -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="#27272a"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke={secondsRemaining === 0 ? '#10b981' : accentColor}
              strokeWidth="6"
              fill="none"
              strokeDasharray={301.6}
              strokeDashoffset={301.6 - (301.6 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-black font-mono tracking-tight ${secondsRemaining === 0 ? 'text-emerald-400 animate-pulse' : 'text-white'}`}>
              {formattedTime}
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
              {secondsRemaining === 0 ? 'Riparti!' : isRunning ? 'Recupero' : 'In Pausa'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={resetTimer}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition active:scale-95"
            title="Azzera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleRunning}
            className="px-5 py-2 rounded-xl font-bold text-xs tracking-wide text-white shadow-lg transition active:scale-95 flex items-center gap-1.5"
            style={{ backgroundColor: accentColor }}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausa</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{secondsRemaining === 0 ? 'Ricomincia' : 'Avvia'}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-1.5 w-full mt-3.5 pt-3 border-t border-zinc-900">
          {[30, 60, 90, 120].map((secs) => (
            <button
              key={secs}
              onClick={() => setPreset(secs)}
              className={`py-1 rounded-lg text-[11px] font-bold transition border ${
                totalSeconds === secs && secondsRemaining > 0
                  ? 'bg-zinc-800 text-white border-zinc-700'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800/80 hover:bg-zinc-800'
              }`}
            >
              {secs}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
