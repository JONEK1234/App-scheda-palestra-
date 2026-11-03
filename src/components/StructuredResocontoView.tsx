import React from 'react';
import { 
  Dumbbell, 
  Flame, 
  Zap, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Activity, 
  HelpCircle,
  Quote
} from 'lucide-react';

interface StructuredResocontoViewProps {
  onCopyText?: () => void;
}

export const StructuredResocontoView: React.FC<StructuredResocontoViewProps> = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in font-sans">
      {/* Intro Header Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/30 p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm">
            📋
          </span>
          <span className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Resoconto & Guida Tecnica
          </span>
        </div>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-medium">
          Ecco qui il riassunto completo di tutto quello di cui abbiamo parlato, pronto per essere letto o salvato dove preferisci:
        </p>
      </div>

      {/* SEZIONE 1: I nostri esercizi e i muscoli coinvolti */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 font-black text-sm flex items-center justify-center shrink-0">
            1
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>I nostri esercizi e i muscoli coinvolti</span>
              <Dumbbell className="w-4 h-4 text-red-400" />
            </h2>
            <p className="text-xs text-zinc-400">Analisi biomeccanica dei movimenti e focus muscolare</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card: Shoulder Press */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/40 p-5 space-y-3.5 shadow-lg transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Esercizio Spalle & Spinta</span>
                <h3 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                  Shoulder Press
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 font-mono font-bold text-xs">
                9 kg
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                🎯 Deltoidi (Spalle)
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300 text-[11px] font-bold">
                💪 Tricipiti
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
                🛡️ Petto Alto
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              <strong className="text-white">Lavora principalmente sui deltoidi</strong> (le spalle) e coinvolge fortemente anche i tricipiti (dietro le braccia) e il petto alto.
            </p>
          </div>

          {/* Card: Push Down Sbarra Diritta */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/40 p-5 space-y-3.5 shadow-lg transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Esercizio Isolamento Braccia</span>
                <h3 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                  Push Down Sbarra Diritta
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-mono font-bold text-xs">
                18 kg
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                ⚡ 100% Tricipiti (Isolamento Puro)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
              È un esercizio di <strong className="text-white">isolamento mirato al 100% sui tricipiti</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE 2: Concetti chiave dell'allenamento */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
            2
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>Concetti chiave dell'allenamento</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-zinc-400">Regole fondamentali per stimolare la crescita muscolare reale</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {/* Card A: Il cedimento muscolare */}
          <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-500/30 p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  Il cedimento muscolare
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Stimolo Massimo
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-1">
              Quando arrivi a quel punto in cui il muscolo <em>"non spinge più"</em> (ad esempio dovevi fare 10 ripetizioni ma ti fermi a 4-6), <strong className="text-emerald-400">hai raggiunto il cedimento muscolare tecnico</strong>. Significa che hai stimolato le fibre al massimo in quel momento. <strong className="text-white">È un'ottima notizia!</strong>
            </p>
          </div>

          {/* Card B: Le serie successive e spontanee */}
          <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-blue-500/30 p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  Le serie successive e spontanee
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Volume & Ascolto
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-1">
              Spesso viene naturale fare serie su serie fino a sentire di aver dato il massimo, fermandosi poi quando si è fatto il lavoro necessario. Questa gestione spontanea <strong className="text-white">va benissimo, l'importante è il giusto recupero</strong>.
            </p>
          </div>

          {/* Card C: La strada è corretta */}
          <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-emerald-500/30 p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Trophy className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  La strada è corretta
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Mentalità & Costanza
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-1">
              <strong className="text-emerald-300">Stai andando benissimo.</strong> La costanza, l'impegno e la scheda a 3 giorni (Lunedì, Mercoledì, Venerdì) sono la via giusta per crescere. <span className="text-zinc-200 font-medium">Non bisogna mai paragonarsi agli altri o fissarsi sui chili degli altri: ognuno ha la sua storia e i suoi carichi di partenza.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE 3: Carichi leggeri completati vs Carichi pesanti interrotti */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400 font-black text-sm flex items-center justify-center shrink-0">
            3
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>Carichi leggeri completati vs Carichi pesanti interrotti</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </h2>
            <p className="text-xs text-zinc-400">Confronto tra volume/tecnica e forza pura</p>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Carichi Leggeri */}
          <div className="rounded-2xl bg-zinc-900/80 border border-emerald-500/30 p-5 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Opzione A • Volume</span>
                <h4 className="text-xs sm:text-sm font-black text-white">Carichi più leggeri (es. 9 kg)</h4>
              </div>
            </div>

            <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">
              ✓ Completi tutte le ripetizioni
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Lavori molto sul <strong className="text-white">volume di lavoro</strong> e sulla <strong className="text-white">resistenza muscolare</strong>, curando la <strong className="text-white">tecnica dall'inizio alla fine</strong> senza rischiare infortuni.
            </p>
          </div>

          {/* Card Carichi Pesanti */}
          <div className="rounded-2xl bg-zinc-900/80 border border-amber-500/30 p-5 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Opzione B • Forza</span>
                <h4 className="text-xs sm:text-sm font-black text-white">Carichi pesanti (es. 14 kg)</h4>
              </div>
            </div>

            <div className="text-xs text-amber-400 font-semibold bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block">
              ⚡ Ti fermi a 5 rip. (limite massimo)
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Lavori di più sulla <strong className="text-white">forza pura</strong> e sullo <strong className="text-white">stress meccanico intenso</strong>.
            </p>
          </div>
        </div>

        {/* Master Resolution: Qual è meglio per crescere subito? */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-950/30 via-zinc-900 to-zinc-950 border border-indigo-500/40 p-5 sm:p-6 space-y-3.5 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">
                La Regola d'Oro dell'Ipertrofia
              </span>
              <h3 className="text-sm sm:text-base font-black text-white">
                Qual è meglio per crescere subito?
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Target className="w-4 h-4" />
            <span>Range Ideale: 8 — 12 Ripetizioni a Cedimento</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
            Entrambi stimolano la crescita (ipertrofia), ma in modo diverso. Il <strong className="text-white">compromesso ideale per crescere al massimo</strong> è usare un carico che ti permetta di arrivare a cedimento nel range corretto (solitamente tra le 8 e le 12 ripetizioni). Se il peso è troppo alto e ti blocchi subito a 5 ripetizioni, alleni più la forza; se riesci a chiudere tutte le ripetizioni con un carico che ti sfida ma senza crollare subito, <strong className="text-emerald-400">crei lo stimolo perfetto per far crescere il muscolo</strong>.
          </p>
        </div>
      </section>

      {/* BANNER CONCLUSIVO: Motivazione & Grinta */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-emerald-950/60 border border-emerald-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              Messaggio di motivazione
            </span>
            <p className="text-sm sm:text-base font-black text-white tracking-tight leading-snug">
              "Stai facendo un ottimo lavoro in palestra: continua così, con la testa e con la grinta giusta!"
            </p>
            <p className="text-xs text-zinc-400">
              Mantieni il ritmo e la determinazione per ogni sessione di allenamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
