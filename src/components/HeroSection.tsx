import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="hero-section w-full pt-6 pb-7 sm:pt-9 sm:pb-9"
    >
      <div className="hero-inner mx-auto max-w-[520px] px-5">
        {/* Crisp solid-color ALL-CAPS H1 */}
        <h1
          id="hero-headline"
          className="hero-h1 text-center text-balance font-display text-[26px] min-[400px]:text-[28px] sm:text-[36px] font-black uppercase leading-[1.13] tracking-[-0.01em] text-white"
        >
          MONTE SEU CANAL DARK DE GTA&nbsp;6 EM{' '}
          <span className="hero-gold hero-nowrap text-[#F5B82E] whitespace-nowrap">
            20 MINUTOS
          </span>{' '}
          E COLOQUE{' '}
          <span className="hero-gold text-[#F5B82E]">DINHEIRO NO BOLSO</span> NOS PRIMEIROS 7&nbsp;DIAS
        </h1>

        {/* Clean, two-part scannable subheadline */}
        <div className="hero-sub mt-3.5 text-center">
          <p>
            <mark className="hero-mark inline-block rounded-[3px] bg-[#E12687] px-2.5 py-[3px] font-display text-[13px] sm:text-[14px] font-extrabold leading-tight tracking-[0.01em] text-white">
              Método 100% comprovado.
            </mark>
          </p>
          <p className="hero-sub-copy mt-2.5 text-balance text-[14.5px] sm:text-[15.5px] font-semibold uppercase leading-[1.45] text-white/85">
            GANHE DINHEIRO COM ESTE MÉTODO EM ATÉ 7&nbsp;DIAS
            <br />
            <span className="hero-sub-accent font-bold text-[#F5B82E] whitespace-nowrap">
              SEM PRECISAR INVESTIR.
            </span>
          </p>
        </div>

        {/* Responsive AVIF-first Hero artwork with fetchpriority="high" + eager sync decode (0 CLS, ultra-low LCP) */}
        <div className="hero-art-wrap mx-auto mt-5 max-w-[380px]">
          <div className="hero-artwork-frame rounded-[26px] p-[2.5px]">
            <div className="hero-art-inner overflow-hidden rounded-[23.5px] bg-[#0B0A10]">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/assets/optimized/hero-420.avif 420w, /assets/optimized/hero-760.avif 760w"
                  sizes="(max-width: 420px) 350px, 380px"
                />
                <source
                  type="image/webp"
                  srcSet="/assets/optimized/hero-420.webp 420w, /assets/optimized/hero-760.webp 760w"
                  sizes="(max-width: 420px) 350px, 380px"
                />
                <img
                  src="/assets/optimized/hero-760.webp"
                  alt="GTA 6 Lucrativo - A Fórmula Master"
                  width={760}
                  height={760}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="hero-art-img block aspect-square w-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* First CTA scrolls directly to the testimonial photos section */}
        <div className="hero-cta-wrap mt-5" data-cta-slot={1}>
          <a
            id="cta-hero"
            href="#fotos-depoimentos"
            onClick={(event) => {
              const target = document.getElementById('fotos-depoimentos');
              if (!target) return;
              event.preventDefault();
              // Pre-warm testimonial thumbnails while scrolling and unlock exact heights
              // for cv-auto sections so smooth scroll lands accurately on the photos.
              window.dispatchEvent(new Event('prewarm-proof-photos'));
              document.querySelectorAll<HTMLElement>('.cv-auto').forEach((el) => {
                el.style.contentVisibility = 'visible';
              });
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.replaceState(null, '', '#fotos-depoimentos');
            }}
            className="hero-cta group w-full min-h-[58px] inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 font-display font-extrabold uppercase tracking-[0.01em] sm:tracking-[0.02em] text-[12px] min-[400px]:text-[13px] sm:text-[15px] text-white whitespace-nowrap bg-[#E12687] hover:bg-[#EE3594] border border-white/15 shadow-[0_12px_28px_-10px_rgba(225,38,135,0.55)] transition-[background-color,transform] duration-150 ease-out active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F5B82E]"
          >
            <span>Veja os resultados de quem já aplicou</span>
            <ArrowDown
              aria-hidden="true"
              className="hero-cta-icon h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-150 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
