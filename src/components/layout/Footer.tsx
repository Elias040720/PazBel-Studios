import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { openWhatsApp } = useWhatsApp();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#07090e',
        padding: '80px max(6vw, 24px) 40px',
        color: '#a6adbd',
        fontSize: '13px',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '50px',
          marginBottom: '60px',
        }}
      >
        {/* Brand statement */}
        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '22px',
                color: '#f6f7fb',
                letterSpacing: '-0.02em',
              }}
            >
              PAZBEL <small style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-cyan)' }}>STUDIOS</small>
            </span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#737b8e' }}>
            Estudio de diseño e ingeniería digital fundado por Elías y Abel desde Perú. Creamos experiencias web que se recuerdan y software que simplifica operaciones.
          </p>
        </div>

        {/* Navigation links */}
        <div>
          <span
            className="eyebrow"
            style={{ display: 'block', color: '#f6f7fb', marginBottom: '18px' }}
          >
            Explorar
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {siteConfig.navigation.slice(0, 6).map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  style={{
                    color: '#a6adbd',
                    transition: 'color var(--duration-instant) var(--ease-out)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00dfff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#a6adbd')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Contact */}
        <div>
          <span
            className="eyebrow"
            style={{ display: 'block', color: '#f6f7fb', marginBottom: '18px' }}
          >
            Conversación Directa
          </span>
          <p style={{ marginBottom: '12px', fontSize: '13px' }}>
            Atención personalizada de lunes a sábado:
          </p>
          <button
            onClick={() =>
              openWhatsApp(
                'Hola, equipo de PazBel Studios. Quiero conversar sobre un nuevo proyecto web para mi negocio.'
              )
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(0, 223, 255, 0.3)',
              backgroundColor: 'rgba(0, 223, 255, 0.08)',
              color: 'var(--color-cyan)',
              fontSize: '12px',
              fontWeight: 500,
            }}
            className="interactive-tap"
          >
            WhatsApp: {siteConfig.officialPhoneFormatted} ↗
          </button>
        </div>

        {/* Commercial notice */}
        <div>
          <span
            className="eyebrow"
            style={{ display: 'block', color: '#f6f7fb', marginBottom: '18px' }}
          >
            Condiciones Comerciales
          </span>
          <p style={{ fontSize: '11px', lineHeight: 1.6, color: '#737b8e' }}>
            {siteConfig.commercial.exclusions}
          </p>
          <p style={{ fontSize: '11px', lineHeight: 1.6, color: '#737b8e', marginTop: '8px' }}>
            {siteConfig.commercial.tax}
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '11px',
          color: '#737b8e',
        }}
      >
        <span>
          © {currentYear} PazBel Studios. Diseñamos. Desarrollamos. Impulsamos.
        </span>
        <a
          href="#inicio"
          style={{ color: '#a6adbd' }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
};
