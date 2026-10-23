import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ExperienceCanvas } from '../../three/ExperienceCanvas';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const { openWhatsApp } = useWhatsApp();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(headlineRef.current, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          delay: 0.1,
        })
          .from(
            subtextRef.current,
            {
              y: 25,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.6'
          )
          .from(
            actionsRef.current,
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
            },
            '-=0.5'
          )
          .from(
            canvasWrapRef.current,
            {
              scale: 0.92,
              opacity: 0,
              duration: 1.2,
            },
            '-=0.9'
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="scene-chapter"
      style={{
        paddingTop: 'clamp(140px, 18vh, 200px)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Top eyebrow ticker */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Badge variant="cyan" liveDot>
          ESTUDIO CREATIVO + INGENIERÍA DIGITAL
        </Badge>
        <span
          className="eyebrow"
          style={{ color: '#737b8e', fontSize: '10px' }}
        >
          DESDE PERÚ, PARA TU PRÓXIMA IDEA
        </span>
      </div>

      {/* Main hero grid: copy + 3D canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          alignItems: 'center',
          gap: ' clamp(30px, 5vw, 60px)',
        }}
      >
        {/* Left Column: Copy */}
        <div style={{ maxWidth: '680px', zIndex: 2 }}>
          <h1
            ref={headlineRef}
            style={{
              marginBottom: '28px',
            }}
          >
            Creamos experiencias digitales <em>imposibles de ignorar.</em>
          </h1>

          <p
            ref={subtextRef}
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: 1.6,
              color: '#d5d7e0',
              marginBottom: '20px',
            }}
          >
            Desde páginas web que destacan hasta plataformas que transforman negocios. Diseño, ingeniería y crecimiento digital en un solo estudio.
          </p>

          <p
            style={{
              fontSize: '13px',
              color: '#8f97aa',
              lineHeight: 1.65,
              maxWidth: '480px',
              marginBottom: '36px',
            }}
          >
            Tu negocio ya hace un gran trabajo en el mundo real. Hagamos que su presencia en internet lo demuestre con solvencia, velocidad y diseño de autor.
          </p>

          <div
            ref={actionsRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('proyectos');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar proyectos
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                openWhatsApp(
                  'Hola, PazBel Studios. Tengo una idea y quiero desarrollar una web profesional. ¿Podemos conversar?'
                )
              }
            >
              Hablemos de tu idea
            </Button>
          </div>
        </div>

        {/* Right Column: Three.js PB Experience Canvas */}
        <div
          ref={canvasWrapRef}
          className="double-bezel"
          style={{
            height: 'clamp(420px, 54vh, 620px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="double-bezel-inner" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* 3D Canvas */}
            <ExperienceCanvas />

            {/* Floating Live Indicator Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <Badge variant="violet" liveDot>
                PB 3D CANVAS · TIEMPO REAL
              </Badge>
            </div>

            {/* Bottom micro legend */}
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                color: '#737b8e',
                letterSpacing: '0.12em',
                pointerEvents: 'none',
              }}
            >
              <span>INTERACCIÓN CON CURSOR</span>
              <span>CHROMATIC SPECTRUM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero bottom indicator */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          marginTop: 'clamp(50px, 8vh, 90px)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#737b8e',
        }}
      >
        <a
          href="#enfoque"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('enfoque')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#d5d7e0',
          }}
        >
          <span>DESLIZA. ESTO RECIÉN EMPIEZA</span>
          <span style={{ color: 'var(--color-cyan)' }}>↓</span>
        </a>
        <span>De una landing a una plataforma completa</span>
        <span>01 / PAZBEL STUDIOS</span>
      </div>
    </section>
  );
};
