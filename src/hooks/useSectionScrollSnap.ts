import { useEffect, useRef } from 'react';

/** Section IDs in DOM order — top to bottom */
const SECTION_IDS = ['intro', 'projects', 'details', 'articles', 'contact'];

/** Cubic-ease-in-out easing — feels natural, not mechanical */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smoothly animates window.scrollY to `targetY` over `duration` ms.
 * Returns a cancel function so a new scroll can interrupt the previous one.
 */
function smoothScrollTo(targetY: number, duration: number): () => void {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime: number | null = null;
  let raf: number;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) {
      raf = requestAnimationFrame(step);
    }
  };

  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/**
 * Returns the index of the section whose top is closest to the
 * current viewport's vertical midpoint.
 */
function getCurrentSectionIndex(): number {
  const mid = window.scrollY + window.innerHeight / 2;
  let closest = 0;
  let closestDist = Infinity;

  SECTION_IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const dist = Math.abs(el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2 - mid);
    if (dist < closestDist) {
      closestDist = dist;
      closest = i;
    }
  });

  return closest;
}

/**
 * Hook: intercepts wheel & touch events to snap scrolling
 * exactly one section per gesture, with a ~750 ms ease-in-out animation.
 *
 * 750 ms ≈ native-browser-smooth × 1.25
 */
export function useSectionScrollSnap() {
  const scrolling = useRef(false);
  const cancelScroll = useRef<(() => void) | null>(null);

  // Touch tracking
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const DURATION = 750; // ms  (~1.25× native smooth)
    const WHEEL_THRESHOLD = 30; // px delta needed to trigger
    const TOUCH_THRESHOLD = 40; // px swipe needed to trigger

    function snapTo(index: number) {
      const id = SECTION_IDS[Math.max(0, Math.min(index, SECTION_IDS.length - 1))];
      const el = document.getElementById(id);
      if (!el) return;

      if (cancelScroll.current) cancelScroll.current();

      const targetY = el.getBoundingClientRect().top + window.scrollY;
      cancelScroll.current = smoothScrollTo(targetY, DURATION);

      scrolling.current = true;
      setTimeout(() => {
        scrolling.current = false;
      }, DURATION + 50);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (scrolling.current) return;

      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      const current = getCurrentSectionIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      snapTo(current + direction);
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      if (scrolling.current) return;

      const current = getCurrentSectionIndex();
      const direction = delta > 0 ? 1 : -1;
      snapTo(current + direction);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);
}
