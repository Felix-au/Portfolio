import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  projectCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, projectCount }) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        background: 'rgba(10, 10, 15, 0.75)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00e5ff 0%, #7c4dff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
          }}
        >
          <Sparkles size={20} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            Unified Portfolio Hub
          </h1>
          <span style={{ fontSize: '0.75rem', color: '#8e8ea8' }}>
            Integrated `bg` + `loading` projects ({projectCount} active modules)
          </span>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            background: activeTab === 'all' ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
            color: activeTab === 'all' ? '#00e5ff' : '#a0a0b8',
            border: activeTab === 'all' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid transparent',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
        >
          All Modules
        </button>

        <button
          onClick={() => setActiveTab('loading-project')}
          style={{
            background: activeTab === 'loading-project' ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
            color: activeTab === 'loading-project' ? '#00e5ff' : '#a0a0b8',
            border: activeTab === 'loading-project' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid transparent',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
        >
          `loading` Features
        </button>

        <button
          onClick={() => setActiveTab('bg-project')}
          style={{
            background: activeTab === 'bg-project' ? 'rgba(124, 77, 255, 0.15)' : 'transparent',
            color: activeTab === 'bg-project' ? '#b388ff' : '#a0a0b8',
            border: activeTab === 'bg-project' ? '1px solid rgba(124, 77, 255, 0.3)' : '1px solid transparent',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
        >
          `bg` 3D Features
        </button>
      </nav>
    </header>
  );
};
