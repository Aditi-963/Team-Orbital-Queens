import React from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import {
  Brain,
  Shield,
  Activity,
  Layers,
  Calendar,
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';

export const AiPredictions: React.FC = () => {
  const { selectedFarm, t } = useApp();

  const mockPredictions = {
    yield: (selectedFarm.area * (selectedFarm.cropType === 'Wheat' ? 4.2 : selectedFarm.cropType === 'Rice' ? 5.1 : 3.2)).toFixed(1),
    harvestDate: selectedFarm.expectedHarvest,
    cropConfidence: 96,
    yieldConfidence: 89,
    radarVigor: '-14.2 dB (VH polarization)',
    radarMoisture: '-8.5 dB (VV polarization)',
    constellation: 'Sentinel-2C + Landsat-9'
  };

  const predictionsList = [
    {
      title: 'Classified Crop Type',
      value: selectedFarm.cropType,
      desc: 'Multitemporal phenological pattern matched.',
      confidence: mockPredictions.cropConfidence,
      icon: <Layers className="text-cyan-400" size={18} />
    },
    {
      title: 'Estimated Crop Yield',
      value: `${mockPredictions.yield} Metric Tons`,
      desc: 'Based on biomass integral models.',
      confidence: mockPredictions.yieldConfidence,
      icon: <Brain className="text-emerald-400" size={18} />
    },
    {
      title: 'Harvest Window',
      value: mockPredictions.harvestDate,
      desc: 'Predicted maturity peak threshold.',
      confidence: 85,
      icon: <Calendar className="text-amber-400" size={18} />
    },
    {
      title: 'Moisture Stress Vigor',
      value: selectedFarm.soilMoisture < 35 ? 'Moderate Stress' : 'Hydrated / Optimal',
      desc: 'Short-wave infrared band ratio.',
      confidence: 91,
      icon: <Activity className="text-blue-400" size={18} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('predictions')}</h2>
        <p className="text-xs text-slate-400 mt-1">Machine learning classification models and explainable AI insights.</p>
      </div>

      {/* Primary Predictions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictionsList.map((pred, idx) => (
          <GlassCard key={idx} hoverEffect className="flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                  {pred.title}
                </span>
                <h4 className="text-xl font-bold text-white mt-1">{pred.value}</h4>
                <p className="text-xs text-slate-400 mt-1.5">{pred.desc}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 text-cyan-400">
                {pred.icon}
              </div>
            </div>

            {/* Confidence progress indicator */}
            <div className="mt-5 border-t border-slate-900/60 pt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Model Accuracy</span>
                <span className="font-bold text-cyan-400">{pred.confidence}% Confidence</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${pred.confidence}%` }}
                />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Explainable AI (XAI) console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core parameters logs */}
        <GlassCard className="lg:col-span-2 space-y-4" hoverEffect>
          <div className="border-b border-slate-900 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="text-cyan-400" size={16} />
              {t('explainableAi')}
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">{t('whyAiPredicted')}</p>
          </div>

          <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
            <p>
              The AI model leverages multitemporal pixel arrays spanning Landsat-9 OLI and Copernicus Sentinel-2 multispectral sensors. By monitoring the red-edge spectra reflections, our Neural Networks track crop vigor variations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SAR Backscatter (VH)</span>
                <span className="text-xs font-bold text-white mt-1.5 block">{mockPredictions.radarVigor}</span>
                <p className="text-[10px] text-slate-500 mt-1">Tracks canopy volumetric structure.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SAR Backscatter (VV)</span>
                <span className="text-xs font-bold text-white mt-1.5 block">{mockPredictions.radarMoisture}</span>
                <p className="text-[10px] text-slate-500 mt-1">Responsive to surface roughness & moisture.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-950/15 border border-cyan-850/30 text-cyan-300 flex items-start gap-2.5">
              <Zap size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold block mb-0.5">Model Weights Activation:</span>
                <span>NDVI index represents 45% of yield estimation weights; local evapotranspiration holds 25%; SAR VH polarization represents 30% to assess biomass volume.</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Orbit status pane */}
        <GlassCard className="flex flex-col justify-between" hoverEffect>
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe2 className="text-cyan-400 animate-spin [animation-duration:15s]" size={16} />
                Satellite Telemetry
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Active remote sensing constellations</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Constellation constellation</span>
                <span className="font-bold text-white text-[11px]">{mockPredictions.constellation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Resolution</span>
                <span className="font-semibold text-white">10m / Pixel (Multispectral)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Spectral Band Width</span>
                <span className="font-semibold text-white">B8 (NIR) & B11 (SWIR)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Last Sentinel Pass</span>
                <span className="font-semibold text-white">Today, 14:56 local</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-850/80 text-[10px] text-slate-500 leading-relaxed mt-6">
            <span className="font-bold text-white block mb-1">Explainable AI Framework</span>
            CropOrbit AI is compliant with Geospatial XAI standards, assuring that raw pixel metrics correlate precisely to visible leaf canopy structure values.
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AiPredictions;
