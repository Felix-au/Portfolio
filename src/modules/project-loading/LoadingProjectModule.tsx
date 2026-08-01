import React from 'react';
import styled from 'styled-components';
import { Sparkles, Layers, Zap } from 'lucide-react';

const Card = styled.div`
  background: rgba(18, 18, 26, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(0, 229, 255, 0.4);
    box-shadow: 0 15px 35px rgba(0, 229, 255, 0.15);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const Tag = styled.span`
  background: rgba(0, 229, 255, 0.1);
  color: #00e5ff;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 229, 255, 0.2);
  display: inline-block;
  margin-bottom: 1rem;
`;

export const LoadingProjectModule: React.FC = () => {
  return (
    <div style={{ margin: '2rem 0' }}>
      <Tag>Integrated from `loading` project</Tag>
      <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
        Splash Loader & Styled Component UI
      </h3>
      <p style={{ color: '#a0a0b8', lineHeight: 1.6 }}>
        Features adapted from the <strong>loading</strong> project (`AzizStark-portfolio-v2`), including Anime.js timeline sequences and responsive Styled Component UI layouts.
      </p>

      <Grid>
        <Card>
          <Sparkles color="#00e5ff" size={32} style={{ marginBottom: '1rem' }} />
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Anime.js Keyframe Timelines
          </h4>
          <p style={{ color: '#8e8ea8', fontSize: '0.95rem' }}>
            Smooth SVG logo scaling, rotational easing, and opacity fade-outs on initial site load.
          </p>
        </Card>

        <Card>
          <Layers color="#7c4dff" size={32} style={{ marginBottom: '1rem' }} />
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Styled Components Architecture
          </h4>
          <p style={{ color: '#8e8ea8', fontSize: '0.95rem' }}>
            Theme-aware CSS-in-JS component wrappers guaranteeing scoped styles and layout flexibility.
          </p>
        </Card>

        <Card>
          <Zap color="#ff4081" size={32} style={{ marginBottom: '1rem' }} />
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Responsive Grid Containers
          </h4>
          <p style={{ color: '#8e8ea8', fontSize: '0.95rem' }}>
            Auto-fit flex and grid abstractions ensuring mobile and desktop responsiveness out of the box.
          </p>
        </Card>
      </Grid>
    </div>
  );
};
