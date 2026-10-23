import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { openWhatsApp } = useWhatsApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = siteConfig.navigation.map((n) => n.id);
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(94%, 1500px)',
        height: '76px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderRadius: 'var(--radius-outer-md)',
        backgroundColor: isScrolled ? 'rgba(7, 9, 14, 0.88)' : 'rgba(13, 17, 26, 0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isScrolled ? '0 12px 40px rgba(0, 0, 0, 0.5)' : 'none',
        transition: 'background-color var(--duration-snappy) var(--ease-out), box-shadow var(--duration-snappy) var(--ease-out), border-color var(--duration-snappy) var(--ease-out)',
      }}
    >
      {/* Brand logo & monogram */}
      <a
        href="#inicio"
        onClick={(e) => handleNavClick(e, '#inicio')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          textDecoration: 'none',
        }}
        aria-label="PazBel Studios, ir al inicio"
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            background: '#07090e',
            border: '1px solid rgba(0, 223, 255, 0.3)',
            boxShadow: '0 0 15px rgba(0, 223, 255, 0.15)',
          }}
        >
          <img
            src="/brand/pazbel-original.jpeg"
            alt="PazBel Monogram"
            style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              top: '-26px',
              left: '-40px',
              maxWidth: 'none',
              mixBlendMode: 'screen',
            }}
          />
        </div>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.02em',
              display: 'block',
              lineHeight: 1.1,
              color: '#f6f7fb',
            }}
          >
            PAZBEL
          </span>
          <span
            style={{
              fontSize: '8px',
              letterSpacing: '0.45em',
              color: 'var(--color-cyan)',
              fontWeight: 600,
              display: 'block',
              marginTop: '2px',
            }}
          >
            STUDIOS
          </span>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
        className="desktop-nav"
      >
        {siteConfig.navigation.slice(0, 7).map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: isActive ? '#f6f7fb' : '#a6adbd',
                position: 'relative',
                padding: '8px 2px',
                transition: 'color var(--duration-instant) var(--ease-out)',
              }}
            >
              {item.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-cyan)',
                    boxShadow: '0 0 8px var(--color-cyan)',
                  }}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Nav CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Button
          variant="glow"
          size="sm"
          onClick={() =>
            openWhatsApp(
              'Hola, PazBel Studios. Estuve revisando su sitio web y quiero conversar sobre mi proyecto digital.'
            )
          }
          className="desktop-cta"
        >
          Hablemos de tu idea
        </Button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir menú de navegación"
          className="mobile-toggle"
          style={{
            display: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            fontSize: '14px',
            color: '#f6f7fb',
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '84px',
            left: 0,
            right: 0,
            backgroundColor: '#0d111a',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 'var(--radius-outer-md)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
          }}
        >
          {siteConfig.navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: activeSection === item.id ? 'var(--color-cyan)' : '#f6f7fb',
                padding: '6px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setMobileMenuOpen(false);
              openWhatsApp('Hola, PazBel Studios. Quiero conversar sobre mi proyecto digital.');
            }}
            style={{ marginTop: '8px' }}
          >
            Hablemos por WhatsApp
          </Button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
