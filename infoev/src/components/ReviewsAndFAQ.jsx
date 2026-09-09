import { useState } from 'react';
import {
  Star, ChevronDown, MessageSquare, HelpCircle,
  ShieldCheck
} from 'lucide-react';

export default function ReviewsAndFAQ({ onContactClick }) {
  const [openFaq, setOpenFaq] = useState(0);

  const reviews = [
    {
      name: 'Rohan Kulkarni',
      role: 'Final Year Engineering Student (RV College)',
      vehicle: 'Revolt RV400 Premium',
      rating: 5,
      comment: 'The student concept plan was a lifesaver. Paying roughly ₹100/day from my part-time internship stipend instead of burning ₹4,000 monthly on petrol. Dorm room battery charging works flawlessly.',
      date: '2 weeks ago',
      verified: true
    },
    {
      name: 'Dr. Priya Sundaram',
      role: 'Cardiologist & Daily Commuter',
      vehicle: 'Tata Nexon.ev Empowered+',
      rating: 5,
      comment: 'Superb refinement and whisper quiet. In bumper-to-bumper city traffic, one-pedal driving saves so much fatigue. We have logged 14,000 km with practically zero maintenance costs.',
      date: '1 month ago',
      verified: true
    },
    {
      name: 'Aditya & Neha Verma',
      role: 'Young Family Road-Trippers',
      vehicle: 'BYD Seal Performance',
      rating: 5,
      comment: 'The acceleration is supercar level, but what truly won us over is the 580 km real-world range and ultra-rigid Blade battery. Fast chargers on the highway get us back on the road in 25 mins.',
      date: '3 weeks ago',
      verified: true
    }
  ];

  const faqs = [
    {
      q: 'How does the Student EV Plan (₹50/day and ₹100/day) work?',
      a: 'The EV Student Plan is a concept daily micro-installment breakdown designed to illustrate low-barrier entry for school and college riders. School students require mandatory parent/guardian verification and speed-limited models (25 km/h). College students can submit their institution ID for fast-tracked eligibility.'
    },
    {
      q: 'Can school students directly purchase electric bikes on this website?',
      a: 'No. To ensure road safety and legal compliance, direct checkout is disabled for underage/school students. Purchase enquiries require completion of our multi-step Parent/Guardian Verification flow, where legal guardians provide consent and review vehicle speed limitations.'
    },
    {
      q: 'How do I charge an electric vehicle at home or in an apartment?',
      a: 'Most electric two-wheelers feature portable lithium battery packs that can be unclipped and plugged into any standard 5A/15A wall socket in your dorm room or home. For electric cars, we include a 3.3 kW portable charger and offer complimentary technician assistance for 7.4 kW home Wallbox installation.'
    },
    {
      q: 'What is the real-world battery lifespan and warranty?',
      a: 'All our featured EV models feature automotive-grade Lithium Iron Phosphate (LFP) or advanced NMC battery chemistries designed for 1,500 to 3,000 charge cycles (typically 7 to 10 years of daily usage). Manufacturers provide between 5 to 8 years (up to 1,60,000 km) official battery replacement warranties.'
    },
    {
      q: 'How does the side-by-side vehicle comparison calculate "Our Best Choice"?',
      a: 'Our comparison engine utilizes a dynamic multi-factor algorithm comparing range, price-to-performance ratio, charging speed, battery density, and user review scores across the specific models you select. It dynamically crowns the highest-scoring model without bias or hardcoded winners.'
    },
    {
      q: 'Can I exchange my existing petrol scooter or car?',
      a: 'Yes! Our Green Exchange program offers complimentary physical valuation of your old petrol two-wheeler or car, applying the full exchange value plus up to a ₹15,000 eco-bonus directly against your new EV down payment.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* REVIEWS SUBSECTION */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-bold uppercase tracking-wider mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Real Owner Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Loved by Students, Commuters & Families
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Verified feedback from riders who transformed their daily mobility with our showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left relative overflow-hidden group"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 gap-1">
                      {Array.from({ length: r.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    "{r.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {r.name}
                      </h4>
                      {r.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified EV Owner" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{r.role}</p>
                    <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 mt-0.5 block">
                      Rides: {r.vehicle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SUBSECTION */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Inquiries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
              Everything you need to know about EV charging, student plans, and warranties.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/60 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-cyan-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact CTA Banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-cyan-600 to-indigo-700 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-cyan-200">
                Ready to Experience EV Power?
              </span>
              <h3 className="text-2xl font-black mt-1">
                Book a Complimentary Test Ride Today
              </h3>
              <p className="text-xs text-cyan-100 mt-1 max-w-md">
                Visit our experience center or request a doorstep test ride with our certified EV specialists.
              </p>
            </div>

            <button
              onClick={onContactClick}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 cursor-pointer"
            >
              Contact Showroom Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
