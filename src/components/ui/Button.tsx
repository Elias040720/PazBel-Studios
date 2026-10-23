import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  iconSymbol?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon = true,
  iconSymbol = '↗',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: size === 'sm' ? '12px' : size === 'lg' ? '28px' : '20px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: size === 'sm' ? '12px' : size === 'lg' ? '15px' : '13px',
    letterSpacing: '-0.01em',
    padding:
      size === 'sm'
        ? '8px 14px 8px 18px'
        : size === 'lg'
        ? '16px 20px 16px 28px'
        : '12px 16px 12px 22px',
    transition: 'transform var(--duration-snappy) var(--ease-out), background var(--duration-snappy) var(--ease-out), border-color var(--duration-snappy) var(--ease-out), box-shadow var(--duration-snappy) var(--ease-out)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
    userSelect: 'none',
    textDecoration: 'none',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: '#f1f1f5',
      color: '#07090e',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#f6f7fb',
      border: '1px solid var(--color-border-subtle)',
      backdropFilter: 'blur(10px)',
    },
    ghost: {
      background: 'transparent',
      color: '#a6adbd',
      border: '1px solid transparent',
    },
    glow: {
      background: 'linear-gradient(135deg, rgba(0, 223, 255, 0.12), rgba(139, 77, 255, 0.16))',
      color: '#f6f7fb',
      border: '1px solid rgba(0, 223, 255, 0.35)',
      boxShadow: '0 0 25px rgba(0, 223, 255, 0.15)',
    },
  };

  const iconPillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size === 'sm' ? '22px' : size === 'lg' ? '32px' : '26px',
    height: size === 'sm' ? '22px' : size === 'lg' ? '32px' : '26px',
    borderRadius: '50%',
    background: variant === 'primary' ? 'rgba(7, 9, 14, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    color: 'inherit',
    fontSize: size === 'sm' ? '11px' : size === 'lg' ? '14px' : '12px',
    transition: 'transform var(--duration-snappy) var(--ease-out)',
  };

  return (
    <button
      className={`interactive-tap ${className}`}
      style={{ ...baseStyles, ...variantStyles[variant] }}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <span style={iconPillStyle} aria-hidden="true">
          {iconSymbol}
        </span>
      )}
    </button>
  );
};
