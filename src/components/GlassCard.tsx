import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'green' | 'blue' | 'cyan' | 'warning' | 'danger';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'green':
        return 'glass-card-green';
      case 'blue':
        return 'glass-card-blue';
      case 'cyan':
        return 'glass-card-cyan';
      case 'warning':
        return 'glass-card-warning';
      case 'danger':
        return 'glass-card-danger';
      default:
        return 'glass-panel';
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 ${getVariantClass()} ${
        hoverEffect ? 'glass-panel-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
export default GlassCard;
