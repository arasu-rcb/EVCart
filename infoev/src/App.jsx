import React, { useState, useEffect } from 'react';
import {
  Sun, Moon, Search, ArrowUpDown,
  MapPin, Phone, Mail, Compass, Star, RefreshCw, ChevronRight, Check,
  Bike, Car, RotateCw, User, Eye
} from 'lucide-react';
import { bikesData, carsData, bikeBrands, carBrands } from './vehiclesData';
import CompareDrawer from './components/CompareDrawer';
import VehicleModal from './components/VehicleModal';
import Vehicle3DViewer from './components/Vehicle3DViewer';
import RiderFitModal from './components/RiderFitModal';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preferences
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState('bike'); // bike | car
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fitVehicle, setFitVehicle] = useState(null); // Vehicle opened in Rider Fit Studio
  const [cardViewModes, setCardViewModes] = useState({}); // { [vehicleId]: '3d' | 'photo' }
  const [comparedVehicleIds, setComparedVehicleIds] = useState([]);
  const [sortBy, setSortBy] = useState('default'); // default, price-asc, price-desc, speed-desc, range-desc

  // Toggle card 3D / Photo mode
  const toggleCardMode = (id) => {
    setCardViewModes(prev => ({
      ...prev,
      [id]: prev[id] === '3d' ? 'photo' : '3d'
    }));
  };

  // Sync dark mode class on <html>
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

  // Toggle vehicle in comparison drawer
  const toggleCompare = (vehicleId) => {
    setComparedVehicleIds((prev) => {
      if (prev.includes(vehicleId)) {
        return prev.filter((id) => id !== vehicleId);
      }
      if (prev.length >= 3) {
        alert("You can compare a maximum of 3 models at a time.");
        return prev;
      }
      return [...prev, vehicleId];
    });
  };

  // Clear all comparison items
  const clearComparison = () => setComparedVehicleIds([]);

  // Remove single comparison item
  const removeComparisonItem = (vehicleId) => {
    setComparedVehicleIds(prev => prev.filter(id => id !== vehicleId));
  };

  // Active dataset based on tab
  const activeVehicles = activeCategory === 'bike' ? bikesData : carsData;
  const brandsList = activeCategory === 'bike' ? bikeBrands : carBrands;

  // Filter & Sort Data
  const filteredVehicles = activeVehicles.filter((vehicle) => {
    const matchesBrand = selectedBrand === 'all' || vehicle.brand === selectedBrand;
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'speed-desc') return b.topSpeed - a.topSpeed;
    if (sortBy === 'range-desc') return b.range - a.range;
    return 0; // default
  });

  // Get compared vehicle objects from all vehicles
  const allVehicles = [...bikesData, ...carsData];
  const comparedVehicleObjects = allVehicles.filter(vehicle => comparedVehicleIds.includes(vehicle.id));

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 ${comparedVehicleIds.length > 0 ? 'pb-[400px] md:pb-[260px]' : ''}`}>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md tracking-wider">
              ⚡
            </span>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
              EVISTA
            </span>
          </div>

          {/* Quick Stats or Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#showroom" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Showroom</a>
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Why EV?</a>
            <a href="#footer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
          </nav>

          {/* Actions & Theme toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFitVehicle(bikesData[0])}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all cursor-pointer shadow-sm"
              title="Upload photo & test vehicle fit"
            >
              <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Rider Fit Studio
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer shadow-sm"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="#showroom"
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              Explore Showroom
            </a>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[460px] flex items-center">
        {/* Background image & gradient overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero_banner.png"
            alt="Futuristic Showroom"
            className="w-full h-full object-cover opacity-35 object-center scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Hero Text */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10 text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Revolutionary EV Showroom
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">
              Elevate Your Ride. <br />
              Bikes & Cars.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Discover premium, professional electric bikes and futuristic EV cars. Hand-picked brands configured for performance, sustainability, and unparalleled design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#showroom"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-indigo-500/20 hover:scale-102 transition-all cursor-pointer"
              >
                Browse Showroom
              </a>
              <a
                href="#about"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 font-semibold text-sm rounded-lg hover:scale-102 transition-all cursor-pointer"
              >
                Learn Benefits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SHOWROOM */}
      <main id="showroom" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

        {/* SECTION HEADER */}
        <div className="text-center md:text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              The Virtual Showroom
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">
              Explore {bikesData.length} premium e-bikes and {carsData.length} luxury EV cars from the world's most innovative brands.
            </p>
          </div>

          {/* Quick Filter Info */}
          {comparedVehicleIds.length > 0 && (
            <button
              onClick={clearComparison}
              className="self-center md:self-end px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Clear Comparison ({comparedVehicleIds.length})
            </button>
          )}
        </div>

        {/* Category Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md rounded-2xl shadow-inner">
            <button
              onClick={() => { setActiveCategory('bike'); setSelectedBrand('all'); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-300 cursor-pointer ${activeCategory === 'bike'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-md scale-102'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              <Bike className="w-4.5 h-4.5" />
              Electric Bikes ({bikesData.length})
            </button>
            <button
              onClick={() => { setActiveCategory('car'); setSelectedBrand('all'); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-300 cursor-pointer ${activeCategory === 'car'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-md scale-102'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              <Car className="w-4.5 h-4.5" />
              Electric Cars ({carsData.length})
            </button>
          </div>
        </div>

        {/* CONTROLS: SEARCH & BRANDS & SORT */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm mb-8 space-y-4">

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute left-3 top-3.5 text-slate-400">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                placeholder={`Search ${activeCategory} models, brands, categories...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="default">Default Catalog</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="speed-desc">Highest Top Speed</option>
                <option value="range-desc">Longest Range</option>
              </select>
            </div>
          </div>

          {/* Horizontal Brand Selector */}
          <div className="border-t border-slate-100 dark:border-slate-800/50 pt-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 text-left">
              Filter By Brand
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x justify-start">
              {brandsList.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer snap-start ${selectedBrand === brand.id
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-indigo-600 dark:text-white dark:border-indigo-600 shadow-md scale-102'
                    : 'bg-white dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* VEHICLE GRID LAYOUT */}
        {sortedVehicles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/60 p-8">
            <Compass className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700 stroke-[1.2]" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Models Found</h3>
            <p className="text-slate-400 mt-1 max-w-md mx-auto text-sm">
              We couldn't find any {activeCategory}s matching your search query or filters. Try adjusting your brand choice or search term.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedBrand('all'); }}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {sortedVehicles.map((vehicle) => {
              const isCompared = comparedVehicleIds.includes(vehicle.id);
              const is3D = cardViewModes[vehicle.id] === '3d';

              return (
                <div
                  key={vehicle.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-slate-950/20 overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Image & 3D Container (Transparent Background) */}
                  <div className="relative flex justify-center items-center h-52 border-b border-slate-100 dark:border-slate-800/40 bg-transparent overflow-hidden">

                    {/* Category Label */}
                    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {vehicle.type}
                    </span>

                    {/* Compare Tag (Checkbox) */}
                    <button
                      onClick={() => toggleCompare(vehicle.id)}
                      className={`absolute top-3 right-3 z-10 p-1 rounded-md border flex items-center justify-center cursor-pointer transition-all ${isCompared
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                        : 'bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-200 dark:hover:text-slate-700'
                        }`}
                      title={isCompared ? "Remove from comparison" : "Compare this model"}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    {/* 3D Model vs Photo Switcher Button on Card */}
                    <button
                      onClick={() => toggleCardMode(vehicle.id)}
                      className={`absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1 shadow-sm backdrop-blur-md cursor-pointer ${
                        is3D
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30'
                          : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                      title={is3D ? "Switch to Photo View" : "Interact with 3D 360° Model"}
                    >
                      {is3D ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Photo
                        </>
                      ) : (
                        <>
                          <RotateCw className="w-3 h-3 text-indigo-500" />
                          3D 360°
                        </>
                      )}
                    </button>

                    {/* Visual Body: 3D 360 Orbit vs Clean Transparent Photo */}
                    <div className="relative flex justify-center items-center w-full h-full">
                      {is3D ? (
                        <Vehicle3DViewer
                          vehicle={vehicle}
                          height="208px"
                          showControls={false}
                          autoRotate={true}
                        />
                      ) : (
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="relative w-44 md:w-48 h-28 md:h-32 object-contain transform group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                  </div>

                  {/* Vehicle Info Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand & Name */}
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                          {vehicle.brandName}
                        </span>
                        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg mt-0.5 leading-tight">
                          {vehicle.name}
                        </h3>
                      </div>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40 text-left">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Est. Range</span>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{vehicle.range} km</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Top Speed</span>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{vehicle.topSpeed} km/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Price, Fit Check, and Details button */}
                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] text-slate-400 block font-semibold uppercase tracking-wider">Base Price</span>
                        <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                          ${vehicle.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setFitVehicle(vehicle)}
                          className="px-2.5 py-2 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer bg-slate-50/60 dark:bg-slate-800/50"
                          title="Check how this vehicle fits your height & body"
                        >
                          <User className="w-3.5 h-3.5" />
                          Fit Check
                        </button>

                        <button
                          onClick={() => setSelectedVehicle(vehicle)}
                          className="px-3.5 py-2 border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* WHY EV BENEFITS SECTION */}
      <section id="about" className="bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800/80 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Sustainable Innovation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Why Switch to Electric Vehicles?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
              Electric two-wheelers and passenger vehicles represent a massive step forward in efficiency, noise reduction, and eco-friendly urban mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                🔌
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Zero Emissions</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-2">
                EVs and electric motorcycles emit zero greenhouse gases, contributing directly to cleaner urban air quality and lowered carbon output.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                💰
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Cost-Effective Maintenance</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-2">
                With fewer moving mechanical components (no oil changes, transmissions, or engine rebuilds), electric vehicles boast extremely low operational costs.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                🚀
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Instant Torque Delivery</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-2">
                Electric motors achieve maximum torque immediately from 0 RPM, providing thrilling acceleration and smooth, predictable power delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 text-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-900">
            {/* Column 1: Info */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-white">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-lg shadow-md">
                  ⚡
                </span>
                <span className="font-bold text-lg tracking-tight">EVISTA Showroom</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                Curating the finest electric mobility solutions in town. From high-end urban naked commuters and scooters to premium off-road SUV cars.
              </p>
            </div>

            {/* Column 2: Quick Contact */}
            <div className="space-y-3 text-left">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Virtual Support</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>100 Electric Avenue, Tech Corridor, CA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>+1 (800) 555-EVISTA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>info@evista-showroom.com</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Hours */}
            <div className="space-y-3 text-left">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Showroom Hours</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monday – Friday: 9:00 AM – 7:00 PM <br />
                Saturday – Sunday: 10:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 mt-2 text-center md:flex md:items-center md:justify-between text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} EVISTA. All rights reserved. Professional illustrations simulated.
            </div>
          </div>
        </div>
      </footer>

      {/* DETAILED VEHICLE MODAL */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onOpenFit={(veh) => setFitVehicle(veh)}
        />
      )}

      {/* RIDER ERGONOMICS & FIT STUDIO MODAL */}
      {fitVehicle && (
        <RiderFitModal
          vehicle={fitVehicle}
          onClose={() => setFitVehicle(null)}
        />
      )}

      {/* BOTTOM COMPARE DRAWER */}
      <CompareDrawer
        comparedVehicles={comparedVehicleObjects}
        onRemove={removeComparisonItem}
        onClose={clearComparison}
      />
    </div>
  );
}
