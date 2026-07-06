import React from 'react';
import GlassCard from './GlassCard';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  progress?: number; // 0 to 100
  color?: 'default' | 'green' | 'blue' | 'cyan' | 'warning' | 'danger';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  subtext,
  trend,
  trendValue,
  progress,
  color = 'default'
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-slate-400';
  };

  const getProgressColor = () => {
    switch (color) {
      case 'green': return 'bg-emerald-500';
      case 'blue': return 'bg-blue-500';
      case 'cyan': return 'bg-cyan-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-cyan-500';
    }
  };

  return (
    <GlassCard variant={color} hoverEffect className="relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 text-cyan-400`}>
          {icon}
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Level</span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800/60 rounded-full h-1.5 overflow-hidden border border-slate-700/20">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {(trendValue || subtext) && (
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          {trendValue && (
            <span className={`font-semibold ${getTrendColor()}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
            </span>
          )}
          {subtext && <span className="text-slate-400">{subtext}</span>}
        </div>
      )}
    </GlassCard>
  );
};

export default MetricCard;
