import React, { useState } from 'react';
import { X, Play, Video, Info, AlertTriangle, CheckCircle2, Hand, ExternalLink } from 'lucide-react';
import { Exercise } from '../types/workout';
import { ExerciseIllustration } from './ExerciseIllustration';

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  accentColor?: string;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  onClose,
  accentColor = '#ef4444'
}) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: accentColor }} 
            />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                {exercise.name}
              </h2>
              <span className="text-xs text-zinc-400 font-medium">
                {exercise.category} • <strong className="text-zinc-200">{exercise.prescription}</strong>
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition cursor-pointer"
            aria-label="Chiudi guida esercizio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-6 text-zinc-200">
          {/* Visual Illustration */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-zinc-400">
                Schema Esecuzione & Anatomia
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {exercise.prescription}
              </span>
            </div>
            <ExerciseIllustration 
              illustrationKey={exercise.illustrationKey} 
              className="w-full h-48 sm:h-56"
              accentColor={accentColor}
            />
          </div>

          {/* Video Tutorial Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Video className="w-4 h-4 text-red-500" />
                <span>Video Tutorial Movimento</span>
              </div>
              <a
                href={exercise.videoTutorialUrl.replace('embed/', 'watch?v=')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-red-400 transition"
              >
                <span>Apri su YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-lg">
              {isVideoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 z-10">
                  <Play className="w-8 h-8 text-red-500 animate-pulse mb-2" />
                  <span className="text-xs">Caricamento video tutorial...</span>
                </div>
              )}
              <iframe
                src={`${exercise.videoTutorialUrl}?rel=0&modestbranding=1`}
                title={exercise.videoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsVideoLoading(false)}
              />
            </div>
          </div>

          {/* Grip (Presa Corretta) Card */}
          <div className="bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Hand className="w-4 h-4 text-amber-400" />
              <span>Presa & Impugnatura Corretta</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {exercise.gripType}
            </p>
          </div>

          {/* Step-by-Step Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <Info className="w-4 h-4 text-sky-400" />
              <span>Esecuzione Tecnica Passo-Passo</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60">
              {exercise.setupDescription}
            </p>

            <div className="space-y-2">
              {exercise.executionSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/40">
                  <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Tips & Muscle Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Tips */}
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Consigli Chiave</span>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                {exercise.keyTips.map((tip, idx) => (
                  <li key={idx} className="leading-snug">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Errori da Evitare</span>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                {exercise.commonMistakes.map((err, idx) => (
                  <li key={idx} className="leading-snug">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Muscle tags */}
          <div className="pt-2 border-t border-zinc-800/80">
            <span className="text-[11px] font-semibold text-zinc-400 block mb-2 uppercase tracking-wider">
              Muscoli Coinvolti
            </span>
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-300"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-zinc-900/90 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs tracking-wide transition cursor-pointer"
          >
            Chiudi Scheda
          </button>
        </div>
      </div>
    </div>
  );
};
