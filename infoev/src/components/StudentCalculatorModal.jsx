import { useState } from 'react';
import {
  X, Calculator, GraduationCap, School, ArrowRight,
  ShieldCheck
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
  const [dailyPayment, setDailyPayment] = useState(studentType === 'school' ? 50 : 100);
  const [downPayment, setDownPayment] = useState(10000);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  if (!isOpen) return null;

  // Handle vehicle quick select
  const handleVehicleSelect = (id) => {
    setSelectedVehicleId(id);
    const found = bikesData.find(b => b.id === id);
    if (found) {
      setVehiclePrice(found.price);
      if (studentType === 'school' && found.studentDailyPlan) {
        setDailyPayment(found.studentDailyPlan.schoolDaily);
      } else if (found.studentDailyPlan) {
        setDailyPayment(found.studentDailyPlan.collegeDaily);
      }
    }
  };

  // Calculations
  const principal = Math.max(vehiclePrice - downPayment, 0);
  const monthlyPayment = dailyPayment * 30;
  const durationMonths = monthlyPayment > 0 ? (principal / monthlyPayment) : 0;
  const roundedMonths = Math.ceil(durationMonths);
  const totalPayable = downPayment + (monthlyPayment * roundedMonths);

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
                Student EV Payment Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive demonstration model for daily micro-installments
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
          
          {/* Step 1: Student Category */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              1. Select Student Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setStudentType('school');
                  setDailyPayment(50);
                }}
                className={`p-3 rounded-2xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                  studentType === 'school'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <School className="w-5 h-5 shrink-0" />
                <div>
                  <div className="text-sm font-black">School Student</div>
                  <div className="text-[10px] text-slate-400">From ₹50/day • Parent Consent</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudentType('college');
                  setDailyPayment(100);
                }}
                className={`p-3 rounded-2xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                  studentType === 'college'
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <GraduationCap className="w-5 h-5 shrink-0" />
                <div>
                  <div className="text-sm font-black">College Student</div>
                  <div className="text-[10px] text-slate-400">From ₹100/day • College ID</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Select from Eligible Bikes */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              2. Or Pick a Popular Model
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleSelect(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Custom Price (Enter below)</option>
              {bikesData.map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name} — {formatINR(bike.price)} (Range: {bike.range} km)
                </option>
              ))}
            </select>
          </div>

          {/* Sliders: Vehicle Price, Down Payment, Daily Payment */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">Vehicle Base Price:</span>
                <span className="font-extrabold text-cyan-500 text-sm">{formatINR(vehiclePrice)}</span>
              </div>
              <input
                type="range"
                min="35000"
                max="250000"
                step="5000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">Down Payment / Govt Subsidy:</span>
                <span className="font-extrabold text-emerald-500 text-sm">{formatINR(downPayment)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="2500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">Target Daily Contribution:</span>
                <span className="font-extrabold text-indigo-500 text-sm">₹{dailyPayment} / day</span>
              </div>
              <input
                type="range"
                min="30"
                max="250"
                step="5"
                value={dailyPayment}
                onChange={(e) => setDailyPayment(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* CALCULATION RESULTS PANEL */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white shadow-xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Daily Payment</span>
                <span className="text-base font-black text-emerald-400">₹{dailyPayment}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Monthly Equiv.</span>
                <span className="text-base font-black text-cyan-400">{formatINR(monthlyPayment)}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Repayment Period</span>
                <span className="text-base font-black text-white">~{roundedMonths} mos</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Estimated</span>
                <span className="text-base font-black text-amber-400">{formatINR(totalPayable)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Remaining Balance to Amortize: <strong className="text-white">{formatINR(principal)}</strong></span>
              <span className="text-emerald-400 font-semibold">Zero Petrol Fuel Dependency</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onProceedToVerification(studentType);
              }}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Proceed to {studentType === 'school' ? 'Guardian Verification' : 'Student Eligibility'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            *Demo simulation. Actual finance terms depend on authorized lending partners and guardian approval.
          </p>
        </div>
      </div>
    </div>
  );
}
