import React, { useState } from 'react';
import { LogoSvg } from '../icons/LogoSvg';
import { LogoLightSvg } from '../icons/LogoLightSvg';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Details', href: '#details' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [activeHash, setActiveHash] = useState('#intro');
  const [menuOpen, setMenuOpen] = useState(false);

  const SelectedLogo = theme === 'light' ? LogoLightSvg : LogoSvg;

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.navbar}>
      {/* Top Logo SVG using existing vector SVGs */}
      <a
        href="#intro"
        className={styles.logo}
        aria-label="Home"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('#intro');
        }}
      >
        <SelectedLogo style={{ width: 32, height: 32 }} />
      </a>

      {/* Mobile Hamburger Toggle Button */}
      <button
        className={styles.navToggle}
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          {menuOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          )}
        </svg>
      </button>

      {/* Main Vertical Sidebar Nav */}
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={styles.navLink}
              aria-current={activeHash === href ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(href);
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Bottom Social Icon Links */}
        <div className={styles.navIcons}>
          <a
            className={styles.navIconLink}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5a10.03 10.03 0 0 0 3.9-16.57A10 10 0 0 0 12 2Z" />
            </svg>
          </a>

          <a
            className={styles.navIconLink}
            href="https://figma.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Figma"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M15 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2 5.46A4 4 0 0 0 17.65 9a4.01 4.01 0 0 0 .18-5.83A4 4 0 0 0 15 2H9a4 4 0 0 0-2.65 7 4.01 4.01 0 0 0 0 6A3.98 3.98 0 0 0 5 18a4 4 0 1 0 8 0v-2.54ZM11 16H9a2 2 0 1 0 2 2v-2ZM9 8h2V4H9a2 2 0 1 0 0 4Zm0 2a2 2 0 1 0 0 4h2v-4H9Zm4-2V4h2a2 2 0 0 1 0 4h-2Z" />
            </svg>
          </a>

          <a
            className={styles.navIconLink}
            href="https://bsky.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M6.34 3.78C8.63 5.51 11.09 9.01 12 10.9v4.96c0-.1-.04.02-.13.27-.47 1.4-2.32 6.83-6.54 2.49-2.22-2.29-1.19-4.58 2.86-5.27-2.32.4-4.92-.26-5.63-2.82C2.35 9.8 2 5.25 2 4.64c0-3.07 2.68-2.1 4.34-.86Zm11.32 0C15.37 5.51 12.91 9.01 12 10.9v4.96c0-.1.04.02.13.27.47 1.4 2.32 6.83 6.54 2.49 2.22-2.29-1.19-4.58-2.86-5.27 2.32.4 4.92-.26 5.63-2.82.21-.73.56-5.27.56-5.88 0-3.07-2.68-2.1-4.34-.86Z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile Menu Backdrop Overlay */}
      <nav className={styles.mobileNav} data-visible={menuOpen}>
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={styles.mobileNavLink}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(href);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
};
