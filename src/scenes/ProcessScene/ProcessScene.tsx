import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProcessScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      step: '01',
      title: 'DISEÑAMOS',
      tagline: 'Que tu marca se vea como merece.',
      description:
        'Definimos una dirección visual propia, arquitectura de información y microinteracciones de autor. La interfaz cobra forma con tipografía monumental, paleta cromática calibrada y ritmo espacial.',
      badgeText: 'FASE VISUAL & WIREFRAMES',
      visualElements: ['Tipografía Archivo + Instrument Serif', 'Bisel Doble & Ergonomía Móvil', 'Paleta Cromática Monograma PB'],
    },
    {
      step: '02',
      title: 'DESARROLLAMOS',
      tagline: 'Lo que ves importa. Lo que funciona, también.',
      description:
        'Construimos sobre bases sólidas: React 19, TypeScript, animaciones GSAP sin saltos y Three.js optimizado. Conectamos catálogos, pasarelas de pago y sistemas de reservas según la necesidad de tu negocio.',
      badgeText: 'FASE INGENIERÍA & INTEGRACIONES',
      visualElements: ['APIs RESTful & Base de Datos', 'Optimización 60fps & WebGL', 'Filtros Dinámicos & Catálogo'],
    },
    {
      step: '03',
      title: 'IMPULSAMOS',
      tagline: 'El lanzamiento es solo el comienzo.',
      description:
        'Acompañamos tu proyecto tras el lanzamiento con planes opcionales de mantenimiento, infraestructura cloud veloz y campañas en Meta y Google para convertir visitas en consultas recurrentes por WhatsApp.',
      badgeText: 'FASE CRECIMIENTO & CAPTACIÓN',
      visualElements: ['Conversión Directa a WhatsApp', 'Campañas Meta Ads & Google Ads', 'Soporte Continuo & Hosting SSL'],
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        stages.forEach((_, index) => {
          ScrollTrigger.create({
            trigger: `.process-trigger-${index}`,
            start: 'top 60%',
            end: 'bottom 60%',
            onEnter: () => setActiveStage(index),
            onEnterBack: () => setActiveStage(index),
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="proceso"
      ref={containerRef}
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#0a0d14',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 03 / NUESTRO PROCESO
        </span>
        <h2>
          No solo hacemos páginas. <em>Construimos lo que viene después.</em>
        </h2>
        <p style={{ maxWidth: '620px', marginTop: '16px', fontSize: '16px' }}>
          De una primera idea a una solución digital viva. Nuestro flujo de trabajo une diseño editorial, ingeniería de software y acompañamiento continuo.
        </p>
      </div>

      {/* Main Scrollytelling Stage Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '50px',
          alignItems: 'start',
          marginBottom: '80px',
        }}
      >
        {/* Left Interactive / Sticky Visual Canvas */}
        <div
          ref={visualRef}
          className="double-bezel"
          style={{
            position: 'sticky',
            top: '120px',
            minHeight: '440px',
          }}
        >
          <div
            className="double-bezel-inner"
            style={{
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '420px',
              background: 'linear-gradient(135deg, #131826 0%, #0d111a 100%)',
            }}
          >
            {/* Top window bar */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '14px',
                  marginBottom: '28px',
                  fontSize: '11px',
                  color: '#737b8e',
                  letterSpacing: '0.12em',
                }}
              >
                <span>● ● ● SISTEMA EN EVOLUCIÓN</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: 600 }}>
                  {stages[activeStage].badgeText}
                </span>
              </div>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-cyan)',
                  letterSpacing: '0.15em',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                ETAPA {stages[activeStage].step}
              </span>

              <h3
                style={{
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  marginBottom: '18px',
                  color: '#f6f7fb',
                }}
              >
                {stages[activeStage].title}
              </h3>

              {/* Dynamic feature blocks representing evolution */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '28px',
                }}
              >
                {stages[activeStage].visualElements.map((el, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      color: '#d5d7e0',
                      transition: 'all var(--duration-snappy) var(--ease-out)',
                    }}
                  >
                    <span>{el}</span>
                    <span style={{ color: 'var(--color-cyan)', fontWeight: 700 }}>✓</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom visual indicator */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '30px',
              }}
            >
              {stages.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '4px',
                    flex: 1,
                    borderRadius: '2px',
                    backgroundColor: i === activeStage ? 'var(--color-cyan)' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'background-color var(--duration-snappy) var(--ease-out)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Scrollytelling Chapters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {stages.map((s, idx) => (
            <div
              key={s.step}
              className={`process-trigger-${idx} double-bezel`}
              onClick={() => setActiveStage(idx)}
              style={{
                cursor: 'pointer',
                borderColor: activeStage === idx ? 'rgba(0, 223, 255, 0.4)' : 'var(--color-border-subtle)',
              }}
            >
              <div className="double-bezel-inner" style={{ padding: '36px 30px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: activeStage === idx ? 'var(--color-cyan)' : '#737b8e',
                  }}
                >
                  ETAPA {s.step} — {s.title}
                </span>

                <h4
                  style={{
                    fontSize: '22px',
                    margin: '14px 0',
                    color: '#f6f7fb',
                  }}
                >
                  {s.tagline}
                </h4>

                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#a6adbd' }}>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human Team Section: Elías and Abel */}
      <div
        className="double-bezel"
        style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, rgba(139, 77, 255, 0.08) 0%, rgba(0, 223, 255, 0.05) 100%)',
        }}
      >
        <div
          className="double-bezel-inner"
          style={{
            padding: '40px 34px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-violet)', marginBottom: '10px', display: 'block' }}>
              DE PERSONA A PERSONA
            </span>
            <h3 style={{ fontSize: '28px', marginBottom: '12px' }}>
              Un equipo cercano. <em>Un proceso claro.</em>
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#d5d7e0' }}>
              Somos <strong>Elías y Abel</strong>. Unimos dirección creativa, ingeniería de sistemas y mentalidad de negocio desde Perú. Trabajamos directamente contigo en cada etapa, sin intermediarios ni burocracia.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-cyan)', display: 'block' }}>
                CREATIVIDAD & MOTION
              </span>
              <p style={{ fontSize: '12px', color: '#a6adbd', marginTop: '6px' }}>
                Diseño editorial, identidad visual e interacciones inmersivas.
              </p>
            </div>

            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-violet)', display: 'block' }}>
                INGENIERÍA & ESCALABILIDAD
              </span>
              <p style={{ fontSize: '12px', color: '#a6adbd', marginTop: '6px' }}>
                Arquitectura React/TypeScript, bases de datos y seguridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
