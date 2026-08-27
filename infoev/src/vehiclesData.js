export const bikeBrands = [
  { id: 'all', name: 'All Brands' },
  { id: 'ola', name: 'Ola Electric' },
  { id: 'ather', name: 'Ather Energy' },
  { id: 'ultraviolette', name: 'Ultraviolette' },
  { id: 'revolt', name: 'Revolt Motors' },
  { id: 'tvs', name: 'TVS Motor' }
];

export const carBrands = [
  { id: 'all', name: 'All Brands' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'porsche', name: 'Porsche' },
  { id: 'byd', name: 'BYD' },
  { id: 'rivian', name: 'Rivian' },
  { id: 'hyundai', name: 'Hyundai' }
];

export const bikesData = [
  // --- OLA ELECTRIC ---
  {
    id: 'ola-s1-pro',
    category: 'bike',
    brand: 'ola',
    brandName: 'Ola Electric',
    name: 'Ola S1 Pro Gen 2',
    type: 'Premium Scooter',
    price: 1799,
    range: 195, // km
    topSpeed: 120, // km/h
    batteryCapacity: 4.0, // kWh
    weight: 116, // kg
    image: '/images/ola_s1_pro.png',
    colors: [
      { name: 'Mint Green', hex: '#a2e8dd' },
      { name: 'Jet Black', hex: '#111827' }
    ],
    description: 'The flagship Ola S1 Pro Gen 2 features a redesigned lighter hybrid chassis, yielding higher efficiency, faster acceleration, and greater range for modern city riders.',
    highlights: [
      '0 to 40 km/h in 2.6 seconds',
      'MoveOS 4 smart connectivity & navigation',
      'Spacious 34L under-seat storage',
      'Eco, Normal, Sports, and Hyper riding modes'
    ]
  },
  {
    id: 'ola-roadster',
    category: 'bike',
    brand: 'ola',
    brandName: 'Ola Electric',
    name: 'Ola Roadster',
    type: 'Electric Street Naked',
    price: 3200,
    range: 248, // km
    topSpeed: 126, // km/h
    batteryCapacity: 6.0, // kWh
    weight: 145, // kg
    image: '/images/ola_roadster.png',
    colors: [
      { name: 'Matte White', hex: '#f3f4f6' },
      { name: 'Silver Charcoal', hex: '#9ca3af' }
    ],
    description: 'Ola’s entry into electric street motorcycling, presenting standard street-naked form factors combined with high-capacity battery units and immediate hub performance.',
    highlights: [
      'Futuristic LED horizontal light strip',
      'Integrated digital touchscreen control',
      'Combi-braking system (CBS)',
      'High-rigidity tubular steel frame'
    ]
  },

  // --- ATHER ENERGY ---
  {
    id: 'ather-450x',
    category: 'bike',
    brand: 'ather',
    brandName: 'Ather Energy',
    name: 'Ather 450X Gen 3',
    type: 'Sport Scooter',
    price: 1950,
    range: 150, // km
    topSpeed: 90, // km/h
    batteryCapacity: 3.7, // kWh
    weight: 111, // kg
    image: '/images/ather_450x.png',
    colors: [
      { name: 'Space Grey / Mint', hex: '#4a5568' },
      { name: 'Salt White', hex: '#f9fafb' }
    ],
    description: 'The benchmark of smart electric performance scooters, Ather 450X delivers razor-sharp handling, persistent thermal performance, and Google Maps dashboard navigation.',
    highlights: [
      'Warp Mode for instant torque surge',
      'Exposed aluminium sub-frame structure',
      'Ather Grid fast charging capabilities',
      '7-inch interactive Android dashboard'
    ]
  },
  {
    id: 'ather-rizta',
    category: 'bike',
    brand: 'ather',
    brandName: 'Ather Energy',
    name: 'Ather Rizta',
    type: 'Family Scooter',
    price: 1550,
    range: 160, // km
    topSpeed: 80, // km/h
    batteryCapacity: 3.7, // kWh
    weight: 119, // kg
    image: '/images/ather_rizta.png',
    colors: [
      { name: 'Monsoon Blue', hex: '#4682b4' },
      { name: 'Slate Grey', hex: '#718096' }
    ],
    description: 'Designed from the ground up for convenience and passenger comfort, the Ather Rizta boasts the largest seat in the category alongside unmatched safety tech.',
    highlights: [
      'Extra-large family size dual-seat',
      'Traction Control System (TCS)',
      'Under-seat storage plus frunk accessory',
      'Skid-prevention deceleration system'
    ]
  },

  // --- ULTRAVIOLETTE ---
  {
    id: 'uv-f77',
    category: 'bike',
    brand: 'ultraviolette',
    brandName: 'Ultraviolette',
    name: 'F77 Mach 2',
    type: 'Performance Sportbike',
    price: 4900,
    range: 323, // km
    topSpeed: 155, // km/h
    batteryCapacity: 10.3, // kWh
    weight: 207, // kg
    image: '/images/ultraviolette_f77.png',
    colors: [
      { name: 'Crimson Red / Carbon', hex: '#c53030' },
      { name: 'Shadow Black', hex: '#1a202c' }
    ],
    description: 'An aviation-inspired electric powerhouse. The Ultraviolette F77 Mach 2 features high-voltage architecture, aggressive clip-on ergonomics, and regenerative braking.',
    highlights: [
      '0 to 60 km/h in 2.8 seconds',
      'Aviation-grade aluminum structure',
      '10 levels of customizable regenerative braking',
      'Active console telemetry and GPS locator'
    ]
  },
  {
    id: 'uv-f99',
    category: 'bike',
    brand: 'ultraviolette',
    brandName: 'Ultraviolette',
    name: 'F99 Factory Racing',
    type: 'Racing Superbike',
    price: 9500,
    range: 200, // km
    topSpeed: 265, // km/h
    batteryCapacity: 12.0, // kWh
    weight: 178, // kg
    image: '/images/ultraviolette_f99.png',
    colors: [
      { name: 'Racing Carbon / Neon', hex: '#adff2f' }
    ],
    description: 'The pinnacle of electric racing development. Featuring active carbon-fiber aerodynamics that respond to speed and yaw, the F99 is a track-ready electric superbike.',
    highlights: [
      'Active winglet aerodynamic systems',
      '90 kW peak liquid-cooled motor',
      'Aero-disk wheels minimizing drag',
      'High-output fast-drain race pack'
    ]
  },

  // --- REVOLT MOTORS ---
  {
    id: 'revolt-rv400',
    category: 'bike',
    brand: 'revolt',
    brandName: 'Revolt Motors',
    name: 'Revolt RV400',
    type: 'Street Commuter',
    price: 1650,
    range: 150, // km
    topSpeed: 85, // km/h
    batteryCapacity: 3.24, // kWh
    weight: 108, // kg
    image: '/images/revolt_rv400.png',
    colors: [
      { name: 'Rebel Red', hex: '#b22222' },
      { name: 'Cosmic Black', hex: '#111827' }
    ],
    description: 'India’s first AI-enabled electric motorcycle. Combining lightweight agility with swap-ready batteries, it offers standard street commuting at zero expense.',
    highlights: [
      'Simulated engine sound selector',
      'MyRevolt App with geofencing capability',
      'Removable battery for home/office charging',
      '3 ride modes: Eco, Normal, and Sport'
    ]
  },
  {
    id: 'revolt-rv400-brz',
    category: 'bike',
    brand: 'revolt',
    brandName: 'Revolt Motors',
    name: 'Revolt RV400 BRZ',
    type: 'Essential Commuter',
    price: 1400,
    range: 150, // km
    topSpeed: 80, // km/h
    batteryCapacity: 3.24, // kWh
    weight: 108, // kg
    image: '/images/revolt_rv400.png',
    colors: [
      { name: 'Matte Pacific Blue', hex: '#1e3a8a' },
      { name: 'Dark Stealth', hex: '#374151' }
    ],
    description: 'An essential utility trim of the RV400, configured to bring high-range electric motorcycling to the daily commuter at a budget-friendly price point.',
    highlights: [
      'Digital dashboard instrument panel',
      'Regenerative braking setup',
      'Ergonomic split-cushion seating layout',
      'Under 4-hour home charging duration'
    ]
  },

  // --- TVS MOTOR ---
  {
    id: 'tvs-iqube',
    category: 'bike',
    brand: 'tvs',
    brandName: 'TVS Motor',
    name: 'TVS iQube S',
    type: 'Classic Urban Scooter',
    price: 1680,
    range: 105, // km
    topSpeed: 78, // km/h
    batteryCapacity: 3.4, // kWh
    weight: 118, // kg
    image: '/images/ola_s1_pro.png',
    colors: [
      { name: 'Pearl White', hex: '#ffffff' },
      { name: 'Mint Gold', hex: '#e3d4b6' }
    ],
    description: 'A classic, highly reliable electric scooter combining traditional family-scooter ride quality with intelligent modern connectivity from TVS.',
    highlights: [
      '5-inch TFT console with turn-by-turn navigation',
      'Silent hub-motor silent drive system',
      'TVS SmartXonnect Bluetooth platform',
      'Spacious flat floorboard design'
    ]
  },
  {
    id: 'tvs-x',
    category: 'bike',
    brand: 'tvs',
    brandName: 'TVS Motor',
    name: 'TVS X',
    type: 'Crossover Sport Scooter',
    price: 2999,
    range: 140, // km
    topSpeed: 105, // km/h
    batteryCapacity: 4.4, // kWh
    weight: 132, // kg
    image: '/images/ather_450x.png',
    colors: [
      { name: 'Signature Red / Black', hex: '#e53e3e' }
    ],
    description: 'A premium, sporty electric crossover built on a high-rigidity trellis frame layout, bringing performance handling to a maxi-scooter form factor.',
    highlights: [
      'TVS Xleton exposed trellis frame chassis',
      '0-40 km/h in an impressive 2.6 seconds',
      '10.2-inch massive tilt-adjustable screen',
      'Ram-air cooled battery ventilation'
    ]
  }
];

export const carsData = [
  // --- TESLA ---
  {
    id: 'tesla-model-s',
    category: 'car',
    brand: 'tesla',
    brandName: 'Tesla',
    name: 'Model S Plaid',
    type: 'Luxury Sedan',
    price: 89990,
    range: 637, // km
    topSpeed: 322, // km/h
    batteryCapacity: 100.0, // kWh
    weight: 2162, // kg
    image: '/images/tesla_model_s.jpg',
    colors: [
      { name: 'Ultra Red', hex: '#a61c24' },
      { name: 'Solid Black', hex: '#0f0f10' },
      { name: 'Pearl White', hex: '#f3f4f6' }
    ],
    description: 'Model S Plaid has the quickest acceleration of any vehicle in production. With updated battery architecture and styling, it delivers performance styling at high ranges.',
    highlights: [
      '0-100 km/h in an insane 2.1 seconds',
      'Tri-motor AWD with Carbon-Sleeved Rotors',
      'Stunning 17-inch cinematic center display',
      'Full Self-Driving capability ready'
    ]
  },
  {
    id: 'tesla-model-y',
    category: 'car',
    brand: 'tesla',
    brandName: 'Tesla',
    name: 'Model Y Long Range',
    type: 'Premium Crossover SUV',
    price: 47990,
    range: 512, // km
    topSpeed: 217, // km/h
    batteryCapacity: 75.0, // kWh
    weight: 1979, // kg
    image: '/images/tesla_model_s.jpg',
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f3f4f6' },
      { name: 'Deep Blue Metallic', hex: '#1e3a8a' }
    ],
    description: 'Designed for maximum versatility and safety, with spacious seating for five, elevated riding position, and class-leading cargo capability.',
    highlights: [
      'Dual Motor All-Wheel Drive system',
      'Over-the-air updates for persistent improvement',
      'Supercharger access (15-min charge for 260 km)',
      'Panoramic glass roof layout'
    ]
  },

  // --- PORSCHE ---
  {
    id: 'porsche-taycan',
    category: 'car',
    brand: 'porsche',
    brandName: 'Porsche',
    name: 'Taycan Turbo S',
    type: 'Sports Sedan',
    price: 194900,
    range: 450, // km
    topSpeed: 260, // km/h
    batteryCapacity: 93.4, // kWh
    weight: 2295, // kg
    image: '/images/porsche_taycan.jpg',
    colors: [
      { name: 'Frozen Blue Metallic', hex: '#4682b4' },
      { name: 'Carrara White Metallic', hex: '#f8fafc' },
      { name: 'Jet Black Metallic', hex: '#0f172a' }
    ],
    description: 'The Porsche Taycan Turbo S represents the pinnacle of electric sports motoring, pairing Porsche handling dynamics with futuristic 800V charging speed.',
    highlights: [
      '0-100 km/h in 2.8 seconds with Launch Control',
      '800-volt performance battery architecture',
      'Porsche Active Suspension Management (PASM)',
      'Premium sports cockpit with quad-screens'
    ]
  },

  // --- BYD ---
  {
    id: 'byd-seal',
    category: 'car',
    brand: 'byd',
    brandName: 'BYD',
    name: 'BYD Seal',
    type: 'Executive Sedan',
    price: 42000,
    range: 570, // km
    topSpeed: 180, // km/h
    batteryCapacity: 82.5, // kWh
    weight: 2055, // kg
    image: '/images/byd_seal.jpg',
    colors: [
      { name: 'Cool Grey', hex: '#708090' },
      { name: 'Aurora White', hex: '#ffffff' },
      { name: 'Atlantis Grey', hex: '#374151' }
    ],
    description: 'BYD Seal integrates cutting-edge Cell-to-Body (CTB) engineering and Blade Battery chemistry, providing superior structural stiffness and high efficiency.',
    highlights: [
      'Advanced ultra-safe Blade Battery tech',
      'Rotating 15.6-inch intelligent touchscreen dashboard',
      'Rear-Wheel Drive sporty setup',
      'Dynamic "Ocean Aesthetics" design'
    ]
  },

  // --- RIVIAN ---
  {
    id: 'rivian-r1s',
    category: 'car',
    brand: 'rivian',
    brandName: 'Rivian',
    name: 'Rivian R1S',
    type: 'Adventure SUV',
    price: 75900,
    range: 643, // km
    topSpeed: 201, // km/h
    batteryCapacity: 135.0, // kWh
    weight: 3137, // kg
    image: '/images/rivian_r1s.jpg',
    colors: [
      { name: 'Forest Green', hex: '#2d5a27' },
      { name: 'LA Silver', hex: '#cbd5e1' },
      { name: 'Compass Yellow', hex: '#f59e0b' }
    ],
    description: 'An all-terrain electric SUV built for exploration. The Rivian R1S offers three rows of comfortable seating, massive storage space, and quad-motor control.',
    highlights: [
      'Four motor setup with torque vectoring',
      'Over 3 feet of water wading depth capability',
      'Spacious seating configurations for up to 7 adults',
      'Independently adjustable air suspension levels'
    ]
  },

  // --- HYUNDAI ---
  {
    id: 'hyundai-ioniq5',
    category: 'car',
    brand: 'hyundai',
    brandName: 'Hyundai',
    name: 'Ioniq 5',
    type: 'Crossover SUV',
    price: 41800,
    range: 488, // km
    topSpeed: 185, // km/h
    batteryCapacity: 77.4, // kWh
    weight: 2020, // kg
    image: '/images/hyundai_ioniq5.jpg',
    colors: [
      { name: 'Matte Gold', hex: '#c5b358' },
      { name: 'Cyber Grey', hex: '#d1d5db' },
      { name: 'Phantom Black', hex: '#111827' }
    ],
    description: 'The award-winning Ioniq 5 features retro pixel lighting signature combined with flat-floor architecture and bidirectional vehicle-to-load charging capacity.',
    highlights: [
      'Ultra-fast 800V charging (10% to 80% in 18 mins)',
      'Vehicle-to-Load (V2L) bidirectional power supply',
      'Sliding center console & flat floor spacious layout',
      'Parametric Pixel LED lighting designs'
    ]
  }
];
