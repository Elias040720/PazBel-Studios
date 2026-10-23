import React from 'react';
import { subscriptionPlans, formatMoney } from '../../data/pricing';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const MarketingScene: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();

  // Exclude 'none' subscription for the presentation cards
  const activeSubs = subscriptionPlans.filter((s) => s.id !== 'none');

  const continuitySteps = [
    'Presencia digital sólida',
    'Visibilidad calificada',
    'Consultas directas',
    'Aprendizaje de métricas',
    'Mejora continua',
  ];

  return (
    <section
      id="marketing"
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#0a0d14',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 07 / SEGUIMOS CONTIGO
        </span>
        <h2>
          Tu web se lanza. <em>Tu negocio sigue.</em>
        </h2>
        <p style={{ maxWidth: '620px', marginTop: '16px', fontSize: '16px' }}>
          Desarrollo y acompañamiento mensual son servicios independientes. Publicamos tu web y tú decides si deseas soporte técnico y campañas de crecimiento continuo.
        </p>
      </div>

      {/* Continuity Pipeline Ribbon */}
      <div
        className="double-bezel"
        style={{
          marginBottom: '40px',
          padding: '4px',
        }}
      >
        <div
          className="double-bezel-inner"
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: '#a6adbd',
          }}
        >
          {continuitySteps.map((step, idx) => (
            <React.Fragment key={step}>
              <span style={{ fontWeight: 500, color: idx === 0 ? 'var(--color-cyan)' : '#f6f7fb' }}>
                {step}
              </span>
              {idx < continuitySteps.length - 1 && (
                <span style={{ color: 'var(--color-violet)', fontSize: '14px' }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {activeSubs.map((sub, index) => (
          <article key={sub.id} className="double-bezel">
            <div
              className="double-bezel-inner"
              style={{
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                background:
                  index === 1
                    ? 'linear-gradient(145deg, #181928 0%, #10141f 70%)'
                    : 'var(--color-bg-card)',
              }}
            >
              <div>
                <span className="badge-meta" style={{ color: 'var(--color-violet)' }}>
                  ACOMPAÑAMIENTO 0{index + 1}
                </span>

                <h3 style={{ fontSize: '24px', margin: '14px 0 10px' }}>{sub.name}</h3>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(34px, 3.8vw, 42px)',
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    color: '#f6f7fb',
                    marginBottom: '20px',
                  }}
                >
                  {formatMoney(sub.price)}{' '}
                  <small style={{ fontSize: '13px', fontWeight: 400, color: '#737b8e' }}>
                    / mes
                  </small>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {sub.features.map((feat, i) => (
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
                      <span style={{ color: 'var(--color-violet)', fontSize: '11px', marginTop: '1px' }}>
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={index === 1 ? 'glow' : 'secondary'}
                size="md"
                onClick={() =>
                  openWhatsApp(
                    `Hola, PazBel Studios. Quiero consultar por el plan de acompañamiento ${sub.name} (${formatMoney(
                      sub.price
                    )} al mes) y conocer las condiciones de servicio.`
                  )
                }
              >
                Consultar {sub.name}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Commercial Warning */}
      <p style={{ fontSize: '11px', color: '#737b8e', lineHeight: 1.6, maxWidth: '820px' }}>
        Suscripciones mensuales opcionales sin plazo forzoso. La inversión directa en anuncios (Meta Ads o Google Ads) se abona por separado a las plataformas respectivas. Los resultados comerciales dependen del modelo de negocio, oferta y mercado; no se garantizan cifras arbitrarias de ventas.
      </p>
    </section>
  );
};
