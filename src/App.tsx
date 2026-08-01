import React, { useState } from 'react';
import { IntroLoader } from './components/loader/IntroLoader';
import { DisplacementSphere } from './components/background/DisplacementSphere';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { activeProjects } from './modules/registry';
import { DecoderText } from './components/ui/DecoderText';
import { Layers, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all'
    ? activeProjects
    : activeProjects.filter((p) => p.id === activeTab);

  return (
    <>
      {loading && <IntroLoader onFinishLoading={() => setLoading(false)} />}

      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: '#fff', position: 'relative' }}>
        {/* 3D WebGL Displacement Sphere Background from bg project */}
        <DisplacementSphere />

        {/* Foreground Content Container */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} projectCount={activeProjects.length} />

          <main style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '3rem 1.5rem', flex: 1 }}>
            {/* Hero Banner Section */}
            <section
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
            </section>

            {/* Active Modules Listing */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers color="#00e5ff" size={22} /> Active Project Modules
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#8e8ea8' }}>
                  Showing {filteredProjects.length} of {activeProjects.length} modules
                </span>
              </div>

              {filteredProjects.map((project) => {
                const ModuleComponent = project.component;
                return (
                  <div
                    key={project.id}
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
                  </div>
                );
              })}
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
