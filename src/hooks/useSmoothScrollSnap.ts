import { useEffect, useRef } from 'react';

const sectionIds = ['intro', 'projects', 'details', 'articles', 'contact'];

export function useSmoothScrollSnap() {
  const isScrollingRef = useRef(false);

  useEffect(() => {
    let animId: number | null = null;

    const smoothScrollTo = (targetY: number, duration = 900) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();

      // Custom cubic-bezier easing for ultra-smooth 1.5x duration section transitions
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 150);
        }
      };

      animId = requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return;
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      let currentIndex = 0;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (currentScroll >= top - windowHeight * 0.4) {
            currentIndex = i;
          }
        }
      }

      let targetIndex = currentIndex;
      if (e.deltaY > 0) {
        targetIndex = Math.min(currentIndex + 1, sectionIds.length - 1);
      } else {
        targetIndex = Math.max(currentIndex - 1, 0);
      }

      if (targetIndex !== currentIndex) {
        const targetEl = document.getElementById(sectionIds[targetIndex]);
        if (targetEl) {
          e.preventDefault();
          isScrollingRef.current = true;
          smoothScrollTo(targetEl.offsetTop, 900); // 1.5x smoother duration
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);
}
