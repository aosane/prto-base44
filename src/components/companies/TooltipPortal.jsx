import { createPortal } from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';

export default function TooltipPortal({ children, triggerRef }) {
  const [pos, setPos] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (!triggerRef?.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 450;
      const margin = 8;

      // Always clamp so the tooltip fits within the viewport
      let top = rect.top;

      // If it would overflow the bottom, push it up
      if (top + tooltipHeight > window.innerHeight - margin) {
        top = window.innerHeight - tooltipHeight - margin;
      }

      // Never go above viewport
      if (top < margin) {
        top = margin;
      }

      setPos({
        top,
        left: rect.right + 16,
      });
    };

    // Initial position, then re-measure once rendered
    update();
    const raf = requestAnimationFrame(update);

    const scrollEl = triggerRef?.current?.closest('.overflow-y-auto');
    if (scrollEl) scrollEl.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    
    return () => {
      cancelAnimationFrame(raf);
      if (scrollEl) scrollEl.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [triggerRef]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-[9999]"
      style={{
        top: pos.top,
        left: pos.left,
        maxHeight: `calc(100vh - 16px)`,
        overflowY: 'auto',
      }}
    >
      {children}
    </div>,
    document.body
  );
}