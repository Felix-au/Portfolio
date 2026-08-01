import { useEffect, useRef } from 'react';

const SECTION_IDS = ['intro', 'projects', 'details', 'articles', 'contact'];
// How long (ms) after scrolling stops before we snap — higher = less jarring
const DEBOUNCE_MS = 80;

/**
 * Smoothly snaps to the nearest section a short delay after the user
 * stops scrolling. Uses scrollIntoView({ behavior: 'smooth' }) for an
 * eased, non-jarring transition — unlike CSS scroll-snap-type: mandatory.
 */
export function useSmoothScrollSnap() {
  const isSnapping = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      SECTION_IDS.map((id) => document.getElementById(id)).filter(
        Boolean
      ) as HTMLElement[];

    const getNearestSection = (): HTMLElement | null => {
      const sections = getSections();
      if (!sections.length) return null;

      const viewportMid = window.scrollY + window.innerHeight * 0.5;
      let nearest: HTMLElement = sections[0];
      let minDist = Infinity;

      for (const section of sections) {
        const sectionMid = section.offsetTop + section.offsetHeight * 0.5;
        const dist = Math.abs(viewportMid - sectionMid);
        if (dist < minDist) {
          minDist = dist;
          nearest = section;
        }
      }
      return nearest;
    };

    const snapToNearest = () => {
      if (isSnapping.current) return;

      const target = getNearestSection();
      if (!target) return;

      // Only snap if not already aligned (within 4px tolerance)
      const delta = Math.abs(target.offsetTop - window.scrollY);
      if (delta < 4) return;

      isSnapping.current = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Release snap lock once animation is done (~700ms)
      setTimeout(() => {
        isSnapping.current = false;
      }, 700);
    };

    const onScroll = () => {
      if (isSnapping.current) return;

      lastScrollY.current = window.scrollY;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(snapToNearest, DEBOUNCE_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);
}
