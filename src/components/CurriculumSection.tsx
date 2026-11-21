import {
  Flame,
  Gamepad2,
  MessageCircle,
  Wallet,
} from 'lucide-react';
import { FadeUp } from './FadeUp';

const MODULES: ReadonlyArray<{
  icon: typeof Flame;
  title: string;
  description: string;
  highlight?: 'whatsapp';
}> = [
  {
    icon: Flame,
    title: 'Método de Viralização Reciclada',
    description:
      'Como escolher vídeos que já viralizaram e fazer eles viralizarem em suas redes sociais.',
  },
  {
    icon: Wallet,
    title: 'Monetização Direta do Perfil',
    description:
      'Aprenda a ganhar dinheiro direto do perfil logo nos primeiros dias, usando uma estratégia simples e sem depender de ativar a monetização.',
  },
  {
    icon: Gamepad2,
    title: 'O Gatilho do Sem PS5',
    description:
      'Aprenda a usar o desejo de quem não tem console nem jogo para gerar cliques e ganhar dinheiro com os melhores produtos que fazem essa audiência comprar. Disponibilizamos os produtos prontos e comprovados para você só pôr o link na bio e gerar renda.',
  },
  {
    icon: MessageCircle,
    title: 'Grupo VIP no WhatsApp',
    description:
      'Grupo VIP no WhatsApp de criadores de conteúdo que querem monetizar no primeiro dia e se ajudarem entre si a partir do que aprenderam no método.',
    highlight: 'whatsapp',
  },
];

const WHY_IT_WORKS = [
  {
    number: '01',
    title: 'Demanda gigante',
    body: 'GTA 6 é o lançamento mais aguardado dos games. A busca por conteúdo não para.',
  },
  {
    number: '02',
    title: 'Barreira baixa',
    body: 'Canal Dark não exige rosto, estúdio nem edição pesada.',
  },
  {
    number: '03',
    title: 'Ganhar dinheiro direto',
    body: 'Você não espera 1.000 inscritos. Só precisa de audiência com desejo para ganhar dinheiro.',
  },
] as const;

export function CurriculumSection() {
  return (
    <div className="mx-auto max-w-[520px] px-5">
      {/* 4. O QUE VOCÊ VAI APRENDER */}
      <section aria-labelledby="curriculum-title" className="cv-auto border-t border-white/[0.08] py-6 sm:py-8">
        <FadeUp>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
            Dentro do método
          </p>
          <h2
            id="curriculum-title"
            className="mt-2.5 font-display text-[29px] sm:text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
          >
            O que você aprende em 20 minutos
          </h2>
        </FadeUp>

        <div className="mt-5 space-y-3.5">
          {MODULES.map((mod, index) => {
            const Icon = mod.icon;
            const isWhatsApp = mod.highlight === 'whatsapp';
            return (
              <FadeUp key={mod.title} delay={index * 0.03}>
                <article
                  className={
                    isWhatsApp
                      ? 'surface-card-whatsapp rounded-2xl p-6'
                      : 'surface-card rounded-2xl p-6'
                  }
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={
                        isWhatsApp
                          ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#041E0E]/15 text-[#041E0E]'
                          : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-[#F5B82E]'
                      }
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <div>
                      <h3
                        className={
                          isWhatsApp
                            ? 'font-display text-[19px] font-black leading-snug text-[#041E0E]'
                            : 'font-display text-[19px] font-extrabold leading-snug text-white'
                        }
                      >
                        {mod.title}
                      </h3>
                      <p
                        className={
                          isWhatsApp
                            ? 'mt-1.5 text-[16px] font-medium leading-[1.6] text-[#052612]/90'
                            : 'mt-1.5 text-[16px] leading-[1.6] text-white/75'
                        }
                      >
                        {mod.description}
                      </p>
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* 5. POR QUE ISSO FUNCIONA */}
      <section aria-labelledby="why-works-title" className="cv-auto border-t border-white/[0.08] py-6 sm:py-8">
        <FadeUp>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
            Lógica simples
          </p>
          <h2
            id="why-works-title"
            className="mt-2.5 font-display text-[29px] sm:text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
          >
            Por que isso funciona
          </h2>
        </FadeUp>

        <div className="mt-5 space-y-3.5">
          {WHY_IT_WORKS.map((item, index) => (
            <FadeUp key={item.number} delay={index * 0.04}>
              <div className="surface-card rounded-2xl p-6">
                <span className="font-display text-[24px] font-black leading-none text-[#F5B82E] tabular-nums">
                  {item.number}
                </span>
                <h3 className="mt-3 font-display text-[20px] font-extrabold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-white/75">
                  {item.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
