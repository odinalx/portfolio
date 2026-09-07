'use client';

import Image from 'next/image';

type ExperienceEntry = {
  company: string;
  role: string;
  year: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
};

const experiences: ExperienceEntry[] = [
  {
    company: 'BoursoBank',
    role: 'Mobile developer',
    year: '2025',
    description:
      '3-month internship as a Front-End Developer, working on the creation of an internal management tool using Flutter Web',
    logoSrc: '/boursobank.png',
    logoAlt: 'BoursoBank logo',
  },
  {
    company: 'Petit Roudoudou',
    role: 'Front-end Developer',
    year: '2024',
    description:
      '2-month internship as a Front-End Developer, focused on UI/UX redesign and SEO optimization.',
  },
  {
    company: 'BUT MMI/Informatique',
    role: 'Université de Lorraine',
    year: '2022-2025',
    description:
      'Hands-on experience in all key areas of digital professions and web development through real-world, project-based learning',
    logoSrc: '/universite.png',
    logoAlt: 'Université de Lorraine logo',
  },
];

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <div>
      {entry.logoSrc ? (
        <Image
          src={entry.logoSrc}
          height={32}
          width={32}
          alt={entry.logoAlt ?? `${entry.company} logo`}
          className="mb-2 md:mb-0 h-8 w-8 rounded-sm"
        />
      ) : null}
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-24">
        <div className="md:w-60 lg:w-80 flex-none mb-4 md:mb-0">
          <h4 className="text-title text-xl md:text-2xl lg:text-3xl md:whitespace-nowrap">
            {entry.company}
          </h4>
          <h5 className="text-primary text-sm md:text-base md:whitespace-nowrap">
            {entry.role}
          </h5>
          <p className="text-primary text-sm md:text-base">{entry.year}</p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base">{entry.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div className="space-y-8 mb-16">
      {experiences.map((entry, index) => (
        <div key={`${entry.company}-${index}`}>
          <ExperienceItem entry={entry} />
        </div>
      ))}
    </div>
  );
}
