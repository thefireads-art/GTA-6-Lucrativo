import { CtaButton } from './CtaButton';
import { FadeUp } from './FadeUp';

interface PainAndPromiseSectionProps {
  onPreviewCheckout: (ctaIndex: number) => void;
}

const PAIN_POINTS: ReadonlyArray<{
  number: string;
  title: string;
  text?: string;
}> = [
  {
    number: '01',
    title: 'Milhões querem jogar',
    text: 'A maioria não tem PS5, não tem dinheiro pro jogo ou os dois.',
  },
  {
    number: '02',
    title: 'Não dependa de monetização para ganhar com seu canal dark.',
    text: 'Aqui você aprende as melhores formas de ganhar dinheiro com canal dark desde o primeiro vídeo e sem precisar investir em nada. 100% orgânico.',
  },
  {
    number: '03',
    title: 'Antes da multidão',
    text: 'A pergunta não é se existe dinheiro nisso. É se você chega antes ou atrasado.',
  },
];

export function PainAndPromiseSection({ onPreviewCheckout }: PainAndPromiseSectionProps) {
  return (
    <div className="mx-auto max-w-[520px] px-5">
      {/* 2. A DOR E O DESEJO */}
      <section aria-labelledby="pain-title" className="cv-auto border-t border-white/[0.08] py-6 sm:py-8">
        <FadeUp>
          <h2
            id="pain-title"
            className="font-display text-[26px] sm:text-[32px] font-extrabold leading-[1.16] tracking-[-0.02em] text-white"
          >
            Porque esta é a oportunidade do SÉCULO para{' '}
            <span className="text-[#F5B82E]">GANHAR DINHEIRO</span> com CANAL DARK!
          </h2>
        </FadeUp>

        <div className="mt-5 space-y-3.5">
          {PAIN_POINTS.map((item, index) => (
            <FadeUp key={item.number} delay={index * 0.04}>
              <div className="surface-card rounded-2xl p-6">
                <span className="font-display text-[24px] font-black leading-none text-[#F5B82E] tabular-nums">
                  {item.number}
                </span>
                <h3 className="mt-3 font-display text-[20px] font-extrabold leading-snug text-white">
                  {item.title}
                </h3>
                {item.text && (
                  <p className="mt-2 text-[16px] leading-[1.6] text-white/75">
                    {item.text}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 3. A PROMESSA — Clean obsidian accent card, zero visual noise */}
      <section aria-labelledby="promise-title" className="cv-auto pb-6 sm:pb-8">
        <FadeUp>
          <div className="surface-card-accent rounded-[24px] px-5 py-7 sm:p-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
              A promessa em 20 minutos
            </p>
            <h2
              id="promise-title"
              className="mt-3 font-display text-[28px] sm:text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
            >
              Crie o canal, publique hoje e comece a ganhar dinheiro sem depender de monetização.
            </h2>

            <p className="mt-4 text-[16px] leading-[1.65] text-white/78">
              Em 20 minutos você aprende a criar o canal, produzir rápido com cara de
              conteúdo único e ganhar dinheiro com a sua audiência.
            </p>

            <div className="my-6 h-px w-full bg-white/[0.08]" />

            <div className="space-y-5">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#F5B82E]">
                  Meta do método
                </p>
                <p className="mt-1.5 text-[17px] font-semibold leading-[1.55] text-white tabular-nums">
                  Ganhar dinheiro de <span className="text-[#F5B82E]">R$200 a R$400 por dia</span>,
                  com disciplina, enquanto o hype está no pico.
                </p>
              </div>

              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/60">
                  Meta PS5 + GTA 6
                </p>
                <p className="mt-1.5 text-[16px] leading-[1.6] text-white/80">
                  Ter o seu <strong className="font-bold text-white">PS5 e GTA 6 até o fim de janeiro</strong>,
                  pagos pelo próprio canal.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <CtaButton
                id="cta-promise"
                ctaIndex={2}
                label="QUERO GANHAR DINHEIRO COM CANAL DARK"
                showMicrocopy={false}
                onPreviewCheckout={onPreviewCheckout}
              />
            </div>

            <p className="mt-4 text-center text-[13px] text-white/55">
              Meta, não garantia. Resultados dependem de execução.
            </p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
