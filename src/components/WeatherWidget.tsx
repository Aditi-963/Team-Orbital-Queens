import React from 'react';
import { useApp } from '../context/AppContext';
import { mockWeather } from '../services/mockData';
import GlassCard from './GlassCard';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSun, Wind, Droplets } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const weather = mockWeather[selectedFarm.id] || mockWeather['farm-1'];

  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'Sunny':
        return <Sun size={size} className="text-amber-400 animate-pulse-slow" />;
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

  return (
    <GlassCard variant="default" className="w-full">
      <div className="flex justify-between items-start border-b border-slate-800/60 pb-4 mb-4">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{t('weather')}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700/60 text-slate-400">
              {selectedFarm.location.split(',')[0]}
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">Satellite Weather Integration</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.condition, 28)}
            <span className="text-3xl font-extrabold text-white">{weather.temp}°C</span>
          </div>
          <span className="text-xs text-slate-400">{weather.condition}</span>
        </div>
      </div>

      {/* Primary details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-850/40">
          <Droplets className="text-cyan-400" size={20} />
          <div>
            <p className="text-xs text-slate-400">Humidity</p>
            <p className="text-sm font-semibold text-white">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-850/40">
          <Wind className="text-slate-400" size={20} />
          <div>
            <p className="text-xs text-slate-400">Wind Vane</p>
            <p className="text-sm font-semibold text-white">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>

      {/* Irrigation correlation */}
      {hasRainAhead ? (
        <div className="mb-6 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs flex flex-col gap-1">
          <span className="font-semibold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Rainfall Alert: Irrigation Optimization Active
          </span>
          <span>Rain forecasted in the next 7 days. AI suggests reducing artificial watering by 35%.</span>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-400 text-xs flex flex-col gap-1">
          <span className="font-semibold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            Dry Spell Detected
          </span>
          <span>No precipitation expected. Keep watering cycles strictly on schedule.</span>
        </div>
      )}

      {/* 7-Day Forecast */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">7-Day Forecast</p>
        <div className="flex justify-between gap-1 overflow-x-auto pb-1">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-slate-900/20 border border-slate-800/10 min-w-[50px] flex-1">
              <span className="text-xs text-slate-400 font-medium">{day.day}</span>
              <span className="my-2">{getWeatherIcon(day.condition, 16)}</span>
              <span className="text-sm font-bold text-white">{day.temp}°</span>
              <span className="text-[10px] text-cyan-400 mt-1">{day.precipitation > 0 ? `${day.precipitation}mm` : '0'}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default WeatherWidget;
