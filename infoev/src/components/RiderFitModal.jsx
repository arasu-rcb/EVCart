import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  User,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  Info,
  Layers,
  Camera,
  RefreshCw,
  Gauge
} from 'lucide-react';
import { bikesData, carsData } from '../vehiclesData';

export default function RiderFitModal({ vehicle: initialVehicle, onClose }) {
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicle || bikesData[0]);
  const [userPhoto, setUserPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('seated'); // 'seated' | 'standing'
  
  // Rider measurements
  const [heightCm, setHeightCm] = useState(175); // ~ 5'9"
  const [inseamCm, setInseamCm] = useState(81);  // ~ 32"
  const [selectedPreset, setSelectedPreset] = useState('commuter');

  const fileInputRef = useRef(null);

  // Height conversion helper
  const cmToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Selection
  const applyPreset = (preset) => {
    setSelectedPreset(preset);
    if (preset === 'petite') {
      setHeightCm(160);
      setInseamCm(73);
    } else if (preset === 'commuter') {
      setHeightCm(175);
      setInseamCm(81);
    } else if (preset === 'sport') {
      setHeightCm(182);
      setInseamCm(85);
    } else if (preset === 'tall') {
      setHeightCm(192);
      setInseamCm(91);
    }
  };

  // Ergonomics Calculation Engine
  const seatHeightMm = selectedVehicle.seatHeight || 800;
  const seatHeightCm = seatHeightMm / 10;
  
  // Leg Reach / Standover Analysis
  const legReachDiff = inseamCm - seatHeightCm;
  let reachCategory = 'flat-foot';
  let reachLabel = '100% Flat Footed';
  let reachColor = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  let reachDesc = 'Both feet comfortably planted flat on the ground. Full confidence at traffic stops.';

  if (legReachDiff < -3) {
    reachCategory = 'tiptoe';
    reachLabel = 'Tip-Toes (Challenging)';
    reachColor = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
    reachDesc = 'Requires tip-toeing or leaning the bike slightly to one side at red lights.';
  } else if (legReachDiff <= 3) {
    reachCategory = 'balls-of-feet';
    reachLabel = 'Balls of Feet (Standard)';
    reachColor = 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
    reachDesc = 'Balls of both feet easily contact the pavement. Stable and secure handling.';
  }

  // Riding Posture Angle
  const stance = selectedVehicle.stance || 'Sport Standard';
  let torsoAngle = 72; // degrees from horizontal
  let postureType = 'Upright & Relaxed';
  if (stance.includes('Aggressive') || stance.includes('Superbike')) {
    torsoAngle = 48;
    postureType = 'Forward Sport Lean (Aerodynamic)';
  } else if (stance.includes('Sport Standard') || stance.includes('Naked')) {
    torsoAngle = 65;
    postureType = 'Neutral Dynamic (Balanced)';
  } else if (stance.includes('Upright') || stance.includes('Comfort')) {
    torsoAngle = 84;
    postureType = 'Upright Ergonomic (Zero Wrist Pressure)';
  }

  // Fit Match Score (0 - 100%)
  const minRec = selectedVehicle.recommendedHeight?.min || 155;
  const maxRec = selectedVehicle.recommendedHeight?.max || 195;
  let fitScore = 95;

  if (heightCm < minRec) {
    fitScore -= Math.min(30, (minRec - heightCm) * 3);
  } else if (heightCm > maxRec) {
    fitScore -= Math.min(25, (heightCm - maxRec) * 2.5);
  }

  if (reachCategory === 'tiptoe') fitScore -= 10;
  fitScore = Math.max(60, Math.min(99, Math.round(fitScore)));

  // Combine vehicles for selector
  const allVehicles = [...bikesData, ...carsData];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-black shadow-md">
              <User className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  Virtual Rider Fit & Stance Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                  AI Fit Beta
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload your photo or customize height to test ergonomics & posture on EV models
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL CONTENT GRID */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          
          {/* LEFT COLUMN: VISUAL SIMULATOR STAGE (7 Cols) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-slate-50/40 dark:bg-slate-950/20">
            <div>
              {/* Top Controls: Vehicle Selector & View Mode */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                {/* Vehicle Picker */}
                <div className="relative">
                  <select
                    value={selectedVehicle.id}
                    onChange={(e) => {
                      const v = allVehicles.find(x => x.id === e.target.value);
                      if (v) setSelectedVehicle(v);
                    }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                  >
                    <optgroup label="Electric Bikes & Scooters">
                      {bikesData.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.brandName} - {b.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Electric Cars & SUVs">
                      {carsData.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.brandName} - {c.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                </div>

                {/* Stance Toggle (Seated on Vehicle vs Standing Beside) */}
                <div className="flex items-center bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('seated')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'seated'
                        ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Riding Stance
                  </button>
                  <button
                    onClick={() => setActiveTab('standing')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'standing'
                        ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Scale Check (Standing)
                  </button>
                </div>
              </div>

              {/* SIMULATION VISUAL STAGE */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-slate-100/70 to-slate-200/40 dark:from-slate-900/60 dark:to-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex items-end justify-center overflow-hidden p-4">
                
                {/* Reference Grid & Height Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#64748b15_1px,transparent_1px),linear-gradient(to_bottom,#64748b15_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Seat Height Reference Line */}
                <div 
                  className="absolute left-4 right-4 border-b border-dashed border-indigo-400/60 flex items-center justify-between text-[10px] text-indigo-500 font-mono"
                  style={{ bottom: `${Math.min(65, (seatHeightMm / 1000) * 45)}%` }}
                >
                  <span className="bg-white/80 dark:bg-slate-900/80 px-1.5 py-0.5 rounded shadow-sm">
                    Seat: {seatHeightMm} mm
                  </span>
                  <span className="bg-white/80 dark:bg-slate-900/80 px-1.5 py-0.5 rounded shadow-sm">
                    Inseam: {inseamCm} cm
                  </span>
                </div>

                {/* Ground Reference Floor */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-slate-300/60 dark:from-slate-800/80 to-transparent" />

                {/* VEHICLE VISUAL (Transparent PNG) */}
                <div className="relative z-10 flex items-end justify-center">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className={`max-h-56 sm:max-h-64 object-contain transition-all duration-300 ${
                      activeTab === 'seated' ? 'translate-x-4' : 'translate-x-12'
                    }`}
                  />
                </div>

                {/* RIDER HUMAN SILHOUETTE / USER AVATAR */}
                <div
                  className={`absolute z-20 flex flex-col items-center transition-all duration-300 pointer-events-none ${
                    activeTab === 'seated'
                      ? 'bottom-16 -translate-x-8'
                      : 'bottom-4 -translate-x-28'
                  }`}
                  style={{
                    transform: `scale(${(heightCm / 175).toFixed(2)}) ${
                      activeTab === 'seated' ? 'translate(-30px, -20px)' : 'translate(-100px, 0)'
                    }`
                  }}
                >
                  {/* Human Head / User Face Photo */}
                  <div className="relative w-14 h-14 rounded-full border-2 border-indigo-500 overflow-hidden shadow-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center">
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    )}
                    {/* Badge */}
                    <span className="absolute -bottom-1 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                      {cmToFeetInches(heightCm)}
                    </span>
                  </div>

                  {/* Body Posture Vector Silhouette */}
                  {activeTab === 'seated' ? (
                    /* Seated Riding Stance Vector */
                    <svg
                      width="90"
                      height="140"
                      viewBox="0 0 90 140"
                      fill="none"
                      className="text-indigo-600 dark:text-indigo-400 opacity-90 drop-shadow-md"
                    >
                      {/* Torso leaning towards handlebar */}
                      <path
                        d={`M 45 10 L ${45 + Math.cos((torsoAngle * Math.PI) / 180) * 35} 65 L 35 75 Z`}
                        fill="currentColor"
                      />
                      {/* Arms reaching for bars */}
                      <path
                        d="M 50 25 L 82 55"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      {/* Thigh to seat */}
                      <path
                        d="M 35 75 L 55 90"
                        stroke="currentColor"
                        strokeWidth="9"
                        strokeLinecap="round"
                      />
                      {/* Lower leg to footpeg / ground */}
                      <path
                        d="M 55 90 L 48 135"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    /* Standing Full Height Silhouette */
                    <svg
                      width="60"
                      height="160"
                      viewBox="0 0 60 160"
                      fill="none"
                      className="text-indigo-600 dark:text-indigo-400 opacity-85 drop-shadow-md"
                    >
                      {/* Upright Torso */}
                      <rect x="22" y="8" width="16" height="60" rx="6" fill="currentColor" />
                      {/* Arms */}
                      <rect x="10" y="14" width="8" height="55" rx="4" fill="currentColor" />
                      <rect x="42" y="14" width="8" height="55" rx="4" fill="currentColor" />
                      {/* Legs */}
                      <rect x="20" y="65" width="8" height="85" rx="4" fill="currentColor" />
                      <rect x="32" y="65" width="8" height="85" rx="4" fill="currentColor" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Insights Banner */}
            <div className="mt-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                    Calculated Ergonomic Match
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {fitScore}% Suitability Rating
                  </span>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${reachColor}`}>
                {reachLabel}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: USER PHOTO UPLOAD & ERGONOMIC ADJUSTMENTS (5 Cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* 1. PHOTO UPLOAD SECTION */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    1. Rider Identity / Photo
                  </label>
                  {userPhoto && (
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="text-[11px] font-semibold text-rose-500 hover:underline"
                    >
                      Reset Photo
                    </button>
                  )}
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-800/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  {userPhoto ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={userPhoto}
                        alt="Uploaded Rider"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
                      />
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                          Custom Photo Loaded
                        </span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          Click to swap photo
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Upload your picture
                        </span>
                        <span className="text-[10px] text-slate-400">
                          JPG, PNG or WebP • Headshot or full stance
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 2. BODY PROPORTION & HEIGHT SLIDERS */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    2. Rider Height & Inseam
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                    {heightCm} cm ({cmToFeetInches(heightCm)})
                  </span>
                </label>

                {/* Preset Fast-Picks */}
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  {[
                    { id: 'petite', label: "5'3\" Petite" },
                    { id: 'commuter', label: "5'9\" Avg" },
                    { id: 'sport', label: "6'0\" Tall" },
                    { id: 'tall', label: "6'4\" Max" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id)}
                      className={`py-1.5 px-2 text-[10px] font-bold rounded-lg border transition-all ${
                        selectedPreset === p.id
                          ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:border-indigo-600'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Height Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>150 cm (4'11")</span>
                    <span>205 cm (6'9")</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="205"
                    value={heightCm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setHeightCm(val);
                      setInseamCm(Math.round(val * 0.46)); // dynamic biological proportion
                      setSelectedPreset('custom');
                    }}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                {/* Inseam Adjustment */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Leg Inseam (Ground to Crotch)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">
                      {inseamCm} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="68"
                    max="98"
                    value={inseamCm}
                    onChange={(e) => setInseamCm(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* 3. ERGONOMIC DIAGNOSIS REPORT */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Ergonomic Suitability Diagnosis
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Standover Confidence:
                      </span>{' '}
                      <span className="text-slate-600 dark:text-slate-400">{reachDesc}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Riding Triangle:
                      </span>{' '}
                      <span className="text-slate-600 dark:text-slate-400">
                        {postureType}. Torso inclined at ~{torsoAngle}° for optimal weight transfer.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={onClose}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
              >
                Save My Fit Profile & Return to Showroom
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
