import { OFFER_CONFIG } from '../config/offerConfig';
import { shouldShowPreviousPrice } from '../utils/offerLogic';
import { CtaButton } from './CtaButton';
import { FadeUp } from './FadeUp';

interface OfferAndAnchoringSectionProps {
  onPreviewCheckout: (ctaIndex: number) => void;
}

export function OfferAndAnchoringSection({
  onPreviewCheckout,
}: OfferAndAnchoringSectionProps) {
  const showPreviousPrice = shouldShowPreviousPrice(OFFER_CONFIG.previousPrice);

  return (
    <section
      id="oferta"
      aria-labelledby="offer-price-heading"
      className="cv-auto mx-auto max-w-[520px] border-t border-white/[0.08] px-5 py-6 sm:py-8"
    >
      <FadeUp>
        <div className="surface-card-accent rounded-[28px] px-6 py-8 sm:px-8 sm:py-10 text-center">
          <p className="font-display text-[17px] sm:text-[19px] font-black uppercase leading-[1.3] tracking-[0.01em] text-white">
            QUEM CHEGA NA FONTE PRIMEIRO, BEBE ÁGUA LIMPA.
          </p>

          <p className="mt-2.5 text-[14px] sm:text-[15px] font-semibold uppercase leading-[1.5] text-white/75">
            SUA ÚLTIMA CHANCE DE COMEÇAR 2027 COM DINHEIRO PARA UM PS5 E GTA&nbsp;6.
          </p>

          {showPreviousPrice && (
            <p className="mt-5 text-[16px] font-bold uppercase text-white/45 line-through tabular-nums">
              DE {OFFER_CONFIG.previousPrice.display}
            </p>
          )}

          {/* Giant solid-color price — zero gradient text */}
          <h2
            id="offer-price-heading"
            className="mt-6 font-display text-[68px] sm:text-[84px] font-black uppercase leading-none tracking-[-0.02em] text-[#F5B82E] tabular-nums"
          >
            R$&nbsp;19,90
          </h2>

          <p className="mt-3 text-[14px] sm:text-[15px] font-semibold uppercase tracking-[0.05em] text-white/80">
            PAGAMENTO ÚNICO · ACESSO IMEDIATO · GARANTIA 7 DIAS
          </p>

          <div className="mt-7">
            <CtaButton
              id="cta-offer"
              ctaIndex={4}
              label="QUERO MEU ACESSO AGORA"
              showMicrocopy={false}
              onPreviewCheckout={onPreviewCheckout}
            />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
