import React from 'react';
import { motion } from 'framer-motion';
import { DecoderText } from '../../components/ui/DecoderText';
import { Box, Eye, Code2 } from 'lucide-react';

export const BgProjectModule: React.FC = () => {
  return (
    <div style={{ margin: '3rem 0' }}>
      <span
        style={{
          background: 'rgba(124, 77, 255, 0.1)',
          color: '#b388ff',
          fontSize: '0.8rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          border: '1px solid rgba(124, 77, 255, 0.2)',
          display: 'inline-block',
          marginBottom: '1rem',
        }}
      >
        Integrated from `bg` project
      </span>

      <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
        <DecoderText text="Interactive 3D Displacement & Shader Motion" delay={200} />
      </h3>
      <p style={{ color: '#a0a0b8', lineHeight: 1.6, maxWidth: '700px' }}>
        Features adapted from the <strong>bg</strong> project (`portfolio-master` by Hamish Williams), combining Three.js displacement sphere shaders, mouse parallax, and Katakana decoding typography.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}
        >
          <Box color="#7c4dff" size={28} style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Perlin Noise Shaders</h4>
          <p style={{ color: '#8e8ea8', fontSize: '0.9rem' }}>
            Custom GLSL vertex turbulence algorithm deforming 3D meshes smoothly over time.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}
        >
          <Eye color="#00e5ff" size={28} style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Parallax Mouse Spring</h4>
          <p style={{ color: '#8e8ea8', fontSize: '0.9rem' }}>
            Framer Motion spring physics tracking mouse movement to rotate WebGL camera views smoothly.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}
        >
          <Code2 color="#ff4081" size={28} style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Katakana Glyph Decoding</h4>
          <p style={{ color: '#8e8ea8', fontSize: '0.9rem' }}>
            Scrambled Japanese glyph text decoder effect revealing headers smoothly upon scroll or mount.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
