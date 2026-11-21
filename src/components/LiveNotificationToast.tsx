import { useEffect, useState } from 'react';
import { UserCheck, X } from 'lucide-react';
import { OFFER_CONFIG } from '../config/offerConfig';

/**
 * Floating real-entry notification toast.
 * Strictly renders ONLY when real entries are enabled and populated in OFFER_CONFIG.liveNotifications.
 */
export function LiveNotificationToast() {
  const { enabled, entries } = OFFER_CONFIG.liveNotifications;
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!enabled || entries.length === 0 || dismissed) {
      return;
    }

    const initialTimer = window.setTimeout(() => {
      setVisible(true);
    }, 12000);

    const cycleTimer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % entries.length);
    }, 14000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(cycleTimer);
    };
  }, [enabled, entries.length, dismissed]);

  if (!enabled || entries.length === 0 || dismissed || !visible) {
    return null;
  }

  const current = entries[activeIndex];

  return (
    <aside
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-[360px] sm:left-4 sm:right-auto sm:mx-0"
    >
      <div className="surface-card flex items-center gap-3 rounded-xl px-3.5 py-3 shadow-2xl">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#F5B82E]">
          <UserCheck aria-hidden="true" className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 text-[13px] leading-snug">
          <p className="truncate font-semibold text-white">
            {current.name} ({current.city}) acabou de entrar
          </p>
          <p className="text-[12px] text-white/60">{current.timeAgoLabel}</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Fechar aviso"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/55 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
