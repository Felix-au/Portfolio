import React from 'react';

interface SectionProps {
  id: string;
  title: string;
}

const PlaceholderSection: React.FC<SectionProps> = ({ id, title }) => {
  return (
    <section
      id={id}
      style={{
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <h2
        style={{
          fontSize: '3rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-light, rgba(255, 255, 255, 0.4))',
        }}
      >
        {title}
      </h2>
    </section>
  );
};

export const ProjectsSection: React.FC = () => (
  <PlaceholderSection id="projects" title="Projects" />
);

export const ResumeSection: React.FC = () => (
  <PlaceholderSection id="resume" title="Resume" />
);

export const CertificationsSection: React.FC = () => (
  <PlaceholderSection id="certifications" title="Certifications" />
);

export const ContactSection: React.FC = () => (
  <PlaceholderSection id="contact" title="Contact" />
);
