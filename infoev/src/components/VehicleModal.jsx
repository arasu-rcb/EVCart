import { useState } from 'react';
import {
  X, CheckCircle2, ChevronRight, RotateCw, Image as ImageIcon,
  Zap, Star, User, GraduationCap, Scale
} from 'lucide-react';
import { formatINR } from '../vehiclesData';
import Vehicle3DViewer from './Vehicle3DViewer';
import Vehicle360Viewer from './Vehicle360Viewer';

export default function VehicleModal({
  vehicle,
  onClose,
  onOpenFit,
  onToggleCompare,
  isCompared,
  onOpenStudentPlan,
  initialTab = 'details' // 'details' | 'specs' | 'enquire'
}) {
  const [activeVisual, setActiveVisual] = useState('3d'); // '3d' | '360' | 'photo'
  const [activeTab, setActiveTab] = useState(initialTab); // 'details' | 'specs' | 'enquire'
  
  // Test drive / enquiry form
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    date: '',
    time: 'morning',
    interestType: 'test-ride'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!vehicle) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[92vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 z-30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: VISUAL EXPERIENCE & STUDIO VIEWER */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 overflow-y-auto">
          <div>
            {/* Header Identity */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                {vehicle.brandName} • {vehicle.type}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{vehicle.rating} ({vehicle.reviewCount || 120} reviews)</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {vehicle.name}
            </h3>

            {/* Visual View Switcher (3D vs 360° vs Clean Photo) */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800/90 rounded-xl my-4 self-start">
              <button
                onClick={() => setActiveVisual('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeVisual === '3d'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                3D Model
              </button>

              <button
                onClick={() => setActiveVisual('360')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeVisual === '360'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                360° Turntable
              </button>

              <button
                onClick={() => setActiveVisual('photo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeVisual === 'photo'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Studio Photo
              </button>
            </div>

            {/* Main Visual Display Stage */}
            <div className="relative w-full flex items-center justify-center min-h-[260px] my-2">
              {activeVisual === '3d' && (
                <div className="w-full rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800">
                  <Vehicle3DViewer
                    vehicle={vehicle}
                    height="270px"
                    showControls={true}
                  />
                </div>
              )}

              {activeVisual === '360' && (
                <Vehicle360Viewer
                  vehicle={vehicle}
                  height="270px"
                />
              )}

              {activeVisual === 'photo' && (
                <div className="w-full h-64 flex items-center justify-center p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="max-h-52 max-w-[85%] object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Available Paint Finishes */}
            {vehicle.colors && vehicle.colors.length > 0 && (
              <div className="pt-3 flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Colorways:
                </span>
                <div className="flex items-center gap-1.5">
                  {vehicle.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 inline-block shadow-sm"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left Utility CTAs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => onToggleCompare(vehicle.id)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isCompared
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                if (onOpenFit) onOpenFit(vehicle);
              }}
              className="py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Rider Fit Check</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SPECS, COST SAVINGS, SUITABILITY, AND BOOKING */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Overview & Cost
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Full Specs Matrix
              </button>
              <button
                onClick={() => setActiveTab('enquire')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  activeTab === 'enquire'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-300'
                }`}
              >
                Book Test Ride
              </button>
            </div>

            {/* TAB 1: OVERVIEW & RUNNING COST */}
            {activeTab === 'details' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Price & Monthly/Daily Installment Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Showroom Price
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {formatINR(vehicle.price)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Approx. ${vehicle.priceUSD} USD</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Estimated Monthly Installment
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-cyan-600 dark:text-cyan-400">
                      {vehicle.emi}
                    </span>
                    {vehicle.studentDailyPlan && (
                      <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">
                        Student Plan: ₹{vehicle.studentDailyPlan.schoolDaily}/day
                      </span>
                    )}
                  </div>
                </div>

                {/* RUNNING COST COMPARISON (PETROL VS EV) */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100">
                  <div className="flex items-center gap-1.5 mb-2 font-black text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Running Cost & Savings vs Petrol</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">EV Power:</span>
                      <strong className="text-emerald-600 dark:text-emerald-300">
                        {vehicle.petrolComparison?.runningCostEV || '₹0.25/km'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Petrol Equivalent:</span>
                      <strong className="text-rose-500 dark:text-rose-400">
                        {vehicle.petrolComparison?.runningCostPetrol || '₹2.40/km'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Annual Retention:</span>
                      <strong className="text-emerald-500 dark:text-emerald-400 font-black">
                        {vehicle.petrolComparison?.annualSavings || '₹32,500/yr'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* CATEGORY SUITABILITY RATINGS */}
                <div className="pt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                    Lifestyle Suitability Grading:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Daily Commute:</span>
                      <span className="font-bold text-amber-500">★★★★★</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Long Highway:</span>
                      <span className="font-bold text-amber-500">{vehicle.range > 200 ? '★★★★★' : '★★★★☆'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Student Friendly:</span>
                      <span className="font-bold text-amber-500">{vehicle.studentDailyPlan ? '★★★★★' : '★★★☆☆'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Family Utility:</span>
                      <span className="font-bold text-amber-500">{vehicle.seating >= 2 ? '★★★★☆' : '★★★☆☆'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FULL SPECS MATRIX */}
            {activeTab === 'specs' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Single-Charge Range</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{vehicle.range} km</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Top Speed</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{vehicle.topSpeed} km/h</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Battery Chemistry</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{vehicle.batteryCapacity} kWh</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Motor Power</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{vehicle.power}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Recharging Duration</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{vehicle.chargingTime}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Kerb Weight & Seating</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{vehicle.weight} kg • {vehicle.seating} Seats</span>
                  </div>
                </div>

                {/* Key Features Highlights */}
                {vehicle.highlights && (
                  <div className="pt-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {vehicle.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: BOOK TEST RIDE / ENQUIRY FORM */}
            {activeTab === 'enquire' && (
              <div className="animate-in fade-in duration-150">
                {isSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      Reservation Request Received!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                      Thank you, <strong>{bookingForm.name}</strong>. An authorized showroom specialist will contact you on <strong>{bookingForm.phone}</strong> to confirm your slot for the <strong>{vehicle.name}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        Book a Doorstep / Showroom Test Ride
                      </span>
                      <span className="text-[10px] text-emerald-500 font-bold">100% Free</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        name="name"
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        placeholder="Your Full Name *"
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={bookingForm.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number *"
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="email"
                        name="email"
                        value={bookingForm.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                      <input
                        type="date"
                        name="date"
                        value={bookingForm.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting Reservation...' : 'Confirm Showroom Booking'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 mt-6">
            {vehicle.studentDailyPlan ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenStudentPlan();
                }}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Check Student Plan (₹{vehicle.studentDailyPlan.schoolDaily}/d)</span>
              </button>
            ) : (
              <span className="text-[11px] text-slate-400">
                Official Warranty: 8 Years / 1,60,000 km
              </span>
            )}

            <button
              onClick={() => setActiveTab('enquire')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
