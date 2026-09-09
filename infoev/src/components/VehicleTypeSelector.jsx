import { Bike, Car, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function VehicleTypeSelector({
  selectedType, // 'bike' | 'car'
  onSelectType,
  bikesCount = 14,
  carsCount = 10
}) {
  return (
    <section id="vehicle-type-selection" className="py-12 sm:py-16 bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Your Vehicle Segment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            What are you looking for?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2.5 text-sm sm:text-base leading-relaxed">
            Choose your vehicle category to customize your showroom experience with dedicated models, specialized specs, and tailored categories.
          </p>
        </div>

        {/* Two Large Premium Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* 1. ELECTRIC BIKES CARD */}
          <div
            onClick={() => onSelectType('bike')}
            className={`group relative rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
              selectedType === 'bike'
                ? 'bg-gradient-to-b from-white via-cyan-50/40 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-cyan-500 shadow-2xl shadow-cyan-500/20 ring-4 ring-cyan-500/20 scale-[1.02]'
                : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-xl dark:hover:bg-slate-900/90 hover:-translate-y-1'
            }`}
          >
            {/* Top Status & Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                selectedType === 'bike'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
                <Bike className="w-3.5 h-3.5" />
                <span>{bikesCount} Models Available</span>
              </span>

              {selectedType === 'bike' && (
                <span className="flex items-center gap-1 text-xs font-black text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  <span>Selected: ✓ Electric Bikes</span>
                </span>
              )}
            </div>

            {/* Visual Stage */}
            <div className="relative h-44 sm:h-52 flex items-center justify-center my-3 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-slate-950/60 dark:to-slate-900/40 border border-slate-200/50 dark:border-slate-800/60">
              <img
                src="/images/ultraviolette_f77.png"
                alt="Electric Bikes"
                className="max-h-36 sm:max-h-44 object-contain transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Info & Description */}
            <div className="mt-2 text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏍️</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Electric Bikes
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Smart electric scooters and high-performance motorcycles built for effortless urban commuting, student savings, and blistering instant torque.
              </p>

              {/* Spec Highlights */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Starting From</span>
                  <span>₹45,000</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Top Range</span>
                  <span className="text-cyan-600 dark:text-cyan-400">Up to 323 km</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Student Plan</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₹50/mo Eligible</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectType('bike');
                }}
                className={`w-full mt-6 py-3.5 px-5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedType === 'bike'
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white'
                }`}
              >
                <span>{selectedType === 'bike' ? 'Browsing Electric Bikes' : 'Explore Electric Bikes'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. ELECTRIC CARS CARD */}
          <div
            onClick={() => onSelectType('car')}
            className={`group relative rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
              selectedType === 'car'
                ? 'bg-gradient-to-b from-white via-indigo-50/40 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-indigo-500 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/20 scale-[1.02]'
                : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl dark:hover:bg-slate-900/90 hover:-translate-y-1'
            }`}
          >
            {/* Top Status & Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                selectedType === 'car'
                  ? 'bg-indigo-600 text-white shadow-md font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
                <Car className="w-3.5 h-3.5" />
                <span>{carsCount} Models Available</span>
              </span>

              {selectedType === 'car' && (
                <span className="flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>Selected: ✓ Electric Cars</span>
                </span>
              )}
            </div>

            {/* Visual Stage */}
            <div className="relative h-44 sm:h-52 flex items-center justify-center my-3 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-slate-950/60 dark:to-slate-900/40 border border-slate-200/50 dark:border-slate-800/60">
              <img
                src="/images/tesla_model_s.png"
                alt="Electric Cars"
                className="max-h-36 sm:max-h-44 object-contain transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Info & Description */}
            <div className="mt-2 text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Electric Cars
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Spacious cabins, 5-star passenger safety, long-range highway cruising, and cutting-edge luxury sedans and family SUVs with ultra-fast charging.
              </p>

              {/* Spec Highlights */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Starting From</span>
                  <span>₹6,99,000</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Top Range</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Up to 643 km</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Fast DC Charge</span>
                  <span className="text-emerald-600 dark:text-emerald-400">800V Ultra-Speed</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectType('car');
                }}
                className={`w-full mt-6 py-3.5 px-5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedType === 'car'
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-white'
                }`}
              >
                <span>{selectedType === 'car' ? 'Browsing Electric Cars' : 'Explore Electric Cars'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
