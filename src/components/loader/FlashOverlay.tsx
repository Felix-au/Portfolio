import React from 'react';
import styled, { keyframes } from 'styled-components';
import GradientVideo from '../../assets/GradientBackground.mp4';

const fadeout = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.6;
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
  animation: ${fadeout} 2.5s linear forwards;
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
