import React, { useState, useEffect } from 'react';
import { X, Camera, Calendar, Save, CheckCircle2, Clock } from 'lucide-react';

interface SavePeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; startDate: string; endDate: string; notes: string }) => void;
  defaultStartDate: string;
  defaultEndDate: string;
  defaultTitle: string;
}

export const SavePeriodModal: React.FC<SavePeriodModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultStartDate,
  defaultEndDate,
  defaultTitle,
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [title, setTitle] = useState(defaultTitle);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      setTitle(defaultTitle);
      setNotes('Scheda mantenuta con questi carichi prima di applicare nuove modifiche.');
    }
  }, [isOpen, defaultStartDate, defaultEndDate, defaultTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate.trim() || !endDate.trim()) return;

    onSave({
      title: title.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      notes: notes.trim(),
    });
  };

  // Quick auto-title generator when dates change
  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    const startDay = val.split('/')[0] || val;
    const endDay = endDate.split('/')[0] || endDate;
    setTitle(`Scheda ${startDay} Nov - ${endDay} Nov`);
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    const startDay = startDate.split('/')[0] || startDate;
    const endDay = val.split('/')[0] || val;
    setTitle(`Scheda ${startDay} Nov - ${endDay} Nov`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-amber-500/40 p-5 sm:p-6 shadow-2xl space-y-5 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Salva Versione Scheda
              </h2>
              <p className="text-xs text-amber-400 font-medium">
                Congela la scheda precedente prima di effettuare nuove modifiche
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Educational Info Box */}
        <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Come funziona lo storico periodi:</span>
          </div>
          <p>
            Se per esempio dall'1 al 13 Novembre hai mantenuto una scheda e adesso stai per cambiare pesi, miglioramenti o esercizi, cliccando qui <strong>salvi una copia esatta</strong> della scheda dell'intervallo 1 - 13.
          </p>
          <p className="text-[11px] text-zinc-400">
            Poi potrai modificare liberamente la nuova scheda, e troverai sempre questa versione archiviata nella sezione <strong>"Storico Periodi"</strong>.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Range Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Data Inizio Periodo</span>
              </label>
              <input
                type="text"
                required
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                placeholder="es. 01/11/2026"
                className="w-full bg-zinc-900 border border-zinc-850 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-mono text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Data Fine Periodo</span>
              </label>
              <input
                type="text"
                required
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                placeholder="es. 13/11/2026"
                className="w-full bg-zinc-900 border border-zinc-850 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-mono text-amber-300 font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Titolo o Nome del Periodo
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="es. Scheda 1 Nov - 13 Nov"
              className="w-full bg-zinc-900 border border-zinc-850 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Note sui carichi e sensazioni di questo periodo (Opzionale)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="es. Mantenuti 14 kg su shoulder press, alzate 5 kg, tapis roulant 10:30 min. Ora passo a carichi più pesanti..."
              className="w-full bg-zinc-900 border border-zinc-850 focus:border-amber-500 rounded-xl p-3 text-xs text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Preview Badge */}
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Verranno salvati tutti gli esercizi dei 3 giorni (Lunedì, Mercoledì, Venerdì) esattamente come sono adesso.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition active:scale-95 shadow-lg shadow-amber-950/40 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>✓ Salva Periodo nello Storico</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
