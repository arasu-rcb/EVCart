export const bikeBrands = [
  { id: 'all', name: 'All Brands' },
  { id: 'ola', name: 'Ola Electric' },
  { id: 'ather', name: 'Ather Energy' },
  { id: 'ultraviolette', name: 'Ultraviolette' },
  { id: 'revolt', name: 'Revolt Motors' },
  { id: 'tvs', name: 'TVS Motor' },
  { id: 'hero', name: 'Hero Vida / Lectro' },
  { id: 'zero', name: 'Zero Motorcycles' },
  { id: 'super73', name: 'Super73' }
];

export const carBrands = [
  { id: 'all', name: 'All Brands' },
  { id: 'tata', name: 'Tata Motors EV' },
  { id: 'mg', name: 'MG Motor' },
  { id: 'hyundai', name: 'Hyundai EV' },
  { id: 'byd', name: 'BYD' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'porsche', name: 'Porsche' },
  { id: 'rivian', name: 'Rivian' },
  { id: 'kia', name: 'Kia EV' }
];

export const bikeCategories = [
  {
    id: 'daily',
    name: 'Daily Usage',
    icon: 'Bike',
    emoji: '🏍️',
    description: 'Ultra-reliable, low-running-cost electric two-wheelers engineered for stress-free daily city commuting.',
    badge: 'High Efficiency',
    prioritySpecs: ['Low running cost', 'Agile handling', 'Quick home charging', 'Regenerative braking']
  },
  {
    id: 'long-drive',
    name: 'Long Drive',
    icon: 'Compass',
    emoji: '🛣️',
    description: 'High battery capacities, highway range stability, and fast charging for interstate travel.',
    badge: 'Maximum Range',
    prioritySpecs: ['Extended range', 'Fast charging support', 'Cruise ergonomics', 'Active thermal cooling']
  },
  {
    id: 'college',
    name: 'College Students',
    icon: 'GraduationCap',
    emoji: '🎓',
    description: 'Sporty and tech-loaded electric rides tailored for student budgets with smart navigation & app connectivity.',
    badge: '₹100/mo Plan',
    prioritySpecs: ['From ₹100/mo', 'Smart GPS & App', 'Youth aesthetic', 'Low maintenance']
  },
  {
    id: 'school',
    name: 'School Students',
    icon: 'ShieldCheck',
    emoji: '🏫',
    description: 'Speed-compliant safety-first electric models with mandatory parental verification & geofencing.',
    badge: 'Parent Verified',
    prioritySpecs: ['Speed-governed (25 km/h)', 'Guardian consent required', 'From ₹50/mo', 'Geofence tracking']
  },
  {
    id: 'family',
    name: 'Family',
    icon: 'Users',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Spacious dual-seating, cushioned comfort, massive boot capacity, and 5-star safety for the whole household.',
    badge: 'Safety & Space',
    prioritySpecs: ['Large comfortable seats', 'Massive storage', 'Passenger safety', 'Smooth ride']
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'Zap',
    emoji: '⚡',
    description: 'Track-tuned acceleration, blistering top speeds, race-spec aerodynamics, and instant electric torque.',
    badge: 'Insane Speed',
    prioritySpecs: ['Instant 0-60 torque', 'Aerodynamic winglets', 'Track telemetry', 'Performance modes']
  },
  {
    id: 'budget',
    name: 'Budget Friendly',
    icon: 'Coins',
    emoji: '💰',
    description: 'Value-packed electric mobility delivering unmatched savings per kilometer without breaking the bank.',
    badge: 'Best Value',
    prioritySpecs: ['Lowest entry price', 'Under ₹0.25/km', 'Subsidized EMI', 'Zero petrol burn']
  }
];

export const carCategories = [
  {
    id: 'daily',
    name: 'Daily Usage',
    icon: 'Car',
    emoji: '🚗',
    description: 'Effortless urban electric cars engineered for daily commuting with low charging costs and easy parking.',
    badge: 'City Commuter',
    prioritySpecs: ['Low operating cost', 'Compact footprint', 'Home Wallbox charging', 'Automatic drive']
  },
  {
    id: 'long-drive',
    name: 'Long Drive',
    icon: 'Compass',
    emoji: '🛣️',
    description: 'Highway cruisers with massive battery capacity, DC fast charging, and plush long-distance comfort.',
    badge: 'Highway Cruiser',
    prioritySpecs: ['500+ km range', 'DC fast charge (800V)', 'Adaptive cruise', 'Dual-motor AWD']
  },
  {
    id: 'family',
    name: 'Family',
    icon: 'Users',
    emoji: '👨‍👩‍👧‍👦',
    description: '5 to 7-seater electric SUVs and sedans offering maximum cabin space, 5-star crash safety, and huge boots.',
    badge: '5-Star Safety',
    prioritySpecs: ['Spacious 5-seater', 'ADAS Level 2 safety', 'High ground clearance', 'ISOFIX child anchors']
  },
  {
    id: 'premium',
    name: 'Premium & Luxury',
    icon: 'Zap',
    emoji: '✨',
    description: 'Flagship electric craftsmanship, ultra-luxury lounge interiors, air suspension, and cutting-edge tech.',
    badge: 'Flagship Luxury',
    prioritySpecs: ['Panoramic glass roof', 'Air suspension', 'Premium acoustics', 'Ventilated massage seats']
  },
  {
    id: 'budget',
    name: 'Budget Friendly',
    icon: 'Coins',
    emoji: '💰',
    description: 'India\'s most accessible electric cars offering unbeatable value, high savings, and low upfront costs.',
    badge: 'Affordable EV',
    prioritySpecs: ['Lowest entry price', 'Under ₹1/km running cost', 'Affordable EMI', 'Government subsidies']
  },
  {
    id: 'student-friendly',
    name: 'Student Friendly',
    icon: 'GraduationCap',
    emoji: '🎓',
    description: 'Compact, modern, and affordable electric runabouts ideal for college campus runs and young drivers.',
    badge: 'Campus Ready',
    prioritySpecs: ['Student monthly plan', 'Easy to drive', 'Low charging cost', 'Connected touchscreen']
  }
];

// Backward-compatible alias
export const lifestyleCategories = bikeCategories;


export const bikesData = [
  // --- OLA ELECTRIC ---
  {
    id: 'ola-s1-pro',
    category: 'bike',
    brand: 'ola',
    brandName: 'Ola Electric',
    name: 'Ola S1 Pro Gen 2',
    type: 'Premium Smart Scooter',
    price: 134999,
    priceUSD: 1640,
    emi: '₹2,850/mo',
    studentDailyPlan: { schoolDaily: 65, collegeDaily: 110 },
    range: 195, // km
    topSpeed: 120, // km/h
    batteryCapacity: 4.0, // kWh
    chargingTime: '6.5 hrs (Fast: 50 km in 15 min)',
    power: '11 kW (Peak)',
    weight: 116, // kg
    seatHeight: 805, // mm
    seating: 2,
    rating: 4.7,
    reviewCount: 318,
    categories: ['daily', 'college', 'family', 'budget'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: false,
    family: true,
    performance: false,
    budget: true,
    stance: 'Upright Commuter',
    recommendedHeight: { min: 155, max: 192 },
    image: '/images/ola_s1_pro.png',
    colors: [
      { name: 'Stellar Blue', hex: '#0284c7' },
      { name: 'Jet Black', hex: '#111827' },
      { name: 'Porcelain White', hex: '#f8fafc' }
    ],
    description: 'The flagship Ola S1 Pro Gen 2 features a redesigned lighter hybrid chassis, higher efficiency, instant acceleration, and MoveOS 4 navigation for modern urban commuters.',
    highlights: [
      '0 to 40 km/h in 2.6 seconds',
      'MoveOS 4 smart connectivity & cruise control',
      'Spacious 34L under-seat storage',
      'Eco, Normal, Sports, and Hyper riding modes'
    ],
    petrolComparison: {
      runningCostEV: '₹0.25 / km',
      runningCostPetrol: '₹2.30 / km',
      annualSavings: '₹32,500 / year'
    },
    recommendationScores: {
      range: 8.8,
      price: 9.0,
      performance: 8.5,
      comfort: 9.2,
      value: 9.4,
      overall: 90
    }
  },
  {
    id: 'ola-roadster',
    category: 'bike',
    brand: 'ola',
    brandName: 'Ola Electric',
    name: 'Ola Roadster X',
    type: 'Electric Street Naked',
    price: 104999,
    priceUSD: 1280,
    emi: '₹2,299/mo',
    studentDailyPlan: { schoolDaily: 55, collegeDaily: 95 },
    range: 200, // km
    topSpeed: 124, // km/h
    batteryCapacity: 4.5, // kWh
    chargingTime: '4.8 hrs (Fast: 45 min)',
    power: '11 kW',
    weight: 140, // kg
    seatHeight: 800, // mm
    seating: 2,
    rating: 4.6,
    reviewCount: 184,
    categories: ['daily', 'long-drive', 'college', 'budget'],
    dailyUsage: true,
    longDrive: true,
    college: true,
    school: false,
    family: false,
    performance: true,
    budget: true,
    stance: 'Sport Standard',
    recommendedHeight: { min: 158, max: 195 },
    image: '/images/ola_roadster.png',
    colors: [
      { name: 'Matte Cyber White', hex: '#f3f4f6' },
      { name: 'Charcoal Grey', hex: '#475569' }
    ],
    description: 'Ola’s dynamic naked street motorcycle combining aggressive roadster styling with high battery density and digital touchscreen telemetry.',
    highlights: [
      'Futuristic LED horizontal light strip',
      'Integrated digital touchscreen control',
      'Combi-braking system (CBS)',
      'High-rigidity tubular steel frame'
    ],
    petrolComparison: {
      runningCostEV: '₹0.28 / km',
      runningCostPetrol: '₹2.45 / km',
      annualSavings: '₹34,200 / year'
    },
    recommendationScores: {
      range: 8.9,
      price: 9.5,
      performance: 8.7,
      comfort: 8.5,
      value: 9.6,
      overall: 91
    }
  },

  // --- ATHER ENERGY ---
  {
    id: 'ather-450x',
    category: 'bike',
    brand: 'ather',
    brandName: 'Ather Energy',
    name: 'Ather 450X Gen 3 Apex',
    type: 'Sport Precision Scooter',
    price: 149999,
    priceUSD: 1820,
    emi: '₹3,150/mo',
    studentDailyPlan: { schoolDaily: 70, collegeDaily: 115 },
    range: 157, // km
    topSpeed: 100, // km/h
    batteryCapacity: 3.7, // kWh
    chargingTime: '5.5 hrs (Ather Grid: 1.5 km/min)',
    power: '7.0 kW Warp Mode',
    weight: 111, // kg
    seatHeight: 780, // mm
    seating: 2,
    rating: 4.9,
    reviewCount: 420,
    categories: ['daily', 'college', 'performance'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Upright Sport',
    recommendedHeight: { min: 152, max: 190 },
    image: '/images/ather_450x.png',
    colors: [
      { name: 'Indium Blue / Orange', hex: '#1e3a8a' },
      { name: 'Space Grey / Mint', hex: '#334155' },
      { name: 'Salt White', hex: '#f8fafc' }
    ],
    description: 'The benchmark of smart electric performance scooters. Razor-sharp handling, true Warp mode acceleration, and Google Maps live dashboard navigation.',
    highlights: [
      'Warp+ Mode for instant torque surge',
      'Exposed aluminium die-cast chassis',
      'Ather Grid nationwide fast charging',
      '7-inch interactive Android touchscreen'
    ],
    petrolComparison: {
      runningCostEV: '₹0.32 / km',
      runningCostPetrol: '₹2.50 / km',
      annualSavings: '₹31,000 / year'
    },
    recommendationScores: {
      range: 8.2,
      price: 8.4,
      performance: 9.4,
      comfort: 9.0,
      value: 8.8,
      overall: 89
    }
  },
  {
    id: 'ather-rizta',
    category: 'bike',
    brand: 'ather',
    brandName: 'Ather Energy',
    name: 'Ather Rizta Z',
    type: 'Comfort Family Scooter',
    price: 124999,
    priceUSD: 1520,
    emi: '₹2,699/mo',
    studentDailyPlan: { schoolDaily: 60, collegeDaily: 100 },
    range: 160, // km
    topSpeed: 80, // km/h
    batteryCapacity: 3.7, // kWh
    chargingTime: '5.5 hrs',
    power: '4.3 kW',
    weight: 119, // kg
    seatHeight: 780, // mm
    seating: 2,
    rating: 4.8,
    reviewCount: 260,
    categories: ['daily', 'family', 'budget'],
    dailyUsage: true,
    longDrive: false,
    college: false,
    school: false,
    family: true,
    performance: false,
    budget: true,
    stance: 'Comfort Upright',
    recommendedHeight: { min: 150, max: 190 },
    image: '/images/ather_rizta.png',
    colors: [
      { name: 'Monsoon Blue', hex: '#0284c7' },
      { name: 'Slate Grey', hex: '#64748b' },
      { name: 'Pangong Blue', hex: '#38bdf8' }
    ],
    description: 'Purpose-built for family comfort with the largest seat in its segment, SkidControl traction assistance, and under-seat cavernous 56L total payload capacity.',
    highlights: [
      'Segment-largest family dual-seat with backrest',
      'SkidControl traction system for wet roads',
      'Spacious 34L under-seat + 22L front trunk',
      'Emergency WhatsApp live location sharing'
    ],
    petrolComparison: {
      runningCostEV: '₹0.26 / km',
      runningCostPetrol: '₹2.40 / km',
      annualSavings: '₹33,800 / year'
    },
    recommendationScores: {
      range: 8.7,
      price: 9.1,
      performance: 8.0,
      comfort: 9.8,
      value: 9.3,
      overall: 91
    }
  },

  // --- ULTRAVIOLETTE ---
  {
    id: 'uv-f77',
    category: 'bike',
    brand: 'ultraviolette',
    brandName: 'Ultraviolette',
    name: 'F77 Mach 2 Recon',
    type: 'High-Performance Electric Sportbike',
    price: 399000,
    priceUSD: 4850,
    emi: '₹8,200/mo',
    studentDailyPlan: { schoolDaily: 190, collegeDaily: 280 },
    range: 323, // km
    topSpeed: 155, // km/h
    batteryCapacity: 10.3, // kWh
    chargingTime: '3.0 hrs (Supercharger: 20-80% in 45 min)',
    power: '30 kW (40.2 hp)',
    weight: 207, // kg
    seatHeight: 800, // mm
    seating: 2,
    rating: 4.95,
    reviewCount: 152,
    categories: ['long-drive', 'performance'],
    dailyUsage: false,
    longDrive: true,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Aggressive Supersport',
    recommendedHeight: { min: 160, max: 198 },
    image: '/images/ultraviolette_f77.png',
    colors: [
      { name: 'Turbo Red / Carbon', hex: '#dc2626' },
      { name: 'Stealth Black', hex: '#0f172a' },
      { name: 'Plasma Blue', hex: '#2563eb' }
    ],
    description: 'Aviation-inspired electric hyper-machine. Equipped with a 10.3 kWh high-voltage architecture, 10-level regenerative braking, and 323 km IDC range.',
    highlights: [
      '0 to 60 km/h in 2.8 seconds',
      'Aerospace grade aluminium frame construction',
      '10 levels of customizable regenerative braking',
      'Ballistic Mode with 100 Nm peak motor torque'
    ],
    petrolComparison: {
      runningCostEV: '₹0.45 / km',
      runningCostPetrol: '₹4.80 / km (Superbike)',
      annualSavings: '₹65,000 / year'
    },
    recommendationScores: {
      range: 9.8,
      price: 7.2,
      performance: 9.9,
      comfort: 8.1,
      value: 8.6,
      overall: 93
    }
  },
  {
    id: 'uv-f99',
    category: 'bike',
    brand: 'ultraviolette',
    brandName: 'Ultraviolette',
    name: 'F99 Factory Racing Edition',
    type: 'Electric Track Superbike',
    price: 799000,
    priceUSD: 9700,
    emi: '₹16,500/mo',
    studentDailyPlan: { schoolDaily: 350, collegeDaily: 500 },
    range: 200, // km
    topSpeed: 265, // km/h
    batteryCapacity: 12.0, // kWh
    chargingTime: '2.0 hrs (Race Paddock Fast Charge)',
    power: '90 kW (120 hp)',
    weight: 178, // kg
    seatHeight: 820, // mm
    seating: 1,
    rating: 5.0,
    reviewCount: 48,
    categories: ['performance'],
    dailyUsage: false,
    longDrive: false,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Aggressive Supersport',
    recommendedHeight: { min: 162, max: 200 },
    image: '/images/ultraviolette_f99.png',
    colors: [
      { name: 'Factory Racing Neon / Carbon', hex: '#10b981' }
    ],
    description: 'Pure track-weaponry. Carbon fiber construction, active aerodynamic airfoils that pivot on lean angles, and a blistering 265 km/h top velocity.',
    highlights: [
      'Active winglet aerodynamic systems',
      '90 kW peak liquid-cooled motor',
      'Aero-disk carbon wheels minimizing drag',
      '0 to 100 km/h in 3.0 seconds flat'
    ],
    petrolComparison: {
      runningCostEV: '₹0.60 / km',
      runningCostPetrol: '₹6.50 / km',
      annualSavings: '₹75,000 / year'
    },
    recommendationScores: {
      range: 8.0,
      price: 6.5,
      performance: 10.0,
      comfort: 7.0,
      value: 7.8,
      overall: 88
    }
  },

  // --- REVOLT MOTORS ---
  {
    id: 'revolt-rv400',
    category: 'bike',
    brand: 'revolt',
    brandName: 'Revolt Motors',
    name: 'Revolt RV400 Premium',
    type: 'Smart Electric Motorcycle',
    price: 139000,
    priceUSD: 1690,
    emi: '₹2,950/mo',
    studentDailyPlan: { schoolDaily: 60, collegeDaily: 100 },
    range: 150, // km
    topSpeed: 85, // km/h
    batteryCapacity: 3.24, // kWh
    chargingTime: '4.5 hrs (0-100%)',
    power: '3.0 kW Mid-Drive',
    weight: 108, // kg
    seatHeight: 814, // mm
    seating: 2,
    rating: 4.6,
    reviewCount: 310,
    categories: ['daily', 'college', 'budget'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: false,
    family: false,
    performance: false,
    budget: true,
    stance: 'Sport Standard',
    recommendedHeight: { min: 156, max: 194 },
    image: '/images/revolt_rv400.png',
    colors: [
      { name: 'Rebel Red', hex: '#b91c1c' },
      { name: 'Cosmic Black', hex: '#090d16' },
      { name: 'Mist Cobalt', hex: '#2563eb' }
    ],
    description: 'India’s pioneering AI-enabled electric motorcycle. Removable lightweight battery allows charging inside student dorms or apartments with standard wall plugs.',
    highlights: [
      'Removable battery pack for indoor charging',
      'Custom acoustic engine sound synthesiser',
      'MyRevolt GPS geofencing & remote lock',
      'Upside-Down (USD) front forks'
    ],
    petrolComparison: {
      runningCostEV: '₹0.24 / km',
      runningCostPetrol: '₹2.35 / km',
      annualSavings: '₹33,500 / year'
    },
    recommendationScores: {
      range: 8.5,
      price: 9.3,
      performance: 8.2,
      comfort: 8.9,
      value: 9.4,
      overall: 90
    }
  },
  {
    id: 'revolt-rv400-brz',
    category: 'bike',
    brand: 'revolt',
    brandName: 'Revolt Motors',
    name: 'Revolt RV400 BRZ',
    type: 'Essential Urban Commuter',
    price: 119000,
    priceUSD: 1450,
    emi: '₹2,490/mo',
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 90 },
    range: 150, // km
    topSpeed: 80, // km/h
    batteryCapacity: 3.24, // kWh
    chargingTime: '4.5 hrs',
    power: '3.0 kW',
    weight: 108, // kg
    seatHeight: 814, // mm
    seating: 2,
    rating: 4.5,
    reviewCount: 195,
    categories: ['daily', 'college', 'budget'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: false,
    family: false,
    performance: false,
    budget: true,
    stance: 'Sport Standard',
    recommendedHeight: { min: 156, max: 194 },
    image: '/images/revolt_rv400.png',
    colors: [
      { name: 'Pacific Blue', hex: '#0284c7' },
      { name: 'Dark Stealth Grey', hex: '#334155' }
    ],
    description: 'Optimized for high value, the RV400 BRZ trims unnecessary frills while retaining the full 150 km range and proven swap-ready lithium battery technology.',
    highlights: [
      'Pure digital LED instrument console',
      'Regenerative braking with CBS safety',
      'Ultra-affordable ₹50/month student plan',
      'Comfortable split seat ergonomics'
    ],
    petrolComparison: {
      runningCostEV: '₹0.22 / km',
      runningCostPetrol: '₹2.30 / km',
      annualSavings: '₹34,000 / year'
    },
    recommendationScores: {
      range: 8.5,
      price: 9.7,
      performance: 7.9,
      comfort: 8.7,
      value: 9.8,
      overall: 92
    }
  },

  // --- TVS MOTOR ---
  {
    id: 'tvs-iqube',
    category: 'bike',
    brand: 'tvs',
    brandName: 'TVS Motor',
    name: 'TVS iQube Electric ST',
    type: 'Family Urban Scooter',
    price: 129000,
    priceUSD: 1570,
    emi: '₹2,750/mo',
    studentDailyPlan: { schoolDaily: 55, collegeDaily: 95 },
    range: 145, // km
    topSpeed: 82, // km/h
    batteryCapacity: 4.56, // kWh
    chargingTime: '4.1 hrs',
    power: '4.4 kW',
    weight: 118, // kg
    seatHeight: 770, // mm
    seating: 2,
    rating: 4.75,
    reviewCount: 380,
    categories: ['daily', 'family', 'budget'],
    dailyUsage: true,
    longDrive: false,
    college: false,
    school: false,
    family: true,
    performance: false,
    budget: true,
    stance: 'Comfort Upright',
    recommendedHeight: { min: 150, max: 190 },
    image: '/images/ola_s1_pro.png',
    colors: [
      { name: 'Titanium Grey', hex: '#475569' },
      { name: 'Starlight Blue', hex: '#1e40af' },
      { name: 'Pearl White', hex: '#f8fafc' }
    ],
    description: 'Trusted engineering from TVS. The iQube ST features a wide flat floorboard, whisper-quiet motor, and 32L underseat storage for groceries and backpacks.',
    highlights: [
      '7-inch color TFT with Alexa integration',
      'Spacious flat floorboard convenience',
      '32-liter large helmet boot space',
      'TVS SmartXonnect with crash alerts'
    ],
    petrolComparison: {
      runningCostEV: '₹0.26 / km',
      runningCostPetrol: '₹2.40 / km',
      annualSavings: '₹33,200 / year'
    },
    recommendationScores: {
      range: 8.6,
      price: 9.2,
      performance: 8.1,
      comfort: 9.6,
      value: 9.4,
      overall: 91
    }
  },
  {
    id: 'tvs-x',
    category: 'bike',
    brand: 'tvs',
    brandName: 'TVS Motor',
    name: 'TVS X Performance Crossover',
    type: 'Maxi Sport Crossover',
    price: 249000,
    priceUSD: 3030,
    emi: '₹5,300/mo',
    studentDailyPlan: { schoolDaily: 110, collegeDaily: 175 },
    range: 140, // km
    topSpeed: 105, // km/h
    batteryCapacity: 4.44, // kWh
    chargingTime: '3.6 hrs (50% in 50 min)',
    power: '11 kW',
    weight: 132, // kg
    seatHeight: 800, // mm
    seating: 2,
    rating: 4.8,
    reviewCount: 95,
    categories: ['daily', 'performance'],
    dailyUsage: true,
    longDrive: false,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Sport Standard',
    recommendedHeight: { min: 156, max: 194 },
    image: '/images/ather_450x.png',
    colors: [
      { name: 'Hellcat Red', hex: '#dc2626' }
    ],
    description: 'Cast aluminium exposed trellis frame scooter with high-speed stability, cruise control, and a tilting 10.2-inch widescreen multimedia console.',
    highlights: [
      'TVS Xleton exposed trellis frame',
      '0-40 km/h in 2.6 seconds',
      '10.2-inch tilt-adjustable HD console',
      'Ram-air battery cooling system'
    ],
    petrolComparison: {
      runningCostEV: '₹0.30 / km',
      runningCostPetrol: '₹2.60 / km',
      annualSavings: '₹31,500 / year'
    },
    recommendationScores: {
      range: 8.0,
      price: 7.8,
      performance: 9.2,
      comfort: 8.6,
      value: 8.0,
      overall: 85
    }
  },

  // --- SCHOOL & CAMPUS COMMUTER SPECIALS ---
  {
    id: 'hero-lectro-campus',
    category: 'bike',
    brand: 'hero',
    brandName: 'Hero Vida / Lectro',
    name: 'Hero Lectro E-Campus Glide',
    type: 'School & Teen Safe Commuter',
    price: 34999,
    priceUSD: 420,
    emi: '₹999/mo',
    studentDailyPlan: { schoolDaily: 35, collegeDaily: 50 },
    range: 65, // km
    topSpeed: 25, // km/h (Safe legal limit, No license required)
    batteryCapacity: 1.2, // kWh
    chargingTime: '3.0 hrs (Standard 5A plug)',
    power: '250W BLDC Geared Hub',
    weight: 24, // kg
    seatHeight: 760, // mm
    seating: 1,
    rating: 4.85,
    reviewCount: 164,
    categories: ['school', 'budget', 'daily'],
    dailyUsage: true,
    longDrive: false,
    college: false,
    school: true,
    family: false,
    performance: false,
    budget: true,
    stance: 'Comfort Upright',
    recommendedHeight: { min: 145, max: 185 },
    image: '/images/specialized_ebike.png',
    colors: [
      { name: 'Volt Cyan', hex: '#06b6d4' },
      { name: 'Matte Obsidian', hex: '#1e293b' }
    ],
    description: 'Designed specifically for school students (ages 14-18) and lightweight campus commutes. Speed governed to 25 km/h with mandatory parent/guardian verification and RFID key.',
    highlights: [
      '25 km/h safety speed limiter (No license needed)',
      'Parental consent & geofencing protection',
      'Ultra-lightweight 24kg aluminum frame',
      'From ₹50/month on student concept plan'
    ],
    petrolComparison: {
      runningCostEV: '₹0.08 / km',
      runningCostPetrol: '₹2.10 / km',
      annualSavings: '₹28,000 / year'
    },
    recommendationScores: {
      range: 7.8,
      price: 10.0,
      performance: 7.2,
      comfort: 9.0,
      value: 9.9,
      overall: 90
    }
  },
  {
    id: 'super73-rx',
    category: 'bike',
    brand: 'super73',
    brandName: 'Super73',
    name: 'Super73 RX Mojave',
    type: 'Urban Scrambler E-Bike',
    price: 89000,
    priceUSD: 1080,
    emi: '₹1,990/mo',
    studentDailyPlan: { schoolDaily: 45, collegeDaily: 75 },
    range: 120, // km
    topSpeed: 45, // km/h (Dual speed limiter: 25 km/h for School mode)
    batteryCapacity: 2.0, // kWh
    chargingTime: '3.5 hrs',
    power: '1.2 kW',
    weight: 38, // kg
    seatHeight: 810, // mm
    seating: 2,
    rating: 4.9,
    reviewCount: 215,
    categories: ['school', 'college', 'daily'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: true,
    family: false,
    performance: false,
    budget: true,
    stance: 'Sport Standard',
    recommendedHeight: { min: 150, max: 195 },
    image: '/images/super73_bike.png',
    colors: [
      { name: 'Desert Sand', hex: '#d97706' },
      { name: 'Dark Slate', hex: '#1e293b' }
    ],
    description: 'Bold street scrambler aesthetic popular across university campuses. Features dual suspension, fat street tires, and dual-mode throttle control with guardian speed-lock.',
    highlights: [
      'Guardian speed-lock selector for school riders',
      'Plush motorbike style bench seat',
      'All-terrain puncture-resistant tires',
      'Removable battery for easy desk charging'
    ],
    petrolComparison: {
      runningCostEV: '₹0.15 / km',
      runningCostPetrol: '₹2.20 / km',
      annualSavings: '₹30,000 / year'
    },
    recommendationScores: {
      range: 8.4,
      price: 9.4,
      performance: 8.3,
      comfort: 9.1,
      value: 9.3,
      overall: 91
    }
  },
  {
    id: 'cake-kalk-ink',
    category: 'bike',
    brand: 'hero',
    brandName: 'Cake Nordic EV',
    name: 'Cake Kalk INK Urban',
    type: 'Lightweight Trail & Commuter',
    price: 99000,
    priceUSD: 1200,
    emi: '₹2,190/mo',
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 80 },
    range: 110, // km
    topSpeed: 60, // km/h (Speed lock option 25 km/h)
    batteryCapacity: 2.6, // kWh
    chargingTime: '3.0 hrs',
    power: '2.5 kW',
    weight: 56, // kg
    seatHeight: 820, // mm
    seating: 1,
    rating: 4.8,
    reviewCount: 92,
    categories: ['school', 'college', 'daily'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: true,
    family: false,
    performance: false,
    budget: true,
    stance: 'Upright Sport',
    recommendedHeight: { min: 152, max: 192 },
    image: '/images/cake_ebike.png',
    colors: [
      { name: 'Arctic Grey', hex: '#94a3b8' },
      { name: 'Obsidian Black', hex: '#090d16' }
    ],
    description: 'Nordic minimalist engineering built for robust campus commuting, safe daily rides, and weekend trails. Features sealed direct-drive powertrain.',
    highlights: [
      'Zero chain maintenance direct-drive hub',
      'Parental speed governor mode',
      'Ultra durable recycled aluminum body',
      'Class-leading energy efficiency'
    ],
    petrolComparison: {
      runningCostEV: '₹0.18 / km',
      runningCostPetrol: '₹2.25 / km',
      annualSavings: '₹31,000 / year'
    },
    recommendationScores: {
      range: 8.3,
      price: 9.2,
      performance: 8.0,
      comfort: 8.8,
      value: 9.1,
      overall: 89
    }
  },
  {
    id: 'zero-srf',
    category: 'bike',
    brand: 'zero',
    brandName: 'Zero Motorcycles',
    name: 'Zero SR/F Premium',
    type: 'Naked Street Super-EV',
    price: 649000,
    priceUSD: 7900,
    emi: '₹13,500/mo',
    studentDailyPlan: { schoolDaily: 290, collegeDaily: 420 },
    range: 259, // km
    topSpeed: 200, // km/h
    batteryCapacity: 17.3, // kWh
    chargingTime: '1.8 hrs (6 kW Rapid Charger)',
    power: '82 kW (110 hp)',
    weight: 227, // kg
    seatHeight: 787, // mm
    seating: 2,
    rating: 4.9,
    reviewCount: 110,
    categories: ['long-drive', 'performance'],
    dailyUsage: false,
    longDrive: true,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Sport Standard',
    recommendedHeight: { min: 160, max: 198 },
    image: '/images/zero_motorcycle.png',
    colors: [
      { name: 'Matte Asphalt', hex: '#1e293b' },
      { name: 'Cyber Blue', hex: '#0284c7' }
    ],
    description: 'Massive 17.3 kWh battery capacity paired with Bosch Advanced MSC (Motorcycle Stability Control) for unmatched highway cruising and instant throttle response.',
    highlights: [
      '190 Nm peak instant torque',
      'Bosch Advanced MSC stability control',
      'Cypher III+ operating system with OTA upgrades',
      '259 km city / highway combined range'
    ],
    petrolComparison: {
      runningCostEV: '₹0.50 / km',
      runningCostPetrol: '₹5.50 / km',
      annualSavings: '₹70,000 / year'
    },
    recommendationScores: {
      range: 9.4,
      price: 6.8,
      performance: 9.8,
      comfort: 8.9,
      value: 8.2,
      overall: 89
    }
  }
];

export const carsData = [
  // --- TATA MOTORS EV ---
  {
    id: 'tata-nexon-ev',
    category: 'car',
    brand: 'tata',
    brandName: 'Tata Motors EV',
    name: 'Nexon.ev Empowered+',
    type: 'Compact Electric SUV',
    price: 1449000,
    priceUSD: 17600,
    emi: '₹22,999/mo',
    studentMonthlyPlan: { eligible: true, schoolMonthly: 50, collegeMonthly: 100 },
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 100 },
    range: 465, // km
    topSpeed: 150, // km/h
    batteryCapacity: 40.5, // kWh
    chargingTime: '6.0 hrs (DC Fast: 10-80% in 56 min)',
    power: '106 kW (143 hp)',
    weight: 1400, // kg
    seating: 5,
    seatHeight: 510, // mm
    rating: 4.85,
    reviewCount: 650,
    categories: ['daily', 'long-drive', 'family', 'budget'],
    dailyUsage: true,
    longDrive: true,
    college: true,
    school: false,
    family: true,
    performance: false,
    budget: true,
    stance: 'Elevated Command',
    recommendedHeight: { min: 148, max: 202 },
    image: '/images/hyundai_ioniq5.png',
    colors: [
      { name: 'Empowered Oxide', hex: '#64748b' },
      { name: 'Intensi Teal', hex: '#0f766e' },
      { name: 'Pristine White', hex: '#f8fafc' }
    ],
    description: 'India’s most proven electric SUV. 5-star BNCAP safety, V2V & V2L bidirectional charging, 360-degree camera, and cinematic 12.3-inch touchscreen console.',
    highlights: [
      '5-Star Bharat NCAP Crash Safety Rating',
      'Vehicle-to-Load (V2L) power bank feature',
      'Smart digital steering with illuminated logo',
      'JBL cinematic spatial audio system'
    ],
    petrolComparison: {
      runningCostEV: '₹1.10 / km',
      runningCostPetrol: '₹7.80 / km',
      annualSavings: '₹1,00,500 / year'
    },
    recommendationScores: {
      range: 8.8,
      price: 9.4,
      performance: 8.4,
      comfort: 9.3,
      value: 9.7,
      overall: 93
    }
  },
  {
    id: 'tata-tiago-ev',
    category: 'car',
    brand: 'tata',
    brandName: 'Tata Motors EV',
    name: 'Tiago.ev Long Range',
    type: 'Urban Hatchback EV',
    price: 899000,
    priceUSD: 10900,
    emi: '₹14,500/mo',
    studentMonthlyPlan: { eligible: true, schoolMonthly: 50, collegeMonthly: 100 },
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 100 },
    range: 315, // km
    topSpeed: 120, // km/h
    batteryCapacity: 24.0, // kWh
    chargingTime: '3.6 hrs (Fast: 10-80% in 57 min)',
    power: '55 kW (74 hp)',
    weight: 1150, // kg
    seating: 5,
    seatHeight: 490, // mm
    rating: 4.8,
    reviewCount: 480,
    categories: ['daily', 'budget', 'student-friendly', 'family'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: true,
    family: true,
    performance: false,
    budget: true,
    stance: 'Urban Compact',
    recommendedHeight: { min: 145, max: 198 },
    image: '/images/byd_seal.png',
    colors: [
      { name: 'Teal Blue', hex: '#0369a1' },
      { name: 'Daytona Grey', hex: '#334155' },
      { name: 'Pristine White', hex: '#f8fafc' }
    ],
    description: 'The most accessible practical 5-seater EV for city commuters and student carpools. Packed with auto-climate control, telematics, and multi-mode regeneration.',
    highlights: [
      'Sub-₹9 Lakhs accessible electric entry point',
      'Mandatory parent guardian consent option for teen drivers',
      'Harman 8-speaker surround sound',
      'Ultra-compact turning radius for tight college lanes'
    ],
    petrolComparison: {
      runningCostEV: '₹0.95 / km',
      runningCostPetrol: '₹7.20 / km',
      annualSavings: '₹93,750 / year'
    },
    recommendationScores: {
      range: 8.1,
      price: 9.9,
      performance: 7.8,
      comfort: 8.9,
      value: 9.8,
      overall: 92
    }
  },

  // --- MG MOTOR ---
  {
    id: 'mg-windsor-ev',
    category: 'car',
    brand: 'mg',
    brandName: 'MG Motor',
    name: 'MG Windsor EV Exclusive',
    type: 'Lounge Crossover EV',
    price: 1399000,
    priceUSD: 17000,
    emi: '₹21,500/mo',
    studentMonthlyPlan: { eligible: true, schoolMonthly: 50, collegeMonthly: 100 },
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 100 },
    range: 331, // km
    topSpeed: 140, // km/h
    batteryCapacity: 38.0, // kWh
    chargingTime: '6.5 hrs (Fast: 35 min)',
    power: '100 kW (136 hp)',
    weight: 1560, // kg
    seating: 5,
    seatHeight: 520, // mm
    rating: 4.8,
    reviewCount: 320,
    categories: ['daily', 'family', 'student-friendly', 'budget'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: false,
    family: true,
    performance: false,
    budget: true,
    stance: 'Lounge Crossover',
    recommendedHeight: { min: 148, max: 204 },
    image: '/images/hyundai_ioniq5.png',
    colors: [
      { name: 'Starry Black', hex: '#090d16' },
      { name: 'Pearl White', hex: '#f8fafc' },
      { name: 'Turquoise Green', hex: '#0d9488' }
    ],
    description: 'Aero Lounge rear seats recline up to 135 degrees for first-class passenger comfort. Giant 15.6-inch GRANDVIEW display and Infinity panoramic glass roof.',
    highlights: [
      '135-degree Aero Lounge reclining sofa seats',
      'Segment-first 15.6-inch Grandview touchscreen',
      'Infinity panoramic glass skyroof',
      'Lifetime battery warranty option'
    ],
    petrolComparison: {
      runningCostEV: '₹1.15 / km',
      runningCostPetrol: '₹8.10 / km',
      annualSavings: '₹1,04,000 / year'
    },
    recommendationScores: {
      range: 8.3,
      price: 9.3,
      performance: 8.2,
      comfort: 9.9,
      value: 9.4,
      overall: 92
    }
  },
  {
    id: 'mg-comet-ev',
    category: 'car',
    brand: 'mg',
    brandName: 'MG Motor',
    name: 'MG Comet Smart EV',
    type: 'Compact Urban Electric Car',
    price: 699000,
    priceUSD: 8500,
    emi: '₹11,900/mo',
    studentMonthlyPlan: { eligible: true, schoolMonthly: 50, collegeMonthly: 100 },
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 100 },
    range: 230, // km
    topSpeed: 100, // km/h
    batteryCapacity: 17.3, // kWh
    chargingTime: '5.0 hrs (Home 3.3 kW socket)',
    power: '31 kW (42 hp)',
    weight: 815, // kg
    seating: 4,
    seatHeight: 500, // mm
    rating: 4.7,
    reviewCount: 290,
    categories: ['daily', 'budget', 'student-friendly'],
    dailyUsage: true,
    longDrive: false,
    college: true,
    school: true,
    family: false,
    performance: false,
    budget: true,
    stance: 'Urban Compact',
    recommendedHeight: { min: 145, max: 195 },
    image: '/images/cake_ebike.png',
    colors: [
      { name: 'Apple Green / Starry Black', hex: '#22c55e' },
      { name: 'Candy White', hex: '#f8fafc' }
    ],
    description: 'The ultimate space-saver for university campuses, school carpools, and congested urban streets. Dual 10.25-inch integrated screens and parking into half a slot.',
    highlights: [
      'Fits into 50% the parking footprint of regular cars',
      'Under ₹0.75 per kilometer running expenditure',
      'Parent verification & geofenced maximum radius mode',
      'Dual 10.25-inch floating screens with wireless Apple CarPlay'
    ],
    petrolComparison: {
      runningCostEV: '₹0.70 / km',
      runningCostPetrol: '₹6.80 / km',
      annualSavings: '₹91,500 / year'
    },
    recommendationScores: {
      range: 7.7,
      price: 10.0,
      performance: 7.2,
      comfort: 8.5,
      value: 9.7,
      overall: 89
    }
  },

  // --- TESLA ---
  {
    id: 'tesla-model-s',
    category: 'car',
    brand: 'tesla',
    brandName: 'Tesla',
    name: 'Tesla Model S Plaid',
    type: 'Luxury Performance Sedan',
    price: 8990000,
    priceUSD: 89990,
    emi: '₹1,45,000/mo',
    studentMonthlyPlan: null,
    studentDailyPlan: null,
    range: 637, // km
    topSpeed: 322, // km/h
    batteryCapacity: 100.0, // kWh
    chargingTime: 'Supercharger: 15 min for 320 km',
    power: '760 kW (1,020 hp)',
    weight: 2162, // kg
    seating: 5,
    seatHeight: 480, // mm
    rating: 4.95,
    reviewCount: 780,
    categories: ['long-drive', 'performance', 'premium'],
    dailyUsage: false,
    longDrive: true,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Low-Slung Executive',
    recommendedHeight: { min: 150, max: 205 },
    image: '/images/tesla_model_s.png',
    colors: [
      { name: 'Ultra Red', hex: '#991b1b' },
      { name: 'Solid Black', hex: '#090d16' },
      { name: 'Pearl White Multi-Coat', hex: '#f8fafc' }
    ],
    description: 'Model S Plaid has the quickest acceleration of any vehicle in production. Tri-Motor All-Wheel Drive with torque vectoring and full self-driving hardware suite.',
    highlights: [
      '0 to 100 km/h in 2.1 seconds',
      'Tri-motor AWD with Carbon-Sleeved Rotors',
      '17-inch cinematic center display with gaming rig capability',
      'Full Self-Driving (Supervised) hardware suite'
    ],
    petrolComparison: {
      runningCostEV: '₹1.80 / km',
      runningCostPetrol: '₹14.50 / km (Supercar equivalent)',
      annualSavings: '₹1,90,000 / year'
    },
    recommendationScores: {
      range: 9.9,
      price: 6.5,
      performance: 10.0,
      comfort: 9.6,
      value: 8.5,
      overall: 93
    }
  },
  {
    id: 'tesla-model-y',
    category: 'car',
    brand: 'tesla',
    brandName: 'Tesla',
    name: 'Tesla Model Y Long Range AWD',
    type: 'Premium Crossover SUV',
    price: 5490000,
    priceUSD: 49990,
    emi: '₹88,000/mo',
    studentMonthlyPlan: null,
    studentDailyPlan: null,
    range: 533, // km
    topSpeed: 217, // km/h
    batteryCapacity: 75.0, // kWh
    chargingTime: 'Supercharger: 15 min for 260 km',
    power: '286 kW (384 hp)',
    weight: 1979, // kg
    seating: 5,
    seatHeight: 520, // mm
    rating: 4.9,
    reviewCount: 920,
    categories: ['daily', 'long-drive', 'family', 'premium'],
    dailyUsage: true,
    longDrive: true,
    college: false,
    school: false,
    family: true,
    performance: false,
    budget: false,
    stance: 'Elevated Command',
    recommendedHeight: { min: 150, max: 205 },
    image: '/images/tesla_model_s.png',
    colors: [
      { name: 'Quicksilver', hex: '#94a3b8' },
      { name: 'Deep Blue Metallic', hex: '#1e3a8a' },
      { name: 'Pearl White', hex: '#f8fafc' }
    ],
    description: 'The world’s best-selling electric SUV. Generous seating for five, massive panoramic glass roof, class-leading cargo room, and Dual Motor AWD all-weather traction.',
    highlights: [
      'Class-leading 2,158L maximum cargo volume',
      'Dual Motor AWD with independent traction motors',
      'Access to 50,000+ Tesla Superchargers globally',
      'HEPA filtration system with Bioweapon Defense Mode'
    ],
    petrolComparison: {
      runningCostEV: '₹1.50 / km',
      runningCostPetrol: '₹9.50 / km',
      annualSavings: '₹1,20,000 / year'
    },
    recommendationScores: {
      range: 9.5,
      price: 8.0,
      performance: 9.1,
      comfort: 9.5,
      value: 9.0,
      overall: 92
    }
  },

  // --- PORSCHE ---
  {
    id: 'porsche-taycan',
    category: 'car',
    brand: 'porsche',
    brandName: 'Porsche',
    name: 'Porsche Taycan Turbo S',
    type: 'Electric Sports Super-Sedan',
    price: 24900000,
    priceUSD: 194900,
    emi: '₹3,90,000/mo',
    studentMonthlyPlan: null,
    studentDailyPlan: null,
    range: 450, // km
    topSpeed: 260, // km/h
    batteryCapacity: 93.4, // kWh
    chargingTime: '800V DC: 5 to 80% in 22 min',
    power: '560 kW (750 hp Overboost)',
    weight: 2295, // kg
    seating: 4,
    seatHeight: 460, // mm
    rating: 4.95,
    reviewCount: 310,
    categories: ['long-drive', 'performance', 'premium'],
    dailyUsage: false,
    longDrive: true,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Sport Cockpit',
    recommendedHeight: { min: 152, max: 202 },
    image: '/images/porsche_taycan.png',
    colors: [
      { name: 'Frozen Blue Metallic', hex: '#0284c7' },
      { name: 'Carrara White Metallic', hex: '#f8fafc' },
      { name: 'Jet Black Metallic', hex: '#090d16' }
    ],
    description: 'The pinnacle of electric sports motoring. 800-volt battery architecture, Porsche Active Suspension Management (PASM), and neck-snapping 0-100 km/h in 2.8s.',
    highlights: [
      '0-100 km/h in 2.8 seconds with Launch Control',
      'Ultra-fast 800V performance battery architecture',
      'Porsche Active Suspension Management (PASM)',
      'Digital curved cockpit with quad passenger displays'
    ],
    petrolComparison: {
      runningCostEV: '₹2.10 / km',
      runningCostPetrol: '₹18.00 / km',
      annualSavings: '₹2,38,500 / year'
    },
    recommendationScores: {
      range: 8.6,
      price: 5.5,
      performance: 10.0,
      comfort: 9.3,
      value: 7.9,
      overall: 89
    }
  },

  // --- BYD ---
  {
    id: 'byd-seal',
    category: 'car',
    brand: 'byd',
    brandName: 'BYD',
    name: 'BYD Seal Performance AWD',
    type: 'Executive Sports Sedan',
    price: 4555000,
    priceUSD: 51000,
    emi: '₹72,000/mo',
    studentMonthlyPlan: null,
    studentDailyPlan: null,
    range: 580, // km
    topSpeed: 190, // km/h
    batteryCapacity: 82.5, // kWh
    chargingTime: 'DC Fast: 10-80% in 37 min',
    power: '390 kW (523 hp)',
    weight: 2185, // kg
    seating: 5,
    seatHeight: 490, // mm
    rating: 4.88,
    reviewCount: 450,
    categories: ['daily', 'long-drive', 'performance', 'premium'],
    dailyUsage: true,
    longDrive: true,
    college: false,
    school: false,
    family: false,
    performance: true,
    budget: false,
    stance: 'Modern Aerodynamic',
    recommendedHeight: { min: 150, max: 202 },
    image: '/images/byd_seal.png',
    colors: [
      { name: 'Aurora White', hex: '#f8fafc' },
      { name: 'Arctic Blue', hex: '#0284c7' },
      { name: 'Atlantis Grey', hex: '#334155' }
    ],
    description: 'Cell-to-Body (CTB) battery integration and world-famous ultra-safe Blade Battery chemistry delivering extreme structural torsional rigidity and 0-100 in 3.8s.',
    highlights: [
      'Ultra-Safe Blade Battery passes rigorous nail penetration tests',
      '0 to 100 km/h in 3.8 seconds with Dual-Motor AWD',
      '15.6-inch rotatable intelligent touchscreen center display',
      'Dynaudio 12-speaker high fidelity sound system'
    ],
    petrolComparison: {
      runningCostEV: '₹1.35 / km',
      runningCostPetrol: '₹11.20 / km',
      annualSavings: '₹1,47,000 / year'
    },
    recommendationScores: {
      range: 9.6,
      price: 8.7,
      performance: 9.5,
      comfort: 9.4,
      value: 9.3,
      overall: 93
    }
  },

  // --- RIVIAN ---
  {
    id: 'rivian-r1s',
    category: 'car',
    brand: 'rivian',
    brandName: 'Rivian',
    name: 'Rivian R1S Adventure',
    type: 'All-Terrain 7-Seater Electric SUV',
    price: 9200000,
    priceUSD: 78000,
    emi: '₹1,48,000/mo',
    studentMonthlyPlan: null,
    studentDailyPlan: null,
    range: 643, // km
    topSpeed: 201, // km/h
    batteryCapacity: 135.0, // kWh
    chargingTime: 'DC Fast: 225 km in 20 min',
    power: '622 kW (835 hp Quad Motor)',
    weight: 3137, // kg
    seating: 7,
    seatHeight: 620, // mm
    rating: 4.9,
    reviewCount: 340,
    categories: ['long-drive', 'family', 'premium'],
    dailyUsage: false,
    longDrive: true,
    college: false,
    school: false,
    family: true,
    performance: false,
    budget: false,
    stance: 'High-Clearance Adventure',
    recommendedHeight: { min: 152, max: 208 },
    image: '/images/rivian_r1s.png',
    colors: [
      { name: 'Forest Green', hex: '#166534' },
      { name: 'LA Silver', hex: '#cbd5e1' },
      { name: 'Compass Yellow', hex: '#eab308' }
    ],
    description: 'An all-terrain electric fortress built for exploration. 3 rows of adult seating, 3 feet of water fording depth capability, and Quad-Motor independent torque vectoring.',
    highlights: [
      'Quad-Motor AWD with independent wheel torque distribution',
      'True 7-passenger three-row luxury seating',
      'Over 3 feet (1 meter) water wading capability',
      '643 km Max Battery Pack endurance'
    ],
    petrolComparison: {
      runningCostEV: '₹1.90 / km',
      runningCostPetrol: '₹13.80 / km',
      annualSavings: '₹1,78,500 / year'
    },
    recommendationScores: {
      range: 9.9,
      price: 6.9,
      performance: 9.3,
      comfort: 9.9,
      value: 8.7,
      overall: 91
    }
  },

  // --- HYUNDAI ---
  {
    id: 'hyundai-ioniq5',
    category: 'car',
    brand: 'hyundai',
    brandName: 'Hyundai EV',
    name: 'Hyundai Ioniq 5 AWD',
    type: 'Retro-Futuristic Lounge EV',
    price: 4600000,
    priceUSD: 45000,
    emi: '₹73,500/mo',
    studentMonthlyPlan: { eligible: true, schoolMonthly: 50, collegeMonthly: 100 },
    studentDailyPlan: { schoolDaily: 50, collegeDaily: 100 },
    range: 488, // km
    topSpeed: 185, // km/h
    batteryCapacity: 77.4, // kWh
    chargingTime: '800V DC: 10% to 80% in 18 mins',
    power: '225 kW (305 hp)',
    weight: 2020, // kg
    seating: 5,
    seatHeight: 530, // mm
    rating: 4.88,
    reviewCount: 520,
    categories: ['daily', 'long-drive', 'family', 'premium', 'student-friendly'],
    dailyUsage: true,
    longDrive: true,
    college: true,
    school: false,
    family: true,
    performance: false,
    budget: false,
    stance: 'Lounge Crossover',
    recommendedHeight: { min: 150, max: 205 },
    image: '/images/hyundai_ioniq5.png',
    colors: [
      { name: 'Gravity Gold Matte', hex: '#ca8a04' },
      { name: 'Cyber Grey', hex: '#94a3b8' },
      { name: 'Midnight Black', hex: '#090d16' }
    ],
    description: 'World Car of the Year winner. Featuring Parametric Pixel LED signatures, flat floor architectural layout, sliding Universal Island center console, and 800V super-charging.',
    highlights: [
      'Ultra-fast 800V charging (10% to 80% in only 18 minutes)',
      'Vehicle-to-Load (V2L) 3.6 kW output for laptops & camping gear',
      'Sliding Universal Island center console and relaxion lounge seats',
      'Parametric Pixel LED lighting designs'
    ],
    petrolComparison: {
      runningCostEV: '₹1.25 / km',
      runningCostPetrol: '₹9.20 / km',
      annualSavings: '₹1,19,000 / year'
    },
    recommendationScores: {
      range: 9.0,
      price: 8.6,
      performance: 8.8,
      comfort: 9.8,
      value: 9.2,
      overall: 93
    }
  }
];

// Helper to format currency in Indian Rupees with comma separation
export const formatINR = (val) => {
  if (val === undefined || val === null) return '₹0';
  return '₹' + Number(val).toLocaleString('en-IN');
};
