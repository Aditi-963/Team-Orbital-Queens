import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import {
  Bell,
  Search,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Info,
  Sparkles,
  Calendar,
  Filter,
  CheckCircle
} from 'lucide-react';

export const Alerts: React.FC = () => {
  const { alerts, resolveAlert, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'resolved'>('all');

  // Filter & Search alerts
  const filteredAlerts = alerts.filter((alert) => {
    // Search term match
    const matchesSearch =
      alert.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter match
    if (activeFilter === 'all') {
      return matchesSearch;
    } else if (activeFilter === 'resolved') {
      return alert.resolved && matchesSearch;
    } else {
      return !alert.resolved && alert.severity === activeFilter && matchesSearch;
    }
  });

  const getAlertIcon = (severity: string, resolved: boolean) => {
    if (resolved) {
      return <CheckCircle2 className="text-emerald-500" size={18} />;
    }
    switch (severity) {
      case 'critical':
        return <AlertOctagon className="text-red-500" size={18} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={18} />;
      case 'info':
      default:
        return <Info className="text-cyan-500" size={18} />;
    }
  };

  const getSeverityBadge = (severity: string, resolved: boolean) => {
    if (resolved) {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
          Resolved
        </span>
      );
    }
    switch (severity) {
      case 'critical':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100/80 text-red-800 border border-red-200 animate-pulse">
            Critical
          </span>
        );
      case 'warning':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200">
            Warning
          </span>
        );
      case 'info':
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-200">
            Info
          </span>
        );
    }
  };

  const getAlertCardVariant = (severity: string, resolved: boolean) => {
    if (resolved) return 'green';
    switch (severity) {
      case 'critical':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'cyan';
    }
  };

  const activeAlertsCount = alerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('alertCenter') || 'Smart Alert Center'}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time geospatial anomalies, drought indicators, and sensor-less risk telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-900 border border-slate-800 text-slate-300 font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Bell size={14} className={activeAlertsCount > 0 ? "animate-swing" : ""} />
            <span>{activeAlertsCount} Unresolved</span>
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search anomalies or fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/10 transition-all font-semibold"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Search size={14} />
          </span>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
          {(['all', 'critical', 'warning', 'info', 'resolved'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-[10px] font-extrabold rounded-lg capitalize transition-all flex-1 md:flex-initial ${
                activeFilter === filter
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 bg-transparent'
              }`}
            >
              {filter === 'all' ? 'All Alerts' : filter}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Alerts Feed */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAlerts.length === 0 ? (
          <GlassCard className="flex flex-col items-center justify-center text-center py-16">
            <div className="h-16 w-16 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-base font-extrabold text-slate-850">No anomalies found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed font-semibold">
              All crop telemetry systems are operating normally. No alerts match your selected filter.
            </p>
          </GlassCard>
        ) : (
          filteredAlerts.map((alert) => (
            <GlassCard
              key={alert.id}
              variant={getAlertCardVariant(alert.severity, alert.resolved)}
              hoverEffect
              className="transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex items-start gap-3.5">
                  {/* Status Indicator Icon */}
                  <div className={`p-2.5 rounded-xl bg-white border ${
                    alert.resolved 
                      ? 'border-emerald-200 text-emerald-600' 
                      : alert.severity === 'critical'
                        ? 'border-red-200 text-red-600'
                        : alert.severity === 'warning'
                          ? 'border-amber-200 text-amber-600'
                          : 'border-cyan-200 text-cyan-600'
                  }`}>
                    {getAlertIcon(alert.severity, alert.resolved)}
                  </div>

                  {/* Message Content */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-850">
                        {alert.farmName}
                      </h4>
                      {getSeverityBadge(alert.severity, alert.resolved)}
                    </div>
                    <p className="text-xs text-slate-655 mt-1.5 leading-relaxed font-semibold">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-450 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {alert.date}
                      </span>
                      <span>•</span>
                      <span className="uppercase tracking-wider">{alert.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Resolve Action Button */}
                {!alert.resolved && (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 font-extrabold text-xs rounded-xl shadow-sm hover:shadow transition-all flex-shrink-0"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </GlassCard>
          ))
        )}
      </div>

      {/* Explanatory Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="space-y-3" hoverEffect>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="text-amber-500" size={14} />
            Drought Stress Signals
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            Generated when SWIR-1 (Band 11) and NIR (Band 8) sensor bands reflect cell structural changes and water-volume decline. Soil Moisture index below 35%.
          </p>
        </GlassCard>

        <GlassCard className="space-y-3" hoverEffect>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="text-cyan-500" size={14} />
            Disease Pathogen Risk
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            Modeled by correlating high canopy surface temperatures (LST) and local hygrometer weather metrics to early fungus spore breeding windows.
          </p>
        </GlassCard>

        <GlassCard className="space-y-3" hoverEffect>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="text-slate-500" size={14} />
            Drainage & Flood Alerts
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            Triggered by SAR VV polarization backscatter returns and NDWI indices exceeding 0.75, representing standing water on flat crop terrains.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Alerts;
