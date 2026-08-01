import React, { useState, useEffect } from 'react';
import { IntroLoader } from './components/loader/IntroLoader';
import { FlashOverlay } from './components/loader/FlashOverlay';
import { DisplacementSphere } from './components/background/DisplacementSphere';
import { ThemeToggle } from './components/ui/ThemeToggle';
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
      </div>
    </>
  );
};

export default App;
