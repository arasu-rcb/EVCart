import { useState } from 'react';
import {
  X, CheckCircle2, Gift, RefreshCw, Clock, Users,
  ShieldCheck, GraduationCap, ArrowRight, Sparkles
} from 'lucide-react';
import { bikesData, carsData } from '../vehiclesData';

export default function OfferClaimModal({
  isOpen,
  onClose,
  offer,
  onOpenStudentPlan
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    selectedVehicle: '',
    exchangeVehicleType: 'bike',
    exchangeAge: '3',
    exchangeCondition: 'good'
  });
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen || !offer) return null;

  const allVehicles = [...bikesData, ...carsData];

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = `EVISTA-${offer.id ? offer.id.substring(0, 4).toUpperCase() : 'OFFER'}-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setStep('success');
  };

  const handleResetAndClose = () => {
    setStep('form');
    setFormData({
      name: '',
      phone: '',
      city: '',
      selectedVehicle: '',
      exchangeVehicleType: 'bike',
      exchangeAge: '3',
      exchangeCondition: 'good'
    });
    onClose();
  };

  // Icon mapping
  const getOfferIcon = (id) => {
    switch (id) {
      case 'student-welcome':
        return <GraduationCap className="w-6 h-6 text-emerald-500" />;
      case 'exchange-bonus':
        return <RefreshCw className="w-6 h-6 text-cyan-500" />;
      case 'festive-zero-down':
        return <Gift className="w-6 h-6 text-amber-500" />;
      case 'early-booking':
        return <Clock className="w-6 h-6 text-indigo-500" />;
      case 'family-pack':
        return <Users className="w-6 h-6 text-purple-500" />;
      case 'corporate-green':
        return <ShieldCheck className="w-6 h-6 text-sky-500" />;
      default:
        return <Gift className="w-6 h-6 text-cyan-500" />;
    }
  };

  // Estimated exchange calculation
  const getEstimatedValuation = () => {
    let base = formData.exchangeVehicleType === 'bike' ? 12000 : 85000;
    if (formData.exchangeCondition === 'excellent') base += 5000;
    if (formData.exchangeCondition === 'fair') base -= 3000;
    const ageNum = parseInt(formData.exchangeAge, 10) || 3;
    base = Math.max(8000, base - (ageNum * 800));
    return base;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {getOfferIcon(offer.id)}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {offer.category || 'Exclusive Promotion'}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
                {offer.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Highlight Banner */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-slate-800 dark:text-slate-200 text-xs">
                <div className="font-extrabold text-cyan-700 dark:text-cyan-300 text-sm mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  <span>{offer.discount}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  {offer.description}
                </p>
              </div>

              {/* Special Exchange Calculator Inputs */}
              {offer.id === 'exchange-bonus' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                    Old Petrol Vehicle Valuation Estimator
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Old Vehicle Type</label>
                      <select
                        value={formData.exchangeVehicleType}
                        onChange={(e) => setFormData({ ...formData, exchangeVehicleType: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        <option value="bike">Petrol 2-Wheeler (Scooter/Bike)</option>
                        <option value="car">Petrol Car / Hatchback / Sedan</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Vehicle Age (Years)</label>
                      <select
                        value={formData.exchangeAge}
                        onChange={(e) => setFormData({ ...formData, exchangeAge: e.target.value })}
                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        <option value="1">1 - 2 Years</option>
                        <option value="3">3 - 5 Years</option>
                        <option value="7">6 - 8 Years</option>
                        <option value="10">8+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Estimated Exchange Credit:</span>
                    <span className="text-sm font-black text-cyan-600 dark:text-cyan-400">
                      ₹{getEstimatedValuation().toLocaleString('en-IN')} + ₹15,000 Bonus
                    </span>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/30 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/30 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/30 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interested EV Model (Optional)
                  </label>
                  <select
                    value={formData.selectedVehicle}
                    onChange={(e) => setFormData({ ...formData, selectedVehicle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/30 font-medium"
                  >
                    <option value="">Select an EV from our fleet...</option>
                    {allVehicles.map(v => (
                      <option key={v.id} value={v.name}>{v.name} ({v.type === 'bike' ? 'Bike' : 'Car'})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Student Plan Direct Link */}
              {offer.id === 'student-welcome' && onOpenStudentPlan && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenStudentPlan();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Student Plan Calculator (₹50/mo)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <p className="text-[10px] text-slate-400 leading-normal pt-1">
                * {offer.terms}
              </p>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lock Offer & Get Showroom Voucher</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: Instant Confirmation */
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Offer Locked Successfully
                </span>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Voucher Ready!
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 max-w-sm mx-auto">
                  Your promotional voucher has been generated. Our concierge desk will contact you at <strong>{formData.phone}</strong> to confirm application.
                </p>
              </div>

              {/* Pass Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Voucher Code</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-black">
                    {confirmationCode}
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Beneficiary:</span>
                    <span className="font-bold">{formData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Benefit:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{offer.badge}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Validity:</span>
                    <span className="font-bold">14 Days from today</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Done / Return to Showroom
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
