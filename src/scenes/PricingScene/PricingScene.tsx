import React from 'react';
import { developmentPlans, formatMoney } from '../../data/pricing';
import { siteConfig } from '../../data/siteConfig';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const PricingScene: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section
      id="precios"
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#07090e',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 06 / UN BUEN COMIENZO, A TU ALCANCE
        </span>
        <h2>
          Grandes posibilidades. <em>Precios claros.</em>
        </h2>
        <p style={{ maxWidth: '600px', marginTop: '16px', fontSize: '16px' }}>
          Elige un punto de partida para tu presencia digital. Evaluamos juntos el alcance antes de comenzar, sin costos ocultos ni letras pequeñas.
        </p>
      </div>

      {/* Plans Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {developmentPlans.map((plan) => (
          <article
            key={plan.id}
            className="double-bezel"
            style={{
              borderColor: plan.featured ? 'rgba(139, 77, 255, 0.4)' : 'var(--color-border-subtle)',
            }}
          >
            <div
              className="double-bezel-inner"
              style={{
                padding: '36px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                background: plan.featured
                  ? 'linear-gradient(145deg, #181528 0%, #10141f 70%)'
                  : 'var(--color-bg-card)',
              }}
            >
              <div>
                <span className="badge-meta" style={{ color: 'var(--color-cyan)' }}>
                  {plan.tag}
                </span>

                <h3 style={{ fontSize: '24px', margin: '14px 0 10px' }}>{plan.name}</h3>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 4vw, 44px)',
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    color: '#f6f7fb',
                    marginBottom: '4px',
                  }}
                >
                  {plan.from && <small style={{ fontSize: '14px', fontWeight: 500, color: '#a6adbd' }}>Desde </small>}
                  {formatMoney(plan.price)}
                </div>

                <span style={{ fontSize: '11px', color: '#737b8e', display: 'block', marginBottom: '24px' }}>
                  {plan.label}
                </span>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '12px',
                        color: '#b6becd',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: 'var(--color-cyan)', fontSize: '11px', marginTop: '1px' }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <p style={{ fontSize: '11px', color: '#737b8e', lineHeight: 1.5, marginBottom: '28px' }}>
                  {plan.note}
                </p>
              </div>

              <Button
                variant={plan.featured ? 'primary' : 'secondary'}
                size="md"
                onClick={() =>
                  openWhatsApp(
                    `Hola, PazBel Studios. Me interesa el plan ${plan.name} (${plan.from ? 'desde ' : ''}${formatMoney(
                      plan.price
                    )}). Quisiera conocer el alcance y coordinar los siguientes pasos.`
                  )
                }
              >
                Elegir {plan.name}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Commercial Note */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '20px',
          fontSize: '12px',
          color: '#737b8e',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span>{siteConfig.commercial.exclusions}</span>
        <span>{siteConfig.commercial.tax}</span>
      </div>
    </section>
  );
};
