import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TimeLapseSlider from '../components/TimeLapseSlider';
import GlassCard from '../components/GlassCard';
import {
  Calendar,
  Layers,
  Sprout,
  User,
  Compass,
  FileSpreadsheet,
  HelpCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FarmDetails: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const navigate = useNavigate();
  const [activeInfoIndex, setActiveInfoIndex] = useState<'ndvi' | 'ndwi' | 'evi' | 'savi'>('ndvi');

  const timelineStages = [
    { label: 'Germination', desc: 'Seedling emergence', done: true },
    { label: 'Vegetative', desc: 'Canopy expansion', done: true },
    { label: 'Flowering', desc: 'Bud formation', done: selectedFarm.growthStage !== 'Germination' && selectedFarm.growthStage !== 'Vegetative' },
    { label: 'Maturity', desc: 'Grain ripening', done: selectedFarm.growthStage === 'Maturity' || selectedFarm.growthStage === 'Harvest Ready' },
    { label: 'Harvest Ready', desc: 'Vigor dry-down', done: selectedFarm.growthStage === 'Harvest Ready' }
  ];

  const indexDetails = {
    ndvi: {
      name: 'NDVI (Vegetation Index)',
      value: selectedFarm.ndvi,
      desc: 'Normalized Difference Vegetation Index highlights live green vegetation density. Red bands capture chlorophyll absorption, while NIR (Near-Infrared) reflects cellular structures.',
      range: '0.2 (Sparse soil) to 0.9 (Thick forest)',
      status: selectedFarm.ndvi > 0.75 ? 'Excellent Biomass' : 'Moderate Canopy'
    },
    ndwi: {
      name: 'NDWI (Water Index)',
      value: selectedFarm.ndwi,
      desc: 'Normalized Difference Water Index monitors liquid water content in vegetation canopy. High values indicate strong turgidity; drops signal moisture stress before visible wilt.',
      range: '0.1 (Dry vegetation) to 0.8 (Highly hydrated)',
      status: selectedFarm.ndwi > 0.6 ? 'Optimal hydration' : 'Moisture stress risk'
    },
    evi: {
      name: 'EVI (Enhanced Vegetation)',
      value: selectedFarm.evi,
      desc: 'Enhanced Vegetation Index optimizes vegetation signals by correcting for aerosol atmospheric influences and soil background reflections in dense forest zones.',
      range: '0.1 to 0.9',
      status: 'Aerosol Corrected'
    },
    savi: {
      name: 'SAVI (Soil Adjusted)',
      value: selectedFarm.savi,
      desc: 'Soil Adjusted Vegetation Index introduces a soil brightness correction factor (L) to prevent reflection distortion in early seedling stages with high soil exposure.',
      range: '0.0 to 1.0',
      status: 'Brightness Corrected'
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('cropAnalytics')}</h2>
          <p className="text-xs text-slate-400 mt-1">Geospatial telemetry and multitemporal growth logs for {selectedFarm.name}.</p>
        </div>
        <button
          onClick={() => navigate('/reports')}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
        >
          <FileSpreadsheet size={15} />
          <span>{t('downloadReport')}</span>
        </button>
      </div>

      {/* Meta Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="flex items-center gap-4" hoverEffect>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Owner Profile</p>
            <p className="text-sm font-bold text-white mt-1">{selectedFarm.owner}</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4" hoverEffect>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
            <Sprout size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Crop/Area</p>
            <p className="text-sm font-bold text-white mt-1">{selectedFarm.cropType} • {selectedFarm.area} Ha</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4" hoverEffect>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-blue-400">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Planting Date</p>
            <p className="text-sm font-bold text-white mt-1">{selectedFarm.plantingDate}</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4" hoverEffect>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-400">
            <Compass size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Expected Harvest</p>
            <p className="text-sm font-bold text-white mt-1">{selectedFarm.expectedHarvest}</p>
          </div>
        </GlassCard>
      </div>

      {/* Main Growth Timeline */}
      <GlassCard hoverEffect>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">{t('timeline')}</h4>
        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-2">
          {/* Connecting timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-900 -translate-y-1/2 z-0 hidden md:block" />

          {timelineStages.map((stage, idx) => {
            const isCurrent = selectedFarm.growthStage === stage.label;
            return (
              <div key={idx} className="relative z-10 flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-2 flex-1">
                {/* Visual Node */}
                <div
                  className={`h-9 w-9 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-neon-cyan'
                      : stage.done
                      ? 'bg-slate-900 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950 border-slate-900 text-slate-650'
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="md:mt-2">
                  <p className={`text-xs font-bold ${isCurrent ? 'text-cyan-400' : 'text-white'}`}>{stage.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Time-lapse and Index grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multitemporal Satellite Growth Slider */}
        <TimeLapseSlider />

        {/* Dynamic Index Details tabs */}
        <GlassCard className="flex flex-col justify-between" hoverEffect>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              {t('indicesTitle')}
            </h4>

            {/* Tab links */}
            <div className="flex border-b border-slate-900 pb-2 mb-4 gap-1.5 overflow-x-auto">
              {(['ndvi', 'ndwi', 'evi', 'savi'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveInfoIndex(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                    activeInfoIndex === key
                      ? 'bg-slate-900 text-cyan-400 border border-slate-800'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Active Tab contents */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-900/40 border border-slate-850 p-4 rounded-2xl">
                <div>
                  <span className="text-xs text-slate-500">Live Sentinel-2 Value</span>
                  <h5 className="text-xl font-black text-white mt-0.5">
                    {indexDetails[activeInfoIndex].value}
                  </h5>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
                  {indexDetails[activeInfoIndex].status}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                  Index Concept & Formula
                </span>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/10 p-3 rounded-xl border border-slate-900">
                  {indexDetails[activeInfoIndex].desc}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-900 pt-3">
                <span>Standard Range Spectrum</span>
                <span className="font-semibold text-slate-400">{indexDetails[activeInfoIndex].range}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-slate-900 border border-slate-850 text-[10px] text-slate-500 flex items-center gap-1.5">
            <HelpCircle size={14} className="text-cyan-400" />
            <span>Click headers above to inspect different electromagnetic indices overlays.</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default FarmDetails;
