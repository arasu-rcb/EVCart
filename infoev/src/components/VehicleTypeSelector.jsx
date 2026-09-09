import { Check, Sparkles } from 'lucide-react';

export default function VehicleTypeSelector({
  selectedType = 'bike', // 'bike' | 'car'
  onSelectType,
  bikesCount = 14,
  carsCount = 10
}) {
  return (
    <section
      id="vehicle-type-selection"
      className="py-8 sm:py-10 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vehicle Segment Selector</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          What are you looking for?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-xs sm:text-sm sm:max-w-xl mx-auto leading-relaxed">
          Toggle between Electric Bikes and Electric Cars to customize models, specs, and lifestyle categories below.
        </p>

        {/* Premium Automotive Toggle Control */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/40 w-full max-w-lg relative">
            
            {/* 1. BIKES TOGGLE OPTION */}
            <button
              type="button"
              onClick={() => onSelectType('bike')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                selectedType === 'bike'
                  ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 scale-[1.01]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🏍️</span>
                <span>Electric Bikes</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight transition-colors ${
                  selectedType === 'bike'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {bikesCount} Models
              </span>

              {selectedType === 'bike' && (
                <Check className="w-4 h-4 text-slate-950 hidden sm:inline-block stroke-[3]" />
              )}
            </button>

            {/* 2. CARS TOGGLE OPTION */}
            <button
              type="button"
              onClick={() => onSelectType('car')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                selectedType === 'car'
                  ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-[1.01]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🚗</span>
                <span>Electric Cars</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight transition-colors ${
                  selectedType === 'car'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {carsCount} Models
              </span>

              {selectedType === 'car' && (
                <Check className="w-4 h-4 text-white hidden sm:inline-block stroke-[3]" />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Spec Highlights Strip for Selected Segment */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold animate-in fade-in duration-300">
          {selectedType === 'bike' ? (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                <span className="text-cyan-500">⚡</span> Starting From ₹45,000
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                <span className="text-cyan-500">🔋</span> Top Range up to 323 km
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                <span className="text-emerald-500">🎓</span> Student Plan from ₹50/mo
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                <span className="text-indigo-500">⚡</span> Starting From ₹6,99,000
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                <span className="text-indigo-500">🔋</span> Top Range up to 643 km
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                <span className="text-blue-500">⚡</span> 800V Ultra-Speed DC Fast Charge
              </span>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
