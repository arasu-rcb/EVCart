import { useState, useEffect, useRef } from 'react';
import {
  Sun, Moon, Search, Scale, ChevronDown, Menu, X,
  Zap, User, Bike, Car, Tag
} from 'lucide-react';
import { lifestyleCategories } from '../vehiclesData';

export default function Navbar({
  isDark,
  setIsDark,
  onNavigate,
  activePage,
  onSelectCategory,
  comparedCount,
  onOpenCompare,
  onOpenSearch,
  onOpenFit
}) {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExploreExpanded, setMobileExploreExpanded] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (catId, type) => {
    setExploreOpen(false);
    setMobileMenuOpen(false);
    onSelectCategory(catId, type);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 dark:bg-slate-950/85 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* LOGO */}
        <button
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/30 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-cyan-200 dark:to-indigo-300 bg-clip-text text-transparent">
              EVISTA
            </span>
            <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase -mt-1">
              Next-Gen Showroom
            </span>
          </div>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer ${activePage === 'home' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('bikes')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${activePage === 'bikes' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Bike className="w-4 h-4 text-cyan-500" />
            Bikes
          </button>

          <button
            onClick={() => onNavigate('cars')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${activePage === 'cars' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Car className="w-4 h-4 text-indigo-500" />
            Cars
          </button>

          {/* EXPLORE BY NEED MEGA-DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${exploreOpen ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
            >
              <span>Explore by Need</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {exploreOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200 z-50">
                {/* Bike Categories Column */}
                <div>
                  <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <Bike className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                      Bike Categories
                    </span>
                  </div>
                  <div className="space-y-1">
                    {lifestyleCategories.map((cat) => (
                      <button
                        key={`bike-${cat.id}`}
                        onClick={() => handleCategoryClick(cat.id, 'bike')}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-left group"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.emoji}</span>
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 group-hover:text-cyan-500">→</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Car Categories Column */}
                <div>
                  <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <Car className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                      Car Categories
                    </span>
                  </div>
                  <div className="space-y-1">
                    {lifestyleCategories.map((cat) => (
                      <button
                        key={`car-${cat.id}`}
                        onClick={() => handleCategoryClick(cat.id, 'car')}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left group"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.emoji}</span>
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 group-hover:text-indigo-500">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenCompare}
            className={`relative flex items-center gap-1.5 transition-colors cursor-pointer ${comparedCount > 0 ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Scale className="w-4 h-4 text-indigo-500" />
            <span>Compare</span>
            {comparedCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white animate-pulse">
                {comparedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('student-plan')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${activePage === 'student-plan' ? 'text-emerald-500 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              ₹50/day
            </span>
            Student Offers
          </button>

          <button
            onClick={() => onNavigate('offers')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${activePage === 'offers' ? 'text-cyan-500 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            Offers
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer ${activePage === 'about' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            About
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors cursor-pointer ${activePage === 'contact' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            Contact
          </button>
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:border-cyan-500/50 text-slate-500 dark:text-slate-300 hover:text-cyan-500 transition-all cursor-pointer shadow-sm"
            title="Search models, brands, specs"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Rider Fit Studio */}
          <button
            onClick={onOpenFit}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-500/20 transition-all cursor-pointer shadow-sm"
            title="Check ergonomic stance & leg reach"
          >
            <User className="w-3.5 h-3.5 text-indigo-500" />
            <span>Rider Fit Studio</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer shadow-sm"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 text-slate-100 border-b border-slate-800 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-sm font-bold text-left transition-all ${activePage === 'home' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('bikes'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-sm font-bold text-left flex items-center gap-2 transition-all ${activePage === 'bikes' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
            >
              <Bike className="w-4 h-4 text-cyan-400" /> Bikes
            </button>
            <button
              onClick={() => { onNavigate('cars'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-sm font-bold text-left flex items-center gap-2 transition-all ${activePage === 'cars' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
            >
              <Car className="w-4 h-4 text-indigo-400" /> Cars
            </button>
            <button
              onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-left flex items-center justify-between text-slate-300"
            >
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" /> Compare
              </span>
              {comparedCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs bg-indigo-600 rounded-full text-white">
                  {comparedCount}
                </span>
              )}
            </button>
          </div>

          {/* Expandable Categories in Mobile */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
            <button
              onClick={() => setMobileExploreExpanded(!mobileExploreExpanded)}
              className="w-full p-3.5 flex items-center justify-between text-sm font-bold text-cyan-300"
            >
              <span>Explore by Need (Lifestyle)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExploreExpanded ? 'rotate-180' : ''}`} />
            </button>

            {mobileExploreExpanded && (
              <div className="p-3 pt-0 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 pt-2">
                  Bikes
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {lifestyleCategories.map((cat) => (
                    <button
                      key={`m-bike-${cat.id}`}
                      onClick={() => handleCategoryClick(cat.id, 'bike')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 text-xs font-medium text-slate-300 hover:text-cyan-400 text-left truncate"
                    >
                      {cat.emoji} {cat.name}
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 pt-3">
                  Cars
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {lifestyleCategories.map((cat) => (
                    <button
                      key={`m-car-${cat.id}`}
                      onClick={() => handleCategoryClick(cat.id, 'car')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 text-xs font-medium text-slate-300 hover:text-indigo-400 text-left truncate"
                    >
                      {cat.emoji} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onNavigate('student-plan'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-bold text-xs text-left"
            >
              🎓 Student EV Plan (₹50/d)
            </button>
            <button
              onClick={() => { onNavigate('offers'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 font-bold text-xs text-left"
            >
              🏷️ Showroom Offers
            </button>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => { onOpenFit(); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" /> Rider Fit Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
