'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEntrance } from './intro-context';

const navItems = [
  { name: 'About', path: '/#about' },
  { name: 'Experience', path: '/#experience' },
  { name: 'Work', path: '/#work' },
  { name: 'Contact', path: '/#contact' },
];

const sectionIds = ['home', 'about', 'experience', 'work', 'contact'];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === '/';

  // Entrance: starts when the intro loader is done (or immediately if skipped)
  useEntrance(
    undefined,
    () => {
      if (!barRef.current) return;
      gsap.from(barRef.current, { y: -100, opacity: 0, duration: 0.8, ease: 'power3.out' });
    },
    [pathname],
  );

  // Scrollspy: one IntersectionObserver instead of layout reads on every scroll
  useEffect(() => {
    if (!isHome) return;

    const ratios = new Map<string, number>();
    const pick = () => {
      let best = '';
      let bestRatio = 0;
      for (const id of sectionIds) {
        const r = ratios.get(id) ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          best = id;
        }
      }
      if (best) setActiveSection(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        pick();
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isHome]);

  // Don't show navbar on /work page
  if (pathname === '/work') {
    return null;
  }

  return (
    <header>
      <div ref={barRef} className="fixed top-0 left-0 right-0 z-40 pt-4 pb-2 md:py-6 lg:py-4">
        <div className="max-w-5xl mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center" aria-label="Main navigation">
            <ul className="flex space-x-4 items-center bg-background/80 backdrop-blur-sm border border-primary rounded-full px-4 py-4">
              <li>
                <Link href={'/'} aria-label="Home">
                  <Image src="/logo.svg" alt="Odin Alexandre Logo" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7" priority />
                </Link>
              </li>
              {navItems.map((item) => {
                const targetId = item.path.split('#')[1] ?? '';
                const isActive = activeSection === targetId;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`text-base lg:text-lg font-bold transition-colors hover:text-title ${
                        isActive ? 'text-highlight' : 'text-primary'
                      }`}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center bg-background/80 backdrop-blur-sm border border-primary rounded-full px-4 py-3">
            <Link href={'/'} aria-label="Home">
              <Image src="/logo.svg" alt="Odin Alexandre Logo" width={24} height={24} className="w-6 h-6" priority />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-title p-2 transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div
                className={`transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <nav
            id="mobile-menu"
            className={`md:hidden absolute top-full left-4 right-4 mt-1 bg-background/95 backdrop-blur-sm border border-primary rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out origin-top ${
              mobileMenuOpen
                ? 'opacity-100 scale-y-100 translate-y-0'
                : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
            }`}
            aria-label="Mobile navigation menu"
            aria-hidden={!mobileMenuOpen}
          >
            <ul className="flex flex-col py-1">
              {navItems.map((item, index) => {
                const targetId = item.path.split('#')[1] ?? '';
                const isActive = activeSection === targetId;
                return (
                  <li
                    key={item.name}
                    className={`transition-all duration-300 ease-out ${
                      mobileMenuOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{
                      transitionDelay: mobileMenuOpen
                        ? `${index * 50}ms`
                        : '0ms',
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                      className={`block px-6 py-3 text-base font-bold transition-colors hover:bg-white/5 ${
                        isActive ? 'text-highlight' : 'text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
