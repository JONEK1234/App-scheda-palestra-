import React, { useState, useEffect } from 'react';
import { 
  X, 
  TrendingUp, 
  Calendar, 
  Dumbbell, 
  CheckCircle2, 
  Plus, 
  ChevronRight, 
  Trash2, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

interface CustomLogEntry {
  id: string;
  date: string;
  title: string;
  notes: string[];
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_CUSTOM_NOTES_KEY = 'ironroutine_user_custom_history_v1';

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [customEntries, setCustomEntries] = useState<CustomLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_NOTES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newDate, setNewDate] = useState(() => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  });
  const [newTitle, setNewTitle] = useState('');
  const [newNotesText, setNewNotesText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_NOTES_KEY, JSON.stringify(customEntries));
    } catch {
      // storage fallback
    }
  }, [customEntries]);

  if (!isOpen) return null;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const notesLines = newNotesText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const newEntry: CustomLogEntry = {
      id: Date.now().toString(),
      date: newDate.trim() || 'Oggi',
      title: newTitle.trim(),
      notes: notesLines.length > 0 ? notesLines : ['Sessione registrata'],
    };

    setCustomEntries((prev) => [newEntry, ...prev]);
    setNewTitle('');
    setNewNotesText('');
    setIsAddingNew(false);
  };

  const handleDeleteEntry = (id: string) => {
    setCustomEntries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-zinc-900/90 border-b border-zinc-800/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight flex items-center gap-2">
                <span>Cronologia Miglioramenti (Lunedì)</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Lunedì 26/10
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-medium">
                Storico carichi, ripetizioni effettive e note per la sessione di Lunedì (Push & Tricipiti)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition cursor-pointer"
            aria-label="Chiudi cronologia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-zinc-200">
          {/* Notification banner of requested exercise swap */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/30 flex items-start gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="block text-sm font-bold text-emerald-300">
                Fatto! Sostituito il cavo singolo con le dips su panca.
              </strong>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nella scheda di Lunedì (Push, Spalle & Core) ora trovi le <strong>Dips su Panca (3x12)</strong> al posto del Push Down Cavo Singolo.
              </p>
            </div>
          </div>

          {/* Historical Session: Allenamento del 26/10 */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 sm:p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight">
                    Allenamento del 26/10
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    Sessione Push, Spalle & Tricipiti • Carichi e ripetizioni registrate
                  </span>
                </div>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
                Registrato il 26/10
              </span>
            </div>

            {/* List of 5 exercises in structured cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* 1. Shoulder Press */}
              <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/90 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm font-bold text-white">Shoulder Press</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-bold">
                    14 kg
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 1</span>
                    <span className="font-mono font-bold text-zinc-200">10 rip. (14 kg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 2</span>
                    <span className="font-mono font-bold text-zinc-200">6/7 rip. (14 kg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 3</span>
                    <span className="font-mono font-bold text-zinc-200">5 rip. (14 kg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 4</span>
                    <span className="font-mono font-bold text-zinc-200">7 rip. (14 kg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 5</span>
                    <span className="font-mono font-bold text-zinc-200">5 rip. (14 kg)</span>
                  </div>
                </div>
              </div>

              {/* 2. PEC Fly */}
              <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/90 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-sm font-bold text-white">PEC Fly</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-bold">
                    18 kg
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 1</span>
                    <span className="font-mono font-bold text-zinc-200">12 rip. (18 kg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 2</span>
                    <span className="font-mono font-bold text-zinc-200">12 rip. (18 kg)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 3</span>
                    <span className="font-mono font-bold text-zinc-200">12 rip. (18 kg)</span>
                  </div>
                </div>
                <span className="block text-[11px] text-emerald-400 font-medium pt-1">
                  ✓ Target 3x12 completato a 18 kg
                </span>
              </div>

              {/* 3. Push down sbarra dritta */}
              <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/90 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-bold text-white">Push down sbarra dritta</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold">
                    18 - 23 kg
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 1</span>
                    <span className="font-mono font-bold text-zinc-200">18 kg — 12 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 2</span>
                    <span className="font-mono font-bold text-zinc-200">23 kg — 10 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 3</span>
                    <span className="font-mono font-bold text-zinc-200">23 kg — 5 rip.</span>
                  </div>
                </div>
                <span className="block text-[11px] text-amber-400 font-medium pt-1">
                  ⚡ Incremento a 23 kg provato con successo
                </span>
              </div>

              {/* 4. French Press */}
              <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/90 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-bold text-white">French Press</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                    2.5 - 6 kg
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 1</span>
                    <span className="font-mono font-bold text-zinc-200">2.5 kg — 12 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 2</span>
                    <span className="font-mono font-bold text-zinc-200">5 kg — 6 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 3</span>
                    <span className="font-mono font-bold text-zinc-200">5 kg — 5 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 4</span>
                    <span className="font-mono font-bold text-zinc-200">6 kg — 5 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 5</span>
                    <span className="font-mono font-bold text-zinc-200">6 kg — 5 rip.</span>
                  </div>
                </div>
              </div>

              {/* 5. Dips su panca */}
              <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/90 p-3.5 space-y-2.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-white">Dips su panca (Nuova Sostituzione)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                    3 x 12
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 1</span>
                    <span className="font-mono font-bold text-white">12 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 2</span>
                    <span className="font-mono font-bold text-white">12 rip.</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <span className="text-zinc-400 font-medium">Serie 3</span>
                    <span className="font-mono font-bold text-white">12 rip.</span>
                  </div>
                </div>
                <span className="block text-[11px] text-zinc-400 font-medium pt-0.5">
                  ✓ Ottima esecuzione a corpo libero su panca
                </span>
              </div>
            </div>
          </div>

          {/* User's custom future notes / sessions */}
          {customEntries.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Altre Note e Sessioni Aggiunte ({customEntries.length})</span>
              </h4>

              <div className="space-y-3">
                {customEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-bold text-zinc-300">
                          {entry.date}
                        </span>
                        <h5 className="font-bold text-white text-sm">{entry.title}</h5>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 rounded-lg transition"
                        title="Elimina nota"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/50">
                      {entry.notes.map((n, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Note Section */}
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-4">
            {!isAddingNew ? (
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Aggiungi Nuova Nota di Allenamento</span>
              </button>
            ) : (
              <form onSubmit={handleAddEntry} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Nuova Nota / Sessione</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Annulla
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                      Data (es. 28/10)
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="gg/mm"
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                      Titolo (es. Allenamento Pull / Dorso)
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="es. Sessione petto e tricipiti"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Note carichi e ripetizioni (una per riga)
                  </label>
                  <textarea
                    rows={3}
                    value={newNotesText}
                    onChange={(e) => setNewNotesText(e.target.value)}
                    placeholder="Es:&#10;Lat Machine: 20 kg x 10&#10;Pulley Basso: 25 kg x 12"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-xl p-3 text-xs text-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>Salva Nota</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Safety footer disclaimer */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-[11px] text-zinc-400">
            <Info className="w-4 h-4 text-zinc-500 shrink-0" />
            <span>
              Queste note sono un tuo diario di progressione personale. La struttura predefinita della scheda (Push, Pull, Legs) rimane invariata.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-zinc-900/90 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs tracking-wide transition cursor-pointer"
          >
            Chiudi Cronologia
          </button>
        </div>
      </div>
    </div>
  );
};
