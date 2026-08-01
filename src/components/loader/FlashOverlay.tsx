import React from 'react';
import styled, { keyframes } from 'styled-components';
import GradientVideo from '../../assets/GradientBackground.mp4';

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

const VideoContainer = styled.video`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 9998;
  user-select: none;
  pointer-events: none;
  mix-blend-mode: screen;
  animation: ${subtleFadeout} 1.6s ease-out forwards;
`;

export const FlashOverlay: React.FC = () => {
  return (
    <VideoContainer
      autoPlay
      playsInline
      muted
      loop={false}
    >
      <source src={GradientVideo} type="video/mp4" />
    </VideoContainer>
  );
};
