import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { bikesData, carsData, formatINR } from '../vehiclesData';

export default function SearchModal({
  isOpen,
  onClose,
  onViewVehicle
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allVehicles = [...bikesData, ...carsData];

  const results = query.trim() === ''
    ? allVehicles.slice(0, 6)
    : allVehicles.filter(v => {
        const q = query.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.brandName.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.categories?.some(c => c.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Top */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by brand (e.g. Ather, Tesla), model name, category, or type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs text-slate-500">
          <span className="font-bold text-[10px] uppercase text-slate-400 shrink-0">Popular:</span>
          {['Ather', 'Ola', 'Tesla', 'College', 'School', 'Tata', 'Long Drive'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100 dark:divide-slate-800">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="font-bold">No vehicles found matching "{query}"</p>
              <p className="text-xs mt-1">Try searching for brands like "Ather", "Ola", or categories like "Daily" or "College".</p>
            </div>
          ) : (
            results.map(v => (
              <button
                key={v.id}
                onClick={() => {
                  onClose();
                  onViewVehicle(v);
                }}
                className="w-full py-3.5 px-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between gap-4 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-11 bg-slate-100 dark:bg-slate-950 rounded-xl p-1 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50">
                    <img src={v.image} alt={v.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-cyan-600 dark:text-cyan-400">
                        {v.brandName}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        {v.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-cyan-500 transition-colors">
                      {v.name}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Range: {v.range} km • Speed: {v.topSpeed} km/h
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {formatINR(v.price)}
                  </div>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold block">
                    EMI {v.emi}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
