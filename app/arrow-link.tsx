import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

type Direction = 'up-right' | 'right' | 'down' | 'left';

const icons = {
  'up-right': ArrowUpRight,
  right: ArrowRight,
  down: ArrowDown,
  left: ArrowLeft,
};

// Hover motion per direction (icon nudges along its own arrow)
const motion: Record<Direction, string> = {
  'up-right': 'group-hover:translate-x-[2px] group-hover:-translate-y-[2px]',
  right: 'group-hover:translate-x-[3px]',
  down: 'group-hover:translate-y-[3px]',
  left: 'group-hover:-translate-x-[3px]',
};

type Props = {
  href: string;
  children: ReactNode;
  direction?: Direction;
  /** Icon before the text (used for "back" links) */
  iconFirst?: boolean;
  className?: string;
} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>;

/**
 * The site's standard text link: bold label + arrow icon sized to the text
 * and vertically centred, arrow nudging on hover. Internal hrefs use next/link.
 */
export default function ArrowLink({
  href,
  children,
  direction = 'up-right',
  iconFirst = false,
  className = '',
  ...rest
}: Props) {
  const Icon = icons[direction];
  const icon = (
    <Icon
      className={`h-[1.15em] w-[1.15em] shrink-0 transition-transform duration-200 ease-out ${motion[direction]}`}
      aria-hidden="true"
    />
  );
  const classes = `group inline-flex items-center gap-1 font-bold text-title transition-colors hover:text-highlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight ${className}`;
  const content = (
    <>
      {iconFirst && icon}
      <span>{children}</span>
      {!iconFirst && icon}
    </>
  );

  const isInternal = href.startsWith('/') || href.startsWith('#');
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  const isExternal = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
