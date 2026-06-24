'use client';

import { Github, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projects, type Project } from '../data/projects';

function TechBadge({ name, iconSrc }: { name: string; iconSrc: string }) {
  return (
    <span className="bg-faded text-title font-bold text-xs px-2 py-1 rounded-full inline-flex items-center">
      <span
        aria-hidden="true"
        className="mr-1 inline-block h-[12px] w-[12px] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
        style={{ maskImage: `url(${iconSrc})` }}
      />
      {name}
    </span>
  );
}

// Mobile card component
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card border-b border-faded/50 py-6">
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

export default function AllProjectsPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backLinkRef = useRef<HTMLAnchorElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate back link
      if (backLinkRef.current) {
        tl.from(backLinkRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.6,
        });
      }

      // Animate title
      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
      }

      // Animate table rows (desktop)
      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll('tbody tr');
        tl.from(
          rows,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.4'
        );
      }

      // Animate cards (mobile)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card');
        tl.from(
          cards,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="text-primary min-h-screen max-w-3xl px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-20" id="main-content">
      <Link
        ref={backLinkRef}
        href="/"
        className="inline-flex items-center text-highlight hover:text-title transition-colors mb-6 md:mb-8 lg:mb-12 text-sm md:text-base"
        aria-label="Back to home page"
      >
        <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
        Odin Alexandre
      </Link>

      <h1
        ref={titleRef}
        className="text-title text-3xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-12 lg:mb-16"
      >
        All Projects
      </h1>

      {/* Mobile: Card layout */}
      <div ref={cardsRef} className="md:hidden">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden md:block">
        <table ref={tableRef} className="w-full border-collapse table-auto">
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
