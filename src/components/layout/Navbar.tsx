import React, { useState, useEffect } from 'react';
import { LogoSvg } from '../icons/LogoSvg';
import { LogoLightSvg } from '../icons/LogoLightSvg';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [activeHash, setActiveHash] = useState('#intro');
  const [menuOpen, setMenuOpen] = useState(false);

  const SelectedLogo = theme === 'light' ? LogoLightSvg : LogoSvg;

  // Active section scroll tracking
  useEffect(() => {
    const sectionIds = ['intro', 'projects', 'resume', 'certifications', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveHash(`#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.navbar}>
      {/* Top Vector Logo SVG */}
      <a
        href="#intro"
        className={styles.logo}
        aria-label="Home"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('#intro');
        }}
      >
        <SelectedLogo style={{ width: 48, height: 48 }} />
      </a>

      {/* Mobile Hamburger Toggle Button */}
      <button
        className={styles.navToggle}
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className={styles.navToggleIcon}
          viewBox="0 0 24 24"
          style={{
            transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {menuOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
          ) : (
            <path d="M22 6H2V4h20v2ZM2 13h16v-2H2v2Zm0 7h20v-2H2v2Z" />
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
          {/* GitHub */}
          <a
            className={styles.navIconLink}
            href="https://github.com/Felix-au"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5a10.03 10.03 0 0 0 3.9-16.57A10 10 0 0 0 12 2Z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            className={styles.navIconLink}
            href="https://www.linkedin.com/in/harshit-soni-781a77274/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
            </svg>
          </a>

          {/* Email */}
          <a
            className={styles.navIconLink}
            href="mailto:felixaugum@gmail.com"
            aria-label="Email"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
            aria-current={activeHash === href ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(href);
            }}
          >
            {label}
          </a>
        ))}

        {/* Mobile Overlay Bottom Socials */}
        <div className={styles.mobileSocials}>
          <a
            className={styles.navIconLink}
            href="https://github.com/Felix-au"
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
            href="https://www.linkedin.com/in/harshit-soni-781a77274/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
            </svg>
          </a>
          <a
            className={styles.navIconLink}
            href="mailto:felixaugum@gmail.com"
            aria-label="Email"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>

        {/* Mobile Bottom Right Theme Toggle */}
        <ThemeToggle isMobile />
      </nav>
    </header>
  );
};
