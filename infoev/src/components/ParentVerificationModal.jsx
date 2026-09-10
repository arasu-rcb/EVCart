import { useState } from 'react';
import {
  X, ShieldCheck, CheckCircle2,
  AlertCircle, ArrowRight, Upload, FileText, Home
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
    city: '',
    // Native Address & Mandatory Document fields
    nativeAddress: '',
    documentType: initialType === 'school' ? 'School Student ID Card' : 'College Student ID Card',
    documentNumber: '',
    documentFileName: 'student_verification_id.pdf',
    guardianName: '',
    relationship: 'Father',
    guardianPhone: '',
    guardianEmail: '',
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
      if (!formData.nativeAddress) {
        alert('Please provide your Native / Permanent Address (mandatory for student offer).');
        return;
      }
      if (!formData.documentNumber) {
        alert('Student document is mandatory. Please enter your Document/ID Number.');
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
                {initialType === 'school' ? 'School Student Eligibility & Guardian Flow' : 'College Student Eligibility Verification'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Safe, privacy-first approval • Mandatory Document & Native Address Accepted
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
            { num: 1, label: 'Student & Docs' },
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
                  Step 1: Student Information & Mandatory Document
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Please provide verified student details. Document upload is mandatory. Native place address is accepted for hostel/PG students.
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
                    placeholder="e.g. St. Xavier's / IIT Madras"
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

              {/* Native Address Field (Address can be native for both school and college) */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Native Place / Permanent Address *</span>
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-white/60 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Native Allowed
                  </span>
                </div>
                <input
                  type="text"
                  name="nativeAddress"
                  value={formData.nativeAddress}
                  onChange={handleChange}
                  placeholder="e.g. Native Village/Town, District, State (or Permanent Home Address)"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  Students staying in hostels, paying guest (PG) accommodations, or temporary rentals can provide their native hometown/permanent residence.
                </p>
              </div>

              {/* Mandatory Document Proof Field */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Student Verification Document *</span>
                  </label>
                  <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20 uppercase tracking-wider">
                    Mandatory *
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Document Type *</label>
                    <select
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                    >
                      <option value="School / College Student ID Card">Student ID Card (Front & Back)</option>
                      <option value="Bonafide Certificate">Official Bonafide Certificate</option>
                      <option value="Current Academic Year Fee Receipt">Current Academic Year Fee Receipt</option>
                      <option value="Admission Confirmation Letter">Institutional Admission Letter</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Document / ID No. *</label>
                    <input
                      type="text"
                      name="documentNumber"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      placeholder="e.g. STU-2026-9942 or Roll No."
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Upload Attachment Bar */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-700/80 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{formData.documentFileName} attached</span>
                  </div>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3 h-3" />
                    <span>Upload Proof</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData(prev => ({ ...prev, documentFileName: e.target.files[0].name }));
                        }
                      }}
                    />
                  </label>
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
                    Current Campus City / Town
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Guardian Phone Number *
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
                    Guardian Email
                  </label>
                  <input
                    type="email"
                    name="guardianEmail"
                    value={formData.guardianEmail}
                    onChange={handleChange}
                    placeholder="guardian@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div><strong>Student:</strong> {formData.studentName} ({formData.institution})</div>
                <div><strong>Native Place Address:</strong> {formData.nativeAddress}</div>
                <div><strong>Document Verified:</strong> {formData.documentType} ({formData.documentNumber})</div>
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
                  <span>Continue to Safety Consent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  Step 3: Road Safety & Governance Consent
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Please review the statutory terms and digital safety declarations.
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
                  Purchase can proceed only after successful guardian verification, mandatory document verification, and applicable legal eligibility checks.
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

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-left space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application Ref:</span>
                  <span className="font-mono font-bold text-emerald-400">{applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guardian Contact:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200">{formData.guardianPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Native Address:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200 text-right truncate max-w-[180px]">{formData.nativeAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Document Verified:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{formData.documentNumber}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400">Verification Status:</span>
                  <span className="font-bold text-emerald-500">Document & Native Address Logged</span>
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
