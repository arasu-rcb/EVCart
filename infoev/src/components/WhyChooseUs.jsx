import {
  Zap, BatteryCharging, DollarSign, Leaf, Wrench,
  GraduationCap, Scale, RotateCw, Sparkles
} from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Electric Performance',
      description: 'Experience instantaneous 100% torque delivery from 0 RPM without gearshift lag or mechanical clutch wear.'
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-emerald-400" />,
      title: 'Long Highway Range',
      description: 'Equipped with next-gen high density prismatic and Blade battery cells offering up to 643 km endurance.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-amber-400" />,
      title: 'Lower Running Cost',
      description: 'Slash operating expenses down to ₹0.25 - ₹1.20 per kilometer compared to skyrocketing ₹2.50 - ₹12/km petrol.'
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      title: 'Eco-Friendly & Clean',
      description: 'Zero tailpipe carbon output and whisper-quiet acoustic motors creating cleaner, calmer cities.'
    },
    {
      icon: <Wrench className="w-6 h-6 text-indigo-400" />,
      title: 'Reliable Low Maintenance',
      description: 'No spark plugs, engine oil, radiator fluids, or complex gearboxes. Over 70% fewer moving friction components.'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-cyan-300" />,
      title: 'Student Friendly Plans',
      description: 'Concept daily micro-plans starting from ₹50/day (School) and ₹100/day (College) with guardian verification.'
    },
    {
      icon: <Scale className="w-6 h-6 text-purple-400" />,
      title: 'Smart Side-by-Side Comparison',
      description: 'Objective multi-vehicle spec matrix with our automated algorithm dynamically computing Best Choice recommendations.'
    },
    {
      icon: <RotateCw className="w-6 h-6 text-sky-400" />,
      title: 'Interactive 3D & 360° Experience',
      description: 'Inspect chassis details, lighting geometry, and paint angles in full Three.js 3D and drag-to-rotate turntables.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The EV Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Why Choose Our EV Showroom?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            We don't just sell electric vehicles; we architect an effortless journey toward clean mobility, backed by rigorous battery transparency and tailored financing concepts.
          </p>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                <span>Verified Benefit #0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
