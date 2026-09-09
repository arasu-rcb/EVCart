import {
  Tag, Clock, Gift, ArrowRight, ShieldCheck,
  RefreshCw, GraduationCap, Users
} from 'lucide-react';

export default function OffersSection({
  onClaimOffer,
  onOpenStudentPlan
}) {
  const offersList = [
    {
      id: 'student-welcome',
      title: 'Student Electric Freedom Deal',
      category: 'Student Special',
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      badge: '₹50/day Concept',
      discount: 'Complimentary Smart Helmet + ₹4,000 Dorm Charger Credit',
      description: 'Exclusive for registered school and college students. Includes a DOT/ISI smart Bluetooth helmet and zero documentation processing fee.',
      terms: 'Valid with active student ID or guardian verification. Non-transferable.',
      ctaText: 'View Student Plan',
      accent: 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-900/90',
      action: onOpenStudentPlan
    },
    {
      id: 'exchange-bonus',
      title: 'Green Exchange Upgrade Bonus',
      category: 'Petrol To EV Exchange',
      icon: <RefreshCw className="w-6 h-6 text-cyan-400" />,
      badge: 'Up to ₹15,000 Bonus',
      discount: 'Additional Valuation on Any Petrol Two-Wheeler / Car',
      description: 'Trade in your old polluting petrol scooter, motorcycle, or car for instant showroom credit applied straight against your EV down payment.',
      terms: 'Scrappage certificate assistance provided. Vehicle RC transfer mandatory.',
      ctaText: 'Evaluate My Old Ride',
      accent: 'border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 to-slate-900/90',
      action: () => onClaimOffer('Green Exchange Bonus')
    },
    {
      id: 'festive-zero-down',
      title: 'Festive Season Mobility Drive',
      category: 'Festival Promotion',
      icon: <Gift className="w-6 h-6 text-amber-400" />,
      badge: 'Zero Processing Fees',
      discount: '0% Processing Charges + Free 3-Year Extended Battery Warranty',
      description: 'Celebrate sustainable travel with waived showroom handling charges and an extended 36-month battery breakdown guarantee.',
      terms: 'Applicable on bookings made before month-end across all showroom locations.',
      ctaText: 'Claim Festive Benefit',
      accent: 'border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-slate-900/90',
      action: () => onClaimOffer('Festive Season Mobility Drive')
    },
    {
      id: 'early-booking',
      title: 'Early Adopter Priority Delivery',
      category: 'Early Booking',
      icon: <Clock className="w-6 h-6 text-indigo-400" />,
      badge: 'Priority Dispatch',
      discount: 'Complimentary 7.4 kW Home Fast Charger Installation',
      description: 'Book your 2026 model EV online and receive complimentary home installation of a high-speed Level-2 Wallbox charger.',
      terms: 'Standard electrical wiring up to 10 meters included with certified technician installation.',
      ctaText: 'Book Early Access',
      accent: 'border-indigo-500/40 bg-gradient-to-b from-indigo-950/20 to-slate-900/90',
      action: () => onClaimOffer('Early Adopter Fast Charger')
    },
    {
      id: 'family-pack',
      title: 'Family Multi-Rider Package',
      category: 'Family Special',
      icon: <Users className="w-6 h-6 text-purple-400" />,
      badge: 'Dual EV Savings',
      discount: 'Additional 5% Fleet Credit on Second Household Vehicle',
      description: 'Switch the entire family to zero emissions. Enjoy unified home charging integration, shared app keys, and bundled roadside assistance.',
      terms: 'Applicable when two vehicles are registered under identical household address.',
      ctaText: 'Enquire Family Bundle',
      accent: 'border-purple-500/40 bg-gradient-to-b from-purple-950/20 to-slate-900/90',
      action: () => onClaimOffer('Family Multi-Rider Package')
    },
    {
      id: 'corporate-green',
      title: 'Clean Corporate Commuter Benefit',
      category: 'Corporate / IT Park',
      icon: <ShieldCheck className="w-6 h-6 text-sky-400" />,
      badge: 'Tax Incentive Assist',
      discount: 'Section 80EEB Tax Deduction Documentation Assistance',
      description: 'Eligible professionals can deduct up to ₹1,50,000 on EV loan interest payments. Our showroom provides full CA-ready compliance packs.',
      terms: 'Subject to individual IT return eligibility under prevailing central EV incentive guidelines.',
      ctaText: 'Get Tax Guide',
      accent: 'border-sky-500/40 bg-gradient-to-b from-sky-950/20 to-slate-900/90',
      action: () => onClaimOffer('Clean Corporate Commuter Benefit')
    }
  ];

  return (
    <section id="offers" className="py-16 sm:py-24 bg-slate-900/70 dark:bg-slate-950 text-white relative overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Tag className="w-4 h-4" />
            <span>Showroom Benefits & Subsidies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Exclusive EV Showroom Offers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Transparent, customer-first promotions designed to accelerate your transition from petrol to electric. No false claims — just tangible value.
          </p>
        </div>

        {/* 6 Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offersList.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-3xl p-6 sm:p-7 border shadow-xl flex flex-col justify-between text-left hover:-translate-y-1.5 transition-all group relative overflow-hidden ${offer.accent}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                    {offer.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white border border-white/20">
                    {offer.badge}
                  </span>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  {offer.category}
                </span>
                <h3 className="text-xl font-black text-white mt-1 group-hover:text-cyan-400 transition-colors">
                  {offer.title}
                </h3>

                <div className="my-3 py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-bold text-cyan-300">
                  {offer.discount}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {offer.description}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 mb-4 leading-normal">
                  * {offer.terms}
                </div>

                <button
                  onClick={offer.action}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs border border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{offer.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
