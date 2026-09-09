import { useState, useEffect } from 'react';
import {
  Bike, Car, Search, ArrowUpDown, Compass
} from 'lucide-react';
import { bikesData, carsData, bikeBrands, carBrands } from './vehiclesData';

// Core Showcase Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExploreByNeed from './components/ExploreByNeed';
import VehicleCard from './components/VehicleCard';
import VehicleModal from './components/VehicleModal';
import RiderFitModal from './components/RiderFitModal';

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

  // Filter & Search states
  const [activeCategoryTab, setActiveCategoryTab] = useState('bike'); // 'bike' | 'car'
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedLifestyle, setSelectedLifestyle] = useState('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-asc', 'price-desc', 'range-desc', 'speed-desc', 'rating-desc'
  const [studentOnlyFilter, setStudentOnlyFilter] = useState(false);

  // Modals & Drawers state
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [initialVehicleModalTab, setInitialVehicleModalTab] = useState('details');
  const [fitVehicle, setFitVehicle] = useState(null);
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

  // Active dataset for Showroom Catalog
  const activeDataset = activeCategoryTab === 'bike' ? bikesData : carsData;
  const activeBrands = activeCategoryTab === 'bike' ? bikeBrands : carBrands;

  // Filter & Sort Logic
  const filteredVehicles = activeDataset.filter((vehicle) => {
    const matchesBrand = selectedBrand === 'all' || vehicle.brand === selectedBrand;
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStudent = !studentOnlyFilter || Boolean(vehicle.studentDailyPlan || vehicle.school || vehicle.college);
    return matchesBrand && matchesSearch && matchesStudent;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'range-desc') return b.range - a.range;
    if (sortBy === 'speed-desc') return b.topSpeed - a.topSpeed;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    return 0; // default order
  });

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
        onOpenFit={() => setFitVehicle(bikesData[0])}
      />

      {/* PAGE VIEW ROUTING */}
      
      {/* HOME PAGE VIEW */}
      {activePage === 'home' && (
        <>
          {/* 2. HERO SECTION */}
          <HeroSection
            onExploreBikes={() => {
              setActiveCategoryTab('bike');
              setSelectedBrand('all');
              const el = document.getElementById('catalog-showroom');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreCars={() => {
              setActiveCategoryTab('car');
              setSelectedBrand('all');
              const el = document.getElementById('catalog-showroom');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onFindPerfectEV={() => setIsRecommendationOpen(true)}
          />

          {/* 3. EXPLORE BY NEED (LIFESTYLE SECTION) */}
          <ExploreByNeed
            selectedCategory={selectedLifestyle}
            onSelectCategory={(catId) => setSelectedLifestyle(catId)}
            onViewVehicle={(v, tab) => {
              setSelectedVehicle(v);
              setInitialVehicleModalTab(tab || 'details');
            }}
            onToggleCompare={toggleCompare}
            comparedVehicleIds={comparedVehicleIds}
            onOpenFit={(v) => setFitVehicle(v)}
          />

          {/* 4. SHOWROOM CATALOG GRID (BIKES & CARS WITH FILTERS) */}
          <section id="catalog-showroom" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Curated Showroom Floor
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                  Explore Full Fleet Catalog
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                  Browse {bikesData.length} electric two-wheelers and {carsData.length} premium electric cars with transparent pricing.
                </p>
              </div>

              {/* Category Selector Tabs (Bikes vs Cars) */}
              <div className="inline-flex p-1.5 bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl self-start md:self-auto">
                <button
                  onClick={() => { setActiveCategoryTab('bike'); setSelectedBrand('all'); }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                    activeCategoryTab === 'bike'
                      ? 'bg-white dark:bg-cyan-500 text-slate-950 dark:text-slate-950 shadow-md scale-102'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  Electric Bikes ({bikesData.length})
                </button>
                <button
                  onClick={() => { setActiveCategoryTab('car'); setSelectedBrand('all'); }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                    activeCategoryTab === 'car'
                      ? 'bg-white dark:bg-indigo-600 text-slate-950 dark:text-white shadow-md scale-102'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  Electric Cars ({carsData.length})
                </button>
              </div>
            </div>

            {/* CONTROLS: SEARCH, BRAND FILTER & SORT */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search input */}
                <div className="relative w-full md:max-w-md">
                  <span className="absolute left-3.5 top-3.5 text-slate-400">
                    <Search className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type="text"
                    placeholder={`Search ${activeCategoryTab === 'bike' ? 'bikes' : 'cars'} by name, brand, or features...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                {/* Right controls: Student Filter toggle & Sort */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  <button
                    onClick={() => setStudentOnlyFilter(!studentOnlyFilter)}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      studentOnlyFilter
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>🎓 Student Eligible Only</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="default">Featured Fleet</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="range-desc">Longest Driving Range</option>
                      <option value="speed-desc">Top Speed (Fastest)</option>
                      <option value="rating-desc">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Horizontal Brand Strip */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                  Filter by Brand:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
                  {activeBrands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer snap-start ${
                        selectedBrand === brand.id
                          ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-md font-black'
                          : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* VEHICLE GRID */}
            {sortedVehicles.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
                <Compass className="w-14 h-14 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No Matching EV Models Found
                </h3>
                <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                  Try clearing your search query or selecting "All Brands" to view our complete lineup.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedBrand('all'); setStudentOnlyFilter(false); }}
                  className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  Reset Showroom Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {sortedVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isCompared={comparedVehicleIds.includes(vehicle.id)}
                    onToggleCompare={toggleCompare}
                    onViewVehicle={(v, tab) => {
                      setSelectedVehicle(v);
                      setInitialVehicleModalTab(tab || 'details');
                    }}
                    onOpenFit={(v) => setFitVehicle(v)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 5. EV STUDENT PLAN SECTION */}
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

          {/* 6. WHY CHOOSE US (8 PILLARS) */}
          <WhyChooseUs />

          {/* 7. EV BENEFITS (PETROL VS EV COMPARISON) */}
          <EVBenefits />

          {/* 8. SHOWROOM OFFERS */}
          <OffersSection
            onClaimOffer={(offerTitle) => {
              showToast(`Offer inquiry for "${offerTitle}" initiated with showroom desk`, 'success');
            }}
            onOpenStudentPlan={() => {
              const el = document.getElementById('student-plan');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 9. REVIEWS & FAQ */}
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
                onOpenFit={(v) => setFitVehicle(v)}
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
                onOpenFit={(v) => setFitVehicle(v)}
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
              Schedule an executive showroom visit, request fleet bulk booking, or inspect vehicles in person.
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
                <option>Student EV Plan & Parental Verification</option>
                <option>Exchange Evaluation (Petrol to EV)</option>
                <option>Bulk College / Corporate Fleet Inquiry</option>
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
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

      {/* Detailed Vehicle Modal (Overview, Running Cost vs Petrol, Specs, 3D/360, Booking) */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          initialTab={initialVehicleModalTab}
          isCompared={comparedVehicleIds.includes(selectedVehicle.id)}
          onToggleCompare={toggleCompare}
          onClose={() => setSelectedVehicle(null)}
          onOpenFit={(v) => setFitVehicle(v)}
          onOpenStudentPlan={() => {
            setSelectedVehicle(null);
            handleNavigate('student-plan');
          }}
        />
      )}

      {/* Rider Ergonomics & Fit Studio Modal (Preserved) */}
      {fitVehicle && (
        <RiderFitModal
          vehicle={fitVehicle}
          onClose={() => setFitVehicle(null)}
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
