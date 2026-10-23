import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/whatsapp/FloatingWhatsApp';
import { HeroScene } from './scenes/HeroScene/HeroScene';
import { ProblemScene } from './scenes/ProblemScene/ProblemScene';
import { ServicesScene } from './scenes/ServicesScene/ServicesScene';
import { ProcessScene } from './scenes/ProcessScene/ProcessScene';
import { PortfolioScene } from './scenes/PortfolioScene/PortfolioScene';
import { DemoScene } from './scenes/DemoScene/DemoScene';
import { PricingScene } from './scenes/PricingScene/PricingScene';
import { MarketingScene } from './scenes/MarketingScene/MarketingScene';
import { CalculatorScene } from './scenes/CalculatorScene/CalculatorScene';
import { FaqScene } from './scenes/FaqScene/FaqScene';
import { ClosingScene } from './scenes/ClosingScene/ClosingScene';

export const App: React.FC = () => {
  return (
    <div className="bg-subtle-mesh" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Floating Double-Bezel Header */}
      <Header />

      {/* Main Orchestrated Cinematic Chapters */}
      <main id="main-content">
        {/* Capítulo 01: Hero 3D, escultura interactiva y titulares */}
        <HeroScene />

        {/* Capítulo 02: Nuestra propuesta / De depender de redes a destacar */}
        <ProblemScene />

        {/* Capítulo 03: Lo que podemos construir (Bento grid de servicios) */}
        <ServicesScene />

        {/* Capítulo 04: Scrollytelling de metodología (Diseñamos / Desarrollamos / Impulsamos) */}
        <ProcessScene />

        {/* Capítulo 05: Portafolio inmersivo (MOVA, Chambi Motors, CarWashAlita) */}
        <PortfolioScene />

        {/* Capítulo 06: Demostración interactiva por rubro */}
        <DemoScene />

        {/* Capítulo 07: Precios claros de desarrollo */}
        <PricingScene />

        {/* Capítulo 08: Suscripciones de continuidad y crecimiento */}
        <MarketingScene />

        {/* Capítulo 09: Cotizador interactivo con presupuesto a WhatsApp */}
        <CalculatorScene />

        {/* Capítulo 10: Preguntas frecuentes con acordeón fluido */}
        <FaqScene />

        {/* Capítulo 11: Cierre cinematográfico y contacto directo */}
        <ClosingScene />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Contextual Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
