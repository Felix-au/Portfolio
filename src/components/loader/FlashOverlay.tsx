import React from 'react';
import styled, { keyframes } from 'styled-components';
import GradientVideo from '../../assets/GradientBackground.mp4';
import { useTheme } from '../../context/ThemeContext';

const subtleFadeout = keyframes`
  0% {
    opacity: 0.45;
  }
  40% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.15;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const VideoContainer = styled.video<{ $isLight: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 9998;
  user-select: none;
  pointer-events: none;
  mix-blend-mode: ${(props) => (props.$isLight ? 'multiply' : 'screen')};
  animation: ${subtleFadeout} 1.6s ease-out forwards;
`;

export const FlashOverlay: React.FC = () => {
  const { theme } = useTheme();

  return (
    <VideoContainer
      autoPlay
      playsInline
      muted
      loop={false}
      $isLight={theme === 'light'}
    >
      <source src={GradientVideo} type="video/mp4" />
    </VideoContainer>
  );
};
