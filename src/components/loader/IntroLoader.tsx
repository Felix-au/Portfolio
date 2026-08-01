import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import { LogoSvg } from '../icons/LogoSvg';
import { useTheme } from '../../context/ThemeContext';

interface IntroLoaderProps {
  onFinishLoading: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onFinishLoading }) => {
  const { theme } = useTheme();
  const logoRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const timeline = createTimeline({
      onComplete: () => onFinishLoading(),
    });

    timeline
      .add(logoRef.current, {
        scale: 3.0,
        duration: 1400,
        ease: 'inOutQuad',
      })
      .add(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 450,
        ease: 'inOutQuart',
      });
  }, [onFinishLoading]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: theme === 'dark' ? '#0a0a0f' : '#f4f4f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        transition: 'background-color 0.3s ease',
      }}
    >
      <LogoSvg
        ref={logoRef}
        style={{
          width: 90,
          height: 90,
          filter:
            theme === 'dark'
              ? 'drop-shadow(0 0 25px rgba(0, 229, 255, 0.85))'
              : 'drop-shadow(0 0 25px rgba(0, 119, 182, 0.65))',
        }}
      />
    </div>
  );
};
