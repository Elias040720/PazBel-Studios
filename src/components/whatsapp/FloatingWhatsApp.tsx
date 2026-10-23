import React from 'react';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <button
      onClick={() =>
        openWhatsApp('Hola, equipo de PazBel Studios. ¿Podemos conversar sobre mi proyecto?')
      }
      aria-label="Contactar a PazBel Studios por WhatsApp"
      className="interactive-tap"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 18px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: '#0d111a',
        border: '1px solid rgba(0, 223, 255, 0.4)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 223, 255, 0.2)',
        color: '#f6f7fb',
        fontSize: '12px',
        fontWeight: 500,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          display: 'grid',
          placeItems: 'center',
          color: '#00dfff',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
      <span className="floating-text">¿Conversamos sobre tu idea?</span>

      <style>{`
        @media (max-width: 640px) {
          .floating-text { display: none !important; }
        }
      `}</style>
    </button>
  );
};
