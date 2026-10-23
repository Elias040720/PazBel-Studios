import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { servicesData } from '../../data/services';

export const ServicesScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.service-bento-card', {
          y: 35,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="servicios"
      ref={containerRef}
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#07090e',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 02 / LO QUE PODEMOS CONSTRUIR
        </span>
        <h2>
          La idea es tuya. <em>Hacerla posible, lo nuestro.</em>
        </h2>
        <p style={{ maxWidth: '580px', marginTop: '16px', fontSize: '16px' }}>
          Empieza con lo que tu negocio necesita hoy. Crece e integra nuevas funciones cuando la operación lo pida, sin rehacer el sistema desde cero.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '20px',
        }}
      >
        {servicesData.map((svc) => (
          <div
            key={svc.id}
            className={`double-bezel service-bento-card ${svc.wide ? 'service-wide' : ''}`}
            style={{
              gridColumn: svc.wide ? 'span 2' : 'span 1',
            }}
          >
            <div
              className="double-bezel-inner"
              style={{
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <span className="badge-meta" style={{ color: 'var(--color-cyan)' }}>
                    {svc.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#737b8e',
                    }}
                  >
                    {svc.number}
                  </span>
                </div>

                <h3 style={{ fontSize: '26px', marginBottom: '14px', letterSpacing: '-0.03em' }}>
                  {svc.title}
                </h3>

                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#a6adbd', marginBottom: '24px' }}>
                  {svc.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {svc.features.map((feat, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '12px',
                        color: '#737b8e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span style={{ color: 'var(--color-cyan)', fontSize: '10px' }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={svc.targetHref}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(svc.targetHref)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-cyan)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginTop: 'auto',
                }}
              >
                <span>{svc.ctaText}</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-wide { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
};
