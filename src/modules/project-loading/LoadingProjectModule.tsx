import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlowImg from '../../assets/Glow.png';
import KeysImg from '../../assets/Keys.png';

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 480px;
  padding: 2.5rem;
  border-radius: 24px;
  background: rgba(13, 15, 26, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 868px) {
    flex-direction: column;
    padding: 1.75rem;
    text-align: center;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  flex: 1.2;
  max-width: 600px;
`;

const GlowBackground = styled.img`
  position: absolute;
  top: -20%;
  left: -10%;
  width: 70%;
  opacity: 0.6;
  filter: blur(50px);
  pointer-events: none;
  z-index: 1;
`;

const Subtitle = styled(motion.p)`
  color: #00e5ff;
  font-size: 1.15rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
`;

const Name = styled(motion.h2)`
  color: #ffffff;
  font-size: 3.2rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const Role = styled(motion.h3)`
  color: #8e8ea8;
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0.5rem 0 1.25rem 0;
`;

const Description = styled(motion.p)`
  color: #c0c0d8;
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1.65;
  margin: 0;

  a {
    color: #00e5ff;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 2;
  flex: 0.9;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 868px) {
    margin-top: 2rem;
    justify-content: center;
  }
`;

const KeyboardImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  max-height: 380px;
  object-fit: contain;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5));
`;

export const LoadingProjectModule: React.FC = () => {
  return (
    <HeroSection>
      <GlowBackground src={GlowImg} alt="Glow effect" />

      <ContentContainer>
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hi there, I’m
        </Subtitle>

        <Name
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Aziz Rahman
        </Name>

        <Role
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Developer + Designer
        </Role>

        <Description
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          I’m a full-stack engineer with experience in design and development of user-centered web and mobile
          applications. I am also focussing on mastering UI/UX design. Currently, I’m working on building cloud
          solutions at{' '}
          <a href="https://presidio.com/" target="_blank" rel="noopener noreferrer">
            Presidio
          </a>
          .
        </Description>
      </ContentContainer>

      <ImageContainer>
        <KeyboardImage
          src={KeysImg}
          alt="Keyboard illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </ImageContainer>
    </HeroSection>
  );
};
