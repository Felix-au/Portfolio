import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import VectorSvg from '../../assets/Vector.svg';

interface IntroLoaderProps {
  onFinishLoading: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onFinishLoading }) => {
  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const timeline = createTimeline({
      onComplete: () => onFinishLoading(),
    });

    timeline
      .add(logoRef.current, {
        scale: [0.5, 1.8],
        rotate: [0, 360],
        opacity: [0, 1],
        duration: 1200,
        ease: 'outExpo',
      })
      .add(logoRef.current, {
        scale: 0.1,
        opacity: 0,
        duration: 500,
        ease: 'outQuart',
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
        zIndex: 9999,
      }}
    >
      <img
        ref={logoRef}
        src={VectorSvg}
        alt="Loading vector logo"
        style={{
          width: 140,
          height: 140,
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.85))',
        }}
      />
    </div>
  );
};
