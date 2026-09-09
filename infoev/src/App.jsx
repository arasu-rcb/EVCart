import { useState, useEffect } from 'react';
import { bikesData, carsData } from './vehiclesData';

// Core Showcase Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import VehicleTypeSelector from './components/VehicleTypeSelector';
import ExploreByNeed from './components/ExploreByNeed';
import VehicleCard from './components/VehicleCard';
import VehicleModal from './components/VehicleModal';

// Upgraded Comparison & Student Modules
import CompareDrawer from './components/CompareDrawer';
import CompareModal from './components/CompareModal';
import StudentPlanSection from './components/StudentPlanSection';
import StudentCalculatorModal from './components/StudentCalculatorModal';
import ParentVerificationModal from './components/ParentVerificationModal';
import RecommendationWizardModal from './components/RecommendationWizardModal';

// Additional Showroom Sections
import OffersSection from './components/OffersSection';
import WhyChooseUs from './components/WhyChooseUs';
import EVBenefits from './components/EVBenefits';
import ReviewsAndFAQ from './components/ReviewsAndFAQ';
import SearchModal from './components/SearchModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

export default function App() {
  // Theme state: dark / light
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // default dark for EV luxury aesthetic
  });

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Navigation / Page View: 'home' | 'bikes' | 'cars' | 'student-plan' | 'offers' | 'about' | 'contact'
  const [activePage, setActivePage] = useState('home');

  // Filter state (User chooses vehicle type via toggle: 'bike' | 'car', defaults to 'bike')
  const [activeCategoryTab, setActiveCategoryTab] = useState('bike'); // 'bike' | 'car'
  const [selectedLifestyle, setSelectedLifestyle] = useState('daily');

  // Modals & Drawers state
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [initialVehicleModalTab, setInitialVehicleModalTab] = useState('details');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorStudentType, setCalculatorStudentType] = useState('college');
  const [calculatorPrice, setCalculatorPrice] = useState(120000);
  const [isParentVerificationOpen, setIsParentVerificationOpen] = useState(false);
  const [verificationType, setVerificationType] = useState('school');
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Comparison State (up to 4 vehicles)
  const [comparedVehicleIds, setComparedVehicleIds] = useState([]);
  
  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Compare toggling
  const toggleCompare = (vehicleId) => {
    setComparedVehicleIds(prev => {
      if (prev.includes(vehicleId)) {
        showToast('Removed from comparison list', 'info');
        return prev.filter(id => id !== vehicleId);
      }
      if (prev.length >= 4) {
        showToast('Maximum of 4 vehicles can be compared simultaneously', 'error');
        return prev;
      }
      showToast('Added to vehicle comparison queue', 'success');
      return [...prev, vehicleId];
    });
  };

  const clearComparison = () => {
    setComparedVehicleIds([]);
    showToast('Comparison queue cleared', 'info');
  };

  const removeComparisonItem = (id) => {
    setComparedVehicleIds(prev => prev.filter(vId => vId !== id));
  };

  // Navigation handlers
  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'bikes') {
      setActiveCategoryTab('bike');
    } else if (page === 'cars') {
      setActiveCategoryTab('car');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLifestyleFromNav = (catId, vehicleType) => {
    setSelectedLifestyle(catId);
    if (vehicleType) {
      setActiveCategoryTab(vehicleType);
    }
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById('explore-by-need');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Compared vehicles objects
  const allVehicles = [...bikesData, ...carsData];
  const comparedVehicleObjects = allVehicles.filter(v => comparedVehicleIds.includes(v.id));

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 ${comparedVehicleIds.length > 0 ? 'pb-24' : ''}`}>
      
      {/* 1. STICKY NAVBAR */}
      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        activePage={activePage}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectLifestyleFromNav}
        comparedCount={comparedVehicleIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* PAGE VIEW ROUTING */}
      
      {/* HOME PAGE VIEW */}
      {activePage === 'home' && (
        <>
          {/* 2. HERO SECTION */}
          <HeroSection
            onExploreBikes={() => {
              setActiveCategoryTab('bike');
              setSelectedLifestyle('daily');
              const el = document.getElementById('vehicle-type-selection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreCars={() => {
              setActiveCategoryTab('car');
              setSelectedLifestyle('daily');
              const el = document.getElementById('vehicle-type-selection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onFindPerfectEV={() => setIsRecommendationOpen(true)}
          />

          {/* 3. VEHICLE TYPE SELECTION ("WHAT ARE YOU LOOKING FOR?") - COMPACT AUTOMOTIVE TOGGLE */}
          <VehicleTypeSelector
            selectedType={activeCategoryTab}
            onSelectType={(type) => {
              setActiveCategoryTab(type);
              setSelectedLifestyle('daily');
            }}
            bikesCount={bikesData.length}
            carsCount={carsData.length}
          />

          {/* 4. EXPLORE BY NEED (LIFESTYLE SECTION DEDICATED TO SELECTED TYPE) */}
          <ExploreByNeed
            vehicleType={activeCategoryTab}
            selectedCategory={selectedLifestyle}
            onSelectCategory={(catId) => setSelectedLifestyle(catId)}
            onViewVehicle={(v, tab) => {
              setSelectedVehicle(v);
              setInitialVehicleModalTab(tab || 'details');
            }}
            onToggleCompare={toggleCompare}
            comparedVehicleIds={comparedVehicleIds}
          />

          {/* 6. EV STUDENT MONTHLY PLAN SECTION */}
          <StudentPlanSection
            onOpenCalculator={(type, price) => {
              setCalculatorStudentType(type);
              setCalculatorPrice(price);
              setIsCalculatorOpen(true);
            }}
            onOpenParentVerification={(type) => {
              setVerificationType(type);
              setIsParentVerificationOpen(true);
            }}
          />

          {/* 7. WHY CHOOSE US (AUTOMOTIVE ASSURANCE) */}
          <WhyChooseUs />

          {/* 8. EV BENEFITS (PETROL VS EV SAVINGS CALCULATOR) */}
          <EVBenefits />

          {/* 9. SHOWROOM OFFERS */}
          <OffersSection
            onClaimOffer={(offerTitle) => {
              showToast(`Offer inquiry for "${offerTitle}" initiated with showroom desk`, 'success');
            }}
            onOpenStudentPlan={() => {
              const el = document.getElementById('student-plan');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 10. REVIEWS & FAQ */}
          <ReviewsAndFAQ
            onContactClick={() => handleNavigate('contact')}
          />
        </>
      )}

      {/* DEDICATED BIKES PAGE */}
      {activePage === 'bikes' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full text-left">
          <div className="mb-8">
            <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Showroom Category</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Electric Bikes & Performance Motorcycles
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Explore {bikesData.length} models across Ola, Ather, Ultraviolette, Revolt, TVS, and campus commuters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikesData.map((bike) => (
              <VehicleCard
                key={bike.id}
                vehicle={bike}
                isCompared={comparedVehicleIds.includes(bike.id)}
                onToggleCompare={toggleCompare}
                onViewVehicle={(v, tab) => {
                  setSelectedVehicle(v);
                  setInitialVehicleModalTab(tab || 'details');
                }}
              />
            ))}
          </div>
        </main>
      )}

      {/* DEDICATED CARS PAGE */}
      {activePage === 'cars' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full text-left">
          <div className="mb-8">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Showroom Category</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Electric Cars, Sedans & SUVs
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Explore {carsData.length} models across Tata, MG, Tesla, BYD, Porsche, Rivian, and Hyundai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carsData.map((car) => (
              <VehicleCard
                key={car.id}
                vehicle={car}
                isCompared={comparedVehicleIds.includes(car.id)}
                onToggleCompare={toggleCompare}
                onViewVehicle={(v, tab) => {
                  setSelectedVehicle(v);
                  setInitialVehicleModalTab(tab || 'details');
                }}
              />
            ))}
          </div>
        </main>
      )}

      {/* DEDICATED STUDENT PLAN PAGE */}
      {activePage === 'student-plan' && (
        <main className="flex-1">
          <StudentPlanSection
            onOpenCalculator={(type, price) => {
              setCalculatorStudentType(type);
              setCalculatorPrice(price);
              setIsCalculatorOpen(true);
            }}
            onOpenParentVerification={(type) => {
              setVerificationType(type);
              setIsParentVerificationOpen(true);
            }}
          />
        </main>
      )}

      {/* DEDICATED OFFERS PAGE */}
      {activePage === 'offers' && (
        <main className="flex-1">
          <OffersSection
            onClaimOffer={(offerTitle) => {
              showToast(`Offer inquiry for "${offerTitle}" initiated with showroom desk`, 'success');
            }}
            onOpenStudentPlan={() => handleNavigate('student-plan')}
          />
        </main>
      )}

      {/* DEDICATED ABOUT PAGE */}
      {activePage === 'about' && (
        <main className="flex-1">
          <WhyChooseUs />
          <EVBenefits />
          <ReviewsAndFAQ onContactClick={() => handleNavigate('contact')} />
        </main>
      )}

      {/* DEDICATED CONTACT PAGE */}
      {activePage === 'contact' && (
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Showroom Headquarters</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Connect With EVISTA Specialists
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Schedule a doorstep test ride, request fleet bulk booking, or inspect vehicles in person.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Inquiry Purpose</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none">
                <option>Booking a Doorstep Test Ride</option>
                <option>Student EV Monthly Plan & Parental Consent</option>
                <option>Exchange Evaluation (Petrol to EV)</option>
                <option>Corporate / College Fleet Inquiries</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Message / Requirements</label>
              <textarea
                rows={4}
                placeholder="Tell us about the vehicle models or charging requirements you are interested in..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <button
              onClick={() => showToast('Thank you! Our showroom representative will call you shortly.', 'success')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer"
            >
              Send Showroom Inquiry
            </button>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectLifestyleFromNav}
      />

      {/* ==================== GLOBAL MODALS & DRAWERS ==================== */}

      {/* Bottom Floating Compare Drawer (when 1-4 models selected) */}
      <CompareDrawer
        comparedVehicles={comparedVehicleObjects}
        onRemove={removeComparisonItem}
        onClear={clearComparison}
        onOpenFullCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Full Compare Matrix Modal with Dynamic "Our Best Choice" Winner */}
      {isCompareModalOpen && (
        <CompareModal
          vehicles={comparedVehicleObjects}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveVehicle={removeComparisonItem}
          onViewVehicle={(v) => {
            setIsCompareModalOpen(false);
            setSelectedVehicle(v);
          }}
        />
      )}

      {/* Detailed Vehicle Modal (Overview, Specifications, Advantages, Suitability, Booking) */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          initialTab={initialVehicleModalTab}
          isCompared={comparedVehicleIds.includes(selectedVehicle.id)}
          onToggleCompare={toggleCompare}
          onClose={() => setSelectedVehicle(null)}
          onOpenStudentPlan={() => {
            setSelectedVehicle(null);
            handleNavigate('student-plan');
          }}
        />
      )}

      {/* Interactive Student Payment Calculator Modal */}
      <StudentCalculatorModal
        isOpen={isCalculatorOpen}
        initialStudentType={calculatorStudentType}
        initialPrice={calculatorPrice}
        onClose={() => setIsCalculatorOpen(false)}
        onProceedToVerification={(type) => {
          setVerificationType(type);
          setIsParentVerificationOpen(true);
        }}
      />

      {/* Safe 4-Step Parent/Guardian Verification Flow */}
      <ParentVerificationModal
        isOpen={isParentVerificationOpen}
        initialType={verificationType}
        onClose={() => setIsParentVerificationOpen(false)}
        onComplete={(refId) => {
          showToast(`Guardian verification ${refId} logged with showroom desk!`, 'success');
        }}
      />

      {/* Smart Recommendation Wizard Modal ("Find My Perfect EV") */}
      <RecommendationWizardModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
        onViewVehicle={(v) => {
          setIsRecommendationOpen(false);
          setSelectedVehicle(v);
        }}
      />

      {/* Global Instant Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onViewVehicle={(v) => {
          setIsSearchOpen(false);
          setSelectedVehicle(v);
        }}
      />

      {/* Toast Notification System */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
