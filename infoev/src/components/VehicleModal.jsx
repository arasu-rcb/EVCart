import React, { useState } from 'react';
import { X, Calendar, User, Mail, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function VehicleModal({ vehicle, initialColorIndex = 0, onClose }) {
  if (!vehicle) return null;

  const [selectedColor, setSelectedColor] = useState(vehicle.colors[initialColorIndex] || vehicle.colors[0]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    date: '',
    time: 'morning'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date) {
      alert("Please fill in all details.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div 
        className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="md:w-1/2 p-6 md:p-8 bg-slate-50 dark:bg-slate-950/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
          <div className="flex-1 flex flex-col justify-center items-center py-4">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-1">
              {vehicle.brandName} Showcase
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
              {vehicle.name}
            </h3>
            
            <div className="relative group w-full flex items-center justify-center">
              {/* Colored glow effect */}
              <div 
                className="absolute inset-0 w-48 h-48 rounded-full blur-[60px] opacity-25 dark:opacity-30 transition-colors duration-500" 
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="relative flex items-center justify-center">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="relative w-64 md:w-80 h-auto object-contain transform hover:scale-105 transition-transform duration-300"
                />
                {/* Dynamic Color Tint Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-color opacity-35 transition-colors duration-500 rounded-2xl"
                  style={{ backgroundColor: selectedColor.hex }}
                />
              </div>
            </div>

            {/* Colors picker */}
            <div className="mt-8 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Color Option: {selectedColor.name}
              </span>
              <div className="flex gap-3 justify-center">
                {vehicle.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 shadow-sm ${
                      selectedColor.name === color.name 
                        ? 'ring-2 ring-indigo-600 dark:ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-110' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Key highlights */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Key Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {vehicle.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Spec Sheets & Booking */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Tag/Badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                {vehicle.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 capitalize">
                {vehicle.category} Power
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              {vehicle.description}
            </p>

            {/* Specifications Matrix */}
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/30">
                <span className="text-xs text-slate-400 block">Est. Range</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.range} km</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/30">
                <span className="text-xs text-slate-400 block">Top Speed</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.topSpeed} km/h</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/30">
                <span className="text-xs text-slate-400 block">Battery Capacity</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.batteryCapacity} kWh</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/30">
                <span className="text-xs text-slate-400 block">Weight</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.weight} kg</span>
              </div>
              <div className="col-span-2 bg-indigo-50/55 dark:bg-indigo-950/20 p-3.5 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 flex justify-between items-center">
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">MSRP Base Price</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">${vehicle.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Test Ride/Drive Booking Form */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            {isSuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-5 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-slate-900 dark:text-slate-200 text-sm">
                    Booking Confirmed!
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Thank you {bookingForm.name}. A test {vehicle.category === 'bike' ? 'ride' : 'drive'} reservation has been requested for <strong>{bookingForm.date}</strong> ({bookingForm.time}). We sent an email to <strong>{bookingForm.email}</strong> with details.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Book a Test {vehicle.category === 'bike' ? 'Ride' : 'Drive'}
                  </h4>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    No obligation, complimentary
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-shadow"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-shadow"
                    />
                  </div>

                  {/* Date */}
                  <div className="relative flex items-center w-full col-span-1 sm:col-span-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-shadow"
                    />
                  </div>

                  {/* Time slot selection */}
                  <div className="col-span-1 sm:col-span-1">
                    <select
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition-shadow"
                    >
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Reserving Slot...
                    </>
                  ) : (
                    <>
                      Confirm Reservation
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
