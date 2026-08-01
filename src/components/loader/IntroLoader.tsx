import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import { LogoSvg } from '../icons/LogoSvg';

interface IntroLoaderProps {
  onFinishLoading: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onFinishLoading }) => {
  const logoRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const timeline = createTimeline({
      onComplete: () => onFinishLoading(),
    });

    timeline
      .add(logoRef.current, {
        scale: 2.4,
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
        backgroundColor: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
      }}
    >
      <LogoSvg
        ref={logoRef}
        style={{
          width: 75,
          height: 75,
          filter: 'drop-shadow(0 0 25px rgba(0, 229, 255, 0.85))',
        }}
      />
    </div>
  );
};
