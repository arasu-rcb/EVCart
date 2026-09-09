import { X, Scale, ArrowRight, Trash2 } from 'lucide-react';
import { formatINR } from '../vehiclesData';

export default function CompareDrawer({
  comparedVehicles,
  onRemove,
  onClear,
  onOpenFullCompare
}) {
  if (!comparedVehicles || comparedVehicles.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 text-white shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Info & Chips */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs sm:text-sm block">
                Compare Queue ({comparedVehicles.length}/4)
              </span>
              <span className="text-[10px] text-slate-400">
                {comparedVehicles.length >= 2 ? 'Ready to compare specs & find best choice' : 'Select at least 2 models'}
              </span>
            </div>
          </div>

          {/* Vehicle mini-chips */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {comparedVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 text-xs"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-7 h-5 object-contain"
                />
                <span className="font-bold text-slate-200 truncate max-w-28">{vehicle.name}</span>
                <span className="text-cyan-400 text-[10px] font-semibold">{formatINR(vehicle.price)}</span>
                <button
                  onClick={() => onRemove(vehicle.id)}
                  className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={onClear}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={onOpenFullCompare}
            disabled={comparedVehicles.length < 2}
            className="px-5 py-2.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Comparison ({comparedVehicles.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
