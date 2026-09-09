import {
  GraduationCap, ShieldCheck, Calculator, CheckCircle2,
  AlertCircle, School
} from 'lucide-react';

export default function StudentPlanSection({
  onOpenCalculator,
  onOpenParentVerification
}) {
  return (
    <section id="student-plan" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Empowering Young Commuters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            EV Student Plan
          </h2>
          <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
            "Ride Today. Pay Gradually." A responsible promotional mobility concept empowering students with ultra-affordable daily micro-installment estimates and strict parental verification.
          </p>
        </div>

        {/* Two Main Plan Cards: School vs College */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* 1. School Student Plan */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between text-left group hover:border-emerald-500/60 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Concept Demonstration
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Parent Consent Required
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">School Student Plan</h3>
                  <span className="text-xs text-slate-400">Ages 14–18 • Speed Governed (25 km/h)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Promotional Rate</span>
                  <div className="text-3xl font-black text-emerald-400 mt-0.5">
                    ₹50<span className="text-sm font-semibold text-slate-400"> / day</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Monthly Equivalent</span>
                  <span className="text-sm font-bold text-white">₹1,500 / month</span>
                </div>
              </div>

              {/* Plan Pillars */}
              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Zero Direct Purchase:</strong> Order processed solely through guardian verification.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Safe Speed Limit:</strong> Hardware-locked 25 km/h for safety compliance.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Geofencing Live Track:</strong> Guardian companion app with emergency SOS.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenParentVerification('school')}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Guardian Verification</span>
              </button>

              <button
                onClick={() => onOpenCalculator('school', 45000)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Repayment</span>
              </button>
            </div>
          </div>

          {/* 2. College Student Plan */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between text-left group hover:border-cyan-500/60 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Concept Demonstration
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Valid College ID Required
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">College Student Plan</h3>
                  <span className="text-xs text-slate-400">Undergrad & Postgrad • Full Highway Capable</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Promotional Rate</span>
                  <div className="text-3xl font-black text-cyan-400 mt-0.5">
                    ₹100<span className="text-sm font-semibold text-slate-400"> / day</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Monthly Equivalent</span>
                  <span className="text-sm font-bold text-white">₹3,000 / month</span>
                </div>
              </div>

              {/* Plan Pillars */}
              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Student ID Fast-Track:</strong> Simplified eligibility validation with campus ID.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Low Running Cost:</strong> Charge inside dorm rooms with portable batteries.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Complimentary Helmet:</strong> Free DOT/ISI certified smart helmet on booking.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenParentVerification('college')}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Check Student Eligibility</span>
              </button>

              <button
                onClick={() => onOpenCalculator('college', 120000)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Calculate Repayment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency & Regulatory Disclaimer Box */}
        <div className="max-w-4xl mx-auto rounded-2xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 text-slate-400 text-xs text-left leading-relaxed flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-200 block mb-1">
              Important Business & Financing Disclaimer:
            </span>
            The "EV from ₹50/day" and "EV from ₹100/day" figures are concept/demo financial representations designed for educational and showroom illustration purposes. EVISTA does not offer unregulated lending. Actual vehicle financing is subject to formal credit approval, age verification (18+ for independent purchase, guardian required under 18), and terms from authorized banking partners.
          </div>
        </div>
      </div>
    </section>
  );
}
