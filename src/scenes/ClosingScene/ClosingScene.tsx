import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { siteConfig } from '../../data/siteConfig';

export const ClosingScene: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section
      id="contacto"
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#07090e',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 'clamp(100px, 16vh, 180px)',
      }}
    >
      {/* Background ambient chromatic glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 800px)',
          height: 'min(90vw, 800px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139, 77, 255, 0.12) 0%, rgba(0, 223, 255, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        className="double-bezel"
        style={{
          position: 'relative',
          zIndex: 1,
          borderColor: 'rgba(0, 223, 255, 0.25)',
          background: 'linear-gradient(145deg, rgba(19, 24, 38, 0.95) 0%, rgba(13, 17, 26, 0.98) 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 223, 255, 0.08)',
        }}
      >
        <div
          className="double-bezel-inner"
          style={{
            padding: 'clamp(40px, 7vw, 90px) clamp(24px, 5vw, 60px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'transparent',
          }}
        >
          {/* Top Live Badge */}
          <div style={{ marginBottom: '28px' }}>
            <Badge variant="cyan" liveDot>
              LISTOS PARA CONVERSAR SOBRE TU PROYECTO
            </Badge>
          </div>

          {/* Monumental Headline */}
          <h2
            style={{
              maxWidth: '920px',
              marginBottom: '24px',
              fontSize: 'clamp(36px, 5.2vw, 76px)',
              lineHeight: 1.04,
            }}
          >
            Hagamos que tu negocio tenga la web que <em>siempre mereció.</em>
          </h2>

          <p
            style={{
              maxWidth: '640px',
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: 1.6,
              color: '#d5d7e0',
              marginBottom: '40px',
            }}
          >
            Del primer boceto al despliegue en producción. Escríbenos directamente por WhatsApp y cuéntanos qué tienes en mente. Te respondemos con un plan claro y un presupuesto honesto.
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                openWhatsApp(
                  'Hola, equipo de PazBel Studios. Quiero conversar sobre el desarrollo de una web para mi negocio.'
                )
              }
            >
              Iniciar conversación en WhatsApp
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('cotizador');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Armar presupuesto primero
            </Button>
          </div>

          {/* Micro assurances bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              width: '100%',
              maxWidth: '820px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '32px',
              fontSize: '12px',
              color: '#a6adbd',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-cyan)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Atención directa
              </span>
              <span>Hablas directamente con Elías y Abel</span>
            </div>

            <div>
              <span style={{ color: 'var(--color-violet)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Presupuesto transparente
              </span>
              <span>Sin costos ocultos ni letras pequeñas</span>
            </div>

            <div>
              <span style={{ color: 'var(--color-coral)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                WhatsApp oficial
              </span>
              <span>{siteConfig.officialPhoneFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
