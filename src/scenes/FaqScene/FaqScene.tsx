import React, { useState } from 'react';
import { faqData } from '../../data/faq';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const FaqScene: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openWhatsApp } = useWhatsApp();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#0a0d14',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 09 / TRANSPARENCIA TOTAL
        </span>
        <h2>
          Preguntas frecuentes. <em>Respuestas directas.</em>
        </h2>
        <p style={{ maxWidth: '620px', marginTop: '16px', fontSize: '16px' }}>
          Sin tecnicismos innecesarios ni evasivas. Aquí respondemos a las dudas más comunes sobre costos, alcance, tiempos y mantenimiento.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: '20px',
          alignItems: 'start',
          marginBottom: '48px',
        }}
      >
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          const id = `faq-answer-${index}`;
          const triggerId = `faq-trigger-${index}`;

          return (
            <div
              key={index}
              className="double-bezel"
              style={{
                borderColor: isOpen ? 'rgba(0, 223, 255, 0.35)' : 'var(--color-border-subtle)',
                transition: 'border-color var(--duration-snappy) var(--ease-out)',
              }}
            >
              <div
                className="double-bezel-inner"
                style={{
                  padding: '24px 28px',
                  background: isOpen
                    ? 'linear-gradient(145deg, #161c2d 0%, #10141f 80%)'
                    : 'var(--color-bg-card)',
                  transition: 'background var(--duration-snappy) var(--ease-out)',
                }}
              >
                <button
                  id={triggerId}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  className="interactive-tap"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'left',
                    color: '#f6f7fb',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '13px',
                        color: isOpen ? 'var(--color-cyan)' : '#737b8e',
                        fontWeight: 700,
                      }}
                    >
                      0{index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      minWidth: '28px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'rgba(0, 223, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      color: isOpen ? 'var(--color-cyan)' : '#a6adbd',
                      fontSize: '16px',
                      transition: 'transform var(--duration-snappy) var(--ease-out)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={id}
                    role="region"
                    aria-labelledby={triggerId}
                    style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: '#a6adbd',
                    }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Help Callout */}
      <div
        className="double-bezel"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 223, 255, 0.06) 0%, rgba(139, 77, 255, 0.06) 100%)',
        }}
      >
        <div
          className="double-bezel-inner"
          style={{
            padding: '32px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>
              ¿Tienes una pregunta específica sobre tu negocio?
            </h3>
            <p style={{ fontSize: '13px', color: '#a6adbd' }}>
              Escríbenos directamente por WhatsApp. Te respondemos con claridad y sin compromisos.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              openWhatsApp(
                'Hola, equipo de PazBel Studios. Tengo una consulta sobre los servicios y alcance para mi empresa.'
              )
            }
          >
            Hacer una pregunta por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
