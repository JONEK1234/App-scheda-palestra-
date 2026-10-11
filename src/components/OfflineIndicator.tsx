import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-zinc-900 border border-red-500/40 px-3.5 py-2 text-xs font-medium text-zinc-200 shadow-xl shadow-black/80 backdrop-blur-md">
      <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
      <WifiOff className="w-3.5 h-3.5 text-red-400" />
      <span>Modalità Offline — La scheda funziona regolarmente</span>
    </div>
  );
};
