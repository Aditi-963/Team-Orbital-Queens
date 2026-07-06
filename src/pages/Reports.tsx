import React from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Shield,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { farms, selectedFarm, t, addPushNotification } = useApp();

  const handleDownloadCsv = () => {
    // Generate CSV string
    const headers = ['Farm Name', 'Owner', 'Location', 'Crop Type', 'Area (Ha)', 'NDVI', 'Soil Moisture (%)', 'Health Score (%)', 'LST (°C)'];
    const rows = farms.map(f => [
      `"${f.name}"`,
      `"${f.owner}"`,
      `"${f.location}"`,
      f.cropType,
      f.area,
      f.ndvi,
      f.soilMoisture,
      f.healthScore,
      f.lst
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CropOrbit_AgriReport_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addPushNotification('CSV report downloaded successfully', 'success');
  };

  const handlePrintPdf = () => {
    window.print();
    addPushNotification('PDF Print configuration initiated', 'info');
  };

  return (
    <div className="space-y-6 print:p-0 print:m-0">
      {/* Page Header (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('reports')}</h2>
          <p className="text-xs text-slate-400 mt-1">Export agronomic records, satellite indexes, and moisture alerts.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs tracking-wider transition-all flex items-center gap-1.5"
          >
            <Download size={15} />
            <span>{t('exportCsv')}</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-xs tracking-wider transition-all flex items-center gap-1.5"
          >
            <Printer size={15} />
            <span>{t('exportPdf')}</span>
          </button>
        </div>
      </div>

      {/* Printable Report Title block (Visible only in print) */}
      <div className="hidden print:block border-b border-slate-300 pb-4 mb-6">
        <h1 className="text-3xl font-black text-slate-900">CROPORBIT AI AGRI-REPORT</h1>
        <p className="text-sm text-slate-650 mt-1">Satellite Remote Sensing Analytics • Compiled on: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Overview Analytics table */}
      <GlassCard className="w-full print:bg-white print:text-slate-900 print:border-slate-300 print:shadow-none" hoverEffect>
        <div className="border-b border-slate-900 print:border-slate-300 pb-3 mb-4 flex justify-between items-center">
          <div>
            <h4 className="text-xs font-bold text-white print:text-slate-900 uppercase tracking-wider">All Registered Fields</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Comparative spatial parameters overview</p>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-900 print:bg-slate-200 border border-slate-800 print:border-slate-350 text-slate-400 print:text-slate-700 font-bold">
            {farms.length} Operations
          </span>
        </div>

        {/* Data Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-900 print:border-slate-300 text-slate-500 font-semibold">
                <th className="py-3 px-2">Farm Name</th>
                <th className="py-3 px-2">Location</th>
                <th className="py-3 px-2">Crop Type</th>
                <th className="py-3 px-2 text-right">Area (Ha)</th>
                <th className="py-3 px-2 text-right">NDVI Vigor</th>
                <th className="py-3 px-2 text-right">Soil Moisture</th>
                <th className="py-3 px-2 text-right">LST Temp</th>
                <th className="py-3 px-2 text-right">Health Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 print:divide-slate-200">
              {farms.map((farm) => (
                <tr key={farm.id} className="text-slate-300 print:text-slate-800 hover:bg-slate-900/20">
                  <td className="py-3.5 px-2 font-bold text-white print:text-slate-900">{farm.name}</td>
                  <td className="py-3.5 px-2 text-slate-400 print:text-slate-650">{farm.location.split(',')[0]}</td>
                  <td className="py-3.5 px-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-200 font-semibold">
                      {farm.cropType}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right font-medium">{farm.area}</td>
                  <td className="py-3.5 px-2 text-right font-bold text-emerald-400">{farm.ndvi}</td>
                  <td className="py-3.5 px-2 text-right font-bold text-cyan-400">{farm.soilMoisture}%</td>
                  <td className="py-3.5 px-2 text-right">{farm.lst}°C</td>
                  <td className="py-3.5 px-2 text-right font-bold">{farm.healthScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Selected Farm Detailed Report Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core diagnostics */}
        <GlassCard className="lg:col-span-2 space-y-5 print:bg-white print:text-slate-900 print:border-slate-300 print:shadow-none" hoverEffect>
          <div className="border-b border-slate-900 print:border-slate-300 pb-3">
            <h4 className="text-xs font-bold text-white print:text-slate-900 uppercase tracking-wider">Field Diagnostics Summary</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Deep crop vigor analysis for {selectedFarm.name}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/40 print:bg-slate-50 border border-slate-800 print:border-slate-250 text-xs">
              <span className="font-bold text-white print:text-slate-900 block mb-1">Vegetative Summary</span>
              <p className="text-slate-400 print:text-slate-600 leading-relaxed">
                The NDVI profile is sitting at {selectedFarm.ndvi}, indicating normal vegetative health. Growth is matching typical curves for {selectedFarm.cropType} at the {selectedFarm.growthStage} stage.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 print:bg-slate-50 border border-slate-800 print:border-slate-250 text-xs">
              <span className="font-bold text-white print:text-slate-900 block mb-1">Hydration & Irrigation Diagnostics</span>
              <p className="text-slate-400 print:text-slate-600 leading-relaxed">
                Soil moisture index is at {selectedFarm.soilMoisture}%. Canopy moisture indexes show normal values with no severe cell dehydration indications.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 print:bg-slate-50 border border-cyan-800/40 print:border-slate-200 text-xs flex gap-3 items-start">
            <Sparkles className="text-cyan-400 print:text-slate-500 mt-0.5 flex-shrink-0" size={16} />
            <div>
              <span className="font-bold text-cyan-200 print:text-slate-800 block mb-0.5">Advisory Directive</span>
              <p className="text-slate-400 print:text-slate-650 leading-relaxed">
                Continue standard fertilizer schedule. Check drainage channels for anomalies if heavy rains are predicted. Monitor moisture levels closely to optimize evapotranspiration ratios.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Selected Farm Info sidebar */}
        <GlassCard className="flex flex-col justify-between print:bg-white print:text-slate-900 print:border-slate-300 print:shadow-none" hoverEffect>
          <div className="space-y-4">
            <div className="border-b border-slate-900 print:border-slate-300 pb-3">
              <h4 className="text-xs font-bold text-white print:text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="text-cyan-400 print:text-slate-500" size={14} />
                Field Metadata
              </h4>
            </div>

            <div className="space-y-3.5 text-xs text-slate-400 print:text-slate-700">
              <div className="flex justify-between">
                <span>Farm Name</span>
                <span className="font-bold text-white print:text-slate-900">{selectedFarm.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Crop Cultivated</span>
                <span className="font-semibold text-white print:text-slate-900">{selectedFarm.cropType}</span>
              </div>
              <div className="flex justify-between">
                <span>Planting Date</span>
                <span>{selectedFarm.plantingDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Harvest</span>
                <span>{selectedFarm.expectedHarvest}</span>
              </div>
              <div className="flex justify-between">
                <span>Area Coverage</span>
                <span>{selectedFarm.area} Hectares</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-slate-900 print:bg-slate-50 border border-slate-850 print:border-slate-200 text-[10px] text-slate-500 print:text-slate-600 leading-relaxed">
            <span className="font-bold text-white print:text-slate-900 block mb-0.5">Authorization Code</span>
            ISRO-Constellation scan credential validated. Sentinel-2C data is sourced under Open Access license agreement protocols.
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Reports;
