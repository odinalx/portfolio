'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor (desktop with a fine pointer only).
 * Positions are written as `transform: translate3d()` from a single
 * requestAnimationFrame loop: no layout reads, no per-event Animation objects.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false); // Start disabled to prevent flash on touch devices

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursorDot = dotRef.current;
    const cursorOutline = outlineRef.current;
    if (!cursorDot || !cursorOutline) return;

    cursorOutline.classList.add('cursor-outline-transition');

    const target = { x: 0, y: 0 };
    const outline = { x: 0, y: 0 };
    let initialized = false;
    let raf = 0;
    let running = false;

    const tick = () => {
      cursorDot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      outline.x += (target.x - outline.x) * 0.2;
      outline.y += (target.y - outline.y) * 0.2;
      cursorOutline.style.transform = `translate3d(${outline.x}px, ${outline.y}px, 0) translate(-50%, -50%)`;

      // Stop the loop once the outline has caught up; restart on next move
      if (Math.abs(target.x - outline.x) < 0.1 && Math.abs(target.y - outline.y) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!initialized) {
        // Snap on first move (or after returning from touch mode), then fade in
        outline.x = target.x;
        outline.y = target.y;
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        initialized = true;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest('a, button')) return;
      cursorOutline.classList.add('cursor-outline-active');
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest('a, button')) return;
      cursorOutline.classList.remove('cursor-outline-active');
    };

    const handleMouseDown = () => cursorOutline.classList.add('cursor-outline-press');
    const handleMouseUp = () => cursorOutline.classList.remove('cursor-outline-press');

    // Hide when the pointer leaves the window, and after a bfcache restore
    const handleLeave = () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
      initialized = false;
    };
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) handleLeave();
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="z-[9999]" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-[50%] pointer-events-none w-[5px] h-[5px] bg-cursor z-[9999] will-change-transform"
        style={{ opacity: 0, transition: 'opacity 0.2s' }}
      ></div>
      <div
        ref={outlineRef}
        className="fixed left-0 top-0 rounded-[50%] pointer-events-none w-[40px] h-[40px] border-2 border-cursor-outline cursor-outline z-[9999] will-change-transform"
        style={{ opacity: 0, transition: 'opacity 0.2s' }}
      ></div>
    </div>
  );
}
