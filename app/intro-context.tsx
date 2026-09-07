'use client';

import {
  createContext,
  useContext,
  useLayoutEffect,
  type DependencyList,
  type RefObject,
} from 'react';
import { gsap } from 'gsap';

/**
 * `true` once the intro (logo loader) is finished, or immediately when the
 * loader is skipped (client-side navigation, /work page, reduced motion).
 * Defaults to `true` so anything rendered outside the provider animates at once.
 */
export const IntroContext = createContext<boolean>(true);

export const useIntroDone = () => useContext(IntroContext);

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Run a GSAP entrance animation once the intro is done.
 * - Starts immediately when the loader was skipped.
 * - Skips entirely under `prefers-reduced-motion: reduce` (elements stay in
 *   their natural, visible state).
 * - `useLayoutEffect` so `from()` tweens set their start state before paint.
 * - StrictMode-safe: `mm.revert()` kills everything built inside.
 */
export function useEntrance(
  scope: RefObject<Element | null> | undefined,
  build: () => void,
  deps: DependencyList = [],
) {
  const introDone = useIntroDone();

  useLayoutEffect(() => {
    if (!introDone) return;
    const mm = gsap.matchMedia(scope?.current ?? undefined);
    mm.add(MOTION_OK, build);
    return () => mm.revert();
    // `build` is intentionally excluded; callers pass the deps that matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introDone, ...deps]);
}
