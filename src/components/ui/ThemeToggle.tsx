import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(16px)',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
        color: theme === 'dark' ? '#00e5ff' : '#0077b6',
        cursor: 'pointer',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0, 229, 255, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};
