'use client';

import Image from 'next/image';
import { Github, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from './data/projects';

export default function Work() {
  return (
    <div className="space-y-8 mb-16 group/list">
      {featuredProjects.map((project) => (
        <div
          key={project.slug}
          className={`group relative flex flex-col md:flex-row pb-1 transition-all lg:group-hover/list:opacity-50 lg:hover:!opacity-100 ${
            project.href ? 'cursor-pointer' : 'cursor-none'
          }`}
        >
          <div
            className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/10 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg pointer-events-none"
            aria-hidden="true"
            role="presentation"
          ></div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              aria-label={`${project.title} website`}
              className="absolute -inset-x-4 -inset-y-4 lg:-inset-x-6 z-20 cursor-pointer"
            />
          ) : null}
          <div className="flex flex-row md:flex-col z-30 justify-between md:justify-start flex-none pointer-events-none mb-4 md:mb-0 md:mr-8 lg:mr-16">
            <Image
              alt={project.imageAlt}
              src={project.imageSrc}
              width={250}
              height={250}
              className="h-auto w-32 md:w-48 lg:w-[250px] border-2 border-faded rounded-xl mb-0 md:mb-4 transition-colors duration-200 ease-out group-hover:border-light-faded"
              style={{ width: 'auto', height: 'auto' }}
            />
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-fit md:w-auto transition-colors relative z-40 pointer-events-auto hover:text-highlight ml-4 md:ml-0"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={20} className="md:w-6 md:h-6" aria-hidden="true" />
              </a>
            ) : null}
          </div>
          <div className="flex flex-col justify-between z-10 flex-1 min-w-0 pointer-events-none">
            <div>
              <div className="flex text-title text-xl md:text-2xl">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    className="flex items-start text-title transition-colors duration-200 group w-fit pointer-events-none"
                  >
                    <h4 className="group-hover:text-highlight">
                      {project.title}
                    </h4>
                    <ArrowUpRight className="ml-1 w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ease-out translate-y-[4px] -translate-x-[4px] group-hover:-translate-y-0 group-hover:translate-x-0 group-hover:text-highlight" aria-hidden="true" />
                  </a>
                ) : (
                  <h4 className="group-hover:text-highlight">
                    {project.title}
                  </h4>
                )}
              </div>
              <p className="text-sm md:text-base">{project.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2 mt-4">
              {project.techs.map((t) => (
                <TechBadge key={t.name} name={t.name} iconSrc={t.iconSrc} />
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechBadge({ name, iconSrc }: { name: string; iconSrc: string }) {
  return (
    <li className="bg-faded/40 border border-faded text-title font-bold text-xs md:text-sm px-2 py-1 rounded-full flex items-center">
      <span
        aria-hidden="true"
        className="mr-1 inline-block h-[12px] w-[12px] md:h-[14px] md:w-[14px] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
        style={{ maskImage: `url(${iconSrc})` }}
      />
      {name}
    </li>
  );
}
