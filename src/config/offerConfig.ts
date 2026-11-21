export interface PhoneProofSlot {
  id: string;
  /** Imagem otimizada (WebP leve) para o carrossel/marquee. Deixe null enquanto não houver print verdadeiro. */
  imageUrl: string | null;
  /** Imagem HD (WebP) carregada sob demanda ao abrir o lightbox em tela cheia. */
  fullImageUrl?: string;
  thumbWidth?: number;
  thumbHeight?: number;
  name: string;
  city: string;
}

export interface MessageProofSlot {
  id: string;
  /** Caminho ou URL do print real de WhatsApp ou Direct. Deixe null enquanto não houver print verdadeiro. */
  imageUrl: string | null;
  channel: 'WhatsApp' | 'Direct';
  label: string;
}

export interface RealBuyerNotification {
  id: string;
  name: string;
  city: string;
  timeAgoLabel: string;
}

export interface OfferConfig {
  productName: string;
  /** Substitua "[LINK_CHECKOUT]" pelo link real do seu checkout (Kiwify, Kirvano, Hotmart, Cakto etc.). */
  checkoutUrl: string;
  priceDisplay: string;
  previousPrice: {
    display: string;
    /** Ative true SOMENTE se R$47 tiver sido um preço real praticado anteriormente. */
    isRealPreviousPrice: boolean;
  };
  /** Data real de encerramento da condição promocional de R$19,90 (formato ISO YYYY-MM-DDTHH:mm:ss). */
  offerDeadlineIso: string;
  batchSlots: {
    filled: number;
    total: number;
  };
  socialProof: {
    badgeWhenEmpty: string;
    phoneScreenshots: PhoneProofSlot[];
    messageScreenshots: MessageProofSlot[];
  };
  /**
   * Notificação flutuante "Alguém acabou de entrar".
   * Mantenha enabled: false enquanto não estiver conectada a compras reais.
   */
  liveNotifications: {
    enabled: boolean;
    entries: RealBuyerNotification[];
  };
}

export const OFFER_CONFIG: OfferConfig = {
  productName: 'CANAL DARK GTA 6 EM 20 MINUTOS',
  checkoutUrl: 'https://pay.cakto.com.br/f7im22d_1352795',
  priceDisplay: 'R$19,90',
  previousPrice: {
    display: 'R$47',
    isRealPreviousPrice: false,
  },
  offerDeadlineIso: '2026-11-30T23:59:59',
  batchSlots: {
    filled: 84,
    total: 100,
  },
  socialProof: {
    badgeWhenEmpty: 'Primeiras turmas',
    phoneScreenshots: [
      {
        id: 'proof-7',
        imageUrl: '/assets/optimized/proof-7-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-7-full.webp',
        thumbWidth: 300,
        thumbHeight: 600,
        name: 'Caio Almeida',
        city: 'WhatsApp',
      },
      {
        id: 'proof-4',
        imageUrl: '/assets/optimized/proof-4-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-4-full.webp',
        thumbWidth: 540,
        thumbHeight: 600,
        name: 'Rafael Moreira',
        city: 'WhatsApp',
      },
      {
        id: 'proof-6',
        imageUrl: '/assets/optimized/proof-6-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-6-full.webp',
        thumbWidth: 270,
        thumbHeight: 600,
        name: 'Matheus Silva',
        city: 'WhatsApp',
      },
      {
        id: 'proof-8',
        imageUrl: '/assets/optimized/proof-8-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-8-full.webp',
        thumbWidth: 270,
        thumbHeight: 600,
        name: 'Bruno Martins',
        city: 'WhatsApp',
      },
      {
        id: 'proof-1',
        imageUrl: '/assets/optimized/proof-1-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-1-full.webp',
        thumbWidth: 338,
        thumbHeight: 600,
        name: 'Lucas Moretti',
        city: 'WhatsApp',
      },
      {
        id: 'proof-5',
        imageUrl: '/assets/optimized/proof-5-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-5-full.webp',
        thumbWidth: 270,
        thumbHeight: 600,
        name: 'Bruno Lima',
        city: 'WhatsApp',
      },
      {
        id: 'proof-3',
        imageUrl: '/assets/optimized/proof-3-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-3-full.webp',
        thumbWidth: 338,
        thumbHeight: 600,
        name: 'Matheus Ribeiro',
        city: 'WhatsApp',
      },
      {
        id: 'proof-2',
        imageUrl: '/assets/optimized/proof-2-thumb.webp',
        fullImageUrl: '/assets/optimized/proof-2-full.webp',
        thumbWidth: 451,
        thumbHeight: 600,
        name: 'Rafael Ferreira',
        city: 'WhatsApp',
      },
    ],
    messageScreenshots: [],
  },
  liveNotifications: {
    enabled: false,
    entries: [],
  },
};
