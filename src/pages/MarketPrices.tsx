import React from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Warehouse,
  ShoppingBag,
  Info,
  Calendar,
  AlertCircle
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

export const MarketPrices: React.FC = () => {
  const { selectedFarm, t } = useApp();

  const getMarketData = (crop: string) => {
    switch (crop) {
      case 'Wheat':
        return {
          currentPrice: 2450,
          prevPrice: 2380,
          unit: 'Quintal',
          priceTrend: [2250, 2290, 2340, 2380, 2410, 2450],
          demandIndex: 'High',
          sellAdvisory: 'HOLD - Mandi supplies are tapering off. Storage stock is expected to yield 8% higher returns by late next month.',
          mandiRates: [
            { location: 'Bhatinda, Punjab', rate: 2450, volume: '1,200 MT' },
            { location: 'Karnal, Haryana', rate: 2475, volume: '850 MT' },
            { location: 'Indore, MP', rate: 2390, volume: '2,100 MT' }
          ]
        };
      case 'Rice':
        return {
          currentPrice: 2280,
          prevPrice: 2320,
          unit: 'Quintal',
          priceTrend: [2400, 2380, 2350, 2310, 2290, 2280],
          demandIndex: 'Medium',
          sellAdvisory: 'SELL - Incoming harvest season in Southern states is raising inventory levels. Selling within 7 days is recommended to locked current rates.',
          mandiRates: [
            { location: 'Thanjavur, TN', rate: 2280, volume: '3,400 MT' },
            { location: 'Kakinada, AP', rate: 2260, volume: '1,800 MT' },
            { location: 'Burdwan, WB', rate: 2310, volume: '2,500 MT' }
          ]
        };
      case 'Cotton':
        return {
          currentPrice: 7150,
          prevPrice: 6980,
          unit: 'Quintal',
          priceTrend: [6400, 6600, 6850, 6985, 7050, 7150],
          demandIndex: 'High',
          sellAdvisory: 'SELL PARTIAL - Global supply deficits have pushed rates up by 12% over 60 days. Selling 50% of stock to cover input costs is optimal.',
          mandiRates: [
            { location: 'Bharuch, Gujarat', rate: 7150, volume: '620 MT' },
            { location: 'Adilabad, Telangana', rate: 7080, volume: '450 MT' },
            { location: 'Amravati, Maharashtra', rate: 7120, volume: '800 MT' }
          ]
        };
      case 'Grapes':
      default:
        return {
          currentPrice: 8600,
          prevPrice: 8900,
          unit: 'Quintal',
          priceTrend: [9200, 9100, 8950, 8800, 8750, 8600],
          demandIndex: 'Low',
          sellAdvisory: 'HOLD - Cold storage holding fees are covered by projected price rebounds in off-season export batches in coming weeks.',
          mandiRates: [
            { location: 'Nashik, Maharashtra', rate: 8600, volume: '150 MT' },
            { location: 'Bengaluru, Karnataka', rate: 8950, volume: '95 MT' },
            { location: 'Pune, Maharashtra', rate: 8700, volume: '120 MT' }
          ]
        };
    }
  };

  const market = getMarketData(selectedFarm.cropType);
  const priceChange = market.currentPrice - market.prevPrice;
  const isPositive = priceChange >= 0;

  // Chart configuration for 6-month trends
  const trendChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: `Mandi Price (₹/${market.unit})`,
        data: market.priceTrend,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.05)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#16a34a'
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {t('marketPrices') || 'Crop Marketplace & Prices'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time APMC Mandi rates, historical pricing curves, and inventory sales directives.
          </p>
        </div>
        <span className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400">
          <Coins size={20} />
        </span>
      </div>

      {/* Row 1: Mandi Price Summary & Sell/Hold Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Summary Card */}
        <GlassCard className="flex flex-col justify-between" hoverEffect>
          <div className="border-b border-slate-900 pb-4 mb-4">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">Average Mandi Rate</span>
            <div className="flex justify-between items-end mt-3">
              <div>
                <h3 className="text-3xl font-black text-white">₹{market.currentPrice.toLocaleString()}</h3>
                <p className="text-xs text-slate-400 mt-1">Per {market.unit}</p>
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl border ${
                isPositive 
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                  : 'bg-red-950/20 border-red-500/30 text-red-400'
              }`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{isPositive ? '+' : ''}{Math.round((priceChange / market.prevPrice) * 100)}% MoM</span>
              </span>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-slate-400">
            <div className="flex justify-between items-center py-0.5">
              <span className="flex items-center gap-2 text-slate-450"><ShoppingBag size={14} className="text-cyan-400" /> Buyer Demand</span>
              <span className={`font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                market.demandIndex === 'High' 
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                  : market.demandIndex === 'Medium'
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-400'
                    : 'bg-red-950/20 border-red-500/30 text-red-400'
              }`}>
                {market.demandIndex} Demand
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="flex items-center gap-2 text-slate-450"><Warehouse size={14} className="text-amber-500" /> Mandi Arrival Volume</span>
              <span className="text-white font-extrabold">Active (High inflow)</span>
            </div>
          </div>
        </GlassCard>

        {/* Sell / Hold Advisory Index */}
        <GlassCard 
          variant={market.sellAdvisory.startsWith('SELL') ? 'green' : 'warning'} 
          className="lg:col-span-2 flex flex-col justify-between" 
          hoverEffect
        >
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle size={16} />
                Market Sell / Hold Advisory
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Automated yield liquidation guidance index</p>
            </div>

            <p className="text-xs font-semibold text-slate-700 leading-relaxed mb-4">
              {market.sellAdvisory}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-900/60 text-[10px] text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-650 block mb-0.5 flex items-center gap-1">
              <Info size={11} />
              Geopolitical & Logistics Factor
            </span>
            Supply channels are compliant with regional APMC regulations. Direct-to-retail crop prices average 15% higher margins.
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Price trends graph & Local Mandi listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between" hoverEffect>
          <div className="mb-2">
            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">6-Month Price Trend</h4>
            <span className="text-[10px] text-slate-505 block mt-0.5">Average monthly APMC market transaction curves</span>
          </div>
          <div className="flex-1 relative min-h-[200px] mt-4">
            <Line data={trendChartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* Local Mandi listings */}
        <GlassCard className="flex flex-col justify-between" hoverEffect>
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Local APMC Mandi Rates</h4>
              <p className="text-[10px] text-slate-505 mt-0.5">Rates across key regional centers</p>
            </div>

            <div className="space-y-3">
              {market.mandiRates.map((mandi, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/10 border border-slate-800/10 flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-bold text-white">{mandi.location}</h5>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Arrival Vol: {mandi.volume}</span>
                  </div>
                  <span className="font-black text-green-400">₹{mandi.rate.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-900 text-[10px] text-slate-500 font-bold flex justify-between items-center">
            <span>Source: AGMARKNET APIs</span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              Today, 18:30 local
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default MarketPrices;
