import React, { useState, useEffect } from 'react';
import { IntroLoader } from './components/loader/IntroLoader';
import { FlashOverlay } from './components/loader/FlashOverlay';
import { DisplacementSphere } from './components/background/DisplacementSphere';

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
        <FlashOverlay />
      )}

      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* 3D WebGL Displacement Sphere Background ("flower") */}
        <DisplacementSphere isVisible={showBg} />
      </div>
    </>
  );
};

export default App;
