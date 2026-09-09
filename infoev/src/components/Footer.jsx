import {
  Zap, MapPin, Phone, Mail, ArrowUp
} from 'lucide-react';

export default function Footer({
  onNavigate,
  onSelectCategory
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-sm text-left relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/30" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                  EVISTA
                </span>
                <span className="text-[10px] font-semibold text-cyan-400 tracking-widest uppercase">
                  Next-Gen Showroom
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Architecting the ultimate electric mobility experience. Discover curated, high-efficiency bikes and premium electric cars paired with smart lifestyle recommendation algorithms and responsible student plans.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100 Electric Avenue, Tech Corridor, Bengaluru / CA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 (800) 555-EVISTA (Toll Free 24/7)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>contact@evista-showroom.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Contact Showroom
                </button>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-default">
                  Careers (We're Hiring)
                </span>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-default">
                  Dealership Network
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Vehicles */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-white mb-4">
              Vehicles
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('bikes')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Electric Bikes (12+)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cars')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Electric Cars (10+)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Smart Compare Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Festive & Exchange Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Explore by Lifestyle */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('daily')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Daily Usage Commuters
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('long-drive')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Long Highway Touring
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('college')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  College Student Rides
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('school')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  School Teen Safe Models
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('family')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Family SUVs & Sedans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 6: Support & Legal */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-white mb-4">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-plan')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Student Plan Terms & Disclaimers
                </button>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-default">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} EVISTA Inc. All rights reserved. Professional automotive showroom simulation.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
