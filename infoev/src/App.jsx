import { useState, useEffect } from 'react';
import { bikesData, carsData } from './vehiclesData';

// Core Showcase Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
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
import OfferClaimModal from './components/OfferClaimModal';

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
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

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

  // Modal open helpers with history state push so browser back button closes modal safely
  const openVehicleModal = (vehicle, tab = 'details') => {
    window.history.pushState({ type: 'modal', modalName: 'vehicle' }, '');
    setSelectedVehicle(vehicle);
    setInitialVehicleModalTab(tab);
  };

  const openCompareModal = () => {
    window.history.pushState({ type: 'modal', modalName: 'compare' }, '');
    setIsCompareModalOpen(true);
  };

  const openCalculatorModal = (type, price) => {
    window.history.pushState({ type: 'modal', modalName: 'calculator' }, '');
    setCalculatorStudentType(type);
    setCalculatorPrice(price);
    setIsCalculatorOpen(true);
  };

  const openParentVerificationModal = (type) => {
    window.history.pushState({ type: 'modal', modalName: 'verification' }, '');
    setVerificationType(type);
    setIsParentVerificationOpen(true);
  };

  const openRecommendationModal = () => {
    window.history.pushState({ type: 'modal', modalName: 'recommendation' }, '');
    setIsRecommendationOpen(true);
  };

  const openSearchModal = () => {
    window.history.pushState({ type: 'modal', modalName: 'search' }, '');
    setIsSearchOpen(true);
  };

  const openOfferModal = (offer) => {
    window.history.pushState({ type: 'modal', modalName: 'offer' }, '');
    setSelectedOffer(offer);
    setIsOfferModalOpen(true);
  };

  // Browser History & Laptop Back/Swipe Protection
  useEffect(() => {
    // Set initial state in history
    if (!window.history.state) {
      window.history.replaceState({ type: 'page', page: 'home' }, '', window.location.pathname + window.location.hash);
    }

    const handlePopState = (e) => {
      // 1. If any modal is open, close it instead of leaving the website
      if (selectedVehicle) {
        setSelectedVehicle(null);
        return;
      }
      if (isCompareModalOpen) {
        setIsCompareModalOpen(false);
        return;
      }
      if (isCalculatorOpen) {
        setIsCalculatorOpen(false);
        return;
      }
      if (isParentVerificationOpen) {
        setIsParentVerificationOpen(false);
        return;
      }
      if (isOfferModalOpen) {
        setIsOfferModalOpen(false);
        return;
      }
      if (isSearchOpen) {
        setIsSearchOpen(false);
        return;
      }
      if (isRecommendationOpen) {
        setIsRecommendationOpen(false);
        return;
      }

      // 2. If user is on a dedicated page and hits back, return to home view
      if (e.state && e.state.page) {
        setActivePage(e.state.page);
      } else if (activePage !== 'home') {
        setActivePage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    selectedVehicle,
    isCompareModalOpen,
    isCalculatorOpen,
    isParentVerificationOpen,
    isOfferModalOpen,
    isSearchOpen,
    isRecommendationOpen,
    activePage
  ]);

  // Navigation handlers
  const handleNavigate = (page) => {
    window.history.pushState({ type: 'page', page }, '', page === 'home' ? '#' : `#${page}`);
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
    handleNavigate('home');
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
        onOpenCompare={() => openCompareModal()}
        onOpenSearch={() => openSearchModal()}
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
              const el = document.getElementById('explore-by-need');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreCars={() => {
              setActiveCategoryTab('car');
              setSelectedLifestyle('daily');
              const el = document.getElementById('explore-by-need');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onFindPerfectEV={() => openRecommendationModal()}
          />

          {/* 3. COMBINED EXPLORE BY NEED & SEGMENT SELECTION */}
          <ExploreByNeed
            vehicleType={activeCategoryTab}
            onSelectVehicleType={(type) => {
              setActiveCategoryTab(type);
              setSelectedLifestyle('daily');
            }}
            bikesCount={bikesData.length}
            carsCount={carsData.length}
            selectedCategory={selectedLifestyle}
            onSelectCategory={(catId) => setSelectedLifestyle(catId)}
            onViewVehicle={(v, tab) => openVehicleModal(v, tab)}
            onToggleCompare={toggleCompare}
            comparedVehicleIds={comparedVehicleIds}
          />

          {/* 4. EV STUDENT MONTHLY PLAN SECTION */}
          <StudentPlanSection
            onOpenCalculator={(type, price) => openCalculatorModal(type, price)}
            onOpenParentVerification={(type) => openParentVerificationModal(type)}
          />

          {/* 5. WHY CHOOSE US (AUTOMOTIVE ASSURANCE) */}
          <WhyChooseUs />

          {/* 6. EV BENEFITS (PETROL VS EV SAVINGS CALCULATOR) */}
          <EVBenefits />

          {/* 7. SHOWROOM OFFERS */}
          <OffersSection
            onClaimOffer={(offer) => openOfferModal(offer)}
            onOpenStudentPlan={() => {
              const el = document.getElementById('student-plan');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenParentVerification={(type) => openParentVerificationModal(type)}
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
                onViewVehicle={(v, tab) => openVehicleModal(v, tab)}
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
                onViewVehicle={(v, tab) => openVehicleModal(v, tab)}
              />
            ))}
          </div>
        </main>
      )}

      {/* DEDICATED STUDENT PLAN PAGE */}
      {activePage === 'student-plan' && (
        <main className="flex-1">
          <StudentPlanSection
            onOpenCalculator={(type, price) => openCalculatorModal(type, price)}
            onOpenParentVerification={(type) => openParentVerificationModal(type)}
          />
        </main>
      )}

      {/* DEDICATED OFFERS PAGE */}
      {activePage === 'offers' && (
        <main className="flex-1">
          <OffersSection
            onClaimOffer={(offer) => openOfferModal(offer)}
            onOpenStudentPlan={() => handleNavigate('student-plan')}
            onOpenParentVerification={(type) => openParentVerificationModal(type)}
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
        onOpenFullCompare={() => openCompareModal()}
      />

      {/* Full Compare Matrix Modal with Dynamic "Our Best Choice" Winner */}
      {isCompareModalOpen && (
        <CompareModal
          vehicles={comparedVehicleObjects}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveVehicle={removeComparisonItem}
          onViewVehicle={(v) => {
            setIsCompareModalOpen(false);
            openVehicleModal(v);
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
        onProceedToVerification={(type) => openParentVerificationModal(type)}
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
          openVehicleModal(v);
        }}
      />

      {/* Global Instant Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onViewVehicle={(v) => {
          setIsSearchOpen(false);
          openVehicleModal(v);
        }}
      />

      {/* Interactive Offer Claim & Consultation Modal */}
      <OfferClaimModal
        isOpen={isOfferModalOpen}
        offer={selectedOffer}
        onClose={() => {
          setIsOfferModalOpen(false);
          setSelectedOffer(null);
        }}
        onOpenStudentPlan={() => {
          setIsOfferModalOpen(false);
          setSelectedOffer(null);
          const el = document.getElementById('student-plan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
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
