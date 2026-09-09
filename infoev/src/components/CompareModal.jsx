import {
  X, Scale, Trophy, CheckCircle2, ArrowRight
} from 'lucide-react';
import { formatINR } from '../vehiclesData';

export default function CompareModal({
  vehicles,
  onClose,
  onRemoveVehicle,
  onViewVehicle
}) {
  if (!vehicles || vehicles.length === 0) return null;

  // -------------------------------------------------------------
  // DYNAMIC "OUR BEST CHOICE" CALCULATION ENGINE
  // Evaluates only the vehicles currently in the comparison pool
  // -------------------------------------------------------------
  const calculateBestChoice = () => {
    if (vehicles.length === 1) {
      const v = vehicles[0];
      return {
        winner: v,
        score: v.recommendationScores?.overall || 90,
        breakdown: v.recommendationScores || { range: 9, price: 9, performance: 8, comfort: 9, value: 9 },
        reasons: [
          `Solid driving range of ${v.range} km per single charge`,
          `High customer rating of ${v.rating} / 5.0 across ${v.reviewCount || 100}+ reviews`,
          `Competitive monthly installment starting from ${v.emi}`
        ]
      };
    }

    // Determine max/min across selected vehicles to compute normalized comparative scores
    const maxRange = Math.max(...vehicles.map(v => v.range));
    const minPrice = Math.min(...vehicles.map(v => v.price));
    const maxSpeed = Math.max(...vehicles.map(v => v.topSpeed));
    const maxBattery = Math.max(...vehicles.map(v => v.batteryCapacity));

    const scoredVehicles = vehicles.map(v => {
      // Relative Range score (out of 10)
      const rangeScore = Math.round(((v.range / maxRange) * 5 + 5) * 10) / 10;
      // Relative Price/Affordability score (out of 10)
      const priceScore = Math.round(((minPrice / v.price) * 5 + 5) * 10) / 10;
      // Relative Performance score (out of 10)
      const perfScore = Math.round(((v.topSpeed / maxSpeed) * 5 + 5) * 10) / 10;
      // Comfort & Ergonomics score from specs
      const comfortScore = v.seating > 4 ? 9.5 : (v.type.includes('Family') || v.type.includes('Comfort') ? 9.4 : 8.8);
      // Value for Money score (balance of range per rupee)
      const valueScore = Math.round((((rangeScore * 0.6) + (priceScore * 0.4))) * 10) / 10;

      // Weighted Composite Score (out of 100)
      const overallScore = Math.round((rangeScore * 2.5) + (priceScore * 2.5) + (perfScore * 2.0) + (comfortScore * 1.5) + (valueScore * 1.5));

      return {
        vehicle: v,
        overallScore,
        breakdown: {
          range: Math.min(Math.round(rangeScore), 10),
          price: Math.min(Math.round(priceScore), 10),
          performance: Math.min(Math.round(perfScore), 10),
          comfort: Math.min(Math.round(comfortScore), 10),
          value: Math.min(Math.round(valueScore), 10)
        }
      };
    });

    // Sort descending by overallScore
    scoredVehicles.sort((a, b) => b.overallScore - a.overallScore);
    const champion = scoredVehicles[0];
    const runnerUp = scoredVehicles[1]?.vehicle;

    // Generate dynamic reasons explaining why the champion won
    const reasons = [];
    const champ = champion.vehicle;

    if (champ.range === maxRange) {
      reasons.push(`Superior Driving Range: Offers the longest range in this comparison at ${champ.range} km.`);
    } else if (champ.range >= maxRange * 0.85) {
      reasons.push(`High Highway Endurance: Generous ${champ.range} km range suitable for both city and interstate commutes.`);
    }

    if (champ.price === minPrice) {
      reasons.push(`Unmatched Value: Most accessible price point (${formatINR(champ.price)}) with lowest EMI (${champ.emi}).`);
    } else if (runnerUp && champ.price < runnerUp.price) {
      reasons.push(`Lower Acquisition Cost: Costs ${formatINR(runnerUp.price - champ.price)} less than ${runnerUp.name}.`);
    } else {
      reasons.push(`High Performance-per-Rupee: Offers premium capabilities and high battery density at ${formatINR(champ.price)}.`);
    }

    if (champ.topSpeed === maxSpeed) {
      reasons.push(`Peak Acceleration & Speed: Highest top velocity in group reaching ${champ.topSpeed} km/h.`);
    }

    if (champ.batteryCapacity === maxBattery) {
      reasons.push(`Highest Battery Density: Equipped with a massive ${champ.batteryCapacity} kWh pack with fast recharge.`);
    } else {
      reasons.push(`Optimized Energy Consumption: Low running cost of approximately ${champ.petrolComparison?.runningCostEV || '₹0.30/km'}.`);
    }

    if (champ.studentDailyPlan) {
      reasons.push(`Student & Family Friendly: Eligible for flexible daily concept plans starting from ₹${champ.studentDailyPlan.schoolDaily}/day.`);
    }

    return {
      winner: champ,
      score: champion.overallScore,
      breakdown: champion.breakdown,
      reasons: reasons.slice(0, 5) // Top 5 distinct reasons
    };
  };

  const bestChoice = calculateBestChoice();

  // Helper for comparison indicators: ✓ Better, ○ Average, — Not Available
  const getIndicator = (val, maxVal, isPrice = false) => {
    if (val === undefined || val === null) return { text: '—', color: 'text-slate-400' };
    if (isPrice) {
      const minP = Math.min(...vehicles.map(v => v.price));
      if (val === minP) return { text: '✓ Better', color: 'text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full' };
      return { text: '○ Average', color: 'text-slate-400' };
    }
    if (val === maxVal) return { text: '✓ Better', color: 'text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full' };
    return { text: '○ Average', color: 'text-slate-400' };
  };

  const maxRange = Math.max(...vehicles.map(v => v.range));
  const maxSpeed = Math.max(...vehicles.map(v => v.topSpeed));
  const maxBattery = Math.max(...vehicles.map(v => v.batteryCapacity));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Vehicle Comparison Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparing {vehicles.length} of 4 models simultaneously with automated spec grading
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Matrix Table & Best Choice Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* COMPARISON TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 w-44 min-w-36 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Feature / Model
                  </th>
                  {vehicles.map((v) => (
                    <th key={v.id} className="p-4 min-w-56 text-left relative align-top">
                      <button
                        onClick={() => onRemoveVehicle(v.id)}
                        className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex flex-col items-center text-center">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="h-20 sm:h-24 max-w-full object-contain mb-2"
                        />
                        <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                          {v.brandName}
                        </span>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">
                          {v.name}
                        </h4>
                        <span className="text-xs font-black text-cyan-500 mt-1">
                          {formatINR(v.price)}
                        </span>
                      </div>
                    </th>
                  ))}
                  {/* Empty Slots */}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => (
                    <th key={`empty-th-${i}`} className="p-4 min-w-44 text-center border-l border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-medium">
                      <div className="h-full flex flex-col items-center justify-center py-6">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
                          +
                        </div>
                        <span className="text-xs">Add Model</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {/* Price */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Price (Showroom)</td>
                  {vehicles.map(v => {
                    const ind = getIndicator(v.price, 0, true);
                    return (
                      <td key={v.id} className="p-4">
                        <div className="font-extrabold text-slate-900 dark:text-white">{formatINR(v.price)}</div>
                        <span className={`text-[10px] ${ind.color}`}>{ind.text}</span>
                      </td>
                    );
                  })}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Range */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Driving Range</td>
                  {vehicles.map(v => {
                    const ind = getIndicator(v.range, maxRange);
                    return (
                      <td key={v.id} className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{v.range} km</div>
                        <span className={`text-[10px] ${ind.color}`}>{ind.text}</span>
                      </td>
                    );
                  })}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Battery Capacity */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Battery Pack</td>
                  {vehicles.map(v => {
                    const ind = getIndicator(v.batteryCapacity, maxBattery);
                    return (
                      <td key={v.id} className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{v.batteryCapacity} kWh</div>
                        <span className={`text-[10px] ${ind.color}`}>{ind.text}</span>
                      </td>
                    );
                  })}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Charging Time */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Charging Time</td>
                  {vehicles.map(v => (
                    <td key={v.id} className="p-4 text-slate-700 dark:text-slate-300">
                      {v.chargingTime}
                    </td>
                  ))}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Top Speed */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Top Speed</td>
                  {vehicles.map(v => {
                    const ind = getIndicator(v.topSpeed, maxSpeed);
                    return (
                      <td key={v.id} className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{v.topSpeed} km/h</div>
                        <span className={`text-[10px] ${ind.color}`}>{ind.text}</span>
                      </td>
                    );
                  })}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Motor Power */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Motor Power</td>
                  {vehicles.map(v => (
                    <td key={v.id} className="p-4 text-slate-700 dark:text-slate-300">
                      {v.power}
                    </td>
                  ))}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Seating */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Seating Capacity</td>
                  {vehicles.map(v => (
                    <td key={v.id} className="p-4 text-slate-700 dark:text-slate-300">
                      {v.seating} {v.seating === 1 ? 'Rider' : (v.category === 'bike' ? 'Rider + Pillion' : 'Occupants')}
                    </td>
                  ))}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Monthly EMI */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Estimated EMI</td>
                  {vehicles.map(v => (
                    <td key={v.id} className="p-4 font-bold text-cyan-600 dark:text-cyan-400">
                      {v.emi}
                    </td>
                  ))}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Running Cost / Maintenance */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Running Cost</td>
                  {vehicles.map(v => (
                    <td key={v.id} className="p-4 text-slate-700 dark:text-slate-300">
                      <div className="font-semibold">{v.petrolComparison?.runningCostEV || '₹0.30/km'}</div>
                      <span className="text-[10px] text-emerald-500 font-medium">
                        Saves {v.petrolComparison?.annualSavings || '₹30,000/yr'}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Student Suitability */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Student Plan</td>
                  {vehicles.map(v => (
                    <td key={v.id} className="p-4">
                      {v.studentDailyPlan ? (
                        <div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                            ✓ From ₹{v.studentDailyPlan.schoolDaily}/day
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">
                            College: ₹{v.studentDailyPlan.collegeDaily}/day
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">— Not Applicable</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 4 - vehicles.length }).map((_, i) => <td key={i} />)}
                </tr>
              </tbody>
            </table>
          </div>

          {/* DYNAMIC "OUR BEST CHOICE" SECTION */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-950 border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden text-left">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
              {/* Winner Info */}
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <Trophy className="w-4 h-4 fill-amber-400" />
                  <span>Our Best Choice (Dynamically Evaluated)</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    🏆 {bestChoice.winner.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-semibold mt-1">
                    {bestChoice.winner.brandName} • {bestChoice.winner.type}
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                    Why we recommend this model over competitors:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                    {bestChoice.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onViewVehicle(bestChoice.winner);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>View Winning Model</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Score Card */}
              <div className="w-full lg:w-72 bg-slate-900/80 rounded-2xl p-5 border border-slate-800/90 shadow-xl shrink-0 backdrop-blur-md">
                <div className="text-center pb-4 border-b border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Comparative Score
                  </span>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 mt-1">
                    {bestChoice.score}<span className="text-xl text-slate-500 font-bold">/100</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold mt-1 block">
                    Rank #1 in Comparison
                  </span>
                </div>

                {/* Score Breakdown Sliders */}
                <div className="space-y-3 pt-4 text-xs font-medium">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Range:</span>
                      <span className="font-bold text-cyan-400">{bestChoice.breakdown.range}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${bestChoice.breakdown.range * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Price / Affordability:</span>
                      <span className="font-bold text-emerald-400">{bestChoice.breakdown.price}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${bestChoice.breakdown.price * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Performance:</span>
                      <span className="font-bold text-indigo-400">{bestChoice.breakdown.performance}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${bestChoice.breakdown.performance * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Comfort & Space:</span>
                      <span className="font-bold text-amber-400">{bestChoice.breakdown.comfort}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${bestChoice.breakdown.comfort * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Value for Money:</span>
                      <span className="font-bold text-sky-400">{bestChoice.breakdown.value}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-400 rounded-full" style={{ width: `${bestChoice.breakdown.value * 10}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
