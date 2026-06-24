'use client';

import Experience from './experience';
import Work from './work';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Typewriter Text Component (hover-triggered only)
function TypewriterText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);
  const originalText = text;

  const handleMouseEnter = () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    let currentIndex = 1; // Start from 1 to keep first letter visible

    const interval = setInterval(() => {
      if (currentIndex <= originalText.length) {
        setDisplayText(originalText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        isAnimatingRef.current = false;
      }
    }, 80);
  };

  return (
    <h1
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{
        whiteSpace: 'nowrap',
        position: 'relative',
        display: 'inline-block',
        cursor: 'none',
      }}
    >
      <span style={{ visibility: 'hidden' }}>{originalText}</span>
      <span style={{ position: 'absolute', left: 0, top: 0 }}>
        {displayText}
      </span>
    </h1>
  );
}

// Flip Text Component for TOUCH
const FlipWord = React.forwardRef<
  { triggerAnimation: () => void },
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  const handleMouseEnter = () => {
    if (wordRef.current && !isAnimatingRef.current) {
      isAnimatingRef.current = true;

      // Reset rotation to 0 first
      gsap.set(wordRef.current, { rotationX: 0 });

      // Animate to 360
      gsap.to(wordRef.current, {
        rotationX: 360,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimatingRef.current = false;
          // Reset to 0 after animation completes
          if (wordRef.current) {
            gsap.set(wordRef.current, { rotationX: 0 });
          }
        },
      });
    }
  };

  React.useImperativeHandle(ref, () => ({
    triggerAnimation: handleMouseEnter,
  }));

  return (
    <span
      ref={wordRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{
        display: 'inline-block',
        cursor: 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </span>
  );
});

FlipWord.displayName = 'FlipWord';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const flipWordRef = useRef<{ triggerAnimation: () => void }>(null);

  useEffect(() => {
    // Hero animations - start after sidebars begin
    // Loader: 2.2s
    // Navbar: 2.4s + 0.8s = finishes at 3.2s
    // Side bars: 3.25s + 1s = finishes at 4.25s
    // Start hero at 3.5s (after sidebars start)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 3.8,
      })
        .from(
          '.hero-subtitle',
          {
            y: 80,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-description',
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Section title animations - only for About section
    const triggers: ScrollTrigger[] = [];

    if (aboutSectionRef.current) {
      const title = aboutSectionRef.current.querySelector('.section-title');
      const divider = aboutSectionRef.current.querySelector('.section-divider');
      const content = aboutSectionRef.current.querySelector('.section-content');

      if (title) {
        gsap.set(title, { x: -50, opacity: 0 });

        const trigger = ScrollTrigger.create({
          trigger: aboutSectionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(title, {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
        });
        triggers.push(trigger);
      }

      if (divider) {
        gsap.set(divider, { scaleX: 0, opacity: 0 });

        const trigger = ScrollTrigger.create({
          trigger: aboutSectionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(divider, {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2,
            });
          },
        });
        triggers.push(trigger);
      }

      if (content) {
        gsap.set(content.children, { y: 30, opacity: 0 });

        const trigger = ScrollTrigger.create({
          trigger: content,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(content.children, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
            });
          },
        });
        triggers.push(trigger);
      }
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="text-primary min-h-screen max-w-5xl px-4 md:px-6 lg:px-8 xl:px-0" id="main-content">
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center lg:px-4"
      >
        <TypewriterText
          text="Odin Alexandre"
          className="hero-title font-bold text-5xl md:text-7xl lg:text-9xl text-title"
        />
        <h2 className="hero-subtitle text-light-faded font-semibold text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-8">
          Full Stack Developer
        </h2>

        <p className="hero-description max-w-xl text-sm md:text-base">
          I <span className="text-highlight font-bold">build</span> ( and
          sometimes <span className="text-highlight font-bold">design</span> )
          accessible and engaging{' '}
          <span className="text-highlight font-bold">digital experiences</span>{' '}
          for the <span className="text-highlight font-bold">Web</span>. I am
          currently looking for new oppurtunities.
        </p>
      </section>
      <div className="m-auto max-w-3xl">
        {' '}
        <section id="about" ref={aboutSectionRef} className="flex flex-col scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>About
            </h3>
            <div className="section-divider ml-2 md:ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-24 md:mb-32 lg:mb-48 text-sm md:text-base">
            <p>
              I&apos;m a passionate developer who loves building intuitive and
              accessible user interfaces, crafting unique digital experiences
              where thoughtful design meets solid development. I&apos;m
              especially interested in the balance between design and
              engineering, with a strong focus on performance and usability to
              create products that feel both beautiful and efficient.
            </p>
            <p>
              Currently, I&apos;m a Junior Full-Stack Developer, freshly
              graduated and working as a freelancer. I enjoy contributing to
              diverse projects, continuously improving my skills across the
              stack, and delivering reliable, user-centered solutions while
              growing as a professional developer.
            </p>
            <p>
              In my spare time, I usually play tennis, read, draw, or get lost
              in the Summoner&apos;s Rift, always looking for the next adventure
              both on and off the screen.
            </p>
          </div>
        </section>
        <section id="experience" className="flex flex-col scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>Experience
            </h3>
            <div className="section-divider ml-2 md:ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-24 md:mb-32 lg:mb-48">
            <Experience />
            <a
              href="/Odin_ALEXANDRE_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="experience-cta flex text-title font-bold hover:text-highlight box-content group w-fit text-sm md:text-base"
              aria-label="View full résumé (PDF)"
            >
              View Full Résumé
              <ArrowUpRight className="ml-1 transition-transform duration-200 ease-out translate-y-[4px] -translate-x-[4px] group-hover:-translate-y-0 group-hover:translate-x-0" aria-hidden="true" />
            </a>
          </div>
        </section>
        <section id="work" className="flex flex-col scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>Work
            </h3>
            <div className="section-divider ml-2 md:ml-4 lg:ml-8 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-24 md:mb-32 lg:mb-48">
            <Work />
            <a
              href="/work"
              className="work-cta flex text-title font-bold hover:text-highlight box-content group w-fit text-sm md:text-base"
              aria-label="View all projects"
            >
              View All Works
              <ArrowRight className="ml-1 transition-transform duration-200 ease-out translate-y-[2px] -translate-x-[4px] group-hover:translate-x-[2px]" aria-hidden="true" />
            </a>
          </div>
        </section>
        <section id="contact" className="flex flex-col scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>Contact
            </h3>
            <div className="section-divider ml-2 md:ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-20 md:mb-32 text-center flex flex-col items-center">
            <p className="max-w-xl m-auto mb-6 md:mb-8 text-sm md:text-base px-4">
              Im currently looking for new opportunities. My inbox is always
              open, whether you have a question or just want to say hi !
            </p>
            <ArrowDown className="mb-6 md:mb-8 text-title w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            <a
              href="mailto:odinalexandre.dev@gmail.com"
              className="font-bold text-2xl md:text-4xl lg:text-5xl text-title px-4"
              aria-label="Send email to odinalexandre.dev@gmail.com"
              onMouseEnter={() => {
                flipWordRef.current?.triggerAnimation();
              }}
            >
              GET IN <FlipWord ref={flipWordRef} className="text-highlight">TOUCH</FlipWord>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
