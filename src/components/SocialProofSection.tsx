import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { OFFER_CONFIG, type PhoneProofSlot } from '../config/offerConfig';
import { FadeUp } from './FadeUp';

interface MarqueeRowProps {
  items: Array<{ slot: PhoneProofSlot; globalIndex: number }>;
  direction: 'ltr' | 'rtl';
  paused: boolean;
  eagerLoad: boolean;
  onSelectIndex: (index: number) => void;
}

function MarqueeRow({ items, direction, paused, eagerLoad, onSelectIndex }: MarqueeRowProps) {
  const trackClass = direction === 'ltr' ? 'marquee-track-ltr' : 'marquee-track-rtl';

  const renderGroup = (suffix: string, ariaHidden?: boolean) => (
    <div
      className="flex shrink-0 items-center gap-3.5 pr-3.5"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map(({ slot, globalIndex }) => {
        if (!slot.imageUrl) return null;
        return (
          <button
            key={`${slot.id}-${suffix}`}
            type="button"
            onClick={() => onSelectIndex(globalIndex)}
            tabIndex={ariaHidden ? -1 : 0}
            aria-label={`Abrir depoimento de ${slot.name} em tela cheia`}
            className="group relative shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-[#0b141a] shadow-[0_14px_32px_-16px_rgba(0,0,0,0.85)] transition-[border-color,transform] duration-200 hover:border-[#F5B82E]/50 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B82E] cursor-pointer"
          >
            <img
              src={slot.imageUrl}
              alt={`Depoimento de ${slot.name}`}
              width={slot.thumbWidth}
              height={slot.thumbHeight}
              loading={eagerLoad ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="block h-[300px] sm:h-[340px] w-auto max-w-none select-none object-contain"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/90 opacity-85 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className="marquee-viewport no-scrollbar relative w-full overflow-hidden"
      data-marquee-direction={direction}
    >
      {/* Edge fade masks blending seamlessly into obsidian background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-[#08070B] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-[#08070B] to-transparent"
      />

      <div
        className={trackClass}
        style={paused ? { animationPlayState: 'paused' } : undefined}
      >
        {renderGroup('a', false)}
        {renderGroup('b', true)}
      </div>
    </div>
  );
}

export function SocialProofSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isNearViewport) return;
    const handlePrewarm = () => setIsNearViewport(true);
    window.addEventListener('prewarm-proof-photos', handlePrewarm, { once: true });

    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return () => window.removeEventListener('prewarm-proof-photos', handlePrewarm);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(node);
    return () => {
      window.removeEventListener('prewarm-proof-photos', handlePrewarm);
      observer.disconnect();
    };
  }, [isNearViewport]);

  const proofs = OFFER_CONFIG.socialProof.phoneScreenshots
    .filter((s) => Boolean(s.imageUrl))
    .map((slot, globalIndex) => ({ slot, globalIndex }));

  // Split testimonials evenly across 2 opposing marquee rows (4 left-to-right, 4 right-to-left)
  const midpoint = Math.ceil(proofs.length / 2);
  const topRow = proofs.slice(0, midpoint);
  const bottomRow = proofs.slice(midpoint);

  const isLightboxOpen = selectedIndex !== null && Boolean(proofs[selectedIndex]);
  const activeProof = isLightboxOpen && selectedIndex !== null ? proofs[selectedIndex].slot : null;

  const goPrev = () => {
    setSelectedIndex((curr) =>
      curr === null ? null : (curr - 1 + proofs.length) % proofs.length,
    );
  };

  const goNext = () => {
    setSelectedIndex((curr) =>
      curr === null ? null : (curr + 1) % proofs.length,
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((curr) =>
          curr === null ? null : (curr - 1 + proofs.length) % proofs.length,
        );
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((curr) =>
          curr === null ? null : (curr + 1) % proofs.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, proofs.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) >= 44) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="prova-social"
      aria-labelledby="proof-title"
      className="cv-auto w-full scroll-mt-4 border-t border-white/[0.08] py-6 sm:py-8"
    >
      <div className="mx-auto max-w-[520px] px-5">
        <FadeUp>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
            Resultados reais
          </p>

          <h2
            id="proof-title"
            className="mt-2.5 font-display text-[25px] sm:text-[31px] font-extrabold leading-[1.18] tracking-[-0.02em] text-white"
          >
            Depoimento de quem começou nos primeiros dias de lançamento do GTA&nbsp;6:
          </h2>

          <p className="mt-2 text-[15px] leading-[1.55] text-white/70">
            Clique no depoimento para ver a imagem completa.
          </p>
        </FadeUp>
      </div>

      {/* Dual opposing marquee rows */}
      <div
        id="fotos-depoimentos"
        data-testid="phone-proof-grid"
        className="mt-5 scroll-mt-4 space-y-3.5"
      >
        <MarqueeRow
          items={topRow}
          direction="ltr"
          paused={isLightboxOpen}
          eagerLoad={isNearViewport}
          onSelectIndex={setSelectedIndex}
        />
        <MarqueeRow
          items={bottomRow}
          direction="rtl"
          paused={isLightboxOpen}
          eagerLoad={isNearViewport}
          onSelectIndex={setSelectedIndex}
        />
      </div>

      {/* Fullscreen Lightbox Modal with keyboard + touch swipe + prev/next navigation */}
      {isLightboxOpen && activeProof?.imageUrl && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Depoimento de ${activeProof.name} em tela cheia`}
          data-testid="proof-lightbox"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 px-4 py-4 sm:px-6 sm:py-5 backdrop-blur-md"
        >
          {/* Top bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-full max-w-[520px] items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="truncate font-display text-[16px] font-extrabold text-white">
                {activeProof.name}
              </p>
              <p className="text-[12.5px] font-semibold text-white/55 tabular-nums">
                Depoimento {selectedIndex + 1} de {proofs.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Fechar visualização em tela cheia"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B82E] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Maximized HD testimonial image loaded on demand */}
          <div className="flex flex-1 items-center justify-center py-3">
            <img
              src={activeProof.fullImageUrl ?? activeProof.imageUrl}
              alt={`Depoimento em tela cheia de ${activeProof.name}`}
              decoding="async"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[76dvh] max-w-[94vw] w-auto rounded-2xl border border-white/15 bg-[#0b141a] object-contain shadow-2xl"
            />
          </div>

          {/* Bottom Prev / Next navigation bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-full max-w-[520px] items-center justify-between gap-3"
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Ver depoimento anterior"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.07] px-4 text-[14px] font-bold text-white transition-colors hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B82E] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Ver próximo depoimento"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.07] px-4 text-[14px] font-bold text-white transition-colors hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B82E] cursor-pointer"
            >
              <span>Próximo</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
