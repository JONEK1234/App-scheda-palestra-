import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  Database, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Share2,
  HardDrive
} from 'lucide-react';
import { NoteEntry, WorkoutSessionLogs, WorkoutCustomizations } from '../types/workout';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: WorkoutSessionLogs;
  bodyWeight: string;
  notes: NoteEntry[];
  workoutCustomizations?: WorkoutCustomizations;
  onRestoreData: (restoredData: {
    logs?: WorkoutSessionLogs;
    bodyWeight?: string;
    notes?: NoteEntry[];
    monthlySnapshots?: any;
    monthlyAnnotations?: any;
    customOverrides?: any;
    workoutCustomizations?: WorkoutCustomizations;
  }) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  logs,
  bodyWeight,
  notes,
  workoutCustomizations,
  onRestoreData,
}) => {
  const [copied, setCopied] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'download' | 'upload' | 'text'>('download');

  if (!isOpen) return null;

  // Generate full backup payload
  const generateBackupData = () => {
    let monthlySnapshots = {};
    let monthlyAnnotations = [];
    let customOverrides = {};
    let activeCustomizations = workoutCustomizations || {};

    try {
      const snapRaw = localStorage.getItem('ironroutine_monthly_snapshots_v2');
      if (snapRaw) monthlySnapshots = JSON.parse(snapRaw);
    } catch {}

    try {
      const annRaw = localStorage.getItem('ironroutine_monthly_annotations_v2');
      if (annRaw) monthlyAnnotations = JSON.parse(annRaw);
    } catch {}

    try {
      const covRaw = localStorage.getItem('ironroutine_custom_month_overrides_v1');
      if (covRaw) customOverrides = JSON.parse(covRaw);
    } catch {}

    try {
      const wCustomRaw = localStorage.getItem('ironroutine_workout_customizations_v1');
      if (wCustomRaw) activeCustomizations = JSON.parse(wCustomRaw);
    } catch {}

    return {
      appName: 'IronRoutine PRO',
      version: '2.1',
      exportDate: new Date().toISOString(),
      exportDateFormatted: `${new Date().toLocaleDateString('it-IT')} ${new Date().toLocaleTimeString('it-IT')}`,
      data: {
        bodyWeight,
        logs,
        notes,
        monthlySnapshots,
        monthlyAnnotations,
        customOverrides,
        workoutCustomizations: activeCustomizations,
      }
    };
  };

  const handleDownloadFile = () => {
    try {
      const backup = generateBackupData();
      const jsonString = JSON.stringify(backup, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const now = new Date();
      const datePart = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const fileName = `IronRoutine_Backup_${datePart}.json`;

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: `File "${fileName}" scaricato con successo! Conservalo o invialo al tuo secondo dispositivo.`
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Errore durante la generazione del backup.'
      });
    }
  };

  const handleCopyClipboard = () => {
    try {
      const backup = generateBackupData();
      navigator.clipboard.writeText(JSON.stringify(backup, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setStatusMessage({
        type: 'success',
        text: 'Backup copiato negli appunti! Puoi incollarlo in WhatsApp, Note o inviartelo via messaggio.'
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Impossibile copiare negli appunti.'
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        applyRestoredJson(text);
      } catch (err) {
        setStatusMessage({
          type: 'error',
          text: 'File JSON non valido o corrotto. Verifica il file selezionato.'
        });
      }
    };
    reader.readAsText(file);
  };

  const handleApplyPasteText = () => {
    if (!pasteText.trim()) return;
    try {
      applyRestoredJson(pasteText.trim());
      setPasteText('');
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Il testo incollato non è un backup JSON valido di Iron Routine.'
      });
    }
  };

  const applyRestoredJson = (jsonStr: string) => {
    const parsed = JSON.parse(jsonStr);
    const data = parsed.data || parsed; // Handle both wrapped and bare format

    if (!data || typeof data !== 'object') {
      throw new Error('Dati non validi');
    }

    onRestoreData({
      logs: data.logs,
      bodyWeight: data.bodyWeight,
      notes: data.notes,
      monthlySnapshots: data.monthlySnapshots,
      monthlyAnnotations: data.monthlyAnnotations,
      customOverrides: data.customOverrides,
      workoutCustomizations: data.workoutCustomizations,
    });

    setStatusMessage({
      type: 'success',
      text: 'Backup caricato e ripristinato con successo! Tutti i dati, le parole personalizzate e le note sono sincronizzati.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Backup & Sincronizzazione Dati
              </h2>
              <p className="text-xs text-zinc-400">
                Salva o trasferisci la scheda, i pesi, le note e le progressioni
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div className={`p-3.5 mx-5 mt-4 rounded-2xl flex items-center gap-2.5 text-xs font-semibold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border border-red-500/40 text-red-300'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab selection */}
        <div className="grid grid-cols-3 gap-1.5 p-2 mx-5 mt-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('download')}
            className={`py-2 px-3 rounded-xl font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'download'
                ? 'bg-zinc-800 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scarica</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-3 rounded-xl font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-zinc-800 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Carica File</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`py-2 px-3 rounded-xl font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'text'
                ? 'bg-zinc-800 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span>Copia/Incolla</span>
          </button>
        </div>

        {/* Content body based on tab */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
                <span className="text-white font-bold block">
                  Cosa contiene questo backup:
                </span>
                <ul className="space-y-1 text-zinc-300 list-disc list-inside text-xs">
                  <li>Tutti i carichi e ripetizioni registrati per ciascuna serie</li>
                  <li>Il tuo peso corporeo attuale ({bodyWeight} kg)</li>
                  <li>Tutte le note, cronologia e riflessioni muscolari ({notes.length} note)</li>
                  <li>Tutti i parametri di "Un Mese Dopo", cardio e annotazioni</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Scarica File Backup (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  className="w-full py-2.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copiato negli appunti!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span>Copia Backup come Testo Rapido</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
                <span className="text-white font-bold block">
                  Carica un file di backup precedente:
                </span>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  Seleziona il file <strong>.json</strong> scaricato in precedenza o da un altro dispositivo. L'app sostituirà i dati correnti sincronizzandosi istantaneamente.
                </p>
              </div>

              <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-blue-500/60 bg-zinc-900/30 hover:bg-zinc-900/60 transition cursor-pointer text-center space-y-2">
                <Upload className="w-8 h-8 text-blue-400" />
                <span className="text-white font-bold text-xs sm:text-sm">
                  Tocca qui per scegliere il file JSON
                </span>
                <span className="text-[11px] text-zinc-500">
                  Formato supportato: .json
                </span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400">
                Incolla qui sotto il codice JSON del backup se l'hai copiato tramite messaggio o note:
              </p>
              <textarea
                rows={5}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder='Incolla qui il testo del backup (inizia con { "appName": "IronRoutine PRO"... )...'
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-2xl p-3 font-mono text-xs text-zinc-200 focus:outline-none resize-none"
              />
              <button
                type="button"
                onClick={handleApplyPasteText}
                disabled={!pasteText.trim()}
                className="w-full py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Check className="w-4 h-4" />
                <span>Ripristina da questo Testo</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold transition"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
