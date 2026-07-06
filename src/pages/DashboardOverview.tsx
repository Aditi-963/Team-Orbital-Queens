import React from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import WeatherWidget from '../components/WeatherWidget';
import {
  Sprout,
  Activity,
  Layers,
  Sparkles,
  ShieldAlert,
  Calendar,
  Compass,
  Plus
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const DashboardOverview: React.FC = () => {
  const {
    farms,
    selectedFarm,
    alerts,
    resolveAlert,
    t,
    addNewFarm
  } = useApp();

  const activeAlerts = alerts.filter(a => !a.resolved);

  // Aggregated indicators
  const totalFarms = farms.length;
  const avgHealth = Math.round(farms.reduce((acc, f) => acc + f.healthScore, 0) / farms.length);
  const activeAlertsCount = activeAlerts.length;
  const totalWaterSaved = "342,000 Liters";

  // Chart 1: NDVI line chart
  const ndviChartData = {
    labels: selectedFarm.historicalNdvi.map(d => d.date),
    datasets: [
      {
        label: 'NDVI (Canopy Vigor)',
        data: selectedFarm.historicalNdvi.map(d => d.value),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.05)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 6,
      }
    ]
  };

  // Chart 2: Water consumption bar chart
  const waterChartData = {
    labels: selectedFarm.historicalWater.map(d => d.date),
    datasets: [
      {
        label: 'Water Used (L/ha)',
        data: selectedFarm.historicalWater.map(d => d.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 1.5,
        borderRadius: 6,
      }
    ]
  };

  // Chart 3: Crop Distribution Pie chart
  const cropDistributionData = {
    labels: Array.from(new Set(farms.map(f => f.cropType))),
    datasets: [
      {
        data: Array.from(new Set(farms.map(f => f.cropType))).map(crop => {
          return farms.filter(f => f.cropType === crop).reduce((acc, curr) => acc + curr.area, 0);
        }),
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(6, 182, 212, 0.6)',
          'rgba(245, 158, 11, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
      }
    ]
  };

  // Chart 4: Rainfall history area chart
  const rainfallChartData = {
    labels: selectedFarm.historicalRainfall.map(d => d.date),
    datasets: [
      {
        label: 'Rainfall (mm)',
        data: selectedFarm.historicalRainfall.map(d => d.value),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#06b6d4'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { family: 'Inter', size: 12 },
        bodyFont: { family: 'Inter', size: 11 },
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)'
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } }
      }
    }
  };

  const mockAddFarm = () => {
    addNewFarm({
      name: 'Northeast Paddy Fields',
      owner: 'Ramesh Singh',
      location: 'Rohtak, Haryana, India',
      lat: 28.895,
      lng: 76.603,
      boundary: [
        [28.898, 76.601],
        [28.900, 76.605],
        [28.892, 76.606],
        [28.890, 76.602]
      ],
      area: 15.6,
      cropType: 'Rice',
      plantingDate: '2026-03-10',
      expectedHarvest: '2026-07-20',
      healthScore: 82,
      ndvi: 0.65,
      ndwi: 0.58,
      evi: 0.60,
      savi: 0.62,
      soilMoisture: 55,
      lst: 28.9,
      growthStage: 'Vegetative',
      waterRequirement: 14500
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <span>{t('welcome')}</span>
            <span className="text-cyan-400">👋</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Satellite metrics updated 14 minutes ago via Sentinel-2C orbit pass.</p>
        </div>
        <button
          onClick={mockAddFarm}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-xs tracking-wider transition-all flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>{t('addFarm')}</span>
        </button>
      </div>

      {/* KPI metric grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('totalFarms')}
          value={totalFarms}
          icon={<Compass size={18} />}
          subtext="Registered Fields"
        />
        <MetricCard
          title={t('farmHealth')}
          value={`${avgHealth}%`}
          icon={<Activity size={18} />}
          progress={avgHealth}
          color={avgHealth > 85 ? 'green' : 'cyan'}
          subtext="Planetary Vigor Avg"
        />
        <MetricCard
          title={t('waterSaved')}
          value={totalWaterSaved}
          icon={<Sprout size={18} />}
          color="blue"
          subtext="Evapotranspiration Optimized"
        />
        <MetricCard
          title="Active Alerts"
          value={activeAlertsCount}
          icon={<ShieldAlert size={18} />}
          color={activeAlertsCount > 0 ? 'warning' : 'default'}
          subtext="Anomalies Tracked"
        />
      </div>

      {/* Large Farm Overview and Weather Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Farm Detail panel */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between" hoverEffect>
          <div className="flex justify-between items-start border-b border-slate-900 pb-4 mb-4">
            <div>
              <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">Active Analysis Panel</span>
              <h3 className="text-xl font-extrabold text-white mt-1">{selectedFarm.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedFarm.location}</p>
            </div>
            <span className="px-3 py-1 text-[10px] font-bold rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              {selectedFarm.area} Hectares
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-850/60">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Crop Type</span>
              <span className="text-sm font-bold text-white mt-1 block flex items-center gap-1.5">
                <Sprout size={14} className="text-emerald-400" />
                {selectedFarm.cropType}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-850/60">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">NDVI (Health)</span>
              <span className="text-sm font-bold text-white mt-1 block flex items-center gap-1.5">
                <Activity size={14} className="text-cyan-400" />
                {selectedFarm.ndvi}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-850/60">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Moisture %</span>
              <span className="text-sm font-bold text-white mt-1 block flex items-center gap-1.5">
                <Layers size={14} className="text-blue-400" />
                {selectedFarm.soilMoisture}%
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-850/60">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Growth Stage</span>
              <span className="text-sm font-bold text-white mt-1 block flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-400" />
                {selectedFarm.growthStage}
              </span>
            </div>
          </div>

          {/* Quick Vegetation Index Explanation highlights */}
          <div className="p-4 rounded-xl bg-cyan-950/15 border border-cyan-850/30 flex items-center gap-3">
            <Sparkles className="text-cyan-400 animate-pulse flex-shrink-0" size={20} />
            <div className="text-xs leading-relaxed text-cyan-200">
              <span className="font-bold">AI Diagnostics:</span> Crop canopy is accumulating biomass steadily. Short-Wave Infrared sensors indicate normal moisture absorption. Leaf Surface Temp is within the optimal standard of {selectedFarm.lst}°C.
            </div>
          </div>
        </GlassCard>

        {/* Weather Widget */}
        <WeatherWidget />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* NDVI trend */}
        <GlassCard className="h-64 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('ndviOverTime')}</h4>
            <span className="text-[10px] text-slate-500 block mt-0.5">Biomass absorption trend (30 Days)</span>
          </div>
          <div className="flex-1 relative min-h-[140px]">
            <Line data={ndviChartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* Water consumption */}
        <GlassCard className="h-64 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Water Consumption Trends</h4>
            <span className="text-[10px] text-slate-500 block mt-0.5">Weekly irrigation application volume</span>
          </div>
          <div className="flex-1 relative min-h-[140px]">
            <Bar data={waterChartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* Crop distribution */}
        <GlassCard className="h-64 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('cropDistribution')}</h4>
            <span className="text-[10px] text-slate-500 block mt-0.5">Area proportion (Hectares)</span>
          </div>
          <div className="flex-1 relative min-h-[140px] flex items-center justify-center">
            <div className="h-32 w-32">
              <Pie
                data={cropDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: '#0f172a' }
                  }
                }}
              />
            </div>
            {/* Small Legend list */}
            <div className="flex flex-col gap-1 text-[9px] text-slate-400 font-semibold ml-2">
              {cropDistributionData.labels.map((lbl, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cropDistributionData.datasets[0].backgroundColor[idx] }}
                  />
                  <span>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Rainfall history */}
        <GlassCard className="h-64 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('rainfallHistory')}</h4>
            <span className="text-[10px] text-slate-500 block mt-0.5">Precipitation volumes (Jan - Apr)</span>
          </div>
          <div className="flex-1 relative min-h-[140px]">
            <Line data={rainfallChartData} options={chartOptions} />
          </div>
        </GlassCard>
      </div>

      {/* Smart Alert Center list */}
      <GlassCard className="w-full" hoverEffect>
        <div className="flex justify-between items-center mb-4 border-b border-slate-900 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="text-amber-500 animate-pulse" size={16} />
              {t('alertCenter')}
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Active farm stress notifications requiring action</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            {activeAlerts.length} anomalies detected
          </span>
        </div>

        <div className="divide-y divide-slate-900">
          {activeAlerts.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">All fields are operating in normal conditions. Excellent water balance!</p>
          ) : (
            activeAlerts.map((alert) => (
              <div key={alert.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-3 items-start">
                  <span className={`h-2.5 w-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{alert.farmName}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        alert.severity === 'critical'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {alert.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alert.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-[10px] font-bold text-slate-400 transition-colors"
                >
                  Dismiss / Mark Resolved
                </button>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default DashboardOverview;
