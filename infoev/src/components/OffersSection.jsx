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
      icon: <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badge: '₹50/month Concept',
      badgeStyle: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40',
      discount: 'Complimentary Smart Helmet + ₹4,000 Dorm Charger Credit',
      description: 'Exclusive for registered school and college students. Includes a DOT/ISI smart Bluetooth helmet and zero documentation processing fee.',
      terms: 'Valid with active student ID or guardian verification. Non-transferable.',
      ctaText: 'View Student Plan & Claim',
      cardStyle: 'border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-500 hover:shadow-emerald-500/10'
    },
    {
      id: 'exchange-bonus',
      title: 'Green Exchange Upgrade Bonus',
      category: 'Petrol To EV Exchange',
      icon: <RefreshCw className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      badge: 'Up to ₹15,000 Bonus',
      badgeStyle: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40',
      discount: 'Additional Valuation on Any Petrol Two-Wheeler / Car',
      description: 'Trade in your old polluting petrol scooter, motorcycle, or car for instant showroom credit applied straight against your EV down payment.',
      terms: 'Scrappage certificate assistance provided. Vehicle RC transfer mandatory.',
      ctaText: 'Evaluate My Old Ride',
      cardStyle: 'border-cyan-200 dark:border-cyan-500/30 hover:border-cyan-500 hover:shadow-cyan-500/10'
    },
    {
      id: 'festive-zero-down',
      title: 'Festive Season Mobility Drive',
      category: 'Festival Promotion',
      icon: <Gift className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      badge: 'Zero Processing Fees',
      badgeStyle: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-300 dark:border-amber-500/40',
      discount: '0% Processing Charges + Free 3-Year Extended Battery Warranty',
      description: 'Celebrate sustainable travel with waived showroom handling charges and an extended 36-month battery breakdown guarantee.',
      terms: 'Applicable on bookings made before month-end across all showroom locations.',
      ctaText: 'Claim Festive Benefit',
      cardStyle: 'border-amber-200 dark:border-amber-500/30 hover:border-amber-500 hover:shadow-amber-500/10'
    },
    {
      id: 'early-booking',
      title: 'Early Adopter Priority Delivery',
      category: 'Early Booking',
      icon: <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      badge: 'Priority Dispatch',
      badgeStyle: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40',
      discount: 'Complimentary 7.4 kW Home Fast Charger Installation',
      description: 'Book your 2026 model EV online and receive complimentary home installation of a high-speed Level-2 Wallbox charger.',
      terms: 'Standard electrical wiring up to 10 meters included with certified technician installation.',
      ctaText: 'Book Priority Delivery',
      cardStyle: 'border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-500 hover:shadow-indigo-500/10'
    },
    {
      id: 'family-pack',
      title: 'Family Multi-Rider Package',
      category: 'Family Special',
      icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      badge: 'Dual EV Savings',
      badgeStyle: 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 border-purple-300 dark:border-purple-500/40',
      discount: 'Additional 5% Fleet Credit on Second Household Vehicle',
      description: 'Switch the entire family to zero emissions. Enjoy unified home charging integration, shared app keys, and bundled roadside assistance.',
      terms: 'Applicable when two vehicles are registered under identical household address.',
      ctaText: 'Enquire Family Bundle',
      cardStyle: 'border-purple-200 dark:border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/10'
    },
    {
      id: 'corporate-green',
      title: 'Clean Corporate Commuter Benefit',
      category: 'Corporate / IT Park',
      icon: <ShieldCheck className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      badge: 'Tax Incentive Assist',
      badgeStyle: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-300 dark:border-sky-500/40',
      discount: 'Section 80EEB Tax Deduction Documentation Assistance',
      description: 'Eligible professionals can deduct up to ₹1,50,000 on EV loan interest payments. Our showroom provides full CA-ready compliance packs.',
      terms: 'Subject to individual IT return eligibility under prevailing central EV incentive guidelines.',
      ctaText: 'Get Tax Guide & Assist',
      cardStyle: 'border-sky-200 dark:border-sky-500/30 hover:border-sky-500 hover:shadow-sky-500/10'
    }
  ];

  const handleAction = (offer) => {
    if (offer.id === 'student-welcome' && onOpenStudentPlan) {
      // open student plan or open offer modal
      onClaimOffer(offer);
    } else if (onClaimOffer) {
      onClaimOffer(offer);
    }
  };

  return (
    <section id="offers" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
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
              className={`rounded-3xl p-6 sm:p-7 border bg-white dark:bg-slate-900/90 shadow-lg dark:shadow-2xl flex flex-col justify-between text-left hover:-translate-y-1.5 transition-all group relative overflow-hidden ${offer.cardStyle}`}
            >
              <div>
                {/* Top Bar: Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {offer.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${offer.badgeStyle}`}>
                    {offer.badge}
                  </span>
                </div>

                {/* Category & Title */}
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
                  {offer.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                  {offer.title}
                </h3>

                {/* Discount Highlight */}
                <div className="my-3.5 py-2.5 px-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-cyan-800 dark:text-cyan-300">
                  {offer.discount}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {offer.description}
                </p>
              </div>

              {/* Bottom: Terms & Action Button */}
              <div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 mb-4 leading-normal">
                  * {offer.terms}
                </div>

                <button
                  type="button"
                  onClick={() => handleAction(offer)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-white font-black text-xs border border-slate-800 dark:border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
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
