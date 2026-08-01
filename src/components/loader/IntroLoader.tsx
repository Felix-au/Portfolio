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
        scale: 4.8,
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
      <img
        ref={logoRef}
        src={VectorSvg}
        alt="Loading logo"
        style={{
          width: 60,
          height: 90,
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
