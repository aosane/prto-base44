import { createPortal } from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';

export default function TooltipPortal({ children, triggerRef }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    const update = () => {
      if (triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipHeight = 400; // estimated max height
        const spaceBelow = window.innerHeight - rect.top;
        const placeAbove = spaceBelow < tooltipHeight && rect.top > tooltipHeight;

        setPos({
          top: placeAbove ? undefined : rect.top,
          bottom: placeAbove ? window.innerHeight - rect.bottom : undefined,
          left: rect.right + 16,
        });
      }
    };
    update();

    // Update on scroll/resize
    const scrollEl = triggerRef?.current?.closest('.overflow-y-auto');
    if (scrollEl) scrollEl.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    
    return () => {
      if (scrollEl) scrollEl.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [triggerRef]);

  if (!pos) return null;

  return createPortal(
    <div
      className="fixed z-[9999]"
      style={{
        top: pos.top != null ? pos.top : undefined,
        bottom: pos.bottom != null ? pos.bottom : undefined,
        left: pos.left,
      }}
    >
      {children}
    </div>,
    document.body
  );
}