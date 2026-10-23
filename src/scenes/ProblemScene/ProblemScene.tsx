import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProblemScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.problem-card', {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
          },
        });
      });
    },
    { scope: containerRef }
  );

  const points = [
    {
      num: '01',
      from: 'De depender únicamente de redes sociales y algoritmos cambiantes',
      to: 'a tener tu propio espacio digital donde tú controlas la experiencia y tu marca destaca.',
      accent: 'var(--color-cyan)',
    },
    {
      num: '02',
      from: 'De una página web estática o genérica que no transmite tu calidad real',
      to: 'a una presencia impecable que genera confianza inmediata y convence al cliente antes de hablar.',
      accent: 'var(--color-violet)',
    },
    {
      num: '03',
      from: 'De tareas manuales desordenadas en WhatsApp y hojas de cálculo',
      to: 'a sistemas web y herramientas conectadas que ordenan tu operación y te ahorran horas cada semana.',
      accent: 'var(--color-coral)',
    },
  ];

  return (
    <section
      id="enfoque"
      ref={containerRef}
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#0a0d14',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 01 / EL PUNTO DE PARTIDA
        </span>
        <h2>
          Estar en internet no es lo mismo que <em>destacar.</em>
        </h2>
        <p style={{ maxWidth: '580px', marginTop: '16px', fontSize: '16px' }}>
          La mayoría de empresas ya tienen un perfil en redes o una web básica. Pero muy pocas logran que un cliente potencial se detenga, confíe y decida comprar.
        </p>
      </div>

      <div
        ref={itemsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '24px',
        }}
      >
        {points.map((p) => (
          <div key={p.num} className="double-bezel problem-card">
            <div
              className="double-bezel-inner"
              style={{
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: p.accent,
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {p.num}
                </span>
                <p style={{ fontSize: '14px', color: '#8f97aa', lineHeight: 1.5, marginBottom: '16px' }}>
                  {p.from}
                </p>
              </div>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#f6f7fb',
                  lineHeight: 1.5,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '16px',
                }}
              >
                {p.to}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
