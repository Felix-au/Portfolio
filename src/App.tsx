import React, { useState, useEffect } from 'react';
import { IntroLoader } from './components/loader/IntroLoader';
import { FlashOverlay } from './components/loader/FlashOverlay';
import { DisplacementSphere } from './components/background/DisplacementSphere';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Navbar } from './components/layout/Navbar';
import { HeroIntro } from './components/home/HeroIntro';
import { useTheme } from './context/ThemeContext';
import {
  ProjectsSection,
  DetailsSection,
  ArticlesSection,
  ContactSection,
} from './components/sections/PlaceholderSections';

export const App: React.FC = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowBg(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Smooth Section-by-Section Wheel Scroll Controller
  useEffect(() => {
    if (loading || !showBg) return;

    let isScrolling = false;
    const sectionIds = ['intro', 'projects', 'details', 'articles', 'contact'];

    const handleWheel = (e: WheelEvent) => {
      // Disable on mobile/small screens or while actively snapping
      if (window.innerWidth <= 696 || Math.abs(e.deltaY) < 15) return;
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScroll = window.scrollY;

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      const currentIndex = sections.findIndex((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        return currentScroll >= top - height / 3 && currentScroll < top + height - height / 3;
      });

      if (currentIndex !== -1) {
        const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
        if (nextIndex !== currentIndex) {
          e.preventDefault();
          isScrolling = true;
          sections[nextIndex].scrollIntoView({ behavior: 'smooth' });

          setTimeout(() => {
            isScrolling = false;
          }, 900);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [loading, showBg]);

  return (
    <>
      {loading ? (
        <IntroLoader onFinishLoading={() => setLoading(false)} />
      ) : (
        <>
          <FlashOverlay key={theme} />
          <ThemeToggle />
          <Navbar />
        </>
      )}

      <div
        id="intro"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)',
          position: 'relative',
          transition: 'background-color 0.4s ease, color 0.4s ease',
        }}
      >
        {/* 3D WebGL Displacement Sphere Background ("flower") */}
        <DisplacementSphere isVisible={showBg} />

        {/* Hero Section */}
        {showBg && (
          <>
            <HeroIntro />
            <ProjectsSection />
            <DetailsSection />
            <ArticlesSection />
            <ContactSection />
          </>
        )}
      </div>
    </>
  );
};

export default App;
