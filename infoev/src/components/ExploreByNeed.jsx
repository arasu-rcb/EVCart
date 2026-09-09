import { ShieldCheck, Sparkles, Check, Bike, Car } from 'lucide-react';
import { bikeCategories, carCategories, bikesData, carsData } from '../vehiclesData';
import VehicleCard from './VehicleCard';

export default function ExploreByNeed({
  vehicleType = 'bike', // 'bike' | 'car'
  selectedCategory,
  onSelectCategory,
  onViewVehicle,
  onToggleCompare,
  comparedVehicleIds
}) {
  // Determine relevant categories and dataset based on selected vehicle type
  const categories = vehicleType === 'bike' ? bikeCategories : carCategories;
  const dataset = vehicleType === 'bike' ? bikesData : carsData;

  // Active category object (fallback to first if selectedCategory doesn't match this vehicle type)
  const activeCatObj = categories.find(c => c.id === selectedCategory) || categories[0];

  // Filter vehicles matching the selected category for this vehicle type
  const matchingVehicles = dataset.filter(v => v.categories?.includes(activeCatObj.id));

  return (
    <section id="explore-by-need" className="py-16 sm:py-20 bg-slate-100/70 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lifestyle-Driven Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore {vehicleType === 'bike' ? 'Electric Bikes' : 'Electric Cars'} by Need
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Every rider and driver has distinct priorities. Choose your primary purpose below to explore high-scoring {vehicleType === 'bike' ? 'bikes' : 'cars'} calibrated for your daily routine.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className={`grid gap-3 mb-10 ${
          vehicleType === 'bike' 
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-7' 
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
        }`}>
          {categories.map((category) => {
            const isSelected = activeCatObj.id === category.id;
            const count = dataset.filter(v => v.categories?.includes(category.id)).length;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-950 dark:bg-slate-900 border-cyan-500 text-white shadow-xl shadow-cyan-500/20 scale-102 ring-2 ring-cyan-500/40'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400" />
                )}

                <div>
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h3 className={`font-black text-sm tracking-tight leading-snug ${
                    isSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-2 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {category.description}
                  </p>
                </div>

                <div className={`mt-4 pt-2.5 border-t flex items-center justify-between text-[10px] font-bold ${
                  isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 dark:border-slate-800 text-slate-400'
                }`}>
                  <span className={isSelected ? 'text-cyan-400' : 'text-cyan-600 dark:text-cyan-400'}>
                    {count} {vehicleType === 'bike' ? 'Bikes' : 'Cars'}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {category.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CATEGORY BANNER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl mb-10 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeCatObj.emoji}</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Showing {vehicleType === 'bike' ? 'Bikes' : 'Cars'} for {activeCatObj.name}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
                {activeCatObj.description}
              </p>

              {/* Special School Student Guardian Notification */}
              {activeCatObj.id === 'school' && (
                <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    Special Safety Concept: Direct purchase disabled for school students. Parent/Guardian verification required before test ride or booking.
                  </span>
                </div>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700/60 shrink-0 self-start md:self-auto">
              {vehicleType === 'bike' ? <Bike className="w-4 h-4 text-cyan-500" /> : <Car className="w-4 h-4 text-indigo-500" />}
              <span>{matchingVehicles.length} Models Matched</span>
            </div>
          </div>

          {/* Priority Highlights for this Category */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
              Key Evaluation Criteria:
            </span>
            {activeCatObj.prioritySpecs.map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700/50 flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-cyan-500" />
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {matchingVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isCompared={comparedVehicleIds.includes(vehicle.id)}
              onToggleCompare={onToggleCompare}
              onViewVehicle={onViewVehicle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
