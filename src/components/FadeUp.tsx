import { useEffect, useRef, useState, type ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Single shared IntersectionObserver for all FadeUp blocks on the page.
 * Avoids allocating ~25 separate observers and releases will-change after reveal.
 */
const revealCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = revealCallbacks.get(entry.target);
            if (cb) {
              revealCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
              cb();
            }
          }
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' },
    );
  }
  return sharedObserver;
}

export function FadeUp({ children, className = '', delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const node = ref.current;
    const observer = getSharedObserver();
    if (!node || !observer) {
      setIsVisible(true);
      return;
    }

    revealCallbacks.set(node, () => setIsVisible(true));
    observer.observe(node);

    return () => {
      revealCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, [isVisible]);

  return (
    <div
      ref={ref}
      style={
        !isVisible || delay === 0
          ? undefined
          : { transitionDelay: `${Math.round(delay * 1000)}ms` }
      }
      className={[
        'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 will-change-[opacity,transform]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
