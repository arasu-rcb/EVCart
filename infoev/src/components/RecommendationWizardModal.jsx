import { useState } from 'react';
import {
  X, Sparkles, ArrowRight
} from 'lucide-react';
import { bikesData, carsData, formatINR } from '../vehiclesData';

export default function RecommendationWizardModal({
  isOpen,
  onClose,
  onViewVehicle
}) {
  // Quiz Inputs
  const [vehicleType, setVehicleType] = useState('all'); // 'all' | 'bike' | 'car'
  const [lifestyle, setLifestyle] = useState('college'); // 'daily' | 'long-drive' | 'college' | 'school' | 'family' | 'performance' | 'budget'
  const [minRange, setMinRange] = useState(120);

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // RECOMMENDATION ENGINE FUNCTION
  // Evaluates dataset based on criteria and returns Top 3
  // 1. Best Overall
  // 2. Best Value
  // 3. Best Range
  // -------------------------------------------------------------
  const getRecommendations = () => {
    const pool = vehicleType === 'bike'
      ? [...bikesData]
      : (vehicleType === 'car' ? [...carsData] : [...bikesData, ...carsData]);

    // Filter by min range
    let filtered = pool.filter(v => v.range >= minRange);
    if (filtered.length < 3) filtered = pool; // fallback to prevent empty

    // Scoring Algorithm:
    const scored = filtered.map(v => {
      const isCatMatch = v.categories?.includes(lifestyle);
      const catBonus = isCatMatch ? 30 : 0;

      let priceScore = 10;
      if (v.price < 100000) priceScore = 25;
      else if (v.price < 500000) priceScore = 20;
      else if (v.price < 2000000) priceScore = 15;

      const rangeScore = Math.min((v.range / 600) * 30, 30);
      const speedScore = Math.min((v.topSpeed / 300) * 15, 15);

      const totalScore = Math.round(catBonus + priceScore + rangeScore + speedScore);

      return {
        vehicle: v,
        totalScore,
        catMatch: isCatMatch
      };
    });

    scored.sort((a, b) => b.totalScore - a.totalScore);

    // 1. Best Overall (highest composite score)
    const bestOverall = scored[0]?.vehicle || pool[0];

    // 2. Best Value (highest range per unit price)
    const valueRanked = [...filtered].sort((a, b) => (b.range / b.price) - (a.range / a.price));
    const bestValue = valueRanked.find(v => v.id !== bestOverall.id) || valueRanked[0];

    // 3. Best Range (pure highest range)
    const rangeRanked = [...filtered].sort((a, b) => b.range - a.range);
    const bestRange = rangeRanked.find(v => v.id !== bestOverall.id && v.id !== bestValue?.id) || rangeRanked[0];

    return [
      {
        badge: 'Best Overall Choice',
        role: 'Top Balanced Match',
        vehicle: bestOverall,
        icon: '🏆',
        accent: 'from-cyan-500 to-blue-600',
        reason: `Highest match for ${lifestyle.toUpperCase()} needs with exceptional balance of ${bestOverall.range} km range, ${bestOverall.topSpeed} km/h speed, and ${formatINR(bestOverall.price)} pricing.`
      },
      {
        badge: 'Best Value for Money',
        role: 'Maximum Savings',
        vehicle: bestValue,
        icon: '💰',
        accent: 'from-emerald-500 to-teal-600',
        reason: `Delivers the lowest cost-per-kilometer ratio with low maintenance and flexible installments (${bestValue.emi}).`
      },
      {
        badge: 'Best Longest Range',
        role: 'Endurance Champion',
        vehicle: bestRange,
        icon: '⚡',
        accent: 'from-indigo-500 to-purple-600',
        reason: `Dominates highway journeys with an industry-leading ${bestRange.range} km endurance and high battery density (${bestRange.batteryCapacity} kWh).`
      }
    ];
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-left max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Find My Perfect EV — Smart Recommendation Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalized algorithms tailored to your budget, daily habits & preferences
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Controls + Results Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Controls Bar: Type, Lifestyle, Min Range */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* 1. Vehicle Type */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  1. Vehicle Type
                </label>
                <div className="flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <button
                    onClick={() => setVehicleType('all')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${vehicleType === 'all' ? 'bg-cyan-500 text-white' : 'text-slate-500'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setVehicleType('bike')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${vehicleType === 'bike' ? 'bg-cyan-500 text-white' : 'text-slate-500'}`}
                  >
                    Bikes
                  </button>
                  <button
                    onClick={() => setVehicleType('car')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${vehicleType === 'car' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                  >
                    Cars
                  </button>
                </div>
              </div>

              {/* 2. Lifestyle Purpose */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  2. Primary Lifestyle
                </label>
                <select
                  value={lifestyle}
                  onChange={(e) => setLifestyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="college">🎓 College Student</option>
                  <option value="daily">🏍️ Daily Usage</option>
                  <option value="long-drive">🛣️ Long Drive / Highway</option>
                  <option value="school">🏫 School Student (Safe 25 km/h)</option>
                  <option value="family">👨‍👩‍👧‍👦 Family Utility</option>
                  <option value="performance">⚡ Performance & Speed</option>
                  <option value="budget">💰 Budget Friendly</option>
                </select>
              </div>

              {/* 3. Min Range Requirement */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span>3. Min Range:</span>
                  <span className="text-cyan-500 font-extrabold">{minRange} km</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={minRange}
                  onChange={(e) => setMinRange(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer mt-2"
                />
              </div>
            </div>
          </div>

          {/* TOP 3 RECOMMENDATIONS SHOWCASE */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Top 3 Recommendations For You
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ranked by algorithmic scoring: Range + Affordability + Comfort + Category Fit
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                Matched on {lifestyle.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => {
                const v = rec.vehicle;
                return (
                  <div
                    key={v.id}
                    className="rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500" />
                    
                    <div>
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                          {rec.icon} {rec.badge}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          Rank #{idx + 1}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="h-32 flex items-center justify-center my-2">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="max-h-28 max-w-full object-contain transform group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Title & Brand */}
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        {v.brandName}
                      </span>
                      <h5 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {v.name}
                      </h5>

                      {/* Key Specs */}
                      <div className="grid grid-cols-2 gap-1.5 my-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        <div>Range: <strong className="text-emerald-500">{v.range} km</strong></div>
                        <div>Top Speed: <strong>{v.topSpeed} km/h</strong></div>
                        <div>Price: <strong className="text-cyan-500">{formatINR(v.price)}</strong></div>
                        <div>EMI: <strong>{v.emi}</strong></div>
                      </div>

                      {/* WHY THIS WAS RECOMMENDED */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                          Why Recommended:
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {rec.reason}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onViewVehicle(v);
                      }}
                      className="w-full mt-4 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-cyan-600 dark:hover:bg-cyan-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore {v.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
