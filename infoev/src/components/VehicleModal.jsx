import { useState } from 'react';
import {
  X, CheckCircle2, ChevronRight,
  Zap, Star, GraduationCap, Scale, BatteryCharging, Gauge, Clock, Users, ArrowRight,
  Mail, Calendar, Ticket, ExternalLink, Sparkles
} from 'lucide-react';
import { formatINR } from '../vehiclesData';
import { sendTestDriveConfirmationEmail, getEmailConfig } from '../services/emailService';
import EmailConfirmationModal from './EmailConfirmationModal';

export default function VehicleModal({
  vehicle,
  onClose,
  onToggleCompare,
  isCompared,
  onOpenStudentPlan,
  initialTab = 'details' // 'details' | 'enquire'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Test drive / enquiry form
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    time: 'morning',
    interestType: 'test-ride'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  if (!vehicle) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.email) {
      alert("Please enter your name, phone number, and email address to receive your confirmation.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendTestDriveConfirmationEmail({
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        city: bookingForm.city,
        date: bookingForm.date,
        time: bookingForm.time,
        interestType: bookingForm.interestType,
        vehicleName: vehicle.name,
        brandName: vehicle.brandName,
        vehicleType: vehicle.type,
        vehiclePrice: vehicle.price,
        vehicleImage: vehicle.image
      });

      setBookingResult(result);
      setIsSuccess(true);
    } catch (err) {
      console.error('Test drive booking failed:', err);
      alert('Unable to process booking. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStudentEligible = Boolean(vehicle.studentMonthlyPlan || vehicle.school || vehicle.college);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[92vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 z-30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: VEHICLE IMAGE STAGE & SPEC METRICS */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 overflow-y-auto">
          <div>
            {/* Header Identity */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30">
                {vehicle.brandName} • {vehicle.type}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{vehicle.rating} ({vehicle.reviewCount || 150} reviews)</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {vehicle.name}
            </h3>

            {/* Clean Vehicle Showroom Image Display */}
            <div className="relative w-full flex items-center justify-center min-h-[220px] sm:min-h-[250px] my-5 p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="max-h-48 sm:max-h-56 max-w-[90%] object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Price & EMI Highlight Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Ex-Showroom Price
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {formatINR(vehicle.price)}
                </div>
                <span className="text-[10px] text-slate-400 block">Approx. ${vehicle.priceUSD} USD</span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Standard EMI From
                </span>
                <div className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {vehicle.emi}
                </div>
                {isStudentEligible && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    Student Plan: From ₹50/month
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs Bottom Left */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 mt-5">
            <button
              onClick={() => onToggleCompare(vehicle.id)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isCompared
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
            </button>

            {isStudentEligible ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenStudentPlan();
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Check Eligibility</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('enquire')}
                className="py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book Test Ride</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: FULL SPECIFICATIONS, ADVANTAGES, RATINGS & ENQUIRY */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top View Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Overview & Specs
              </button>
              <button
                onClick={() => setActiveTab('enquire')}
                className={`px-4 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'enquire'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-black'
                    : 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-300'
                }`}
              >
                <span>Book Test Ride</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* VIEW 1: OVERVIEW, FULL SPECS, ADVANTAGES & SUITABILITY */}
            {activeTab === 'details' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* 1. KEY SPECIFICATIONS MATRIX */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                    Official Specifications
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                        <BatteryCharging className="w-3 h-3 text-emerald-500" /> Driving Range
                      </span>
                      <strong className="text-slate-900 dark:text-white text-sm">{vehicle.range} km</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-indigo-400" /> Battery Chemistry
                      </span>
                      <strong className="text-slate-900 dark:text-white text-sm">{vehicle.batteryCapacity} kWh</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-cyan-500" /> Top Speed
                      </span>
                      <strong className="text-slate-900 dark:text-white text-sm">{vehicle.topSpeed} km/h</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> Recharging Duration
                      </span>
                      <strong className="text-slate-900 dark:text-white text-xs">{vehicle.chargingTime}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">Motor Power & Output</span>
                      <strong className="text-slate-900 dark:text-white text-xs">{vehicle.power}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-400" /> Seating & Weight
                      </span>
                      <strong className="text-slate-900 dark:text-white text-xs">{vehicle.seating} Seats • {vehicle.weight} kg</strong>
                    </div>
                  </div>
                </div>

                {/* 2. WHY CHOOSE THIS EV? (3-5 ADVANTAGES) */}
                <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-slate-850 border border-cyan-500/20">
                  <h4 className="font-black text-xs text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    <span>Why Choose This EV?</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {vehicle.highlights ? vehicle.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-500 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    )) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-500 font-bold">•</span>
                          <span>Zero tailpipe carbon emissions with rapid low-cost charging</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-500 font-bold">•</span>
                          <span>Over 70% lower running cost than equivalent petrol model</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-500 font-bold">•</span>
                          <span>8 Years / 1,60,000 km manufacturer battery guarantee</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* 3. BEST FOR: SUITABILITY RATINGS */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                    Best For (Suitability Rating)
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Daily Usage</span>
                      <span className="font-bold text-amber-500">★★★★★</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Long Drive</span>
                      <span className="font-bold text-amber-500">{vehicle.range > 250 ? '★★★★★' : '★★★★☆'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">College</span>
                      <span className="font-bold text-amber-500">{isStudentEligible ? '★★★★★' : '★★★★☆'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Family</span>
                      <span className="font-bold text-amber-500">{vehicle.seating >= 4 ? '★★★★★' : (vehicle.seating >= 2 ? '★★★★☆' : '★★★☆☆')}</span>
                    </div>
                  </div>
                </div>

                {/* 4. PAYMENT OPTIONS CONCEPT */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-950 dark:text-emerald-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black uppercase tracking-wider text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      Student Monthly Payment Concept
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      Plan A / B
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Eligible for promotional student monthly plans starting from <strong>₹50 / month</strong> (Plan A with Guardian Approval) or <strong>₹100 / month</strong> (Plan B with College ID).
                  </p>
                </div>
              </div>
            )}

            {/* VIEW 2: BOOK TEST RIDE FORM */}
            {activeTab === 'enquire' && (
              <div className="animate-in fade-in duration-150">
                {isSuccess ? (
                  <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 my-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                        Booking Reference: {bookingResult?.bookingId || 'EV-TR-CONFIRMED'}
                      </span>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white">
                        Test Drive Confirmed!
                      </h4>
                    </div>

                    {bookingResult?.isRealSend ? (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong>{bookingForm.name}</strong>. A confirmation email has been dispatched to{' '}
                        <strong className="text-cyan-600 dark:text-cyan-400 underline">{bookingForm.email}</strong> with your showroom entry pass for the <strong>{vehicle.name}</strong>. Please check your inbox and spam folder.
                      </p>
                    ) : (
                      <div className="space-y-2 max-w-sm mx-auto text-center">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Thank you, <strong>{bookingForm.name}</strong>. Your slot for the <strong>{vehicle.name}</strong> has been reserved!
                        </p>
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-700 dark:text-amber-300 text-left">
                          <strong className="block mb-0.5">⚠️ Why didn't you receive an email?</strong>
                          Frontend apps cannot send emails to Gmail without an email provider key. Add your free <strong>EmailJS</strong> keys to your environment variables (or Vercel) to deliver live emails directly to inboxes.
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                      <button
                        onClick={() => setShowEmailModal(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>View Confirmation Email Pass</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setBookingForm(prev => ({ ...prev, name: '', phone: '', email: '' }));
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Book Another Ride
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3.5 my-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        Doorstep / Showroom Test Ride
                      </span>
                      <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Free Experience & Instant Email Pass
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={bookingForm.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingForm.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Email Address (For Confirmation Mail) *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={bookingForm.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-1 block">
                        We send your official test drive pass & showroom slot directly to this inbox.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={bookingForm.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Time Slot
                        </label>
                        <select
                          name="time"
                          value={bookingForm.time}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="morning">Morning (10:00 AM - 1:00 PM)</option>
                          <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                          <option value="evening">Evening (4:00 PM - 7:30 PM)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Email Confirmation...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Book Test Drive & Send Email Confirmation</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 mt-6">
            <span className="text-[11px] text-slate-400">
              Showroom Warranty: 8 Years / 1,60,000 km
            </span>

            <button
              onClick={() => setActiveTab('enquire')}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Enquire / Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Email Pass Modal */}
      {showEmailModal && bookingResult && (
        <EmailConfirmationModal
          bookingResult={bookingResult}
          vehicle={vehicle}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}
