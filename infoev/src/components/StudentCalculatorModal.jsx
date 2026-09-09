import { useState } from 'react';
import {
  X, Calculator, GraduationCap, School, ArrowRight,
  AlertCircle
} from 'lucide-react';
import { bikesData, formatINR } from '../vehiclesData';

export default function StudentCalculatorModal({
  isOpen,
  onClose,
  initialStudentType = 'college',
  initialPrice = 120000,
  onProceedToVerification
}) {
  const [studentType, setStudentType] = useState(initialStudentType); // 'school' | 'college'
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [monthlyPayment, setMonthlyPayment] = useState(studentType === 'school' ? 50 : 100);
  const [downPayment, setDownPayment] = useState(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  if (!isOpen) return null;

  // Handle vehicle quick select
  const handleVehicleSelect = (id) => {
    setSelectedVehicleId(id);
    const found = bikesData.find(b => b.id === id);
    if (found) {
      setVehiclePrice(found.price);
    }
  };

  // Exact unmanipulated mathematical formula per prompt instructions:
  // Remaining Balance = Vehicle Price - Down Payment
  // Estimated Duration (Months) = Remaining Balance ÷ Monthly Payment
  const remainingBalance = Math.max(vehiclePrice - downPayment, 0);
  const durationMonths = monthlyPayment > 0 ? Math.ceil(remainingBalance / monthlyPayment) : 0;
  const durationYears = (durationMonths / 12).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Student Monthly Plan Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Conceptual Demonstration • Formula: Vehicle Price ÷ Monthly Payment
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

        {/* Calculator Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Student Status / Monthly Tier Selection */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              1. Choose Student Payment Tier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setStudentType('school');
                  setMonthlyPayment(50);
                }}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                  studentType === 'school'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <School className="w-5 h-5 shrink-0 text-emerald-500" />
                <div>
                  <div className="text-sm font-black">Plan A: School Student</div>
                  <div className="text-[10px] text-slate-400">₹50 / month • Guardian Consent</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudentType('college');
                  setMonthlyPayment(100);
                }}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                  studentType === 'college'
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <GraduationCap className="w-5 h-5 shrink-0 text-cyan-500" />
                <div>
                  <div className="text-sm font-black">Plan B: College Student</div>
                  <div className="text-[10px] text-slate-400">₹100 / month • College ID</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Select from Eligible Fleet */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              2. Or Pick a Vehicle from Catalog
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleSelect(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Custom Price (Enter below)</option>
              {bikesData.map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name} — {formatINR(bike.price)} (Range: {bike.range} km)
                </option>
              ))}
            </select>
          </div>

          {/* Sliders: Vehicle Price & Down Payment */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Vehicle Ex-Showroom Price:</span>
                <span className="text-slate-900 dark:text-white font-black text-sm">{formatINR(vehiclePrice)}</span>
              </div>
              <input
                type="range"
                min={35000}
                max={250000}
                step={5000}
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Optional Down Payment:</span>
                <span className="text-slate-900 dark:text-white font-black text-sm">{formatINR(downPayment)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.min(vehiclePrice - 5000, 50000)}
                step={2000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* CALCULATION RESULTS CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Contribution</span>
                <span className="text-2xl font-black text-emerald-400">
                  ₹{monthlyPayment} <span className="text-xs font-normal text-slate-400">/ month</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Balance</span>
                <span className="text-xl font-bold text-white">
                  {formatINR(remainingBalance)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Duration Required</span>
                <div className="text-xl font-black text-cyan-300 mt-0.5">
                  {durationMonths.toLocaleString()} Months
                </div>
                <span className="text-[10px] text-slate-400">({durationYears} Years)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount Paid</span>
                <div className="text-xl font-black text-white mt-0.5">
                  {formatINR(downPayment + (durationMonths * monthlyPayment))}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Zero Banking Interest</span>
              </div>
            </div>

            {/* Conceptual Demonstration Disclaimer */}
            <div className="flex items-start gap-2 pt-2 text-[11px] text-amber-300/90 leading-relaxed border-t border-slate-800">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Conceptual Demonstration:</strong> Because ₹50 or ₹100 per month yields an extended repayment horizon ({durationMonths.toLocaleString()} months), this calculator functions as an educational illustration for student micro-payments. It does not represent an approved bank loan or formal credit facility.
              </span>
            </div>
          </div>

          {/* Action Strip */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                if (onProceedToVerification) onProceedToVerification(studentType);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>Proceed to {studentType === 'school' ? 'Guardian Verification' : 'Student Eligibility'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-all cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
