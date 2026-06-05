'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  show: boolean;
  message: string;
  children: React.ReactNode;
  className?: string;
}

export default function QtyMaxHintTooltip({ show, message, children, className = '' }: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show || !anchorRef.current) return;

    const updatePosition = () => {
      const rect = anchorRef.current!.getBoundingClientRect();
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [show, message]);

  const tooltip =
    show && mounted ? (
      <div
        className="fixed z-[10060] pointer-events-none -translate-x-1/2 -translate-y-full"
        style={{ top: position.top, left: position.left }}
        role="status"
        aria-live="polite"
      >
        <div className="relative px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-[11px] leading-snug whitespace-nowrap shadow-lg animate-qty-hint-in">
          {message}
          <span
            className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-slate-800"
            aria-hidden
          />
        </div>
      </div>
    ) : null;

  return (
    <div ref={anchorRef} className={`relative ${className}`}>
      {mounted && tooltip ? createPortal(tooltip, document.body) : null}
      {children}
    </div>
  );
}
