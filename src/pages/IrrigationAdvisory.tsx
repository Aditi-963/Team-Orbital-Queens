import React from 'react';
import { useApp } from '../context/AppContext';
import { mockWeather } from '../services/mockData';
import GlassCard from '../components/GlassCard';
import {
  Droplets,
  CloudRain,
  Calendar,
  Activity,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  Filler
);

export const IrrigationAdvisory: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const weather = mockWeather[selectedFarm.id] || mockWeather['farm-1'];

  // Check if upcoming forecast predicts rain
  const hasRainAhead = weather.forecast.some(day => day.condition === 'Rainy' || day.condition === 'Stormy');
  const rainDays = weather.forecast.filter(day => day.condition === 'Rainy' || day.condition === 'Stormy');

  // Calculation metrics
  const moistureLevel = selectedFarm.soilMoisture;
  const standardDailyVolume = selectedFarm.waterRequirement; // Liters/Hectare/Day
  const area = selectedFarm.area; // Hectares

  // If rain is predicted, suggest reducing artificial watering by 35%
  const multiplier = hasRainAhead ? 0.65 : 1.0;
  const suggestedDailyVolume = Math.round(standardDailyVolume * multiplier);
  const totalSuggestedVolume = Math.round(suggestedDailyVolume * area);

  // Irrigation schedule advice
  let advisoryStatus = 'healthy'; // healthy, warning, critical
  let advisoryMessage = 'Soil moisture is optimal. Follow the normal scheduling.';
  let nextSchedule = 'Tomorrow at 06:00 AM';

  if (moistureLevel < 35) {
    advisoryStatus = 'critical';
    advisoryMessage = 'Critical stress. Severe dry spell detected. Irrigation is required immediately.';
    nextSchedule = 'IMMEDIATE SEQUENCING';
  } else if (moistureLevel < 45) {
    advisoryStatus = 'warning';
    advisoryMessage = 'Moderate water stress. Vigor decline possible. Schedule irrigation sequence within 12 hours.';
    nextSchedule = 'Tonight at 09:00 PM';
  }

  // Rainfall forecast line chart
  const rainfallChartData = {
    labels: weather.forecast.map(day => day.day),
    datasets: [
      {
        label: 'Precipitation Probability (%)',
        data: weather.forecast.map(day => day.condition === 'Rainy' ? 85 : day.condition === 'Stormy' ? 95 : day.condition === 'Partly Cloudy' ? 30 : 0),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#0f172a' }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } } }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('irrigation')}</h2>
        <p className="text-xs text-slate-400 mt-1">Satellite evapotranspiration calculations and dynamic watering schedules.</p>
      </div>

      {/* Advisory Status Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core recommendation card */}
        <GlassCard
          variant={advisoryStatus === 'critical' ? 'danger' : advisoryStatus === 'warning' ? 'warning' : 'green'}
          className="lg:col-span-2 flex flex-col justify-between"
          hoverEffect
        >
          <div>
            <div className="flex justify-between items-start border-b border-slate-900 pb-3 mb-4">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">AI Advisory recommendation</span>
                <h3 className="text-lg font-black text-white mt-1 uppercase">
                  {advisoryStatus === 'critical' ? t('critical') : advisoryStatus === 'warning' ? t('warning') : t('healthy')}
                </h3>
              </div>
              <span className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-cyan-400">
                <Droplets size={20} />
              </span>
            </div>

            <p className="text-xs text-white leading-relaxed font-semibold mb-6">
              {advisoryMessage}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-900/60 pt-5">
              <div>
                <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wider block">Suggested Flow Rate</span>
                <span className="text-sm font-bold text-white mt-1 block">{suggestedDailyVolume} L/ha/day</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wider block">Total Field Volume</span>
                <span className="text-sm font-bold text-white mt-1 block">{totalSuggestedVolume.toLocaleString()} Liters</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wider block">Scheduling</span>
                <span className="text-xs font-black text-cyan-400 mt-1.5 block uppercase tracking-wide">{nextSchedule}</span>
              </div>
            </div>
          </div>

          {/* Rain conservation alert warning */}
          {hasRainAhead && (
            <div className="mt-6 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 text-xs flex items-center gap-2">
              <CloudRain size={16} className="animate-bounce" />
              <span>
                Rainfall predicted on {rainDays.map(r => r.day).join(', ')}. Evapotranspiration modeling reduced daily volume by 35%.
              </span>
            </div>
          )}
        </GlassCard>

        {/* Level widgets */}
        <div className="space-y-4">
          <GlassCard className="flex flex-col justify-between p-5" hoverEffect>
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Moisture Saturation</span>
              <h4 className="text-2xl font-black text-white mt-1">{moistureLevel}%</h4>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800/80 mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  moistureLevel < 35 ? 'bg-red-500' : moistureLevel < 45 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${moistureLevel}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5">
              Hydric threshold limits: {selectedFarm.cropType === 'Wheat' ? '35% Min / 65% Max' : '45% Min / 85% Max'}.
            </p>
          </GlassCard>

          <GlassCard className="flex items-center gap-4" hoverEffect>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Crop Vigor Stage</p>
              <p className="text-sm font-bold text-white mt-1">{selectedFarm.growthStage}</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Rainfall forecast details and status reference levels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rainfall graph */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">7-Day Rainfall Probabilities</h4>
            <span className="text-[10px] text-slate-500 block mt-0.5">Atmospheric pressure satellite metrics</span>
          </div>
          <div className="flex-1 relative min-h-[160px] mt-4">
            <Line data={rainfallChartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* Reference levels definitions */}
        <GlassCard className="space-y-4" hoverEffect>
          <div className="border-b border-slate-900 pb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="text-cyan-400 animate-pulse" size={14} />
              Status Classifications
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Reference threshold guidelines</p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2.5 items-start p-2 rounded-xl bg-emerald-950/10 border border-emerald-500/20">
              <CheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" size={14} />
              <div>
                <span className="text-xs font-bold text-emerald-300 block">Healthy Level ({`>`}45%)</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Plants have sufficient water supply. Normal transpiration rate.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start p-2 rounded-xl bg-amber-950/10 border border-amber-500/20">
              <AlertTriangle className="text-amber-400 mt-0.5 flex-shrink-0" size={14} />
              <div>
                <span className="text-xs font-bold text-amber-300 block">Moderate Stress (35% - 45%)</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Canopy water stress beginning to build up. Vigor reduction.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start p-2 rounded-xl bg-red-950/10 border border-red-500/20">
              <AlertOctagon className="text-red-400 mt-0.5 flex-shrink-0" size={14} />
              <div>
                <span className="text-xs font-bold text-red-300 block">Critical Drought ({`<`}35%)</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Severe dehydration. Permanent wilting point risk. Irrigate now.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default IrrigationAdvisory;
