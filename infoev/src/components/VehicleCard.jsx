import { Star, Check, ArrowRight, BatteryCharging, Gauge, Zap } from 'lucide-react';
import { formatINR } from '../vehiclesData';

export default function VehicleCard({
  vehicle,
  isCompared,
  onToggleCompare,
  onViewVehicle
}) {
  const isStudentEligible = Boolean(vehicle.studentMonthlyPlan || vehicle.school || vehicle.college);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-slate-950/40 overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group text-left">
      
      {/* CARD MEDIA TOP (Consistent Aspect Ratio & Studio Container) */}
      <div className="relative flex justify-center items-center h-52 bg-slate-100/60 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/60 overflow-hidden">
        
        {/* Type & Student Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 dark:bg-slate-800/90 text-slate-100 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
            {vehicle.type}
          </span>
          {isStudentEligible && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[9px] font-black">
              ₹50/mo Plan
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/80 text-[10px] font-bold text-amber-500 shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          <span>{vehicle.rating}</span>
          <span className="text-slate-400 font-normal">({vehicle.reviewCount || 150})</span>
        </div>

        {/* Compare Checkbox Button Top-Right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(vehicle.id);
          }}
          className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-[10px] font-bold cursor-pointer transition-all ${
            isCompared
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
              : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-500 shadow-sm'
          }`}
          title={isCompared ? "Remove from comparison" : "Add to comparison queue"}
        >
          <Check className={`w-3.5 h-3.5 stroke-[2.5] ${isCompared ? 'text-white' : 'text-slate-400'}`} />
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* Vehicle Image Stage */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="max-h-36 sm:max-h-40 max-w-[85%] object-contain transform group-hover:scale-106 transition-transform duration-500 filter drop-shadow-md"
          />
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Name */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">
                {vehicle.brandName}
              </span>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mt-0.5 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {vehicle.name}
              </h3>
            </div>
            {vehicle.school && (
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black border border-amber-500/30 shrink-0" title="School Student Concept">
                Teen Safe
              </span>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 py-2.5 px-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/40 text-left">
            <div>
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Range</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <BatteryCharging className="w-3 h-3 text-emerald-500 shrink-0" />
                {vehicle.range} km
              </span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Top Speed</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <Gauge className="w-3 h-3 text-cyan-500 shrink-0" />
                {vehicle.topSpeed} km/h
              </span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Battery</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <Zap className="w-3 h-3 text-indigo-400 shrink-0" />
                {vehicle.batteryCapacity} kWh
              </span>
            </div>
          </div>
        </div>

        {/* Pricing, EMI & Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                Showroom Price
              </span>
              <span className="font-black text-slate-900 dark:text-white text-lg sm:text-xl">
                {formatINR(vehicle.price)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                EMI From
              </span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-xs">
                {vehicle.emi}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onViewVehicle(vehicle)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border border-slate-700/60"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onViewVehicle(vehicle, 'enquire')}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Enquire / Book</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
