import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem',
        textAlign: 'center',
        color: '#6e6e88',
        fontSize: '0.85rem',
        marginTop: '4rem',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <p style={{ margin: 0 }}>
        Integrated Website Framework &bull; Powered by Vite + React + Three.js Shaders + Anime.js
      </p>
    </footer>
  );
};
