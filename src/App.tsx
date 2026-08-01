import React, { useState, useEffect } from 'react';
import { IntroLoader } from './components/loader/IntroLoader';
import { FlashOverlay } from './components/loader/FlashOverlay';
import { DisplacementSphere } from './components/background/DisplacementSphere';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Navbar } from './components/layout/Navbar';
import { HeroIntro } from './components/home/HeroIntro';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowBg(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <IntroLoader onFinishLoading={() => setLoading(false)} />
      ) : (
        <>
          <FlashOverlay />
          <ThemeToggle />
          <Navbar />
        </>
      )}

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.4s ease, color 0.4s ease',
        }}
      >
        {/* 3D WebGL Displacement Sphere Background ("flower") */}
        <DisplacementSphere isVisible={showBg} />

        {/* Hero Section */}
        {showBg && <HeroIntro />}
      </div>
    </>
  );
};

export default App;
