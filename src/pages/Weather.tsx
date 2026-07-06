import React from 'react';
import { useApp } from '../context/AppContext';
import { mockWeather } from '../services/mockData';
import GlassCard from '../components/GlassCard';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSun,
  Wind,
  Droplets,
  Sunset,
  Sunrise,
  Gauge,
  Thermometer,
  ShieldAlert,
  ArrowRight
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

export const Weather: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const weather = mockWeather[selectedFarm.id] || mockWeather['farm-1'];

  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'Sunny':
        return <Sun size={size} className="text-amber-400 animate-pulse" />;
      case 'Cloudy':
        return <Cloud size={size} className="text-slate-400" />;
      case 'Rainy':
        return <CloudRain size={size} className="text-cyan-400 animate-bounce" />;
      case 'Stormy':
        return <CloudLightning size={size} className="text-purple-400 animate-pulse" />;
      case 'Partly Cloudy':
      default:
        return <CloudSun size={size} className="text-blue-300" />;
    }
  };

  const hasRainAhead = weather.forecast.some(day => day.condition === 'Rainy' || day.condition === 'Stormy');

  // Chart configuration for weekly temperature trends
  const tempChartData = {
    labels: weather.forecast.map(day => day.day),
    datasets: [
      {
        label: 'High Temp (°C)',
        data: weather.forecast.map(day => day.temp),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#f59e0b'
      },
      {
        label: 'Low Temp (°C)',
        data: weather.forecast.map(day => day.temp - 6),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.02)',
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
      legend: { display: true, labels: { color: '#94a3b8', font: { family: 'Inter', size: 10 } } },
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
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('weather') || 'Weather Overview'}</h2>
        <p className="text-xs text-slate-400 mt-1">
          Active meteorological parameters and satellite weather alerts for {selectedFarm.name}.
        </p>
      </div>

      {/* Row 1: Current Weather Station & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <GlassCard className="flex flex-col justify-between" hoverEffect>
          <div className="border-b border-slate-900 pb-4 mb-4">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">Live Satellite Telemetry</span>
            <div className="flex justify-between items-center mt-3">
              <div>
                <h3 className="text-3xl font-black text-white">{weather.temp}°C</h3>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wide">{weather.condition}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                {getWeatherIcon(weather.condition, 40)}
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-4">
              Station coordinates: {selectedFarm.lat.toFixed(3)}°N, {selectedFarm.lng.toFixed(3)}°E • Updated 12 mins ago.
            </p>
          </div>

          <div className="space-y-3.5 text-xs text-slate-400">
            <div className="flex justify-between items-center py-0.5">
              <span className="flex items-center gap-2 text-slate-450"><Sunrise size={14} className="text-amber-500" /> Sunrise</span>
              <span className="text-white font-extrabold">06:10 AM</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="flex items-center gap-2 text-slate-450"><Sunset size={14} className="text-red-400" /> Sunset</span>
              <span className="text-white font-extrabold">06:45 PM</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="flex items-center gap-2 text-slate-450"><Thermometer size={14} className="text-emerald-400" /> Soil Temp (10cm)</span>
              <span className="text-white font-extrabold">24.8°C</span>
            </div>
          </div>
        </GlassCard>

        {/* Details Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard className="flex items-center gap-4" hoverEffect>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-cyan-400">
              <Droplets size={22} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Atmospheric Moisture</span>
              <h4 className="text-lg font-bold text-white mt-1">{weather.humidity}% Humidity</h4>
              <p className="text-[10px] text-slate-450 mt-1">Transpiration rate index: Moderate.</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4" hoverEffect>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-amber-500">
              <Wind size={22} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Wind Speed & Vane</span>
              <h4 className="text-lg font-bold text-white mt-1">{weather.windSpeed} km/h</h4>
              <p className="text-[10px] text-slate-450 mt-1">Direction: West-Northwest (WNW).</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4" hoverEffect>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-purple-400">
              <Gauge size={22} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Barometric Pressure</span>
              <h4 className="text-lg font-bold text-white mt-1">1008.2 hPa</h4>
              <p className="text-[10px] text-slate-450 mt-1">Steady atmospheric gradient.</p>
            </div>
          </GlassCard>

          {/* AI Weather Advisory */}
          <GlassCard variant={hasRainAhead ? 'green' : 'warning'} className="flex flex-col justify-between" hoverEffect>
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">AI Agro-Weather Advisory</span>
              <div className="flex items-start gap-2 mt-2">
                <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                  {hasRainAhead
                    ? 'Rain is predicted within the week. Delay scheduled nitrogen top-dressing to prevent run-off leaching.'
                    : 'Dry weather pattern holds. Boost irrigation cycles by 10% on coarse-textured sand zones to prevent canopy drop.'}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Row 2: Weekly forecast & Temperature chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-455 uppercase tracking-wider">7-Day Temperature Range</h4>
            <span className="text-[10px] text-slate-500 block mt-0.5">Atmospheric thermal sensor metrics</span>
          </div>
          <div className="flex-1 relative min-h-[200px] mt-4">
            <Line data={tempChartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* 7-Day Forecast Grid */}
        <GlassCard className="flex flex-col justify-between" hoverEffect>
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">7-Day Forecast Details</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Precipitation volumes and thermal indexes</p>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {weather.forecast.map((day, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-slate-900/10 border border-slate-800/10 text-xs">
                  <span className="font-bold text-slate-400 w-10">{day.day}</span>
                  <span className="flex items-center gap-1.5 w-24">
                    {getWeatherIcon(day.condition, 14)}
                    <span className="text-slate-300 font-semibold">{day.condition}</span>
                  </span>
                  <span className="font-extrabold text-white w-10 text-right">{day.temp}°C</span>
                  <span className="text-[10px] text-cyan-400 font-bold w-12 text-right">
                    {day.precipitation > 0 ? `${day.precipitation}mm` : '0 mm'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Weather;
