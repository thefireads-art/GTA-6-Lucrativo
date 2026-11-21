import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OFFER_CONFIG } from '../config/offerConfig';
import { CtaButton } from './CtaButton';
import { FadeUp } from './FadeUp';

interface FaqAndFinalSectionProps {
  onPreviewCheckout: (ctaIndex: number) => void;
}

const FAQ_ITEMS = [
  {
    id: 'faq-aparecer',
    question: 'Preciso aparecer?',
    answer:
      'Não. O método é 100% Canal Dark: você não mostra o rosto e não precisa de câmera nem estúdio.',
  },
  {
    id: 'faq-ps5',
    question: 'Preciso ter PS5 ou o jogo?',
    answer:
      'Não. Você cria conteúdo aproveitando o hype do lançamento sem precisar ter console nem o jogo.',
  },
  {
    id: 'faq-tempo',
    question: 'Em quanto tempo começo?',
    answer:
      'Assista em 20 minutos, publique no mesmo dia com o molde de roteiro e o plano dos 7 dias.',
  },
  {
    id: 'faq-garantia',
    question: 'E se eu não gostar?',
    answer:
      'Garantia incondicional de 7 dias. Aplicou e não gostou, devolvemos 100% do seu dinheiro.',
  },
] as const;

export function FaqAndFinalSection({ onPreviewCheckout }: FaqAndFinalSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <>
      {/* 9. FAQ */}
      <section
        aria-labelledby="faq-title"
        className="cv-auto mx-auto max-w-[520px] border-t border-white/[0.08] px-5 py-6 sm:py-8"
      >
        <FadeUp className="text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
            Tire suas dúvidas
          </p>
          <h2
            id="faq-title"
            className="mt-2.5 font-display text-[29px] sm:text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
          >
            Perguntas Frequentes
          </h2>
        </FadeUp>

        <div className="mt-5 space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="surface-card overflow-hidden rounded-2xl">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-panel`}
                  onClick={() => toggleItem(item.id)}
                  className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16.5px] font-bold text-white transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F5B82E] cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-[#F5B82E] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`${item.id}-panel`}
                    className="border-t border-white/[0.08] px-5 py-4 text-[16px] leading-[1.6] text-white/78"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CTA FINAL + RODAPÉ LEGAL — Clean obsidian closing */}
      <section
        aria-labelledby="final-cta-title"
        className="cv-auto w-full border-t border-white/[0.08] pb-8"
      >
        <div className="mx-auto max-w-[520px] px-5 pt-7 text-center">
          <FadeUp>
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
              Comece hoje
            </p>
            <h2
              id="final-cta-title"
              className="mt-2.5 font-display text-[30px] sm:text-[36px] font-black leading-[1.12] tracking-[-0.02em] text-white"
            >
              O hype do GTA 6 não espera. Quem começa agora sai na frente.
            </h2>
            <p className="mt-3.5 text-[16px] leading-[1.6] text-white/75">
              Assista em 20 minutos e teste com garantia total de 7 dias por apenas{' '}
              <strong className="text-white">{OFFER_CONFIG.priceDisplay}</strong>.
            </p>

            {/* CTA Final */}
            <div className="mt-6">
              <CtaButton
                id="cta-final"
                ctaIndex={5}
                showMicrocopy
                onPreviewCheckout={onPreviewCheckout}
              />
            </div>
          </FadeUp>

          <footer className="mt-9 border-t border-white/[0.08] pt-6">
            <p className="font-display text-[14.5px] font-extrabold tracking-[0.04em] text-white/55">
              {OFFER_CONFIG.productName}
            </p>
            <p className="mt-3 text-[13px] leading-[1.6] text-white/45">
              Os valores citados são metas e exemplos, não garantia de ganhos. Os
              resultados variam conforme execução e consistência. Produto sem vínculo com
              Rockstar Games ou Take-Two.
            </p>
          </footer>
        </div>
      </section>
    </>
  );
}
