import { useState } from 'react';
import {
  ShieldCheck, Sparkles,
  Gauge, Leaf, Bike, Car
} from 'lucide-react';

export default function HeroSection({
  onExploreBikes,
  onExploreCars,
  onFindPerfectEV
}) {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroShowcase = [
    {
      type: 'Sport Electric Superbike',
      name: 'Ultraviolette F77 Mach 2',
      tagline: '323 km Range • 0-60 in 2.8s • 10.3 kWh Battery',
      image: '/images/ultraviolette_f77.png',
      badge: 'Fastest 2-Wheeler',
      accent: 'from-cyan-500 to-blue-600',
      category: 'bike'
    },
    {
      type: 'Hyper-Performance Electric Sedan',
      name: 'Tesla Model S Plaid',
      tagline: '637 km Range • 0-100 in 2.1s • 1,020 HP Tri-Motor',
      image: '/images/tesla_model_s.png',
      badge: 'Flagship Super-EV',
      accent: 'from-red-500 to-indigo-600',
      category: 'car'
    },
    {
      type: 'Smart Urban Precision Scooter',
      name: 'Ather 450X Gen 3',
      tagline: 'Warp Mode • Google Maps Dashboard • From ₹100/day',
      image: '/images/ather_450x.png',
      badge: 'Best City Commuter',
      accent: 'from-emerald-500 to-cyan-600',
      category: 'bike'
    },
    {
      type: 'Retro-Futuristic Lounge EV',
      name: 'Hyundai Ioniq 5',
      tagline: '800V Ultra-Fast Charging (18 min) • V2L Bidirectional',
      image: '/images/hyundai_ioniq5.png',
      badge: 'World Car of the Year',
      accent: 'from-amber-400 to-orange-500',
      category: 'car'
    }
  ];

  const currentHero = heroShowcase[activeHeroSlide];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-900">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: TEXT CONTENT & CTAS */}
          <div className="lg:col-span-7 text-left space-y-6 z-10">
            {/* Top Micro-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Next-Generation EV Dealership Experience</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">2026 Collection</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Drive the Future. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Choose Your EV.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Smart electric bikes and cars designed for every journey, every lifestyle, and every generation. From zero-down student plans to high-torque hyper-EVs.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreBikes}
                className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bike className="w-4.5 h-4.5" />
                Explore Bikes
              </button>

              <button
                onClick={onExploreCars}
                className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-white bg-slate-900 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800 shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Car className="w-4.5 h-4.5 text-indigo-400" />
                Explore Cars
              </button>

              <button
                onClick={onFindPerfectEV}
                className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 hover:border-emerald-400 shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4.5 h-4.5 text-emerald-400" />
                Find My Perfect EV
              </button>
            </div>

            {/* Quick Guarantees & Features Row */}
            <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Tailpipe Carbon</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified Battery Health</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Gauge className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Instant Electric Torque</span>
              </div>
            </div>
          </div>

          {/* RIGHT: AUTOMOTIVE PRODUCT SHOWCASE STAGE */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden group">
              
              {/* Glowing Halo */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Showcase Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {currentHero.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentHero.type}
                </span>
              </div>

              {/* Hero Vehicle Visual (Transparent & Clean Studio) */}
              <div className="relative h-60 sm:h-72 flex items-center justify-center my-4 overflow-hidden">
                <img
                  src={currentHero.image}
                  alt={currentHero.name}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Vehicle Title & Specs Ticker */}
              <div className="relative z-10 pt-4 border-t border-slate-800 text-left">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {currentHero.name}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-medium mt-1">
                  {currentHero.tagline}
                </p>
              </div>

              {/* Showcase Selector Dots */}
              <div className="flex items-center justify-between mt-6 pt-3">
                <span className="text-[11px] text-slate-500 font-semibold">
                  Featured Model 0{activeHeroSlide + 1} / 0{heroShowcase.length}
                </span>
                <div className="flex gap-2">
                  {heroShowcase.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHeroSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${activeHeroSlide === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS TICKER STRIP */}
        <div className="mt-14 pt-8 border-t border-slate-900/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Available Fleet</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">22+ Models</span>
            <span className="text-[11px] text-cyan-400 mt-1 block">Bikes, Superbikes & Luxury Cars</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Maximum Range</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">643 km</span>
            <span className="text-[11px] text-emerald-400 mt-1 block">Single charge endurance</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Student EV Plan</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">From ₹50/day</span>
            <span className="text-[11px] text-cyan-400 mt-1 block">Verified safety & parental care</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Fast Charge Architecture</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">800V DC</span>
            <span className="text-[11px] text-indigo-400 mt-1 block">10% to 80% in 18 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
