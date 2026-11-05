import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  Plus, 
  Trash2, 
  Dumbbell, 
  CheckCircle2, 
  ChevronRight, 
  Save, 
  History, 
  AlertCircle,
  Award,
  Edit3,
  X,
  RotateCcw,
  Camera,
  Eye,
  Bookmark,
  FileText,
  Check
} from 'lucide-react';
import { 
  DayOfWeekId, 
  WorkoutDay, 
  WorkoutSessionLogs, 
  DayMonthlyAnnotation,
  MonthlyProgressSnapshot,
  WorkoutPeriodSnapshot,
  DayPeriodRecord,
  ExercisePeriodRecord
} from '../types/workout';
import { SavePeriodModal } from './SavePeriodModal';
import { PeriodDetailModal } from './PeriodDetailModal';
import { EditPeriodModal } from './EditPeriodModal';

export interface ExerciseMonthOverride {
  baselineText?: string;
  baselineSub?: string;
  currentText?: string;
  currentSub?: string;
}

interface MonthAfterViewProps {
  days: WorkoutDay[];
  currentLogs: WorkoutSessionLogs;
  activeDayId: DayOfWeekId;
  onBackToWorkout: () => void;
  bodyWeight: string;
}

const STORAGE_MONTHLY_KEY = 'ironroutine_monthly_snapshots_v2';
const STORAGE_MONTHLY_ANNOTATIONS_KEY = 'ironroutine_monthly_annotations_v2';
const STORAGE_CUSTOM_OVERRIDES_KEY = 'ironroutine_custom_month_overrides_v1';
const STORAGE_PERIODS_KEY = 'ironroutine_workout_periods_v1';

export const MonthAfterView: React.FC<MonthAfterViewProps> = ({
  days,
  currentLogs,
  activeDayId,
  onBackToWorkout,
  bodyWeight,
}) => {
  // Selected day for comparison: defaults to the active day from workout
  const [selectedDayId, setSelectedDayId] = useState<DayOfWeekId>(activeDayId);

  // Month Key: e.g. "2026-11"
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>('2026-11');

  // Saved monthly snapshots (Record<monthKey, MonthlyProgressSnapshot>)
  const [snapshots, setSnapshots] = useState<Record<string, MonthlyProgressSnapshot>>(() => {
    // Default baseline for November 2026
    const defaultBaselines: Record<string, string> = {
      // Giorno 1 (Lunedì)
      g1_ex2: '14', // Chest Press
      g1_ex3: '18', // Pec Fly
      g1_ex4: '14', // Shoulder Press
      g1_ex5: '5',  // Alzate laterali + frontali (5 kg)
      g1_ex6: '5',  // French Press (5 kg)
      g1_ex7: '18', // Push Down Sbarra Diritta
      g1_ex8: '0',  // Dips su panca (corpo libero)
      // Giorno 2 (Mercoledì)
      g2_ex2: '18', // Lat Machine
      g2_ex3: '20', // Pulley Basso
      g2_ex4: '5',  // Rematore Manubri
      g2_ex5: '5',  // Curl Manubri
      g2_ex6: '23', // Curl Cavo
      // Giorno 3 (Venerdì)
      g3_ex2: '60', // Leg Press
      g3_ex3: '35', // Leg Extension
      g3_ex4: '30', // Leg Curl
      g3_ex5: '12', // Affondi
      g3_ex6: '16', // Squat Sumo
    };

    try {
      const saved = localStorage.getItem(STORAGE_MONTHLY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed['2026-11']) {
          parsed['2026-11'].baselineWeights = {
            ...parsed['2026-11'].baselineWeights,
            g1_ex5: '5',
            g1_ex6: '5',
          };
        }
        return parsed;
      }
    } catch {
      // fallback
    }

    return {
      '2026-11': {
        monthKey: '2026-11',
        monthName: 'Novembre 2026 (In corso)',
        targetDate: '2026-12-01T00:00:00',
        baselineWeights: defaultBaselines,
        annotations: [
          {
            id: 'ann_lunedi_pesi_5kg',
            text: 'Lunedì — Inizio mese fissato: Alzate laterali e frontali a 5 kg (un po’ pesanti), French press a 5 kg (leggermente pesanti).',
            date: '04/11/2026',
            time: '12:20',
            timestamp: new Date('2026-11-04T12:20:00').getTime(),
            dayId: 1,
            dayName: 'Lunedì'
          },
          {
            id: 'ann_initial',
            text: 'Inizio mese fissato. Carichi di partenza registrati per monitorare i miglioramenti un mese dopo.',
            date: '01/11/2026',
            time: '09:00',
            timestamp: new Date('2026-11-01T09:00:00').getTime(),
            dayId: 1,
            dayName: 'Lunedì'
          }
        ],
      },
      '2026-10': {
        monthKey: '2026-10',
        monthName: 'Ottobre 2026 (Archivio Mese Scorso)',
        targetDate: '2026-11-01T00:00:00',
        baselineWeights: {
          g1_ex2: '12',
          g1_ex3: '16',
          g1_ex4: '9',
          g1_ex5: '5',
          g1_ex6: '2.5',
          g1_ex7: '14',
          g2_ex2: '15',
          g2_ex3: '18',
          g2_ex4: '4',
          g2_ex5: '4',
          g2_ex6: '20',
        },
        annotations: [
          {
            id: 'ann_oct_end',
            text: 'Chiusura mese di ottobre: Shoulder press aumentata da 9kg a 14kg, push down sbarra arrivata a 23kg.',
            date: '26/10/2026',
            time: '19:15',
            timestamp: new Date('2026-10-26T19:15:00').getTime(),
            dayId: 1,
            dayName: 'Lunedì'
          }
        ],
      }
    };
  });

  // Annotations state (all annotations across days and months)
  const [annotations, setAnnotations] = useState<DayMonthlyAnnotation[]>(() => {
    const defaultList: DayMonthlyAnnotation[] = [
      {
        id: 'ann_lunedi_cardio_pesi_v2',
        text: 'Lunedì — Tapis Roulant: 10 min pendenza 4 vel. 8.5 (fine resistenza a 7:30, rallentamento e ripartenza fino a 10:30). Cyclette: 10:30 min Livello 3 (ultimi minuti Livello 4). Alzate Laterali+Frontali: attuale 5 kg (un po’ pesanti). French Press: 5 kg (leggermente pesanti).',
        date: '04/11/2026',
        time: '12:30',
        timestamp: new Date('2026-11-04T12:30:00').getTime(),
        dayId: 1,
        dayName: 'Lunedì'
      },
      {
        id: 'ann_init_1',
        text: 'Carico di partenza Dips su panca inserito a corpo libero (12 rip. costanti). Shoulder press salita a 14kg.',
        date: '03/11/2026',
        time: '12:24',
        timestamp: new Date('2026-11-03T12:24:00').getTime(),
        dayId: 1,
        dayName: 'Lunedì'
      }
    ];

    try {
      const saved = localStorage.getItem(STORAGE_MONTHLY_ANNOTATIONS_KEY);
      if (saved) {
        const parsed: DayMonthlyAnnotation[] = JSON.parse(saved);
        if (!parsed.some((a) => a.id === 'ann_lunedi_cardio_pesi_v2')) {
          return [defaultList[0], ...parsed];
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return defaultList;
  });

  // New annotation input
  const [newAnnotationText, setNewAnnotationText] = useState('');
  const [showAddAnnotation, setShowAddAnnotation] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MONTHLY_KEY, JSON.stringify(snapshots));
    } catch {
      // storage fallback
    }
  }, [snapshots]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MONTHLY_ANNOTATIONS_KEY, JSON.stringify(annotations));
    } catch {
      // storage fallback
    }
  }, [annotations]);

  // Live Countdown Timer to next month target date (1 Dicembre 2026)
  const targetDate = new Date('2026-12-01T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Active workout day object for the selected tab
  const currentWorkoutDay = days.find((d) => d.id === selectedDayId) || days[0];

  // Active snapshot
  const currentSnapshot = snapshots[selectedMonthKey] || snapshots['2026-11'];
  const baselineWeights = currentSnapshot?.baselineWeights || {};

  // Handle adding an annotation with AUTOMATIC DATE AND TIME
  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnotationText.trim()) return;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newAnn: DayMonthlyAnnotation = {
      id: `ann_${Date.now()}`,
      text: newAnnotationText.trim(),
      date: dateStr,
      time: timeStr,
      timestamp: now.getTime(),
      dayId: selectedDayId,
      dayName: currentWorkoutDay.dayName,
    };

    setAnnotations((prev) => [newAnn, ...prev]);
    setNewAnnotationText('');
    setShowAddAnnotation(false);
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  };

  // Custom user text overrides for "Un Mese Dopo" (persisted)
  const [customOverrides, setCustomOverrides] = useState<Record<string, ExerciseMonthOverride>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_OVERRIDES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_OVERRIDES_KEY, JSON.stringify(customOverrides));
    } catch {}
  }, [customOverrides]);

  // Exercise text edit modal state
  const [editingExercise, setEditingExercise] = useState<{
    exerciseId: string;
    exerciseName: string;
    baselineText: string;
    baselineSub: string;
    currentText: string;
    currentSub: string;
  } | null>(null);

  // Annotation edit state
  const [editingAnnotation, setEditingAnnotation] = useState<DayMonthlyAnnotation | null>(null);
  const [editAnnotationText, setEditAnnotationText] = useState('');

  const handleSaveExerciseOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExercise) return;
    setCustomOverrides((prev) => ({
      ...prev,
      [editingExercise.exerciseId]: {
        baselineText: editingExercise.baselineText.trim(),
        baselineSub: editingExercise.baselineSub.trim(),
        currentText: editingExercise.currentText.trim(),
        currentSub: editingExercise.currentSub.trim(),
      },
    }));
    setEditingExercise(null);
  };

  const handleResetExerciseOverride = (exerciseId: string) => {
    setCustomOverrides((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
    setEditingExercise(null);
  };

  const handleSaveEditedAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnotation || !editAnnotationText.trim()) return;
    setAnnotations((prev) =>
      prev.map((a) =>
        a.id === editingAnnotation.id ? { ...a, text: editAnnotationText.trim() } : a
      )
    );
    setEditingAnnotation(null);
    setEditAnnotationText('');
  };

  // Helper to extract numeric current weight from user logs
  const getExerciseCurrentWeight = (exerciseId: string, defaultWeightKg?: number | string): number => {
    const logs = currentLogs[exerciseId];
    if (logs && logs.length > 0) {
      // Find highest or first valid weight entered
      for (const s of logs) {
        const val = parseFloat(s.weight);
        if (!isNaN(val) && val > 0) return val;
      }
    }
    const def = parseFloat(String(defaultWeightKg || '0'));
    return isNaN(def) ? 0 : def;
  };

  // Calculate comparison for any given day
  const computeDayComparison = (dayToCompare: WorkoutDay) => {
    return dayToCompare.exercises.map((ex) => {
      if (ex.isTimeBased) {
        const isCompleted = currentLogs[ex.id]?.[0]?.completed;
        let status: 'increased' | 'decreased' | 'stable' = isCompleted ? 'increased' : 'stable';

        let baselineText = ex.prescription;
        let baselineSub = '';
        let currentText = ex.prescription;
        let currentSub = '';

        if (ex.id === 'g1_ex1') {
          baselineText = '10:00 min';
          baselineSub = 'Pend. 4 • Vel. 8.5';
          currentText = '10:30 min';
          currentSub = 'Resist. 7:30 → 10:30';
          status = 'increased';
        } else if (ex.id === 'g1_ex10') {
          baselineText = '10:30 min';
          baselineSub = 'Livello 3';
          currentText = '10:30 min';
          currentSub = 'Ultimi min. Livello 4';
          status = 'increased';
        } else if (ex.id === 'g2_ex8') {
          baselineText = '30 sec';
          baselineSub = 'Plank';
          currentText = '30 sec';
          currentSub = 'Tenuta core';
          status = 'stable';
        }

        // Apply user custom override if present
        const override = customOverrides[ex.id];
        if (override) {
          if (override.baselineText !== undefined && override.baselineText !== '') baselineText = override.baselineText;
          if (override.baselineSub !== undefined) baselineSub = override.baselineSub;
          if (override.currentText !== undefined && override.currentText !== '') currentText = override.currentText;
          if (override.currentSub !== undefined) currentSub = override.currentSub;
        }

        return {
          exercise: ex,
          isTimeBased: true,
          baseline: 0,
          baselineText,
          baselineSub,
          current: 0,
          currentText,
          currentSub,
          diff: 0,
          status,
          isOverridden: !!override,
        };
      }

      const current = getExerciseCurrentWeight(ex.id, ex.defaultWeightKg);
      const baseline = parseFloat(baselineWeights[ex.id] || String(ex.defaultWeightKg || 0)) || 0;
      const diff = +(current - baseline).toFixed(1);

      let status: 'increased' | 'decreased' | 'stable' = 'stable';
      if (diff > 0) status = 'increased';
      else if (diff < 0) status = 'decreased';

      let baselineText = baseline > 0 ? `${baseline} kg` : 'Corpo libero';
      let baselineSub = ''; // Non mettere la parentesi nell'inizio come richiesto!
      let currentText = current > 0 ? `${current} kg` : 'Corpo libero';
      let currentSub = ex.id === 'g1_ex5' ? '(un po’ pesanti)' : ex.id === 'g1_ex6' ? '(leggermente pesanti)' : '';

      // Apply user custom override if present
      const override = customOverrides[ex.id];
      if (override) {
        if (override.baselineText !== undefined && override.baselineText !== '') baselineText = override.baselineText;
        if (override.baselineSub !== undefined) baselineSub = override.baselineSub;
        if (override.currentText !== undefined && override.currentText !== '') currentText = override.currentText;
        if (override.currentSub !== undefined) currentSub = override.currentSub;
      }

      return {
        exercise: ex,
        isTimeBased: false,
        baseline,
        baselineText,
        baselineSub,
        current,
        currentText,
        currentSub,
        diff,
        status,
        isOverridden: !!override,
      };
    });
  };

  const exercisesComparison = computeDayComparison(currentWorkoutDay);

  // Capture frozen snapshot of the full 3-day routine
  const captureFullRoutineSnapshot = (): DayPeriodRecord[] => {
    return days.map((d) => ({
      dayId: d.id,
      dayName: d.dayName,
      title: d.title,
      exercises: computeDayComparison(d).map((item) => ({
        exerciseId: item.exercise.id,
        name: item.exercise.name,
        prescription: item.exercise.prescription,
        category: item.exercise.category,
        baselineText: item.baselineText,
        baselineSub: item.baselineSub,
        currentText: item.currentText,
        currentSub: item.currentSub,
        status: item.status,
        isTimeBased: item.isTimeBased,
      })),
    }));
  };

  // Build initial period days data (fallback for default initial period)
  const buildInitialPeriodDaysData = (): DayPeriodRecord[] => {
    return days.map((d) => ({
      dayId: d.id,
      dayName: d.dayName,
      title: d.title,
      exercises: d.exercises.map((ex) => {
        if (ex.isTimeBased) {
          let bText = '10:00 min';
          let bSub = 'Pend. 4 • Vel. 8.5';
          if (ex.id === 'g1_ex10') {
            bText = '10:30 min';
            bSub = 'Livello 3';
          } else if (ex.id === 'g2_ex8') {
            bText = '30 sec';
            bSub = 'Plank';
          }
          return {
            exerciseId: ex.id,
            name: ex.name,
            prescription: ex.prescription,
            category: ex.category,
            baselineText: bText,
            baselineSub: bSub,
            currentText: bText,
            currentSub: bSub,
            status: 'stable' as const,
            isTimeBased: true,
          };
        }
        let bWeight = baselineWeights[ex.id] || String(ex.defaultWeightKg || '0');
        let bText = parseFloat(bWeight) > 0 ? `${bWeight} kg` : 'Corpo libero';
        let sub = ex.id === 'g1_ex5' ? '(un po’ pesanti)' : ex.id === 'g1_ex6' ? '(leggermente pesanti)' : '';
        return {
          exerciseId: ex.id,
          name: ex.name,
          prescription: ex.prescription,
          category: ex.category,
          baselineText: bText,
          baselineSub: '',
          currentText: bText,
          currentSub: sub,
          status: 'stable' as const,
          isTimeBased: false,
        };
      }),
    }));
  };

  // Navigation sub-tab: 'comparison' (Progressione carichi) vs 'periods' (Storico periodi)
  const [activeSubTab, setActiveSubTab] = useState<'comparison' | 'periods'>('comparison');

  // Routine periods history state (persisted)
  const [periods, setPeriods] = useState<WorkoutPeriodSnapshot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PERIODS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: 'period_initial_nov',
        title: 'Scheda Iniziale (Partenza)',
        startDate: '01/11/2026',
        endDate: '04/11/2026',
        notes: 'Carichi di partenza fissati: Alzate laterali + frontali 5 kg (un po’ pesanti), French press 5 kg (leggermente pesanti), Shoulder press 14 kg, Pec Fly 18 kg, Push down sbarra 18 kg, Dips su panca 12 rip, Tapis roulant 10 min e Cyclette 10:30 min.',
        createdAt: new Date('2026-11-04T12:00:00').getTime(),
        isInitialBaseline: true,
        daysData: [],
      },
    ];
  });

  // Ensure default period has daysData populated
  useEffect(() => {
    setPeriods((prev) => {
      let changed = false;
      const updated = prev.map((p) => {
        if (!p.daysData || p.daysData.length === 0) {
          changed = true;
          return {
            ...p,
            daysData: buildInitialPeriodDaysData(),
          };
        }
        return p;
      });
      return changed ? updated : prev;
    });
  }, []);

  // Sync periods to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PERIODS_KEY, JSON.stringify(periods));
    } catch {}
  }, [periods]);

  // Modals for periods
  const [isCreatePeriodModalOpen, setIsCreatePeriodModalOpen] = useState(false);
  const [periodDefaultStartDate, setPeriodDefaultStartDate] = useState('01/11/2026');
  const [periodDefaultEndDate, setPeriodDefaultEndDate] = useState('13/11/2026');
  const [periodDefaultTitle, setPeriodDefaultTitle] = useState('Scheda 1 Nov - 13 Nov');

  const [viewingPeriod, setViewingPeriod] = useState<WorkoutPeriodSnapshot | null>(null);
  const [editingPeriodMeta, setEditingPeriodMeta] = useState<WorkoutPeriodSnapshot | null>(null);

  const handleOpenCreatePeriodModal = () => {
    let start = '01/11/2026';
    if (periods.length > 0 && periods[0].endDate) {
      start = periods[0].endDate;
    }
    const today = new Date();
    const end = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    const startDay = start.split('/')[0] || start;
    const endDay = end.split('/')[0] || end;

    setPeriodDefaultStartDate(start);
    setPeriodDefaultEndDate(end === start ? '13/11/2026' : end);
    setPeriodDefaultTitle(`Scheda ${startDay} Nov - ${end === start ? '13' : endDay} Nov`);
    setIsCreatePeriodModalOpen(true);
  };

  const handleSaveNewPeriod = (data: { title: string; startDate: string; endDate: string; notes: string }) => {
    const fullSnapshot = captureFullRoutineSnapshot();
    const newPeriod: WorkoutPeriodSnapshot = {
      id: `period_${Date.now()}`,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      notes: data.notes,
      createdAt: Date.now(),
      daysData: fullSnapshot,
    };

    setPeriods((prev) => [newPeriod, ...prev]);
    setIsCreatePeriodModalOpen(false);
    setActiveSubTab('periods');
  };

  const handleSavePeriodMeta = (updated: WorkoutPeriodSnapshot) => {
    setPeriods((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPeriodMeta(null);
  };

  const handleDeletePeriod = (id: string) => {
    setPeriods((prev) => prev.filter((p) => p.id !== id));
    if (viewingPeriod?.id === id) setViewingPeriod(null);
  };

  // Compute active period start date (from last archived period end date)
  const activePeriodStartDate = periods.length > 0 && periods[0].endDate ? periods[0].endDate : '01/11/2026';

  const countIncreased = exercisesComparison.filter((e) => e.status === 'increased').length;
  const countDecreased = exercisesComparison.filter((e) => e.status === 'decreased').length;
  const countStable = exercisesComparison.filter((e) => e.status === 'stable').length;

  // Filter annotations for this day
  const dayAnnotations = annotations.filter((a) => a.dayId === selectedDayId);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 sm:px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onBackToWorkout}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>← Torna alla Scheda</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Scadenza: 1 Dicembre</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Main Feature Hero: Live Countdown to "Un Mese Dopo" */}
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Ambient Amber Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Checkpoint Mensile
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      Timer 1 Mese
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Un Mese Dopo — Risultati & Progressione
                  </h1>
                </div>
              </div>

              {/* Month Selector Dropdown (Allows viewing past months so history is never lost!) */}
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-1 text-xs">
                <History className="w-3.5 h-3.5 text-zinc-400 ml-2" />
                <select
                  value={selectedMonthKey}
                  onChange={(e) => setSelectedMonthKey(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs pr-3 py-1 focus:outline-none cursor-pointer"
                >
                  <option value="2026-11" className="bg-zinc-900 text-white">Novembre 2026 (In corso)</option>
                  <option value="2026-10" className="bg-zinc-900 text-white">Ottobre 2026 (Archivio)</option>
                </select>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Questo strumento tiene traccia automatica dei carichi che usi. Confronta i pesi fissati a inizio mese con quelli che modifichi giorno per giorno, mostrandoti se sei aumentato (🟢), diminuito (🔴) o rimasto uguale (⚪).
            </p>

            {/* Countdown Display Card */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2">
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3 sm:p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Giorni
                </span>
              </div>
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3 sm:p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Ore
                </span>
              </div>
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3 sm:p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Minuti
                </span>
              </div>
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3 sm:p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-red-400 font-mono">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Secondi
                </span>
              </div>
            </div>

            {/* Quick Action buttons inside Hero */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenCreatePeriodModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-black transition active:scale-95 shadow-md shadow-amber-950/40 cursor-pointer"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>📸 Salva Versione Scheda (Prima di Modificare)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('periods')}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer ${
                  activeSubTab === 'periods'
                    ? 'bg-zinc-850 border-amber-500 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Vedi Storico Periodi ({periods.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation: Progressione vs Storico Periodi */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveSubTab('comparison')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'comparison'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Progressione & Carichi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('periods')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'periods'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Storico Periodi Scheda</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeSubTab === 'periods' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-amber-400'
            }`}>
              {periods.length}
            </span>
          </button>
        </div>

        {/* ===================== VIEW 1: COMPARISON & PROGRESSION ===================== */}
        {activeSubTab === 'comparison' && (
          <div className="space-y-6 animate-fade-in">
            {/* Day Selector Tabs: Lunedì, Mercoledì, Venerdì */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Giorno di Analisi (Ognuno ha il suo "Mese Dopo")</span>
                </span>
                <span className="text-[11px] text-zinc-400">
                  Seleziona per vedere solo gli esercizi di quel giorno
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-950 rounded-2xl border border-zinc-800">
                {days.map((day) => {
                  const isSelected = selectedDayId === day.id;
                  return (
                    <button
                      key={day.id}
                      onClick={() => setSelectedDayId(day.id)}
                      className={`py-2.5 px-3 rounded-xl text-center transition cursor-pointer flex flex-col items-center ${
                        isSelected
                          ? 'bg-zinc-900 border border-amber-500/50 text-white shadow-lg'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Giorno {day.id}
                      </span>
                      <span className={`text-xs sm:text-sm font-black ${isSelected ? 'text-amber-400' : 'text-zinc-300'}`}>
                        {day.dayName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats for this day */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-black text-emerald-400">{countIncreased}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Aumentati</span>
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <Minus className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-black text-zinc-200">{countStable}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Invariati</span>
                </div>
              </div>

              <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-black text-rose-400">{countDecreased}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Diminuiti</span>
                </div>
              </div>
            </div>

            {/* Exercises Evolution Table for Selected Day */}
            <div className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl">
              <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-black text-white tracking-tight flex items-center gap-2">
                    <span>Evoluzione Carichi — {currentWorkoutDay.dayName}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {currentWorkoutDay.title}
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Confronto tra carico di inizio mese e carichi attuali della tua scheda
                  </p>
                </div>
              </div>

              <div className="divide-y divide-zinc-900">
                {exercisesComparison.map(({ exercise, isTimeBased, baselineText, baselineSub, currentText, currentSub, diff, status, isOverridden }) => (
                  <div
                    key={exercise.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 transition"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase">
                          {exercise.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-300">
                          {exercise.prescription}
                        </span>
                        {exercise.weightNote && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                            {exercise.weightNote}
                          </span>
                        )}
                        {isOverridden && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            Personalizzato
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {exercise.name}
                      </h3>
                    </div>

                    {/* Evolution Metric Comparison */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 justify-between sm:justify-end">
                      {/* Baseline Weight / Cardio (Inizio Mese: strictly NO parenthesis for Alzate) */}
                      <div className="text-center px-2 min-w-[75px]">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                          Inizio Mese
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-zinc-300">
                          {baselineText}
                        </span>
                        {baselineSub && (
                          <span className="text-[10px] text-zinc-400 font-medium block">
                            {baselineSub}
                          </span>
                        )}
                      </div>

                      {/* Arrow Indicator */}
                      <div className="text-zinc-600">→</div>

                      {/* Current Weight / Cardio (Attuale: with parenthesized notes!) */}
                      <div className="text-center px-2 min-w-[75px]">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                          Attuale
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-black text-white">
                          {currentText}
                        </span>
                        {currentSub && (
                          <span className="text-[10px] text-amber-400 font-bold block">
                            {currentSub}
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="w-24 sm:w-28 text-right">
                        {isTimeBased ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold">
                            {exercise.id === 'g1_ex1' ? '10:30 min' : exercise.id === 'g1_ex10' ? 'Liv. 3-4' : 'Attivo'}
                          </span>
                        ) : status === 'increased' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>+{diff} kg</span>
                          </span>
                        ) : status === 'decreased' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>{diff} kg</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs font-bold">
                            <Minus className="w-3 h-3" />
                            <span>Invariato</span>
                          </span>
                        )}
                      </div>

                      {/* Edit Self-Service Button */}
                      <button
                        onClick={() =>
                          setEditingExercise({
                            exerciseId: exercise.id,
                            exerciseName: exercise.name,
                            baselineText,
                            baselineSub,
                            currentText,
                            currentSub,
                          })
                        }
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/50 text-zinc-400 hover:text-amber-400 transition cursor-pointer active:scale-95 shadow-sm"
                        title="Modifica testo e dati di questo esercizio"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Annotations Section for this Day with AUTOMATIC TIMESTAMP */}
            <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <div>
                  <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
                    <span>Annotazioni Mensili — {currentWorkoutDay.dayName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {dayAnnotations.length} note
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Appunti e sensazioni: data, ora e minuti vengono salvati automaticamente.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddAnnotation(!showAddAnnotation)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition active:scale-95 cursor-pointer shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuova Annotazione</span>
                </button>
              </div>

              {/* New Annotation Form */}
              {showAddAnnotation && (
                <form onSubmit={handleAddAnnotation} className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/30 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-bold text-white">Scrivi una breve annotazione per {currentWorkoutDay.dayName}</span>
                    <span className="font-mono text-[11px] text-amber-400">
                      Data e ora automatiche al salvataggio
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={newAnnotationText}
                    onChange={(e) => setNewAnnotationText(e.target.value)}
                    placeholder={`Es. Oggi in ${currentWorkoutDay.dayName} ho sentito più forza nelle serie di spinta, prossimo mese punto a +2kg...`}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAnnotation(false)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-semibold"
                    >
                      Annulla
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow"
                    >
                      Salva Annotazione
                    </button>
                  </div>
                </form>
              )}

              {/* List of Annotations for this day */}
              {dayAnnotations.length === 0 ? (
                <p className="text-xs text-zinc-500 italic py-3 text-center">
                  Nessuna annotazione registrata per {currentWorkoutDay.dayName}. Clicca "Nuova Annotazione" per aggiungerne una.
                </p>
              ) : (
                <div className="space-y-3 pt-1">
                  {dayAnnotations.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-bold text-zinc-300">
                            {ann.date} • {ann.time}
                          </span>
                          <span className="text-[10px] font-semibold text-amber-400">
                            {ann.dayName}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-200 leading-relaxed">
                          {ann.text}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingAnnotation(ann);
                            setEditAnnotationText(ann.text);
                          }}
                          className="text-zinc-500 hover:text-amber-400 p-1.5 rounded-lg hover:bg-zinc-800 transition"
                          title="Modifica annotazione"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAnnotation(ann.id)}
                          className="text-zinc-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-zinc-800 transition"
                          title="Elimina annotazione"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== VIEW 2: STORICO PERIODI SCHEDA (RANGE DATE) ===================== */}
        {activeSubTab === 'periods' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <span>Cronologia & Storico Periodi Scheda</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Visualizza le schede che hai mantenuto nei diversi intervalli di date.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenCreatePeriodModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition active:scale-95 shadow cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Archivia Nuovo Periodo</span>
                </button>
              </div>

              {/* Active Period (In Corso) Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-zinc-900 border border-emerald-500/40 p-4 sm:p-5 space-y-3 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      Periodo Attivo Ora
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      Dal {activePeriodStartDate} ad Oggi
                    </span>
                  </div>

                  <span className="text-[11px] text-zinc-400 font-mono">
                    Scheda in uso
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Scheda Corrente con Modifiche Live
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Questa è la scheda che stai attualmente seguendo in palestra. Quando vorrai inserire nuovi miglioramenti, peggioramenti o modifiche, <strong>clicca il tasto qui sotto prima di modificare</strong> per archiviare questo periodo.
                  </p>
                  <p className="text-[11px] text-emerald-300/90 pt-0.5 font-medium">
                    💡 Se mantieni questa scheda fino al 30 Novembre senza fare modifiche, rimarrà automaticamente valida per tutto il mese.
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleOpenCreatePeriodModal}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition active:scale-95 shadow cursor-pointer"
                  >
                    <Camera className="w-4 h-4 stroke-[2.5]" />
                    <span>Salva Questo Periodo Prima di Cambiare Scheda</span>
                  </button>
                </div>
              </div>

              {/* List of Archived Periods */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Periodi Archiviati ({periods.length})</span>
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Dal più recente al meno recente
                  </span>
                </div>

                {periods.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700/80 transition space-y-3 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-black bg-amber-500/15 border border-amber-500/30 text-amber-300">
                            📅 {p.startDate} → {p.endDate}
                          </span>
                          {p.isInitialBaseline && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-800 text-zinc-400">
                              Scheda Iniziale
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {p.title}
                        </h4>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => setViewingPeriod(p)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition active:scale-95 shadow cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Vedi Scheda Salvata</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingPeriodMeta(p)}
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-white transition cursor-pointer"
                          title="Modifica range date o titolo"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {!p.isInitialBaseline && (
                          <button
                            type="button"
                            onClick={() => handleDeletePeriod(p.id)}
                            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                            title="Elimina periodo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {p.notes && (
                      <p className="text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-xl border border-zinc-850 leading-relaxed">
                        {p.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-850">
                      <span>Dati congelati:</span>
                      <span className="font-semibold text-zinc-300">
                        {p.daysData?.length || 3} Giornate (Lunedì, Mercoledì, Venerdì)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal 1: Edit Exercise Text & Values in Un Mese Dopo */}
      {editingExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Modifica Testo & Dati
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {editingExercise.exerciseName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingExercise(null)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExerciseOverride} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Inizio Mese */}
                <div className="space-y-2 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Inizio Mese (Valore)
                  </label>
                  <input
                    type="text"
                    value={editingExercise.baselineText}
                    onChange={(e) =>
                      setEditingExercise({
                        ...editingExercise,
                        baselineText: e.target.value,
                      })
                    }
                    placeholder="es. 5 kg oppure 10:00 min"
                    className="w-full bg-zinc-950 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />

                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block pt-1">
                    Dettagli Inizio Mese (Opzionale)
                  </label>
                  <input
                    type="text"
                    value={editingExercise.baselineSub}
                    onChange={(e) =>
                      setEditingExercise({
                        ...editingExercise,
                        baselineSub: e.target.value,
                      })
                    }
                    placeholder="es. Pend. 4 • Vel. 8.5 (o vuoto)"
                    className="w-full bg-zinc-950 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>

                {/* Attuale */}
                <div className="space-y-2 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Attuale (Valore)
                  </label>
                  <input
                    type="text"
                    value={editingExercise.currentText}
                    onChange={(e) =>
                      setEditingExercise({
                        ...editingExercise,
                        currentText: e.target.value,
                      })
                    }
                    placeholder="es. 5 kg oppure 10:30 min"
                    className="w-full bg-zinc-950 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />

                  <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block pt-1">
                    Nota Attuale (es. tra parentesi)
                  </label>
                  <input
                    type="text"
                    value={editingExercise.currentSub}
                    onChange={(e) =>
                      setEditingExercise({
                        ...editingExercise,
                        currentSub: e.target.value,
                      })
                    }
                    placeholder="es. (un po’ pesanti) o Resist. 7:30 → 10:30"
                    className="w-full bg-zinc-950 border border-zinc-750 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-amber-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {customOverrides[editingExercise.exerciseId] ? (
                  <button
                    type="button"
                    onClick={() => handleResetExerciseOverride(editingExercise.exerciseId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 text-xs font-semibold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ripristina Default</span>
                  </button>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingExercise(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salva Modifiche</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Annotation */}
      {editingAnnotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Modifica Annotazione
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {editingAnnotation.date} • {editingAnnotation.time} ({editingAnnotation.dayName})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingAnnotation(null)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedAnnotation} className="space-y-4">
              <textarea
                rows={4}
                required
                value={editAnnotationText}
                onChange={(e) => setEditAnnotationText(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAnnotation(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salva Modifica</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Save Routine Version / Period */}
      <SavePeriodModal
        isOpen={isCreatePeriodModalOpen}
        onClose={() => setIsCreatePeriodModalOpen(false)}
        onSave={handleSaveNewPeriod}
        defaultStartDate={periodDefaultStartDate}
        defaultEndDate={periodDefaultEndDate}
        defaultTitle={periodDefaultTitle}
      />

      {/* Modal 4: View Archived Period Routine Details */}
      <PeriodDetailModal
        period={viewingPeriod}
        onClose={() => setViewingPeriod(null)}
      />

      {/* Modal 5: Edit Archived Period Metadata (dates, title, notes) */}
      <EditPeriodModal
        period={editingPeriodMeta}
        onClose={() => setEditingPeriodMeta(null)}
        onSave={handleSavePeriodMeta}
        onDelete={handleDeletePeriod}
      />
    </div>
  );
};
