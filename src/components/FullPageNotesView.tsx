import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Share2, 
  Copy, 
  Check, 
  Dumbbell, 
  Info,
  Layers,
  BookOpen,
  Edit3,
  X,
  Save
} from 'lucide-react';
import { NoteEntry, DayOfWeekId } from '../types/workout';

import { StructuredResocontoView } from './StructuredResocontoView';

interface FullPageNotesViewProps {
  notes: NoteEntry[];
  onAddNote: (note: Omit<NoteEntry, 'id' | 'timestamp'>) => void;
  onUpdateNote: (note: NoteEntry) => void;
  onDeleteNote: (id: string) => void;
  onBackToWorkout: () => void;
  activeDayId: DayOfWeekId;
  activeDayName: string;
}

export const FullPageNotesView: React.FC<FullPageNotesViewProps> = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onBackToWorkout,
  activeDayId,
  activeDayName,
}) => {
  // Sub-view: list vs reading a specific note
  const [selectedNote, setSelectedNote] = useState<NoteEntry | null>(null);
  const [readingMode, setReadingMode] = useState<'structured' | 'raw'>('structured');

  // New Note Form State
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDayId, setNewDayId] = useState<DayOfWeekId | undefined>(activeDayId);
  const [newBadge, setNewBadge] = useState('Nota Personale');
  const [copied, setCopied] = useState(false);

  // Edit Note Modal State
  const [editingNote, setEditingNote] = useState<NoteEntry | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editDayId, setEditDayId] = useState<DayOfWeekId | undefined>(1);
  const [editDayName, setEditDayName] = useState('Lunedì');
  const [editBadge, setEditBadge] = useState('');
  const [editDate, setEditDate] = useState('');

  const openEditModal = (note: NoteEntry) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditDayId(note.dayId);
    setEditDayName(note.dayName || 'Lunedì');
    setEditBadge(note.badge || '');
    setEditDate(note.date);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote || !editTitle.trim() || !editContent.trim()) return;

    const dayNames: Record<number, string> = { 1: 'Lunedì', 2: 'Mercoledì', 3: 'Venerdì' };
    const updated: NoteEntry = {
      ...editingNote,
      title: editTitle.trim(),
      content: editContent.trim(),
      dayId: editDayId,
      dayName: editDayId ? dayNames[editDayId] : undefined,
      badge: editBadge.trim() || undefined,
      date: editDate.trim() || editingNote.date,
    };

    onUpdateNote(updated);
    if (selectedNote?.id === updated.id) {
      setSelectedNote(updated);
    }
    setEditingNote(null);
  };

  // Filter notes: optionally filter by day or view all
  const [dayFilter, setDayFilter] = useState<'all' | DayOfWeekId>(activeDayId);

  // Sort notes: Strictly newest first (highest timestamp at top, lowest at bottom)
  const sortedNotes = [...notes]
    .filter((n) => (dayFilter === 'all' ? true : n.dayId === dayFilter || !n.dayId))
    .sort((a, b) => b.timestamp - a.timestamp);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const dayNames: Record<number, string> = { 1: 'Lunedì', 2: 'Mercoledì', 3: 'Venerdì' };

    onAddNote({
      title: newTitle.trim(),
      date: dateStr,
      time: timeStr,
      dayId: newDayId,
      dayName: newDayId ? dayNames[newDayId] : undefined,
      content: newContent.trim(),
      badge: newBadge.trim() || 'Nota Personale',
      isCustom: true,
    });

    setNewTitle('');
    setNewContent('');
    setNewBadge('Nota Personale');
    setIsCreating(false);
  };

  const handleCopyNoteContent = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. DETAIL / READING SUB-PAGE FOR A NOTE
  if (selectedNote) {
    const isResoconto = 
      selectedNote.id === 'note_2026_11_03' || 
      selectedNote.title.includes('Resoconto Allenamento e Crescita Muscolare');

    const isNote2610 = 
      selectedNote.id === 'note_2026_10_26' || 
      selectedNote.title.includes('26/10');

    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
        {/* Full-width Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <button
              onClick={() => setSelectedNote(null)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Torna all'Elenco Note</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditModal(selectedNote)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 text-xs font-semibold transition active:scale-95 cursor-pointer"
                title="Modifica titolo e contenuto di questa nota"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modifica</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Vuoi davvero eliminare la nota "${selectedNote.title}"?`)) {
                    onDeleteNote(selectedNote.id);
                    setSelectedNote(null);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 text-red-400 hover:text-red-300 text-xs font-semibold transition active:scale-95 cursor-pointer"
                title="Elimina nota definitivamente"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Elimina</span>
              </button>

              <button
                onClick={() => handleCopyNoteContent(selectedNote.content)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition cursor-pointer"
                title="Copia testo negli appunti"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copia testo</span>
                  </>
                )}
              </button>

              <button
                onClick={onBackToWorkout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Torna alla Scheda</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* Note Header Card */}
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedNote.date}</span>
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{selectedNote.time}</span>
              </span>

              {selectedNote.dayName && (
                <span className="px-3 py-1 rounded-full text-xs font-bold text-red-400 bg-red-950/30 border border-red-500/30">
                  {selectedNote.dayName}
                </span>
              )}

              {selectedNote.badge && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                  {selectedNote.badge}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {selectedNote.title}
            </h1>

            {/* View Mode Switcher Pills */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1">
                Visualizzazione:
              </span>
              <button
                onClick={() => setReadingMode('structured')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  readingMode === 'structured'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Strutturata & Chiara</span>
              </button>
              <button
                onClick={() => setReadingMode('raw')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  readingMode === 'raw'
                    ? 'bg-white text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Testo Integrale</span>
              </button>
            </div>
          </div>

          {/* Render based on mode */}
          {readingMode === 'structured' ? (
            isResoconto ? (
              <StructuredResocontoView onCopyText={() => handleCopyNoteContent(selectedNote.content)} />
            ) : isNote2610 ? (
              <div className="space-y-5 animate-fade-in">
                <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aggiornamento Eseguito</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Fatto! Sostituito il cavo singolo con le dips su panca.
                  </p>
                  <p className="text-xs text-zinc-400">
                    Ecco la scheda aggiornata e i miglioramenti registrati nella sessione del 26/10:
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Shoulder Press 14 kg */}
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-red-400" />
                        <h3 className="text-sm sm:text-base font-black text-white">Shoulder Press</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 font-bold text-xs">
                        14 kg
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 1: <strong>10 rip.</strong> (14 kg)</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 2: <strong>6/7 rip.</strong> (14 kg)</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 3: <strong>5 rip.</strong> (14 kg)</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 4: <strong>7 rip.</strong> (14 kg)</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 5: <strong>5 rip.</strong> (14 kg)</span>
                    </div>
                  </div>

                  {/* PEC Fly 18 kg */}
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-sm sm:text-base font-black text-white">PEC Fly</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
                        18 kg
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 1: <strong>12 rip.</strong> (18 kg)</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 2: <strong>12 rip.</strong> (18 kg)</span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 3: <strong>12 rip.</strong> (18 kg)</span>
                    </div>
                  </div>

                  {/* Push down sbarra dritta */}
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-blue-400" />
                        <h3 className="text-sm sm:text-base font-black text-white">Push down sbarra dritta</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 font-bold text-xs">
                        18 - 23 kg
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">18 kg — <strong>12 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">23 kg — <strong>10 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">23 kg — <strong>5 rip.</strong></span>
                    </div>
                  </div>

                  {/* French Press */}
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-purple-400" />
                        <h3 className="text-sm sm:text-base font-black text-white">French Press</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold text-xs">
                        2.5 - 6 kg
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">2.5 kg — <strong>12 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">5 kg — <strong>6 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">5 kg — <strong>5 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">6 kg — <strong>5 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">6 kg — <strong>5 rip.</strong></span>
                    </div>
                  </div>

                  {/* Dips su panca */}
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm sm:text-base font-black text-white">Dips su panca</h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/30 font-bold text-xs">
                        Corpo Libero
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 1: <strong>12 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 2: <strong>12 rip.</strong></span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono">Serie 3: <strong>12 rip.</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Generic Structured View for custom user notes */
              <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-7 space-y-4">
                <div className="space-y-3 text-sm leading-relaxed text-zinc-200">
                  {selectedNote.content.split('\n\n').map((block, bIdx) => (
                    <div key={bIdx} className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 space-y-1.5">
                      {block.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className="text-zinc-200 text-xs sm:text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* RAW FULL TEXT VIEW */
            <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Testo Integrale Originale
                </span>
                <button
                  onClick={() => handleCopyNoteContent(selectedNote.content)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copia tutto</span>
                </button>
              </div>

              <div className="bg-zinc-900/80 rounded-2xl p-4 sm:p-6 border border-zinc-800/90 font-mono text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed select-text">
                {selectedNote.content}
              </div>
            </div>
          )}

          {/* Footer Back navigation */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Nota salvata in modo permanente sul tuo dispositivo</span>
            </span>

            <button
              onClick={() => setSelectedNote(null)}
              className="text-emerald-400 hover:text-emerald-300 font-bold self-start sm:self-auto cursor-pointer"
            >
              ← Torna all'elenco delle note
            </button>
          </div>
        </main>
      </div>
    );
  }

  // 2. MAIN LIST VIEW OF ALL NOTES (Most recent at top, least recent at bottom)
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Full-width Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWorkout}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-red-500" />
              <span>← Torna alla Scheda</span>
            </button>
            <div className="hidden sm:block w-px h-5 bg-zinc-800" />
            <span className="text-xs font-bold text-zinc-400 hidden sm:inline">
              Sezione Note & Cronologia
            </span>
          </div>

          <button
            onClick={() => setIsCreating(!isCreating)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuova Nota</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero Section Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                Diario & Archivio Personale
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Cronologia & Note di Allenamento
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed mt-2">
            In questa sezione trovi tutte le tue note, i resoconti dettagliati e i miglioramenti registrati, ordinati in successione temporale (dalla più recente in alto alla meno recente in basso).
          </p>

          {/* Filter Pills */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1">
              Filtra per giorno:
            </span>
            <button
              onClick={() => setDayFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                dayFilter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Tutte le Note ({notes.length})
            </button>
            <button
              onClick={() => setDayFilter(1)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                dayFilter === 1
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Lunedì
            </button>
            <button
              onClick={() => setDayFilter(2)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                dayFilter === 2
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Mercoledì
            </button>
            <button
              onClick={() => setDayFilter(3)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                dayFilter === 3
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Venerdì
            </button>
          </div>
        </div>

        {/* Creation Drawer Form */}
        {isCreating && (
          <div className="rounded-3xl bg-zinc-950 border border-emerald-500/40 p-5 sm:p-6 shadow-2xl animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Nuova Annotazione</h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">
                Data & ora automatiche
              </span>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Titolo della Nota
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es. Resoconto serie Shoulder Press e cedimento"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Giorno di Riferimento
                  </label>
                  <select
                    value={newDayId || ''}
                    onChange={(e) => setNewDayId(e.target.value ? Number(e.target.value) as DayOfWeekId : undefined)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="1">Lunedì (Push & Spalle)</option>
                    <option value="2">Mercoledì (Pull & Dorso)</option>
                    <option value="3">Venerdì (Legs & Gambe)</option>
                    <option value="">Tutte le Giornate / Generale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Etichetta / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="Es. Nota Personale, Tecnica, Miglioramenti"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Testo e Contenuto della Nota
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Scrivi qui i tuoi appunti, riflessioni sui carichi o sensazioni muscolari..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
                >
                  Salva nel Diario
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sorted Notes List (Newest first, descending) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Note in Ordine Cronologico ({sortedNotes.length})</span>
            </h2>
            <span className="text-[11px] text-zinc-400">
              Dalla più recente alla meno recente
            </span>
          </div>

          {sortedNotes.length === 0 ? (
            <div className="text-center py-12 rounded-3xl bg-zinc-950 border border-zinc-900 p-8 space-y-2">
              <FileText className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-zinc-400">Nessuna nota per questo filtro.</p>
              <button
                onClick={() => setDayFilter('all')}
                className="text-xs text-emerald-400 hover:underline font-semibold"
              >
                Mostra tutte le note
              </button>
            </div>
          ) : (
            sortedNotes.map((note, index) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className="group relative rounded-3xl bg-zinc-950 hover:bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 p-5 sm:p-6 shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
              >
                {/* Ranking Index Pill & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-300">
                      #{index + 1}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{note.date}</span>
                    </span>

                    <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{note.time}</span>
                    </span>

                    {note.dayName && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-red-400 bg-red-950/20 border border-red-500/20">
                        {note.dayName}
                      </span>
                    )}

                    {note.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                        {note.badge}
                      </span>
                    )}
                  </div>

                  {/* Edit and Delete Actions on ANY note */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => openEditModal(note)}
                      className="text-zinc-400 hover:text-amber-300 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition active:scale-95"
                      title="Modifica questa nota"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Vuoi davvero eliminare la nota "${note.title}"?`)) {
                          onDeleteNote(note.id);
                        }
                      }}
                      className="text-zinc-400 hover:text-red-400 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/40 transition active:scale-95"
                      title="Elimina nota"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition tracking-tight mb-2">
                  {note.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {note.content}
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-400 font-medium">
                    Tocca per aprire e leggere il resoconto completo
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-1 transition">
                    <span>Leggi tutto</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-black text-white">Modifica Nota</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingNote(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Titolo della Nota
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Giorno di Riferimento
                  </label>
                  <select
                    value={editDayId || ''}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) as DayOfWeekId : undefined;
                      setEditDayId(val);
                      const dayNames: Record<number, string> = { 1: 'Lunedì', 2: 'Mercoledì', 3: 'Venerdì' };
                      setEditDayName(val ? dayNames[val] : 'Tutte le Giornate');
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="1">Lunedì</option>
                    <option value="2">Mercoledì</option>
                    <option value="3">Venerdì</option>
                    <option value="">Tutte le Giornate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Etichetta / Badge
                  </label>
                  <input
                    type="text"
                    value={editBadge}
                    onChange={(e) => setEditBadge(e.target.value)}
                    placeholder="Es. Inizio Mese, Tecnica"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Data Registrata
                </label>
                <input
                  type="text"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Testo e Contenuto della Nota
                </label>
                <textarea
                  rows={8}
                  required
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none resize-none leading-relaxed select-text font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salva Modifiche</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
