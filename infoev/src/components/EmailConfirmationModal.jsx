import { useState } from 'react';
import {
  X, CheckCircle2, Mail, Calendar, Clock, MapPin, Phone,
  FileText, Copy, ExternalLink, ShieldCheck, KeyRound, ChevronDown, ChevronUp, Printer
} from 'lucide-react';
import { generateMailtoLink, getEmailConfig } from '../services/emailService';

export default function EmailConfirmationModal({ bookingResult, vehicle, onClose }) {
  const [copied, setCopied] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  if (!bookingResult || !bookingResult.booking) return null;

  const { booking, isRealSend, isSimulated } = bookingResult;
  const config = getEmailConfig();

  const handleCopyDetails = () => {
    const text = `
EVista Test Drive Confirmation
------------------------------
Reference: ${booking.bookingId}
Vehicle: ${booking.vehicleName}
Customer: ${booking.name} (${booking.phone})
Email: ${booking.email}
Date: ${booking.scheduledDate}
Time Slot: ${booking.scheduledSlot}
Location: ${booking.city || 'Authorized EVista Showroom'}
Support: +91 1800 200 4567
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const mailtoUrl = generateMailtoLink(booking);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-100">
                Official Reservation Pass
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Test Drive Confirmed!
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-white/20 text-xs">
            <div className="flex items-center gap-1.5 font-mono font-bold bg-black/25 px-3 py-1.5 rounded-xl">
              <span className="text-emerald-200">Ref:</span>
              <span className="tracking-wider">{booking.bookingId}</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-100 text-xs">
              <Mail className="w-4 h-4" />
              <span>Confirmation sent to: <strong>{booking.email}</strong></span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Email Dispatch Notice */}
          <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
            isRealSend
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-950 dark:text-cyan-200'
          }`}>
            <Mail className="w-5 h-5 shrink-0 text-cyan-500 dark:text-cyan-400 mt-0.5" />
            <div className="flex-1">
              <strong className="font-bold block text-sm mb-0.5">
                {isRealSend ? 'Email Dispatched via EmailJS' : 'Client-Side Confirmation Generated'}
              </strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {isRealSend
                  ? `A formal confirmation email has been dispatched directly from the frontend to ${booking.email}. Please check your inbox or spam folder.`
                  : `Your test drive booking pass has been generated in real-time. You can view, print, copy details, or send via your default email client below.`
                }
              </p>

              {!config.isConfigured && (
                <button
                  onClick={() => setShowSetupGuide(!showSetupGuide)}
                  className="mt-2 text-cyan-600 dark:text-cyan-400 font-bold underline cursor-pointer flex items-center gap-1 hover:text-cyan-500"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{showSetupGuide ? 'Hide EmailJS real delivery setup' : 'Want real email delivery to your inbox? (2 min setup)'}</span>
                  {showSetupGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>

          {/* Collapsible EmailJS Setup Instruction */}
          {showSetupGuide && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
                <KeyRound className="w-4 h-4 text-cyan-500" />
                <span>Quick Setup for Live Email Inboxes:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li>Create a free account at <strong>emailjs.com</strong> (no backend required, 200 free emails/mo).</li>
                <li>Connect your email service (e.g. Gmail) & copy your <strong>Service ID</strong>.</li>
                <li>Create a template with tags like <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">&#123;&#123;user_name&#125;&#125;</code> and copy your <strong>Template ID</strong>.</li>
                <li>Add them to <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">infoev/.env</code>:
                  <div className="font-mono text-[11px] bg-slate-900 text-cyan-300 p-2.5 rounded-xl my-2 select-all overflow-x-auto">
                    VITE_EMAILJS_SERVICE_ID=service_xxxxxxx<br/>
                    VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx<br/>
                    VITE_EMAILJS_PUBLIC_KEY=public_key_xxxxxxx
                  </div>
                </li>
              </ol>
            </div>
          )}

          {/* Digital Booking Ticket Card */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            {/* Vehicle Highlight Strip */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                {vehicle?.image && (
                  <img
                    src={vehicle.image}
                    alt={booking.vehicleName}
                    className="w-16 h-12 object-contain rounded-xl bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700"
                  />
                )}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    {booking.brandName || vehicle?.brandName || 'Electric Vehicle'}
                  </span>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {booking.vehicleName}
                  </h4>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Slot Reserved
              </span>
            </div>

            {/* Schedule & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  Scheduled Date
                </span>
                <span className="font-black text-slate-900 dark:text-white text-sm">
                  {booking.scheduledDate}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Time Slot
                </span>
                <span className="font-black text-slate-900 dark:text-white text-sm">
                  {booking.scheduledSlot}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Experience Location
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {booking.city ? `${booking.city} Authorized Showroom` : 'EVista Hub & Showroom'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-purple-500" />
                  Registered Phone
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {booking.phone}
                </span>
              </div>
            </div>

            {/* Test Drive Checklist */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Test Ride Essentials Checklist</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Valid Driver&apos;s License</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Protective Helmet / Seatbelt</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Arrive 10 mins early</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <a
                href={mailtoUrl}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Send or preview confirmation in your email client"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Mail Client</span>
              </a>

              <button
                onClick={handleCopyDetails}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer ml-auto"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
