import { useEffect } from 'react';
import { CheckCircle2, Lock, ShieldCheck, X } from 'lucide-react';
import { OFFER_CONFIG } from '../config/offerConfig';

interface CheckoutPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutPreviewModal({ isOpen, onClose }: CheckoutPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#08070B]/85 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="surface-card-accent w-full max-w-[440px] rounded-[24px] p-6 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F5B82E]">
              CHECKOUT PRONTO
            </p>
            <h3
              id="checkout-modal-title"
              className="mt-1.5 font-display text-[22px] font-extrabold leading-tight text-white"
            >
              {OFFER_CONFIG.productName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de checkout"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#08070B] p-5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[15px] text-white/75">Pagamento único</span>
            <span className="font-display text-[34px] font-black leading-none text-[#F5B82E] tabular-nums">
              {OFFER_CONFIG.priceDisplay}
            </span>
          </div>
          <ul className="mt-4 space-y-2.5 text-[14.5px] text-white/85">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#F5B82E]" />
              Aula de 20 min + roteiro + checklist + plano 7 dias
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-[#F5B82E]" />
              Garantia incondicional de 7 dias
            </li>
          </ul>
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-white/65">
          Link configurado:{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-[#F5B82E]">
            {OFFER_CONFIG.checkoutUrl}
          </code>
          . Conecte o link do seu checkout para redirecionar direto ao pagamento.
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 whitespace-nowrap">
            <Lock aria-hidden="true" className="h-4 w-4 shrink-0" />
            Compra segura
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[46px] whitespace-nowrap shrink-0 rounded-xl bg-[#E12687] hover:bg-[#EE3594] px-5 py-2.5 font-display text-[14px] font-extrabold uppercase tracking-wider text-white cursor-pointer"
          >
            Voltar à página
          </button>
        </div>
      </div>
    </div>
  );
}
