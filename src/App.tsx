import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IntroLoader } from './components/loader/IntroLoader';
import { FlashOverlay } from './components/loader/FlashOverlay';
import { DisplacementSphere } from './components/background/DisplacementSphere';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { activeProjects } from './modules/registry';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Distinct step-by-step reveal states
  const [showBg, setShowBg] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Step 1: Background & 3D WebGL Displacement Sphere appear FIRST alone
      const timer1 = setTimeout(() => setShowBg(true), 100);

      // Step 2: Header Navigation appears after 3D Background is fully established
      const timer2 = setTimeout(() => setShowHeader(true), 1200);

      // Step 3: Hero Section appears after Header
      const timer3 = setTimeout(() => setShowHero(true), 2000);

      // Step 4: Active Modules appear after Hero
      const timer4 = setTimeout(() => setShowModules(true), 2800);

      // Step 5: Footer appears last
      const timer5 = setTimeout(() => setShowFooter(true), 3600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <IntroLoader onFinishLoading={() => setLoading(false)} />
      ) : (
        <FlashOverlay />
      )}

      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: '#fff', position: 'relative' }}>
        {/* Step 1: 3D WebGL Displacement Sphere Background appears FIRST */}
        <DisplacementSphere isVisible={showBg} />

        {/* Foreground Content Container */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          {/* Step 2: Header Navigation */}
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Header />
            </motion.div>
          )}

          <main style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '6rem 1.5rem 3rem 1.5rem', flex: 1 }}>
            
            {/* Step 3: Main Hero Section (Loading project hero) */}
            {showHero && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {activeProjects[0] && React.createElement(activeProjects[0].component)}
              </motion.div>
            )}

            {/* Step 4: Active Project Modules */}
            {showModules && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ marginTop: '3rem' }}
              >
                {activeProjects.slice(1).map((project, idx) => {
                  const ModuleComponent = project.component;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.25 }}
                    >
                      <ModuleComponent />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </main>

          {/* Step 5: Footer */}
          {showFooter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Footer />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
