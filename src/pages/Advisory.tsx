import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import {
  Sprout,
  HeartHandshake,
  Sparkles,
  ShieldAlert,
  Droplets,
  BookmarkCheck,
  CheckCircle,
  AlertTriangle,
  FileText,
  BadgeAlert
} from 'lucide-react';

export const Advisory: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    cl_1: false,
    cl_2: true,
    cl_3: false,
    cl_4: false
  });

  const toggleChecklist = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Generate recommendations dynamically based on crop type
  const getAgroAdvice = (crop: string) => {
    switch (crop) {
      case 'Wheat':
        return {
          fertilizer: 'Apply Urea (Nitrogen top-dressing) at 55 kg/ha during the active tillering stage. Add Zinc Sulfate (21% Zn) if leaf mottling is spotted.',
          soil: 'Maintain soil pH between 6.0 and 7.5. Loose, well-drained loam is ideal. Till to 15cm depth.',
          pestRisk: {
            pest: 'Brown Rust & Aphids',
            risk: 'Medium',
            action: 'Monitor low-canopy dew levels. Apply Propiconazole 25% EC if rust pustules cover > 5% of leaf surface.'
          },
          checklistItems: [
            { id: 'cl_1', text: 'Verify tillering node spacing (should be 3-5cm).' },
            { id: 'cl_2', text: 'Check for yellow rust spots on lower leaves.' },
            { id: 'cl_3', text: 'Inspect moisture depth (should be moist down to 10cm).' },
            { id: 'cl_4', text: 'Clear drainage lines before upcoming cloudy days.' }
          ]
        };
      case 'Rice':
        return {
          fertilizer: 'Apply Ammonium Sulfate at 80 kg/ha before panicle initiation. Top-dress with Muriate of Potash (MOP) to improve grain weight.',
          soil: 'Clayey loam with high water retention. Soil pH should be 5.5 to 6.5. Flood basin depth should be kept at 5cm.',
          pestRisk: {
            pest: 'Stem Borer & Leaf Folder',
            risk: 'High',
            action: 'Check for dead hearts. Deploy pheromone traps at 12/ha. Apply Chlorantraniliprole if infestation exceeds ETL.'
          },
          checklistItems: [
            { id: 'cl_1', text: 'Maintain standing water level at exactly 5cm.' },
            { id: 'cl_2', text: 'Look for stem borer bore holes near tillers.' },
            { id: 'cl_3', text: 'Assess nitrogen deficiency (pale green leaf tips).' },
            { id: 'cl_4', text: 'Examine drainage outlets for clogging weeds.' }
          ]
        };
      case 'Cotton':
        return {
          fertilizer: 'Apply NPK 12:32:16 at 150 kg/ha during square formation. Spray Boron (0.15% concentration) to reduce boll shedding.',
          soil: 'Deep black soil (Regur) or alluvial soils are preferred. Soil pH must be 6.0 to 8.0. Keep soil aeration high.',
          pestRisk: {
            pest: 'Pink Bollworm & Whiteflies',
            risk: 'High',
            action: 'Install pheromone traps to capture moths. Use Neem oil spray (1500 ppm) during early instar stages.'
          },
          checklistItems: [
            { id: 'cl_1', text: 'Count squares per plant (target: 12-15 squares).' },
            { id: 'cl_2', text: 'Inspect underside of leaves for whitefly nymphs.' },
            { id: 'cl_3', text: 'Measure plant height to ensure node length balance.' },
            { id: 'cl_4', text: 'Check soil surface cracking levels.' }
          ]
        };
      case 'Grapes':
      default:
        return {
          fertilizer: 'Drip apply Calcium Nitrate at 25 kg/ha during berry set. Apply Potassium Sulfate to enhance brix/sweetness ratio.',
          soil: 'Gravelly loam or sandy clay loam with excellent drainage. pH 6.5 to 7.5. Avoid saline water sources.',
          pestRisk: {
            pest: 'Powdery Mildew & Thrips',
            risk: 'Critical',
            action: 'Prune excess foliage to increase sunlight penetration. Spray wettable Sulfur (80% WP) or Hexaconazole before fruit set.'
          },
          checklistItems: [
            { id: 'cl_1', text: 'Prune congested lateral shoots to improve airflow.' },
            { id: 'cl_2', text: 'Examine clusters for powdery white dust coating.' },
            { id: 'cl_3', text: 'Calibrate drip emitter flow rates (target: 4 L/hr).' },
            { id: 'cl_4', text: 'Record grape sugar levels using refractometer.' }
          ]
        };
    }
  };

  const advice = getAgroAdvice(selectedFarm.cropType);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {t('advisory') || 'Crop Advisory Board'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic agronomic calendars and pest prevention directives tailored for {selectedFarm.name} ({selectedFarm.cropType}).
          </p>
        </div>
        <span className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400">
          <HeartHandshake size={20} />
        </span>
      </div>

      {/* Primary Guidelines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fertilizer & Soil Management Card */}
        <GlassCard className="lg:col-span-2 space-y-5" hoverEffect>
          <div className="border-b border-slate-900 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sprout className="text-green-500" size={16} />
              Nutrient & Soil Guidelines
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Crop Nutrition & Soil Chemistry directives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850">
              <span className="text-[10px] text-green-400 font-extrabold uppercase tracking-wider block">Fertilizer Schedule</span>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-semibold">
                {advice.fertilizer}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850">
              <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block">Soil Specifications</span>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-semibold">
                {advice.soil}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-850/30 text-cyan-300 text-xs flex items-start gap-2">
            <Sparkles size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold block mb-0.5">Phenology Calibration:</span>
              <span>Based on Sentinel pass NDVI of {selectedFarm.ndvi}, the crop is in its "{selectedFarm.growthStage}" stage. Adjust fertilizer dosing by -10% if soil moisture is below threshold levels.</span>
            </div>
          </div>
        </GlassCard>

        {/* Pest & Disease Alerts */}
        <GlassCard 
          variant={advice.pestRisk.risk === 'Critical' || advice.pestRisk.risk === 'High' ? 'danger' : 'warning'} 
          className="flex flex-col justify-between" 
          hoverEffect
        >
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert size={16} />
                Pest & Disease Risk
              </h3>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${
                advice.pestRisk.risk === 'Critical' || advice.pestRisk.risk === 'High'
                  ? 'bg-red-950/35 border-red-500/30 text-red-400 animate-pulse'
                  : 'bg-amber-950/35 border-amber-500/30 text-amber-400'
              }`}>
                {advice.pestRisk.risk} Risk
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Identified Pathogens</span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">{advice.pestRisk.pest}</h4>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Directives & Control</span>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-semibold">
                  {advice.pestRisk.action}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-900 text-[10px] text-slate-500 leading-relaxed mt-4">
            <span className="font-bold text-white block mb-0.5">Biosecurity Alert</span>
            Always verify diagnostic findings locally before applying chemical pesticides. Follow regional dosage instructions.
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Diagnostics Checklist & General Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diagnostic Checklist */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between" hoverEffect>
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookmarkCheck className="text-cyan-400" size={16} />
                Field Diagnostics Walk Checklist
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Checklist items for your weekly visual inspection</p>
            </div>

            <div className="space-y-3">
              {advice.checklistItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/10 border border-slate-800/10 cursor-pointer hover:bg-slate-900/30 transition-all"
                >
                  <button className={`mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    checklist[item.id] ? 'text-emerald-500' : 'text-slate-500 hover:text-slate-350'
                  }`}>
                    {checklist[item.id] ? <CheckCircle size={16} /> : <div className="h-4 w-4 rounded-md border border-slate-700" />}
                  </button>
                  <span className={`text-xs font-semibold leading-relaxed ${
                    checklist[item.id] ? 'line-through text-slate-500' : 'text-slate-300'
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* General Advisories References */}
        <GlassCard className="space-y-4" hoverEffect>
          <div className="border-b border-slate-900 pb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="text-cyan-400" size={14} />
              Advisory References
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Global agronomic guidelines & compliance</p>
          </div>

          <div className="space-y-3.5">
            <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-slate-900/30 border border-slate-850">
              <Droplets className="text-cyan-400 mt-0.5 flex-shrink-0" size={14} />
              <div>
                <span className="text-xs font-bold text-white block">Transpiration Index</span>
                <p className="text-[10px] text-slate-500 mt-0.5">High transpiration levels increase xylem pressure, demanding consistent root hydraulic moisture.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-slate-900/30 border border-slate-850">
              <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={14} />
              <div>
                <span className="text-xs font-bold text-white block">Salinity Thresholds</span>
                <p className="text-[10px] text-slate-500 mt-0.5">EC values should remain below 1.5 dS/m during vegetative stages to prevent sodium leaf tip scorch.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Advisory;
