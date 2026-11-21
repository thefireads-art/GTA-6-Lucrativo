import type { MessageProofSlot, OfferConfig, PhoneProofSlot } from '../config/offerConfig';

export interface CountdownParts {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  formatted: string;
}

export interface BatchProgress {
  percent: number;
  remaining: number;
  filled: number;
  total: number;
  isAlmostFull: boolean;
}

function padTwoDigits(value: number): string {
  return String(Math.max(0, Math.floor(value))).padStart(2, '0');
}

/**
 * Calculates the remaining time until 23:59:59 of the user's current local day.
 */
export function getRemainingTimeUntilEndOfDay(now: Date): CountdownParts {
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );
  const diffMs = Math.max(0, endOfDay.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = padTwoDigits(totalSeconds / 3600);
  const minutes = padTwoDigits((totalSeconds % 3600) / 60);
  const seconds = padTwoDigits(totalSeconds % 60);

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    formatted: `${hours}:${minutes}:${seconds}`,
  };
}

/**
 * Computes clamped fill percentage and remaining spots for the R$19,90 batch bar.
 */
export function calculateBatchProgress(filled: number, total: number): BatchProgress {
  const safeTotal = Math.max(1, Math.floor(total));
  const safeFilled = Math.min(safeTotal, Math.max(0, Math.floor(filled)));
  const remaining = Math.max(0, safeTotal - safeFilled);
  const percent = Math.round((safeFilled / safeTotal) * 100);

  return {
    percent,
    remaining,
    filled: safeFilled,
    total: safeTotal,
    isAlmostFull: percent >= 75,
  };
}

/**
 * Returns true only when checkoutUrl has been replaced with a real http(s) checkout URL.
 */
export function isLiveCheckoutUrl(checkoutUrl: string): boolean {
  const trimmed = checkoutUrl.trim();
  if (!trimmed || trimmed === '[LINK_CHECKOUT]') {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Strictly gates the crossed-out previous price so it only displays when real.
 */
export function shouldShowPreviousPrice(previousPrice: OfferConfig['previousPrice']): boolean {
  return Boolean(previousPrice.isRealPreviousPrice && previousPrice.display.trim().length > 0);
}

/**
 * Formats an ISO date string into pt-BR DD/MM/YYYY without timezone drift.
 */
export function formatOfferDeadlinePtBr(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate.trim());
  if (!match) {
    return isoDate;
  }
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

/**
 * Checks whether at least one real screenshot image has been configured.
 */
export function hasVerifiedSocialProof(
  phones: PhoneProofSlot[],
  messages: MessageProofSlot[],
): boolean {
  return (
    phones.some((item) => Boolean(item.imageUrl && item.imageUrl.trim().length > 0)) ||
    messages.some((item) => Boolean(item.imageUrl && item.imageUrl.trim().length > 0))
  );
}
