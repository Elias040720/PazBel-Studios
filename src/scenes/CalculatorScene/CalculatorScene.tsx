import React, { useState } from 'react';
import { developmentPlans, subscriptionPlans, formatMoney } from '../../data/pricing';
import { siteConfig } from '../../data/siteConfig';
import { Button } from '../../components/ui/Button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export const CalculatorScene: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(developmentPlans[1].id); // Default Web Corporativa
  const [selectedSubId, setSelectedSubId] = useState<string>(subscriptionPlans[0].id); // Default Sin acompañamiento
  const [businessSector, setBusinessSector] = useState<string>('Comercio o Servicios');
  const { openWhatsApp } = useWhatsApp();

  const selectedPlan = developmentPlans.find((p) => p.id === selectedPlanId) || developmentPlans[0];
  const selectedSub = subscriptionPlans.find((s) => s.id === selectedSubId) || subscriptionPlans[0];

  const handleSendQuote = () => {
    const isReference = selectedPlan.from;
    const subText =
      selectedSub.price > 0
        ? `y acompañamiento mensual de ${selectedSub.name} (${formatMoney(selectedSub.price)} al mes)`
        : 'sin suscripción mensual';

    const message = `Hola, PazBel Studios. Armé mi presupuesto en su cotizador web:
• Rubro: ${businessSector}
• Desarrollo inicial: ${selectedPlan.name} (${isReference ? 'desde ' : ''}${formatMoney(selectedPlan.price)})
• Continuidad: ${subText}
${isReference ? 'Entiendo que el importe de desarrollo es referencial y está sujeto a especificación de alcance. ' : ''}Me gustaría coordinar una reunión breve para evaluar los detalles del proyecto.`;

    openWhatsApp(message);
  };

  return (
    <section
      id="cotizador"
      className="scene-chapter"
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: '#07090e',
      }}
    >
      <div className="scene-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> 08 / HAGAMOS NÚMEROS
        </span>
        <h2>
          Arma tu proyecto. <em>Nosotros le damos vida.</em>
        </h2>
        <p style={{ maxWidth: '620px', marginTop: '16px', fontSize: '16px' }}>
          Sin cuentas confusas ni totales engañosos. Desglosamos tu inversión inicial de desarrollo y tu acompañamiento mensual por separado para que tomes la mejor decisión.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        {/* Left Form: Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Step 1: Development Service */}
          <div>
            <span
              className="eyebrow"
              style={{ color: 'var(--color-cyan)', display: 'block', marginBottom: '14px' }}
            >
              01 / ¿QUÉ NECESITAS CONSTRUIR?
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {developmentPlans.map((plan) => {
                const isChecked = selectedPlanId === plan.id;
                return (
                  <label
                    key={plan.id}
                    className="interactive-tap"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `1px solid ${
                        isChecked ? 'rgba(0, 223, 255, 0.45)' : 'rgba(255, 255, 255, 0.08)'
                      }`,
                      backgroundColor: isChecked ? 'rgba(0, 223, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      cursor: 'pointer',
                      transition: 'all var(--duration-snappy) var(--ease-out)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={isChecked}
                        onChange={() => setSelectedPlanId(plan.id)}
                        style={{ accentColor: 'var(--color-cyan)' }}
                      />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#f6f7fb' }}>
                        {plan.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-cyan)' }}>
                      {plan.from && <small style={{ fontSize: '11px', color: '#a6adbd' }}>Desde </small>}
                      {formatMoney(plan.price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 2: Subscription Plan */}
          <div>
            <span
              className="eyebrow"
              style={{ color: 'var(--color-violet)', display: 'block', marginBottom: '14px' }}
            >
              02 / ¿DESEAS ACOMPAÑAMIENTO MENSUAL?
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {subscriptionPlans.map((sub) => {
                const isChecked = selectedSubId === sub.id;
                return (
                  <label
                    key={sub.id}
                    className="interactive-tap"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `1px solid ${
                        isChecked ? 'rgba(139, 77, 255, 0.45)' : 'rgba(255, 255, 255, 0.08)'
                      }`,
                      backgroundColor: isChecked ? 'rgba(139, 77, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      cursor: 'pointer',
                      transition: 'all var(--duration-snappy) var(--ease-out)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <input
                        type="radio"
                        name="subscription"
                        value={sub.id}
                        checked={isChecked}
                        onChange={() => setSelectedSubId(sub.id)}
                        style={{ accentColor: 'var(--color-violet)' }}
                      />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#f6f7fb' }}>
                        {sub.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-violet)' }}>
                      {sub.price === 0 ? 'S/ 0' : `${formatMoney(sub.price)} / mes`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 3: Sector contextual input */}
          <div>
            <span
              className="eyebrow"
              style={{ color: '#737b8e', display: 'block', marginBottom: '14px' }}
            >
              03 / RUBRO DE TU EMPRESA
            </span>
            <input
              type="text"
              value={businessSector}
              onChange={(e) => setBusinessSector(e.target.value)}
              placeholder="Ej. Restaurante, Clínica dental, Venta de calzado..."
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f6f7fb',
                fontSize: '13px',
              }}
            />
          </div>
        </div>

        {/* Right Card: Instant Transparent Budget Summary */}
        <aside className="double-bezel">
          <div
            className="double-bezel-inner"
            style={{
              padding: '36px 30px',
              backgroundColor: '#121622',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--color-cyan)', marginBottom: '8px', display: 'block' }}>
                RESUMEN DE ESTIMACIÓN
              </span>
              <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>{selectedPlan.name}</h3>
              <p style={{ fontSize: '13px', color: '#a6adbd', marginBottom: '24px' }}>
                Acompañamiento: {selectedSub.name}
              </p>

              {/* Development breakdown */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '16px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <span style={{ fontSize: '13px', color: '#f6f7fb', display: 'block', fontWeight: 500 }}>
                    Desarrollo inicial {selectedPlan.from ? '(referencial)' : '(pago único)'}
                  </span>
                  <small style={{ fontSize: '11px', color: '#737b8e' }}>
                    {selectedPlan.features.length} características acordadas
                  </small>
                </div>
                <strong
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    letterSpacing: '-0.04em',
                    color: '#f6f7fb',
                  }}
                >
                  {formatMoney(selectedPlan.price)}
                </strong>
              </div>

              {/* Subscription breakdown */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '16px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <span style={{ fontSize: '13px', color: '#f6f7fb', display: 'block', fontWeight: 500 }}>
                    Mensualidad opcional
                  </span>
                  <small style={{ fontSize: '11px', color: '#737b8e' }}>
                    {selectedSub.price === 0 ? 'Sin compromiso recurrente' : 'Soporte y optimización continua'}
                  </small>
                </div>
                <strong
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    letterSpacing: '-0.04em',
                    color: 'var(--color-violet)',
                  }}
                >
                  {formatMoney(selectedSub.price)}
                  <small style={{ fontSize: '11px', fontWeight: 400 }}> / mes</small>
                </strong>
              </div>

              {/* Scope note */}
              <p style={{ fontSize: '11px', color: '#737b8e', lineHeight: 1.6, marginBottom: '28px' }}>
                {selectedPlan.note} {siteConfig.commercial.exclusions}
              </p>
            </div>

            <Button variant="primary" size="lg" onClick={handleSendQuote} style={{ width: '100%' }}>
              Enviar mi presupuesto por WhatsApp
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
};
