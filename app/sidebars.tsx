'use client';

import { Github, Twitter, Linkedin, Instagram, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useEntrance } from './intro-context';

export default function SideBars() {
  const leftBarRef = useRef<HTMLElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Entrance: starts when the intro loader is done (or immediately if skipped)
  useEntrance(
    undefined,
    () => {
      const base = { y: 100, opacity: 0, duration: 1, ease: 'power3.out' } as const;
      if (leftBarRef.current) gsap.from(leftBarRef.current, { ...base, delay: 0.15 });
      if (rightBarRef.current) gsap.from(rightBarRef.current, { ...base, delay: 0.25 });
    },
    [pathname],
  );

  return (
    <>
      {/* Left Bar - Social Icons (Hidden on mobile/tablet) */}
      <nav
        ref={leftBarRef}
        className="hidden lg:block fixed bottom-0 left-20 xl:left-40 w-10 text-light-faded"
        aria-label="Social media links"
      >
        <ul className="flex flex-col items-center after:w-[1px] after:h-[120px] after:bg-light-faded after:block ">
          <li className="p-3">
            <a href="https://github.com/odinalx" target="_blank" rel="noreferrer" className="hover:text-highlight" aria-label="GitHub profile">
              <Github size={24} aria-hidden="true" />
            </a>
          </li>
          <li className="p-3">
            <a href="https://www.linkedin.com/in/odinalexandre/" target="_blank" rel="noreferrer" className="hover:text-highlight" aria-label="LinkedIn profile">
              <Linkedin size={24} aria-hidden="true" />
            </a>
          </li>
          <li className="p-3">
            <a href="https://x.com/_Odin_Dev" target="_blank" rel="noreferrer" className="hover:text-highlight" aria-label="Twitter profile">
              <Twitter size={24} aria-hidden="true" />
            </a>
          </li>
          <li className="p-3 mb-5">
            <a href="https://www.instagram.com/_odin_dev/" target="_blank" rel="noreferrer" className="hover:text-highlight" aria-label="Instagram profile">
              <Instagram size={24} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>

      {/* Right Bar - Based in France (Hidden on mobile/tablet) */}
      <div
        ref={rightBarRef}
        className="hidden lg:block fixed bottom-0 right-20 xl:right-40 w-10"
        aria-label="Location information"
      >
        <div className="after:w-[1px] after:h-[120px] after:bg-light-faded after:block flex flex-col items-center">
          <MapPin size={24} className="rotate-90 mb-4 text-light-faded" aria-hidden="true" />
          <p className="writing-mode-vertical-rl text-center mb-5 font-bold text-sm text-title">
            BASED IN FRANCE
          </p>
        </div>
      </div>
    </>
  );
}
