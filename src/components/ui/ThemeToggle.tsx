import React, { useId } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export interface ThemeToggleProps {
  isMobile?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isMobile }) => {
  const id = useId();
  const { theme, toggleTheme } = useTheme();
  const maskId = `${id}theme-toggle-mask`;

  return (
    <button
      className="theme-toggle"
      data-mobile={isMobile}
      data-theme={theme}
      aria-label="Toggle theme"
      onClick={() => toggleTheme()}
    >
      <svg aria-hidden className="theme-toggle__svg" width="38" height="38" viewBox="0 0 38 38">
        <defs>
          <mask id={maskId}>
            <circle className="theme-toggle__circle" data-mask="true" cx="19" cy="19" r="13" />
            <circle className="theme-toggle__mask" cx="25" cy="14" r="9" />
          </mask>
        </defs>
        <path
          className="theme-toggle__path"
          d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
        />
        <circle
          className="theme-toggle__circle"
          mask={`url(#${maskId})`}
          cx="19"
          cy="19"
          r="12"
        />
      </svg>
    </button>
  );
};
