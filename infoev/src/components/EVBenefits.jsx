import { useState } from 'react';
import {
  Zap, Fuel, DollarSign, Leaf, VolumeX,
  Clock, ShieldCheck, TrendingDown
} from 'lucide-react';
import { formatINR } from '../vehiclesData';

export default function EVBenefits() {
  const [dailyKm, setDailyKm] = useState(35); // 35 km/day typical commute

  // Dynamic Savings Calculations
  const annualKm = dailyKm * 365;
  const petrolCostAnnual = annualKm * 2.4; // avg ₹2.40/km for 2-wheeler, scaled
  const evCostAnnual = annualKm * 0.28; // avg ₹0.28/km
  const annualSavings = petrolCostAnnual - evCostAnnual;
  const fiveYearSavings = annualSavings * 5;

  const comparisonRows = [
    {
      factor: 'Running Fuel Cost',
      petrol: '₹2.30 – ₹11.00 / km',
      ev: '₹0.20 – ₹1.40 / km',
      winner: 'EV (~85% Lower Expense)',
      icon: <DollarSign className="w-4 h-4 text-emerald-400" />
    },
    {
      factor: 'Annual Periodic Maintenance',
      petrol: '₹12,000 – ₹45,000 / yr (Oil, spark plugs, filters, clutch)',
      ev: '₹2,500 – ₹8,000 / yr (Brake pads & tires only)',
      winner: 'EV (70% Fewer Friction Parts)',
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />
    },
    {
      factor: 'Noise & Vibration (NVH)',
      petrol: 'High internal combustion rattle, heat & exhaust vibration',
      ev: 'Acoustic whisper-quiet glide, zero engine vibration',
      winner: 'EV (Silky Smooth Commute)',
      icon: <VolumeX className="w-4 h-4 text-indigo-400" />
    },
    {
      factor: 'Direct Tailpipe Emissions',
      petrol: 'Heavy CO2, particulate matter & nitrogen oxides',
      ev: '0g Tailpipe Emissions, Clean Urban Air',
      winner: 'EV (100% Eco-Positive)',
      icon: <Leaf className="w-4 h-4 text-emerald-500" />
    },
    {
      factor: 'Refueling / Recharging Location',
      petrol: 'Mandatory detours to petrol pumps during peak hours',
      ev: 'Charge overnight at home or dormitory while sleeping',
      winner: 'EV (Wake up to 100% Everyday)',
      icon: <Clock className="w-4 h-4 text-amber-400" />
    },
    {
      factor: '5-Year Cumulative Savings',
      petrol: 'Heavy recurring petrol loss (₹1,50,000 – ₹5,00,000+ burned)',
      ev: 'Massive capital retained for tuition, investments & family',
      winner: 'EV (Over ₹2 Lakhs Saved)',
      icon: <TrendingDown className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900/60 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5" />
            <span>Economic & Ecological Clarity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Petrol Vehicles vs Electric Vehicles
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            See the raw numbers. Why millions of students, professionals, and families are permanently ditching fluctuating fuel costs for electric freedom.
          </p>
        </div>

        {/* Dynamic Savings Calculator Bar */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-2xl text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Interactive Fuel Savings Estimator
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                How Much Will You Save Every Year?
              </h3>
              <p className="text-xs text-slate-300">
                Adjust your estimated daily travel distance to see immediate rupee savings:
              </p>

              <div className="pt-3 max-w-md">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Daily Commute:</span>
                  <span className="text-cyan-400 font-extrabold text-sm">{dailyKm} km / day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Savings Cards */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4 shrink-0">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-36">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Savings</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">
                  {formatINR(Math.round(annualSavings))}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Every 12 Months</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 text-center min-w-36 shadow-lg shadow-emerald-500/10">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">5-Year Retention</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
                  {formatINR(Math.round(fiveYearSavings))}
                </span>
                <span className="text-[10px] text-cyan-300 mt-0.5 block">Capital Saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side by Side Comparative Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="p-4 sm:p-5 font-extrabold uppercase tracking-wider text-xs">Comparison Metric</th>
                <th className="p-4 sm:p-5 font-extrabold uppercase tracking-wider text-xs text-rose-500 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4" /> Conventional Petrol Vehicle
                </th>
                <th className="p-4 sm:p-5 font-extrabold uppercase tracking-wider text-xs text-emerald-500">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 fill-current" /> Modern Electric Vehicle (EV)
                  </span>
                </th>
                <th className="p-4 sm:p-5 font-extrabold uppercase tracking-wider text-xs text-cyan-500">Clear Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2">
                      {row.icon}
                      <span>{row.factor}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400 font-medium">
                    {row.petrol}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-900 dark:text-white font-bold bg-emerald-500/5 dark:bg-emerald-500/10">
                    {row.ev}
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                      {row.winner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
