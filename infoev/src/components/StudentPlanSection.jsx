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
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Promotional Mobility Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Student EV Monthly Plan
          </h2>
          <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
            "Ride Today. Pay Gradually." A responsible promotional concept designed for eligible school and college students, featuring structured monthly payment models and mandatory parent/guardian verification.
          </p>
        </div>

        {/* Two Main Plan Cards: Plan A vs Plan B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* 1. Plan A: School Student Plan (₹50 / month) */}
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
                  <h3 className="text-2xl font-black text-white">Plan A: School Students</h3>
                  <span className="text-xs text-slate-400">Ages 14–18 • Speed Governed (25 km/h)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Promotional Payment</span>
                  <div className="text-3xl font-black text-emerald-400 mt-0.5">
                    ₹50<span className="text-sm font-semibold text-slate-400"> / month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Approval Process</span>
                  <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">Guardian Signed</span>
                </div>
              </div>

              {/* Plan Pillars */}
              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Zero Direct Purchase:</strong> Direct checkout disabled for school students.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Hardware Speed Governor:</strong> Factory-locked to 25 km/h for teen safety.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Parent/Guardian Verification:</strong> Safe 4-step digital consent application.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Conceptual Demonstration:</strong> Illustrated payment schedule without banking interest.</span>
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

          {/* 2. Plan B: College Student Plan (₹100 / month) */}
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
                  <h3 className="text-2xl font-black text-white">Plan B: College Students</h3>
                  <span className="text-xs text-slate-400">Undergrad & Postgrad • Full Highway Capable</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Promotional Payment</span>
                  <div className="text-3xl font-black text-cyan-400 mt-0.5">
                    ₹100<span className="text-sm font-semibold text-slate-400"> / month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verification</span>
                  <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">Campus ID Card</span>
                </div>
              </div>

              {/* Plan Pillars */}
              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Student Stipend Calibrated:</strong> Sized for pocket allowance or part-time internship.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>High-Range Capability:</strong> Eligible across full-speed 85-120 km/h commuter models.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Portable Battery Swapping:</strong> Detachable battery pack charges inside dorm rooms.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Zero Documentation Fee:</strong> Transparent promotional showcase pricing.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenParentVerification('college')}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Verify College ID</span>
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

        {/* Conceptual Transparency & Regulatory Compliance Banner */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-4xl mx-auto flex items-start gap-3.5 text-left text-xs text-slate-400">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-300 block">
              Conceptual Demonstration & Regulatory Disclaimer
            </span>
            <p className="leading-relaxed">
              The "Student EV Monthly Plan" (₹50 / month and ₹100 / month) is presented as a promotional showroom concept and educational repayment illustration. It is not an approved bank loan, guaranteed financing, or regulated credit product. Direct vehicle purchase is strictly disabled for minors and requires authorized guardian execution.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
