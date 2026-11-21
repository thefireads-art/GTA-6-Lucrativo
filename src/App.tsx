import { lazy, Suspense, useCallback, useState } from 'react';
import { OFFER_CONFIG } from './config/offerConfig';
import { CurriculumSection } from './components/CurriculumSection';
import { FaqAndFinalSection } from './components/FaqAndFinalSection';
import { HeroSection } from './components/HeroSection';
import { OfferAndAnchoringSection } from './components/OfferAndAnchoringSection';
import { PainAndPromiseSection } from './components/PainAndPromiseSection';
import { SocialProofSection } from './components/SocialProofSection';

// Split modal and optional toast out of the critical initial render path
const CheckoutPreviewModal = lazy(() =>
  import('./components/CheckoutPreviewModal').then((m) => ({ default: m.CheckoutPreviewModal })),
);

const LiveNotificationToast = lazy(() =>
  import('./components/LiveNotificationToast').then((m) => ({ default: m.LiveNotificationToast })),
);

const HAS_LIVE_NOTIFICATIONS =
  OFFER_CONFIG.liveNotifications.enabled && OFFER_CONFIG.liveNotifications.entries.length > 0;

export default function App() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handlePreviewCheckout = useCallback(() => {
    setCheckoutModalOpen(true);
  }, []);

  const handleCloseCheckout = useCallback(() => {
    setCheckoutModalOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#08070B] text-white">
      <main>
        {/* 1. HERO + Logo do Produto em AVIF/WebP otimizado + CTA para Prova Social */}
        <HeroSection />

        {/* 2. A DOR E O DESEJO + 3. A PROMESSA (CTA #2) */}
        <PainAndPromiseSection onPreviewCheckout={handlePreviewCheckout} />

        {/* 4. O QUE VOCÊ VAI APRENDER + 5. POR QUE FUNCIONA */}
        <CurriculumSection />

        {/* 6. PROVA SOCIAL */}
        <SocialProofSection />

        {/* 7/8. OFERTA MINIMALISTA (CTA #4) */}
        <OfferAndAnchoringSection onPreviewCheckout={handlePreviewCheckout} />

        {/* 9. FAQ + 10. CTA FINAL + RODAPÉ LEGAL */}
        <FaqAndFinalSection onPreviewCheckout={handlePreviewCheckout} />
      </main>

      {/* Only load optional live notification chunk when real entries are enabled */}
      {HAS_LIVE_NOTIFICATIONS && (
        <Suspense fallback={null}>
          <LiveNotificationToast />
        </Suspense>
      )}

      {/* Only load checkout preview modal chunk when triggered */}
      {checkoutModalOpen && (
        <Suspense fallback={null}>
          <CheckoutPreviewModal isOpen={checkoutModalOpen} onClose={handleCloseCheckout} />
        </Suspense>
      )}
    </div>
  );
}
