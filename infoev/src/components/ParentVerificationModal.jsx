import { useState } from 'react';
import {
  X, ShieldCheck, CheckCircle2,
  AlertCircle, ArrowRight
} from 'lucide-react';

export default function ParentVerificationModal({
  isOpen,
  onClose,
  initialType = 'school',
  onComplete
}) {
  const [step, setStep] = useState(1); // 1: Student, 2: Guardian, 3: Consent, 4: Confirmed
  const [formData, setFormData] = useState({
    studentName: '',
    institution: '',
    studentId: '',
    age: initialType === 'school' ? '16' : '19',
    studentPhone: '',
    guardianName: '',
    relationship: 'Father',
    guardianPhone: '',
    guardianEmail: '',
    city: '',
    consentSafeSpeed: true,
    consentHelmet: true,
    consentShowroomContact: true
  });
  const [applicationId, setApplicationId] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.studentName || !formData.institution) {
        alert('Please fill in student name and school/college.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.guardianName || !formData.guardianPhone) {
        alert('Please fill in parent/guardian details.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.consentSafeSpeed || !formData.consentHelmet) {
        alert('Please accept safety guidelines and speed limit consent.');
        return;
      }
      const refId = 'EV-VERIFY-' + Math.floor(100000 + Math.random() * 900000);
      setApplicationId(refId);
      setStep(4);
      if (onComplete) onComplete(refId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {initialType === 'school' ? 'Parent / Guardian Verification Flow' : 'Student Eligibility Verification'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Safe, privacy-first approval (No passwords or card numbers requested)
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

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          {[
            { num: 1, label: 'Student' },
            { num: 2, label: 'Guardian' },
            { num: 3, label: 'Safety Consent' },
            { num: 4, label: 'Verified' }
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-1.5 font-bold ${
                step >= s.num ? 'text-emerald-500' : 'text-slate-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= s.num ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
              }`}>
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  Step 1: Student Information
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Please provide the student details enrolled in a recognized institution.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="e.g. Aryan Sharma"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    School / College Name *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. St. Xavier's High School"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Age / Grade *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="13"
                    max="26"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Student Roll / ID Card No.
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. STU-2026-88"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, KA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Guardian Information</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  Step 2: Parent / Guardian Verification
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  For legal and road safety, parent or legal guardian details are verified before test ride approvals.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Sharma"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Relationship *
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Guardian Mobile Phone *
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Guardian Email Address
                </label>
                <input
                  type="email"
                  name="guardianEmail"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                  placeholder="parent.contact@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proceed to Consent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  Step 3: Guardian Consent & Safety Acknowledgement
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Please review the terms of safe operation for electric two-wheelers and student concept plans.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentSafeSpeed"
                    checked={formData.consentSafeSpeed}
                    onChange={handleChange}
                    className="mt-0.5 accent-emerald-500"
                  />
                  <span>
                    <strong>Speed Governance Consent:</strong> I confirm understanding that school student vehicles are limited to safe road speeds (25 km/h) and require appropriate local traffic compliance.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentHelmet"
                    checked={formData.consentHelmet}
                    onChange={handleChange}
                    className="mt-0.5 accent-emerald-500"
                  />
                  <span>
                    <strong>Protective Gear Mandate:</strong> I agree that the student will always wear an approved helmet and practice defensive road commuting.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentShowroomContact"
                    checked={formData.consentShowroomContact}
                    onChange={handleChange}
                    className="mt-0.5 accent-emerald-500"
                  />
                  <span>
                    <strong>Authorization:</strong> I authorize EVISTA authorized showroom executives to contact me for identity confirmation and student plan terms.
                  </span>
                </label>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Purchase can proceed only after successful guardian verification and applicable financing/legal eligibility checks.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Guardian Verification</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  Verification Request Submitted!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Guardian verification application for <strong>{formData.studentName}</strong> has been logged into the EVISTA Showroom dispatch system.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-left space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application Ref:</span>
                  <span className="font-mono font-bold text-emerald-400">{applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guardian Contact:</span>
                  <span className="font-bold text-slate-200">{formData.guardianPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification Status:</span>
                  <span className="font-bold text-cyan-400">Pending Showroom Callback</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Our representative will contact <strong>{formData.guardianName}</strong> to finalize student test ride scheduling and verify guardian documentation.
              </p>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Done & Return to Showroom
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
