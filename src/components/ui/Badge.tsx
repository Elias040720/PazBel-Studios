import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'violet' | 'coral' | 'neutral';
  liveDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  liveDot = false,
  className = '',
}) => {
  const colorMap = {
    cyan: {
      color: '#00dfff',
      border: 'rgba(0, 223, 255, 0.25)',
      bg: 'rgba(0, 223, 255, 0.08)',
      dotGlow: '#00dfff',
    },
    violet: {
      color: '#bba3ef',
      border: 'rgba(187, 163, 239, 0.25)',
      bg: 'rgba(187, 163, 239, 0.08)',
      dotGlow: '#8b4dff',
    },
    coral: {
      color: '#ff8a9e',
      border: 'rgba(255, 100, 123, 0.25)',
      bg: 'rgba(255, 100, 123, 0.08)',
      dotGlow: '#ff647b',
    },
    neutral: {
      color: '#a6adbd',
      border: 'rgba(255, 255, 255, 0.12)',
      bg: 'rgba(255, 255, 255, 0.04)',
      dotGlow: '#a6adbd',
    },
  };

  const current = colorMap[variant];

  return (
    <span
      className={`eyebrow ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '5px 12px',
        borderRadius: 'var(--radius-pill)',
        border: `1px solid ${current.border}`,
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {liveDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.color,
            boxShadow: `0 0 8px ${current.dotGlow}`,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
