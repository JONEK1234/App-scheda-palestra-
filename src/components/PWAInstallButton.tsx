import React, { useState } from 'react';
import { Download, CheckCircle, Share, MoreVertical, X, Smartphone, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  // If already running in standalone PWA mode
  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>App Installata</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledSuccess(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        aria-label="Installa applicazione PWA"
        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold tracking-wide shadow-md shadow-red-950/40 border border-red-500/30 transition-all active:scale-95 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 group-hover:animate-bounce" />
        <span>Installa App</span>
      </button>

      {/* Install modal for iOS and general instructions */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl relative text-zinc-100">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Chiudi guida"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">Installa IronRoutine</h3>
                <p className="text-xs text-zinc-400">Accedi direttamente dalla schermata Home senza browser</p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3.5 text-sm text-zinc-300 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800/80">
                <p className="text-xs font-medium text-red-400 uppercase tracking-wider">Istruzioni per iPhone / iPad (Safari):</p>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-bold text-white">1</div>
                  <div className="text-xs">
                    Tocca il pulsante <span className="inline-flex items-center text-zinc-100 font-semibold px-1 py-0.5 rounded bg-zinc-800"><Share className="w-3 h-3 mr-1 text-red-400 inline" /> Condividi</span> nella barra in basso di Safari.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-bold text-white">2</div>
                  <div className="text-xs">
                    Scorri le opzioni verso il basso e seleziona <strong className="text-white">"Aggiungi alla schermata Home"</strong>.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-bold text-white">3</div>
                  <div className="text-xs">
                    Tocca <strong className="text-white">"Aggiungi"</strong> in alto a destra. L'icona nera coi pesi apparirà sulla tua Home!
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-sm text-zinc-300 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800/80">
                <p className="text-xs font-medium text-red-400 uppercase tracking-wider">Installazione Rapida (Chrome / Android / Edge):</p>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-bold text-white">1</div>
                  <div className="text-xs">
                    Tocca i tre puntini <span className="inline-flex items-center text-zinc-100 font-semibold px-1 py-0.5 rounded bg-zinc-800"><MoreVertical className="w-3 h-3 text-red-400 inline" /> Menu</span> in alto a destra nel browser.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-bold text-white">2</div>
                  <div className="text-xs">
                    Seleziona <strong className="text-white">"Installa app"</strong> oppure <strong className="text-white">"Aggiungi a schermata Home"</strong>.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-bold text-white">3</div>
                  <div className="text-xs">
                    Conferma l'installazione: l'app funzionerà a schermo intero e anche senza connessione internet in palestra!
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Offline ready, memoria locale dei pesi e nessun dato inviato all'esterno.</span>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition"
            >
              Ho capito
            </button>
          </div>
        </div>
      )}

      {installedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-white text-xs shadow-2xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>App installata con successo sulla tua schermata Home!</span>
        </div>
      )}
    </>
  );
};
