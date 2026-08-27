import React from 'react';
import { X, Scale, ShieldAlert, DollarSign } from 'lucide-react';

export default function CompareDrawer({ comparedVehicles, onRemove, onClose }) {
  if (comparedVehicles.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-500 transform translate-y-0 max-h-[85vh] md:max-h-[50vh] overflow-y-auto">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">
            Compare Models ({comparedVehicles.length}/3)
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="p-6">
        {comparedVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <ShieldAlert className="w-12 h-12 mb-2 stroke-[1.5]" />
            <p>No vehicles selected. Select up to 3 models to compare specs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            {/* Specs Label Column (Visible on Desktop) */}
            <div className="hidden md:block space-y-6 pt-[120px] text-sm font-medium text-slate-400 dark:text-slate-500">
              <div className="h-[48px] flex items-center">Price</div>
              <div className="h-[48px] flex items-center border-t border-slate-100 dark:border-slate-800/50">Category</div>
              <div className="h-[48px] flex items-center border-t border-slate-100 dark:border-slate-800/50">Range</div>
              <div className="h-[48px] flex items-center border-t border-slate-100 dark:border-slate-800/50">Top Speed</div>
              <div className="h-[48px] flex items-center border-t border-slate-100 dark:border-slate-800/50">Battery</div>
              <div className="h-[48px] flex items-center border-t border-slate-100 dark:border-slate-800/50">Weight</div>
            </div>

            {/* Compared Vehicles Columns */}
            {comparedVehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                className="relative bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/50"
              >
                {/* Remove button */}
                <button
                  onClick={() => onRemove(vehicle.id)}
                  className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Vehicle Card Header */}
                <div className="flex gap-4 md:flex-col md:items-center text-left md:text-center pb-4">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-20 h-15 md:w-28 md:h-20 object-contain rounded-md"
                  />
                  <div>
                    <div className="flex items-center gap-1 justify-start md:justify-center">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {vehicle.brandName}
                      </span>
                      <span className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[8px] font-bold uppercase text-slate-500 dark:text-slate-400">
                        {vehicle.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-tight mt-0.5">
                      {vehicle.name}
                    </h4>
                  </div>
                </div>

                {/* Specs comparison */}
                <div className="space-y-1 text-xs md:text-sm">
                  {/* Price */}
                  <div className="h-[48px] flex items-center justify-between md:justify-center border-t border-slate-200/50 dark:border-slate-800/40">
                    <span className="md:hidden text-slate-400 font-medium">Price:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-0.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                      {vehicle.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Type */}
                  <div className="h-[48px] flex items-center justify-between md:justify-center border-t border-slate-200/50 dark:border-slate-800/40">
                    <span className="md:hidden text-slate-400 font-medium">Category:</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium truncate">{vehicle.type}</span>
                  </div>

                  {/* Range */}
                  <div className="h-[48px] flex items-center justify-between md:justify-center border-t border-slate-200/50 dark:border-slate-800/40">
                    <span className="md:hidden text-slate-400 font-medium">Range:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{vehicle.range} km</span>
                  </div>

                  {/* Speed */}
                  <div className="h-[48px] flex items-center justify-between md:justify-center border-t border-slate-200/50 dark:border-slate-800/40">
                    <span className="md:hidden text-slate-400 font-medium">Top Speed:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{vehicle.topSpeed} km/h</span>
                  </div>

                  {/* Battery */}
                  <div className="h-[48px] flex items-center justify-between md:justify-center border-t border-slate-200/50 dark:border-slate-800/40">
                    <span className="md:hidden text-slate-400 font-medium">Battery:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{vehicle.batteryCapacity} kWh</span>
                  </div>

                  {/* Weight */}
                  <div className="h-[48px] flex items-center justify-between md:justify-center border-t border-slate-200/50 dark:border-slate-800/40">
                    <span className="md:hidden text-slate-400 font-medium">Weight:</span>
                    <span className="text-slate-800 dark:text-slate-200">{vehicle.weight} kg</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - comparedVehicles.length }).map((_, i) => (
              <div 
                key={`empty-${i}`} 
                className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 h-full min-h-[300px] text-slate-400/80"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                  <span className="text-slate-400 dark:text-slate-500 font-bold text-lg">+</span>
                </div>
                <p className="text-xs text-center font-medium">Add another model to compare</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
