'use client';

import { Github, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { projects, type Project } from '../data/projects';
import { MOTION_OK, useEntrance } from '../intro-context';

function TechBadge({ name, iconSrc }: { name: string; iconSrc: string }) {
  return (
    <span className="bg-faded text-title font-bold text-xs px-2 py-1 rounded-full inline-flex items-center">
      <span
        aria-hidden="true"
        className="tech-icon mr-1 inline-block h-[12px] w-[12px]"
        style={{ maskImage: `url(${iconSrc})`, WebkitMaskImage: `url(${iconSrc})` }}
      />
      {name}
    </span>
  );
}

// Mobile card component
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card border-b border-faded/50 py-6">
      <Image
        src={project.imageSrc}
        alt={project.imageAlt}
        width={640}
        height={341}
        sizes="(max-width: 767px) 100vw, 640px"
        className="w-full h-auto rounded-xl border-2 border-faded mb-4"
      />
      <div className="flex items-start justify-between mb-3">
        <h2 className="font-semibold text-title text-base">{project.title}</h2>
        <div className="flex items-center gap-3 ml-4">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="text-highlight hover:text-title transition-colors"
              aria-label={`Visit ${project.title} website`}
            >
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-highlight hover:text-title transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
      <p className="text-light-faded text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <TechBadge key={tech.name} name={tech.name} iconSrc={tech.iconSrc} />
        ))}
      </div>
    </div>
  );
}

/**
 * Large screens only: floating preview docked beside the table (never over
 * the row's content) that follows the pointer vertically. Position is driven
 * by a single rAF loop writing `transform`.
 */
function HoverPreview({
  project,
  anchorRef,
}: {
  project: Project | null;
  anchorRef: RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) return;

    const reduced = !window.matchMedia(MOTION_OK).matches;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetY.current = e.clientY;
    };
    const tick = () => {
      const lerp = reduced ? 1 : 0.18;
      currentY.current += (targetY.current - currentY.current) * lerp;
      const anchor = anchorRef.current?.getBoundingClientRect();
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      // Dock to the right of the table when there is room, otherwise to the left
      let x = anchor ? anchor.right + 32 : window.innerWidth - width - 16;
      if (anchor && x + width > window.innerWidth - 16) x = Math.max(16, anchor.left - width - 32);
      const y = Math.min(Math.max(16, currentY.current - height / 2), window.innerHeight - height - 16);
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [anchorRef]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`hidden lg:block fixed left-0 top-0 z-30 w-72 xl:w-80 pointer-events-none transition-opacity duration-150 ease-out will-change-transform ${
        project ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {project && (
        <Image
          src={project.imageSrc}
          alt=""
          width={320}
          height={171}
          sizes="320px"
          className="w-full h-auto rounded-xl border-2 border-faded shadow-2xl"
        />
      )}
    </div>
  );
}

export default function AllProjectsPage() {
  const pageRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [hovered, setHovered] = useState<Project | null>(null);

  // Entrance: /work never shows the loader, so this starts on mount
  useEntrance(pageRef, () => {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('.back-link', { x: -30, opacity: 0, duration: 0.6 })
      .from('.page-title', { y: 50, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('tbody tr', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
      .from('.project-card', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4');
  });

  return (
    <main
      ref={pageRef}
      className="text-primary min-h-screen max-w-3xl px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-20"
      id="main-content"
    >
      <Link
        href="/"
        className="back-link inline-flex items-center text-highlight hover:text-title transition-colors mb-6 md:mb-8 lg:mb-12 text-sm md:text-base"
        aria-label="Odin Alexandre, back to home page"
      >
        <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
        Odin Alexandre
      </Link>

      <h1 className="page-title text-title text-3xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-12 lg:mb-16">
        All Projects
      </h1>

      {/* Mobile: Card layout */}
      <div className="md:hidden">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden md:block">
        <HoverPreview project={hovered} anchorRef={tableRef} />
        <table ref={tableRef} className="w-full border-collapse table-auto" onMouseLeave={() => setHovered(null)}>
          <thead>
            <tr className="border-b border-faded">
              <th className="text-left py-4 px-4 text-title font-semibold text-sm lg:text-base">
                Project
              </th>
              <th className="text-left py-4 px-4 text-title font-semibold text-sm lg:text-base">
                Built with
              </th>
              <th className="text-center py-4 px-4 text-title font-semibold text-sm lg:text-base w-20">
                Link
              </th>
              <th className="text-center py-4 px-4 text-title font-semibold text-sm lg:text-base w-20">
                GitHub
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.slug}
                className="border-b border-faded/50 hover:bg-white/5 transition-colors"
                onMouseEnter={() => setHovered(project)}
              >
                <td className="py-6 px-4">
                  <div className="font-semibold text-title text-base lg:text-lg">
                    {project.title}
                  </div>
                  <div className="text-light-faded text-sm mt-1 max-w-md">
                    {project.description}
                  </div>
                </td>
                <td className="py-6 px-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.techs.map((tech) => (
                      <TechBadge
                        key={tech.name}
                        name={tech.name}
                        iconSrc={tech.iconSrc}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-6 px-4 text-center w-20">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-highlight hover:text-title transition-colors"
                      aria-label={`Visit ${project.title} website`}
                    >
                      <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-primary text-sm" aria-label="No website available">—</span>
                  )}
                </td>
                <td className="py-6 px-4 text-center w-20">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-highlight hover:text-title transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-primary text-sm" aria-label="No GitHub repository">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
