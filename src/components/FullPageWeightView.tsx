import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Scale, 
  Calendar, 
  Clock, 
  Plus, 
  Minus,
  Trash2, 
  Edit3, 
  Save, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Camera,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { WeightPeriodRecord } from '../types/workout';

interface FullPageWeightViewProps {
  currentWeight: string;
  onUpdateCurrentWeight: (newWeight: string) => void;
  onBackToWorkout: () => void;
}

const STORAGE_KEY = 'ironroutine_weight_periods_v1';

export const FullPageWeightView: React.FC<FullPageWeightViewProps> = ({
  currentWeight,
  onUpdateCurrentWeight,
  onBackToWorkout,
}) => {
  // Periods list
  const [weightPeriods, setWeightPeriods] = useState<WeightPeriodRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: 'wp_initial',
        weight: '74',
        startDate: '01/11/2026',
        endDate: '04/11/2026',
        notes: 'Peso di partenza della scheda (mantenuto stabile a 74 kg).',
        createdAt: new Date('2026-11-04T12:00:00').getTime(),
      },
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weightPeriods));
    } catch {}
  }, [weightPeriods]);

  // Form state for creating a new period (archive before changing)
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWeight, setNewWeight] = useState(currentWeight);
  const [newStartDate, setNewStartDate] = useState('01/11/2026');
  const [newEndDate, setNewEndDate] = useState('13/11/2026');
  const [newNotes, setNewNotes] = useState('');

  // Editing current active weight directly
  const [isEditingCurrentWeight, setIsEditingCurrentWeight] = useState(false);
  const [tempCurrentWeight, setTempCurrentWeight] = useState(currentWeight);

  // Editing existing archived period
  const [editingPeriodId, setEditingPeriodId] = useState<string | null>(null);
  const [editWeightVal, setEditWeightVal] = useState('');
  const [editStartDateVal, setEditStartDateVal] = useState('');
  const [editEndDateVal, setEditEndDateVal] = useState('');
  const [editNotesVal, setEditNotesVal] = useState('');

  // Deleting confirmation state (inline confirmation without window.confirm)
  const [deletingPeriodId, setDeletingPeriodId] = useState<string | null>(null);

  useEffect(() => {
    let start = '01/11/2026';
    if (weightPeriods.length > 0 && weightPeriods[0].endDate) {
      start = weightPeriods[0].endDate;
    }
    const today = new Date();
    const end = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    setNewStartDate(start);
    setNewEndDate(end === start ? '13/11/2026' : end);
    setNewWeight(currentWeight);
    setTempCurrentWeight(currentWeight);
    setNewNotes('Peso mantenuto costante durante questo periodo di allenamento.');
  }, [currentWeight, weightPeriods]);

  // Save new archived period
  const handleCreatePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight.trim() || !newStartDate.trim() || !newEndDate.trim()) return;

    const record: WeightPeriodRecord = {
      id: `wp_${Date.now()}`,
      weight: newWeight.trim().replace(',', '.'),
      startDate: newStartDate.trim(),
      endDate: newEndDate.trim(),
      notes: newNotes.trim(),
      createdAt: Date.now(),
    };

    setWeightPeriods((prev) => [record, ...prev]);
    setShowCreateForm(false);
  };

  // Start inline editing of an archived period
  const handleStartEdit = (wp: WeightPeriodRecord) => {
    setEditingPeriodId(wp.id);
    setEditWeightVal(wp.weight);
    setEditStartDateVal(wp.startDate);
    setEditEndDateVal(wp.endDate);
    setEditNotesVal(wp.notes || '');
    setDeletingPeriodId(null);
  };

  // Save inline edit of an archived period
  const handleSaveEditPeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPeriodId || !editWeightVal.trim() || !editStartDateVal.trim() || !editEndDateVal.trim()) return;

    setWeightPeriods((prev) =>
      prev.map((p) =>
        p.id === editingPeriodId
          ? {
              ...p,
              weight: editWeightVal.trim().replace(',', '.'),
              startDate: editStartDateVal.trim(),
              endDate: editEndDateVal.trim(),
              notes: editNotesVal.trim(),
            }
          : p
      )
    );
    setEditingPeriodId(null);
  };

  // Direct deletion without window.confirm
  const handleConfirmDelete = (id: string) => {
    setWeightPeriods((prev) => prev.filter((p) => p.id !== id));
    setDeletingPeriodId(null);
    if (editingPeriodId === id) setEditingPeriodId(null);
  };

  // Save modified current active weight
  const handleSaveActiveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(tempCurrentWeight.replace(',', '.'));
    if (!isNaN(val) && val >= 30 && val <= 250) {
      onUpdateCurrentWeight(String(val));
      setIsEditingCurrentWeight(false);
    }
  };

  const handleStepCurrentWeight = (delta: number) => {
    const num = parseFloat(currentWeight) || 74;
    const updated = Math.max(30, Math.min(250, +(num + delta).toFixed(1)));
    onUpdateCurrentWeight(String(updated));
    setTempCurrentWeight(String(updated));
  };

  const handleApplyWeightAsCurrent = (w: string) => {
    onUpdateCurrentWeight(w);
    setTempCurrentWeight(w);
  };

  const activePeriodStartDate = weightPeriods.length > 0 && weightPeriods[0].endDate ? weightPeriods[0].endDate : '01/11/2026';

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Sticky Header with Back Arrow Button - Exact same as Un Mese Dopo and Note */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 py-3.5 shrink-0 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToWorkout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-red-500 stroke-[2.5]" />
            <span>← Torna alla Scheda</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
              Sezione Peso Corporeo
            </span>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
              {currentWeight} kg Attuale
            </span>
          </div>
        </div>
      </header>

      {/* Main Full-Screen Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
        {/* Banner Section */}
        <div className="flex items-start gap-3.5 pb-2 border-b border-zinc-800/80">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-xl shadow-red-950/40">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Peso Corporeo & Cronologia Periodi
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
              Sezione dedicata: gestisci il tuo peso attuale, salva una copia congelata del periodo precedente prima di fare modifiche, o consulta e aggiorna i dati storici.
            </p>
          </div>
        </div>

        {/* Hero Card: Peso Attivo Ora */}
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-950/90 to-black border border-emerald-500/40 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              {/* Apple Fitness Style Round Ring Indicator */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-zinc-900 to-zinc-950 p-1.5 shadow-xl border border-zinc-800 flex items-center justify-center relative shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" className="stroke-zinc-800" strokeWidth="6" fill="none" />
                  <circle
                    cx="50" cy="50" r="42"
                    stroke="#10b981"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    strokeDashoffset="40"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                    {currentWeight}
                  </span>
                  <span className="text-[9px] font-black uppercase text-zinc-400 mt-0.5">KG</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    Peso Attivo Ora
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-300">
                    Dal {activePeriodStartDate} ad Oggi
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight font-mono">
                  {currentWeight} kg
                </h3>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                  Questo è il valore del peso corporeo impostato nella scheda. Puoi modificarlo subito qui sotto con i tasti rapidi o digitarlo manualmente.
                </p>
              </div>
            </div>

            {/* Stepper Quick Actions (-0.5 / +0.5 / +1.0) */}
            <div className="flex flex-col sm:items-end gap-2.5">
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-1 gap-1">
                <button
                  type="button"
                  onClick={() => handleStepCurrentWeight(-0.5)}
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer font-bold text-xs"
                  title="Diminuisci 0.5 kg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-mono text-sm font-bold text-white min-w-[70px] text-center">
                  {currentWeight} kg
                </span>
                <button
                  type="button"
                  onClick={() => handleStepCurrentWeight(+0.5)}
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer font-bold text-xs"
                  title="Aumenta 0.5 kg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTempCurrentWeight(currentWeight);
                    setIsEditingCurrentWeight(!isEditingCurrentWeight);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEditingCurrentWeight ? '✕ Chiudi Modifica' : 'Modifica Numero'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(true);
                    setIsEditingCurrentWeight(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>📸 Salva Periodo Peso</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form to directly enter numeric weight if toggled */}
          {isEditingCurrentWeight && (
            <form onSubmit={handleSaveActiveWeight} className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-3 animate-fade-in">
              <span className="text-xs font-bold text-emerald-400">
                Digita nuovo peso:
              </span>
              <input
                type="number"
                step="0.1"
                min="30"
                max="250"
                autoFocus
                required
                value={tempCurrentWeight}
                onChange={(e) => setTempCurrentWeight(e.target.value)}
                className="w-28 bg-zinc-950 border border-emerald-500 rounded-xl px-3 py-2 text-sm font-mono font-bold text-white focus:outline-none"
              />
              <span className="text-xs font-bold text-zinc-400">kg</span>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition active:scale-95 cursor-pointer shadow flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Salva Peso</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditingCurrentWeight(false)}
                className="px-3 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-semibold cursor-pointer"
              >
                Annulla
              </button>
            </form>
          )}
        </div>

        {/* Create Period Form (Archive previous period) */}
        {showCreateForm && (
          <form onSubmit={handleCreatePeriod} className="p-5 sm:p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/50 space-y-4 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Archivia Periodo di Peso (es. dall'1 al 13 Novembre)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-zinc-500 hover:text-white text-xs p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Peso Mantenuto (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none"
                  placeholder="74"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Data Inizio Periodo
                </label>
                <input
                  type="text"
                  required
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  placeholder="01/11/2026"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Data Fine Periodo
                </label>
                <input
                  type="text"
                  required
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 font-bold focus:outline-none"
                  placeholder="13/11/2026"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Note sul peso in questo periodo
              </label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                placeholder="es. Mantenuto 74 kg costante, carichi stabili..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition active:scale-95 shadow cursor-pointer"
              >
                ✓ Salva Periodo Peso nello Storico
              </button>
            </div>
          </form>
        )}

        {/* List of Archived Weight Periods */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Cronologia & Periodi Archiviati ({weightPeriods.length})</span>
            </h2>
            <span className="text-xs text-zinc-400">
              Storico mantenuto nel tempo
            </span>
          </div>

          {weightPeriods.length === 0 ? (
            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 text-center text-xs text-zinc-500 space-y-2">
              <p>Nessun periodo archiviato presente.</p>
              <p>Clicca sul pulsante "📸 Salva Periodo Peso" per congelare il primo intervallo.</p>
            </div>
          ) : (
            weightPeriods.map((wp, index) => {
              const prevWp = weightPeriods[index + 1];
              const currentNum = parseFloat(wp.weight);
              const prevNum = prevWp ? parseFloat(prevWp.weight) : null;
              const diff = prevNum !== null && !isNaN(currentNum) && !isNaN(prevNum) ? +(currentNum - prevNum).toFixed(1) : null;

              // 1) Inline delete confirmation banner
              if (deletingPeriodId === wp.id) {
                return (
                  <div
                    key={wp.id}
                    className="p-5 rounded-3xl bg-red-950/40 border-2 border-red-500/60 space-y-3 animate-fade-in shadow-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Vuoi davvero eliminare questo periodo di peso?
                        </h4>
                        <p className="text-xs text-red-300 mt-0.5">
                          Periodo: {wp.startDate} → {wp.endDate} • Peso: {wp.weight} kg
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDeletingPeriodId(null)}
                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition cursor-pointer"
                      >
                        Annulla
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmDelete(wp.id)}
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black transition active:scale-95 shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>✓ Sì, Elimina Definitivamente</span>
                      </button>
                    </div>
                  </div>
                );
              }

              // 2) Inline edit form for this period
              if (editingPeriodId === wp.id) {
                return (
                  <form
                    key={wp.id}
                    onSubmit={handleSaveEditPeriod}
                    className="p-5 sm:p-6 rounded-3xl bg-zinc-950 border-2 border-amber-500/60 space-y-4 animate-fade-in shadow-2xl"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <Edit3 className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black text-amber-400 uppercase tracking-wider">
                          Modifica Dati Periodo Peso
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingPeriodId(null)}
                        className="text-zinc-400 hover:text-white text-xs px-2.5 py-1.5 rounded-xl bg-zinc-900 cursor-pointer"
                      >
                        ✕ Annulla
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                          Peso (kg)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          required
                          value={editWeightVal}
                          onChange={(e) => setEditWeightVal(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                          Data Inizio
                        </label>
                        <input
                          type="text"
                          required
                          value={editStartDateVal}
                          onChange={(e) => setEditStartDateVal(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                          Data Fine
                        </label>
                        <input
                          type="text"
                          required
                          value={editEndDateVal}
                          onChange={(e) => setEditEndDateVal(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 font-bold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                        Note sul periodo
                      </label>
                      <input
                        type="text"
                        value={editNotesVal}
                        onChange={(e) => setEditNotesVal(e.target.value)}
                        placeholder="es. Peso mantenuto stabile..."
                        className="w-full bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPeriodId(null);
                          setDeletingPeriodId(wp.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-bold transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Elimina</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingPeriodId(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-850 text-zinc-300 text-xs font-semibold cursor-pointer"
                        >
                          Annulla
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition active:scale-95 shadow cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Salva Modifiche</span>
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }

              // 3) Standard Card View
              return (
                <div
                  key={wp.id}
                  className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 transition space-y-3 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                          📅 {wp.startDate} → {wp.endDate}
                        </span>
                        {diff !== null && diff !== 0 && (
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                            diff > 0 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {diff > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{diff > 0 ? `+${diff}` : diff} kg</span>
                          </span>
                        )}
                      </div>
                      <span className="text-2xl font-black text-white font-mono block pt-0.5">
                        {wp.weight} kg
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleApplyWeightAsCurrent(wp.weight)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition active:scale-95 cursor-pointer border border-zinc-700"
                        title="Imposta questo peso come peso attuale"
                      >
                        Usa come Attuale
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(wp)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-amber-400 text-xs font-bold transition active:scale-95 cursor-pointer border border-zinc-700"
                        title="Modifica questo periodo"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modifica</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingPeriodId(wp.id)}
                        className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-red-400 transition active:scale-95 cursor-pointer border border-zinc-700"
                        title="Elimina questo periodo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {wp.notes && (
                    <p className="text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-850 leading-relaxed">
                      {wp.notes}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Bar with return button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tutti i dati del peso corporeo rimangono salvati in memoria permanente.</span>
          </span>
          <button
            type="button"
            onClick={onBackToWorkout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-white font-bold transition active:scale-95 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-red-400 stroke-[2.5]" />
            <span>← Torna alla Scheda di Allenamento</span>
          </button>
        </div>
      </main>
    </div>
  );
};
