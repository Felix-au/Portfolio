import React from 'react';
import { PlusCircle } from 'lucide-react';

export const FutureProjectTemplate: React.FC = () => {
  return (
    <div
      style={{
        margin: '3rem 0',
        padding: '2rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(124, 77, 255, 0.05) 100%)',
        border: '1px dashed rgba(0, 229, 255, 0.3)',
      }}
    >
      <span
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          fontSize: '0.8rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          display: 'inline-block',
          marginBottom: '1rem',
        }}
      >
        Architecture Ready for Future Projects
      </span>

      <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle color="#00e5ff" size={28} /> Adding Future External Projects
      </h3>

      <p style={{ color: '#a0a0b8', lineHeight: 1.6 }}>
        Whenever a new project is introduced in the future, follow these 3 steps to integrate its elements seamlessly:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: '#00e5ff', fontWeight: 'bold', marginBottom: '0.5rem' }}>Step 1</div>
          <p style={{ color: '#e0e0f0', fontSize: '0.9rem' }}>
            Add your new project component inside <code>src/modules/project-name/</code>.
          </p>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: '#7c4dff', fontWeight: 'bold', marginBottom: '0.5rem' }}>Step 2</div>
          <p style={{ color: '#e0e0f0', fontSize: '0.9rem' }}>
            Register it in <code>src/modules/registry.ts</code> with a single line object definition.
          </p>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: '#ff4081', fontWeight: 'bold', marginBottom: '0.5rem' }}>Step 3</div>
          <p style={{ color: '#e0e0f0', fontSize: '0.9rem' }}>
            The UI, navigation, shaders, and animations will render the new project automatically!
          </p>
        </div>
      </div>
    </div>
  );
};
