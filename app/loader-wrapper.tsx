'use client';

import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loader';
import { IntroContext } from './intro-context';

// Lives for the SPA session; reset by any full document load (normal or hard reload).
let introPlayed = false;

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Decided once per document load: play only when landing on the home page.
  const [playLoader] = useState(() => pathname === '/' && !introPlayed);
  const [introDone, setIntroDone] = useState(() => !playLoader);

  const finish = useCallback(() => {
    introPlayed = true;
    setIntroDone(true);
  }, []);

  return (
    <IntroContext.Provider value={introDone}>
      {playLoader && <Loader onDone={finish} />}
      <div inert={!introDone}>{children}</div>
    </IntroContext.Provider>
  );
}
