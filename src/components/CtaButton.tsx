import { ArrowRight } from 'lucide-react';
import { OFFER_CONFIG } from '../config/offerConfig';
import { isLiveCheckoutUrl } from '../utils/offerLogic';

interface CtaButtonProps {
  id?: string;
  ctaIndex: number;
  label?: string;
  showMicrocopy?: boolean;
  onPreviewCheckout: (ctaIndex: number) => void;
}

export function CtaButton({
  id,
  ctaIndex,
  label = 'QUERO MINHA RENDA EXTRA AGORA',
  showMicrocopy = true,
  onPreviewCheckout,
}: CtaButtonProps) {
  const isLive = isLiveCheckoutUrl(OFFER_CONFIG.checkoutUrl);

  const isLongLabel = label.length > 30;

  const buttonClasses = [
    'group w-full min-h-[58px] inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-2xl py-4',
    isLongLabel
      ? 'px-3 sm:px-5 font-display font-extrabold uppercase tracking-[0.005em] sm:tracking-[0.02em] text-[11px] min-[400px]:text-[12px] sm:text-[14.5px] text-white whitespace-nowrap'
      : 'px-4 sm:px-5 font-display font-extrabold uppercase tracking-[0.015em] sm:tracking-[0.025em] text-[13px] min-[400px]:text-[14px] sm:text-[16px] text-white whitespace-nowrap',
    'bg-[#E12687] hover:bg-[#EE3594] border border-white/15',
    'shadow-[0_12px_28px_-10px_rgba(225,38,135,0.55)]',
    'transition-[background-color,transform] duration-150 ease-out active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F5B82E]',
    'cursor-pointer select-none',
  ].join(' ');

  const inner = (
    <>
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
      />
    </>
  );

  return (
    <div className="w-full" data-cta-slot={ctaIndex}>
      {isLive ? (
        <a
          id={id}
          href={OFFER_CONFIG.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          aria-label={`${label} - ${OFFER_CONFIG.priceDisplay}`}
        >
          {inner}
        </a>
      ) : (
        <button
          id={id}
          type="button"
          onClick={() => onPreviewCheckout(ctaIndex)}
          data-checkout-placeholder={OFFER_CONFIG.checkoutUrl}
          className={buttonClasses}
          aria-label={`${label} - ${OFFER_CONFIG.priceDisplay}`}
        >
          {inner}
        </button>
      )}

      {showMicrocopy && (
        <p className="mt-3 text-center text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.02em] text-white/65 tabular-nums whitespace-nowrap">
          {OFFER_CONFIG.priceDisplay} · ACESSO IMEDIATO · GARANTIA 7 DIAS
        </p>
      )}
    </div>
  );
}
