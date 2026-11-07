import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Calendar, Save, Trash2, Edit3 } from 'lucide-react';
import { WorkoutPeriodSnapshot } from '../types/workout';

interface EditPeriodModalProps {
  period: WorkoutPeriodSnapshot | null;
  onClose: () => void;
  onSave: (updated: WorkoutPeriodSnapshot) => void;
  onDelete: (id: string) => void;
}

export const EditPeriodModal: React.FC<EditPeriodModalProps> = ({
  period,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (period) {
      setTitle(period.title);
      setStartDate(period.startDate);
      setEndDate(period.endDate);
      setNotes(period.notes || '');
      setConfirmDelete(false);
    }
  }, [period]);

  if (!period) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate.trim() || !endDate.trim()) return;

    onSave({
      ...period,
      title: title.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#09090b] text-zinc-100 flex flex-col overflow-y-auto animate-fade-in selection:bg-amber-500 selection:text-black"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 py-3.5 shrink-0 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500 stroke-[2.5]" />
            <span>← Torna a Un Mese Dopo</span>
          </button>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Modifica Periodo
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
        {/* Banner */}
        <div className="flex items-start gap-3.5 pb-2 border-b border-zinc-800/80">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/30">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Modifica Dati Periodo Archiviato
            </h1>
            <p className="text-xs text-amber-400/90 font-medium">
              Aggiorna il titolo, le date o le note di questo intervallo storico a tutto schermo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Data Inizio
              </label>
              <input
                type="text"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Data Fine
              </label>
              <input
                type="text"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Titolo Periodo
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Note
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-red-400 font-bold">Eliminare?</span>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(period.id);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition cursor-pointer"
                >
                  ✓ Sì
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-bold transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Elimina</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salva</span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
