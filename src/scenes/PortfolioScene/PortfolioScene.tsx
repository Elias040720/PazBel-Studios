import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { openWhatsApp } = useWhatsApp();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.portfolio-chapter-card');

        cards.forEach((card, index) => {
          if (index < cards.length - 1) {
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.4,
              transformOrigin: 'top center',
              scrollTrigger: {
                trigger: card,
                start: 'top 120px',
                end: 'bottom top',
                scrub: true,
              },
            });
          }
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="proyectos"
      ref={containerRef}
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#07090e',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 04 / IDEAS QUE TOMAN FORMA
        </span>
        <h2>
          Distintos retos. <em>La misma obsesión por el detalle.</em>
        </h2>
        <p style={{ maxWidth: '600px', marginTop: '16px', fontSize: '16px' }}>
          Diseño editorial por fuera, ingeniería robusta por dentro. Cada proyecto es una solución a medida desarrollada con estándares modernos de software.
        </p>
      </div>

      {/* Chapters list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {projectsData.map((project, index) => (
          <article
            key={project.id}
            className="double-bezel portfolio-chapter-card"
            style={{
              position: 'sticky',
              top: `${110 + index * 20}px`,
              zIndex: index + 1,
            }}
          >
            <div
              className="double-bezel-inner"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                overflow: 'hidden',
                backgroundColor: '#10141f',
              }}
            >
              {/* Left Column: Conceptual High-Fidelity UI Mockup */}
              <div
                style={{
                  padding: 'clamp(28px, 4vw, 48px)',
                  backgroundColor: project.colorTheme.bgPreview,
                  borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  minHeight: '440px',
                }}
              >
                {/* Mockup Window Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '12px',
                    marginBottom: '24px',
                    fontSize: '11px',
                    color: '#a6adbd',
                  }}
                >
                  <span style={{ letterSpacing: '2px' }}>● ● ●</span>
                  <span style={{ fontWeight: 600, letterSpacing: '0.08em' }}>
                    {project.name} · VISTA PREVIA
                  </span>
                  <span style={{ color: project.colorTheme.accent }}>PROYECTO 0{index + 1}</span>
                </div>

                {/* Specific UI Mockup according to project */}
                {project.id === 'mova' && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span style={{ fontWeight: 700, fontSize: '18px', color: '#c4dcbe' }}>mova</span>
                      <span style={{ fontSize: '11px', color: '#8f9fa4' }}>DOCENTES · CLASES · PROGRESO</span>
                    </div>
                    <h4 style={{ fontSize: '24px', color: '#f6f7fb', marginBottom: '14px' }}>
                      Aprender nos acerca.<br />Un mundo de posibilidades a una clase.
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '18px' }}>
                      <div style={{ padding: '12px', background: 'rgba(100, 124, 88, 0.15)', borderRadius: '8px', fontSize: '12px', color: '#c4dcbe' }}>
                        Docentes verificados ✓
                      </div>
                      <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '12px', color: '#d5d7e0' }}>
                        Clases particulares 1 a 1
                      </div>
                    </div>
                  </div>
                )}

                {project.id === 'chambi' && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span style={{ fontWeight: 700, fontSize: '18px', color: '#f37251' }}>CHAMBI MOTORS</span>
                      <span style={{ fontSize: '11px', color: '#8f9fa4' }}>TALLER · SERVICIOS · VENTA</span>
                    </div>
                    <h4 style={{ fontSize: '24px', color: '#f6f7fb', marginBottom: '14px' }}>
                      Tu próximo camino empieza aquí con absoluta garantía.
                    </h4>
                    {/* Stylized Automotive Graphic */}
                    <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(243, 114, 81, 0.12)', borderRadius: '8px', fontSize: '12px', color: '#ff9a80' }}>
                      ⚡ Diagnóstico electrónico & cotización de repuestos al instante
                    </div>
                  </div>
                )}

                {project.id === 'carwash' && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span style={{ fontWeight: 700, fontSize: '18px', color: '#00dfff' }}>CARWASHALITA</span>
                      <span style={{ fontSize: '11px', color: '#8f9fa4' }}>PANEL OPERATIVO</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', margin: '18px 0' }}>
                      <div style={{ padding: '10px', background: 'rgba(0, 223, 255, 0.12)', borderRadius: '6px', textAlign: 'center', fontSize: '11px', color: '#00dfff' }}>
                        <b>01</b> Recepción
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', textAlign: 'center', fontSize: '11px', color: '#f6f7fb' }}>
                        <b>02</b> Bahía
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', textAlign: 'center', fontSize: '11px', color: '#f6f7fb' }}>
                        <b>03</b> Entrega
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#737b8e' }}>
                      Control de bahías de lavado, comisiones de personal y facturación electrónica.
                    </p>
                  </div>
                )}

                {/* Conceptual label tag */}
                <div
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    color: '#737b8e',
                    marginTop: '24px',
                  }}
                >
                  INTERFAZ CONCEPTUAL · DEMOSTRACIÓN SIN GENERACIÓN POR IA
                </div>
              </div>

              {/* Right Column: Project Details, Architecture & CTA */}
              <div
                style={{
                  padding: 'clamp(28px, 4vw, 48px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    className="eyebrow"
                    style={{ color: 'var(--color-cyan)', marginBottom: '12px', display: 'block' }}
                  >
                    0{index + 1} / {project.category}
                  </span>

                  <h3 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', marginBottom: '10px' }}>
                    {project.name}
                  </h3>

                  <h4
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-cyan)',
                      fontWeight: 500,
                      marginBottom: '16px',
                    }}
                  >
                    {project.headline}
                  </h4>

                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#a6adbd', marginBottom: '24px' }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ marginBottom: '24px' }}>
                    <span className="eyebrow" style={{ fontSize: '10px', color: '#737b8e', display: 'block', marginBottom: '8px' }}>
                      CAPACIDADES CLAVE
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {project.highlights.map((h, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#d5d7e0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'var(--color-cyan)', fontSize: '11px' }}>—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div style={{ marginBottom: '24px' }}>
                    <span className="eyebrow" style={{ fontSize: '10px', color: '#737b8e', display: 'block', marginBottom: '8px' }}>
                      STACK TECNOLÓGICO REAL
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#d5d7e0',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Status Tag */}
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#737b8e',
                      borderLeft: '2px solid var(--color-violet)',
                      paddingLeft: '10px',
                      marginBottom: '32px',
                    }}
                  >
                    {project.status}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => openWhatsApp(project.whatsappMessage)}
                >
                  {project.ctaText}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
