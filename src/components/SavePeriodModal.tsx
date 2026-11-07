import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Camera, Calendar, Save, CheckCircle2, Clock } from 'lucide-react';

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
            Salva Periodo Scheda
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
        {/* Banner */}
        <div className="flex items-start gap-3.5 pb-2 border-b border-zinc-800/80">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/30">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Salva Versione Scheda
            </h1>
            <p className="text-xs text-amber-400/90 font-medium">
              Congela la scheda precedente prima di effettuare nuove modifiche o miglioramenti
            </p>
          </div>
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
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>✓ Salva Periodo nello Storico</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
