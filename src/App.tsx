import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IntroLoader } from './components/loader/IntroLoader';
import { FlashOverlay } from './components/loader/FlashOverlay';
import { DisplacementSphere } from './components/background/DisplacementSphere';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { activeProjects } from './modules/registry';
import { DecoderText } from './components/ui/DecoderText';
import { Layers, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Distinct step-by-step reveal states to prevent elements loading all at once
  const [showBg, setShowBg] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Step 1: Background & 3D WebGL Displacement Sphere ("flower") appear FIRST alone
      const timer1 = setTimeout(() => setShowBg(true), 100);

      // Step 2: Header Navigation appears after 3D Background is fully established
      const timer2 = setTimeout(() => setShowHeader(true), 1200);

      // Step 3: Hero Banner appears after Header
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

  const filteredProjects = activeTab === 'all'
    ? activeProjects
    : activeProjects.filter((p) => p.id === activeTab);

  return (
    <>
      {loading ? (
        <IntroLoader onFinishLoading={() => setLoading(false)} />
      ) : (
        <FlashOverlay />
      )}

      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: '#fff', position: 'relative' }}>
        {/* Step 1: 3D WebGL Displacement Sphere ("flower") Background appears FIRST */}
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
              <Header activeTab={activeTab} setActiveTab={setActiveTab} projectCount={activeProjects.length} />
            </motion.div>
          )}

          <main style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '3rem 1.5rem', flex: 1 }}>
            
            {/* Step 3: Hero Banner Section */}
            {showHero && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  marginBottom: '3rem',
                  padding: '3rem 2.5rem',
                  borderRadius: '24px',
                  background: 'rgba(18, 18, 26, 0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', padding: '0.35rem 0.85rem', borderRadius: '30px', border: '1px solid rgba(0, 229, 255, 0.2)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  <ShieldCheck size={16} /> Vite + React Unified Framework
                </div>

                <h2 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                  <DecoderText text="Integrated Multi-Project Portal" delay={100} />
                </h2>

                <p style={{ fontSize: '1.15rem', color: '#a0a0b8', maxWidth: '750px', lineHeight: 1.6, margin: 0 }}>
                  Successfully unified features from both <strong>`bg`</strong> (Three.js WebGL displacement sphere & Framer Motion physics) and <strong>`loading`</strong> (Anime.js intro splash timeline) into a scalable, high-performance web platform.
                </p>
              </motion.section>
            )}

            {/* Step 4: Active Modules Listing */}
            {showModules && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Layers color="#00e5ff" size={22} /> Active Project Modules
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#8e8ea8' }}>
                    Showing {filteredProjects.length} of {activeProjects.length} modules
                  </span>
                </div>

                {filteredProjects.map((project, idx) => {
                  const ModuleComponent = project.component;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.25 }}
                      style={{
                        marginBottom: '2rem',
                        padding: '2rem',
                        borderRadius: '20px',
                        background: 'rgba(18, 18, 26, 0.55)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                            {project.sourceOrigin}
                          </span>
                          <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.25rem 0' }}>
                            {project.title}
                          </h4>
                        </div>

                        <span
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#e0e0f0',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {project.badge}
                        </span>
                      </div>

                      <ModuleComponent />
                    </motion.div>
                  );
                })}
              </motion.section>
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
