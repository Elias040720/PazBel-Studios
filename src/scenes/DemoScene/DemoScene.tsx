import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const DemoScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'restaurante' | 'taller' | 'moda' | 'profesional'>('restaurante');
  const { openWhatsApp } = useWhatsApp();

  const industries = {
    restaurante: {
      label: 'Restaurante & Gastronomía',
      brand: 'mesa & origen',
      nav: 'LA CARTA · NUESTRA COCINA · RESERVAS',
      title: 'El gusto de volver a la buena mesa.',
      text: 'Ingredientes peruanos con historia, preparaciones con calma y un espacio creado para compartir momentos únicos.',
      cta: 'Descubre nuestra carta y reserva',
      accentColor: '#b79165',
      bgColor: '#1c1b18',
      foot: 'COCINA DE TEMPORADA / HECHA CON CALMA',
      whatsappContext: 'Restaurante o Gastronomía',
    },
    taller: {
      label: 'Taller & Repuestos',
      brand: 'MOTOR / STUDIO',
      nav: 'MANTENIMIENTO · DIAGNÓSTICO · CITAS',
      title: 'Tu camino en las manos más expertas.',
      text: 'Mantenimiento preventivo, escaneo computarizado y repuestos garantizados con transparencia y rapidez.',
      cta: 'Agenda tu diagnóstico vehicular',
      accentColor: '#f37251',
      bgColor: '#1a1817',
      foot: 'PRECISIÓN MECÁNICA / ATENCIÓN GARANTIZADA',
      whatsappContext: 'Taller automotriz o Servicios técnicos',
    },
    moda: {
      label: 'Tienda de Ropa & Retail',
      brand: 'FORMA STUDIO',
      nav: 'NUEVA COLECCIÓN · ESENCIALES · LOOKBOOK',
      title: 'Viste la identidad de quien realmente eres.',
      text: 'Prendas con diseño atemporal, telas seleccionadas y confección de autor para elevar tu estilo cotidiano.',
      cta: 'Explorar la nueva colección',
      accentColor: '#c886dd',
      bgColor: '#1b1622',
      foot: 'EDICIÓN LIMITADA / ENVÍOS A TODO EL PERÚ',
      whatsappContext: 'Tienda de ropa o Marca de moda',
    },
    profesional: {
      label: 'Servicios Profesionales & Consultoría',
      brand: 'NEXO ASOCIADOS',
      nav: 'ÁREAS DE PRÁCTICA · EQUIPO · CONTACTO',
      title: 'Claridad estratégica para dar el próximo paso.',
      text: 'Asesoría jurídica, contable y corporativa enfocada en proteger el patrimonio y acelerar el crecimiento de tu empresa.',
      cta: 'Coordina una sesión diagnóstica',
      accentColor: '#00dfff',
      bgColor: '#0f1724',
      foot: 'RIGOR LEGAL / VISIÓN ESTRATÉGICA',
      whatsappContext: 'Consultoría o Servicios profesionales',
    },
  };

  const current = industries[activeTab];

  return (
    <section
      id="demo"
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#0a0d14',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 05 / PRUÉBALO TÚ
        </span>
        <h2>
          Ahora imagina <em>tu negocio aquí.</em>
        </h2>
        <p style={{ maxWidth: '580px', marginTop: '16px', fontSize: '16px' }}>
          Una misma solución no le queda a todos. Cambia de rubro para ver cómo adaptamos la dirección visual, el tono de comunicación y la llamada a la acción a tu mercado.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Tab Selectors */}
        <div>
          <span className="eyebrow" style={{ color: '#737b8e', marginBottom: '14px', display: 'block' }}>
            SELECCIONA TU INDUSTRIA
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {(Object.keys(industries) as (keyof typeof industries)[]).map((key) => {
              const ind = industries[key];
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="interactive-tap"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: `1px solid ${isSelected ? 'rgba(0, 223, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                    backgroundColor: isSelected ? 'rgba(0, 223, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#f6f7fb' : '#a6adbd',
                    fontSize: '14px',
                    fontWeight: isSelected ? 600 : 400,
                    textAlign: 'left',
                    transition: 'all var(--duration-snappy) var(--ease-out)',
                  }}
                >
                  <span>{ind.label}</span>
                  <span style={{ color: isSelected ? 'var(--color-cyan)' : '#737b8e' }}>
                    {isSelected ? '● Activo' : '○'}
                  </span>
                </button>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() =>
              openWhatsApp(
                `Hola, PazBel Studios. Probé la demo interactiva para el rubro de ${current.whatsappContext}. Quiero cotizar una web personalizada para mi negocio.`
              )
            }
          >
            Quiero una web para mi negocio ↗
          </Button>

          <p style={{ fontSize: '11px', color: '#737b8e', marginTop: '16px' }}>
            Demostración conceptual interactiva. Marcas ficticias diseñadas para ilustrar flexibilidad tipográfica.
          </p>
        </div>

        {/* Right Column: Dynamic Live Preview Window */}
        <div className="double-bezel">
          <div
            className="double-bezel-inner"
            style={{
              padding: '36px 30px',
              backgroundColor: current.bgColor,
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background-color var(--duration-normal) var(--ease-out)',
            }}
          >
            <div>
              {/* Window Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '14px',
                  marginBottom: '28px',
                  fontSize: '11px',
                  color: '#a6adbd',
                }}
              >
                <span style={{ letterSpacing: '2px' }}>● ● ●</span>
                <span style={{ fontWeight: 600, color: current.accentColor }}>{current.brand}</span>
                <span style={{ fontSize: '10px' }}>{current.nav}</span>
              </div>

              {/* Title & Body */}
              <h3
                style={{
                  fontSize: 'clamp(28px, 3.2vw, 38px)',
                  marginBottom: '16px',
                  color: '#f6f7fb',
                }}
              >
                {current.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#d5d7e0',
                  marginBottom: '28px',
                }}
              >
                {current.text}
              </p>
            </div>

            {/* Simulated CTA & Footer */}
            <div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  backgroundColor: current.accentColor,
                  color: '#07090e',
                  fontWeight: 600,
                  fontSize: '12px',
                  marginBottom: '24px',
                }}
              >
                {current.cta} ↗
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '12px',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: '#737b8e',
                }}
              >
                {current.foot}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
