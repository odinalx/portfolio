'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onDone }: { onDone: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Reduced motion: the overlay is already display:none via CSS, release the
    // content right away. Must run before any getTotalLength() call (returns 0
    // on display:none elements in Firefox).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      setHidden(true);
      return;
    }

    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;
      const paths = svg.querySelectorAll<SVGPathElement>('path.logo-path');
      const polygon = svg.querySelector('polygon.logo-path');

      gsap.set(paths, {
        strokeDasharray: (_i: number, t: SVGPathElement) => {
          const l = t.getTotalLength() || 1;
          return `${l} ${l}`;
        },
        strokeDashoffset: (_i: number, t: SVGPathElement) => t.getTotalLength() || 1,
        visibility: 'visible',
      });
      if (polygon) gsap.set(polygon, { opacity: 0, visibility: 'visible' });

      const tl = gsap.timeline();
      // 1.2s + 0.3s stagger: the draw ends at 1.5s
      tl.to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.3, ease: 'power2.inOut' });
      if (polygon) tl.to(polygon, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.3');
      // t = 1.5s: entrances start underneath the fading overlay
      tl.call(onDone);
      tl.to(loaderRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => setHidden(true),
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background motion-reduce:hidden"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="w-32 h-32"
        viewBox="0 0 33.77 24.22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              .logo-path {
                fill: none;
                stroke: #d83949;
                stroke-width: 0.5;
                stroke-linecap: round;
                stroke-linejoin: round;
                visibility: hidden;
              }
            `}
          </style>
        </defs>
        <path
          className="logo-path"
          d="M25.89.8l-6.17.02-.62,1.82h0c.9.8,1.66,1.78,2.28,2.92.34.62.61,1.3.83,2.02h0s.61-1.6.61-1.6l2.89,8.54h-8.9c-.12.66-.3,1.26-.54,1.81-.34.78-.78,1.44-1.31,1.96h6.6s0,0,0,0h4.86l2.21,5.12,5.13-.02L25.89.8Z"
        />
        <path
          className="logo-path"
          d="M13.98,19.06c-.85.5-1.83.76-2.94.76-1.21,0-2.26-.3-3.15-.89s-1.59-1.46-2.09-2.6c-.5-1.14-.74-2.55-.74-4.21s.25-3.07.74-4.21c.5-1.14,1.19-2.01,2.09-2.6s1.95-.89,3.15-.89,2.26.3,3.15.89c.9.59,1.59,1.46,2.09,2.6.5,1.14.74,2.55.74,4.21,0,.58-.03,1.13-.1,1.65h5.07c.05-.53.08-1.08.08-1.65,0-2.57-.49-4.76-1.46-6.56-.97-1.8-2.29-3.18-3.96-4.13-1.67-.95-3.54-1.42-5.62-1.42s-3.98.47-5.64,1.42c-1.67.95-2.98,2.32-3.95,4.13-.97,1.8-1.45,3.99-1.45,6.56s.48,4.75,1.45,6.55c.97,1.8,2.28,3.18,3.95,4.13,1.67.95,3.55,1.43,5.64,1.43s3.95-.47,5.62-1.42c1.55-.88,2.79-2.13,3.74-3.74h-6.42Z"
        />
        <polygon
          className="logo-path"
          fill="#d83949"
          points="14.97 18.3 20.81 18.3 20.82 18.29 14.98 18.29 14.97 18.3"
        />
      </svg>
    </div>
  );
}
