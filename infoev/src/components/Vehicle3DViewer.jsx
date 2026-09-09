import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Pause, Play, Eye, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export default function Vehicle3DViewer({
  vehicle,
  autoRotate: defaultAutoRotate = true,
  className = "w-full h-full min-h-[280px]",
  showControls = true,
  height = "320px"
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const vehicleGroupRef = useRef(null);
  const reqIdRef = useRef(null);

  const [isAutoRotating, setIsAutoRotating] = useState(defaultAutoRotate);
  const [activeAngle, setActiveAngle] = useState('3/4');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef(0);
  const targetRotationYRef = useRef(0.6); // initial nice 3/4 perspective
  const targetRotationXRef = useRef(0.2);

  // Build the 3D Vehicle Geometry based on category (Bike vs Car)
  const buildVehicle3DModel = useCallback((cat, type, brand) => {
    const group = new THREE.Group();

    // Materials
    const paintColor = cat === 'bike' ? 0x4f46e5 : 0x0284c7; // Indigo or Cyan
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: wireframe
    });
    const glossyPaint = new THREE.MeshStandardMaterial({
      color: paintColor,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: wireframe
    });
    const chromeMetal = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: wireframe
    });
    const rubberTire = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: wireframe
    });
    const glowingLed = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.8,
      roughness: 0.1
    });
    const redLed = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 1.5,
      roughness: 0.1
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      wireframe: wireframe
    });

    if (cat === 'bike') {
      // ==================== 3D MOTORCYCLE / SCOOTER MODEL ====================
      // 1. Wheels (Front & Rear)
      const tireGeo = new THREE.TorusGeometry(0.7, 0.2, 16, 36);
      const rimGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 24);
      const discGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.04, 18);

      // Front Wheel
      const frontWheel = new THREE.Group();
      const frontTire = new THREE.Mesh(tireGeo, rubberTire);
      const frontRim = new THREE.Mesh(rimGeo, chromeMetal);
      const frontDisc = new THREE.Mesh(discGeo, chromeMetal);
      frontRim.rotation.x = Math.PI / 2;
      frontDisc.rotation.x = Math.PI / 2;
      frontWheel.add(frontTire, frontRim, frontDisc);
      frontWheel.position.set(1.4, 0.7, 0);
      group.add(frontWheel);

      // Rear Wheel
      const rearWheel = new THREE.Group();
      const rearTire = new THREE.Mesh(tireGeo, rubberTire);
      const rearRim = new THREE.Mesh(rimGeo, chromeMetal);
      const rearDisc = new THREE.Mesh(discGeo, chromeMetal);
      rearRim.rotation.x = Math.PI / 2;
      rearDisc.rotation.x = Math.PI / 2;
      rearWheel.add(rearTire, rearRim, rearDisc);
      rearWheel.position.set(-1.4, 0.7, 0);
      group.add(rearWheel);

      // 2. Front Suspension Fork
      const forkGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.6, 16);
      const forkL = new THREE.Mesh(forkGeo, chromeMetal);
      const forkR = new THREE.Mesh(forkGeo, chromeMetal);
      forkL.position.set(1.2, 1.3, 0.22);
      forkR.position.set(1.2, 1.3, -0.22);
      forkL.rotation.z = -0.35;
      forkR.rotation.z = -0.35;
      group.add(forkL, forkR);

      // 3. Central Battery Pack & Frame
      const batteryBoxGeo = new THREE.BoxGeometry(1.5, 0.9, 0.75);
      const batteryBox = new THREE.Mesh(batteryBoxGeo, darkMetal);
      batteryBox.position.set(-0.1, 1.0, 0);
      group.add(batteryBox);

      // Frame Accent Ribs
      const frameTubeGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.0, 12);
      const frameTubeL = new THREE.Mesh(frameTubeGeo, glossyPaint);
      const frameTubeR = new THREE.Mesh(frameTubeGeo, glossyPaint);
      frameTubeL.position.set(0.1, 1.35, 0.38);
      frameTubeR.position.set(0.1, 1.35, -0.38);
      frameTubeL.rotation.z = 0.55;
      frameTubeR.rotation.z = 0.55;
      group.add(frameTubeL, frameTubeR);

      // 4. Tank / Upper Fairing Body
      const tankGeo = new THREE.BoxGeometry(1.2, 0.45, 0.65);
      const tank = new THREE.Mesh(tankGeo, glossyPaint);
      tank.position.set(0.35, 1.65, 0);
      group.add(tank);

      // 5. Ergonomic Seat
      const seatGeo = new THREE.BoxGeometry(1.1, 0.18, 0.5);
      const seat = new THREE.Mesh(seatGeo, darkMetal);
      seat.position.set(-0.6, 1.6, 0);
      seat.rotation.z = 0.08;
      group.add(seat);

      // 6. Handlebars & Headlight
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 12);
      const handlebar = new THREE.Mesh(barGeo, chromeMetal);
      handlebar.position.set(0.95, 2.05, 0);
      handlebar.rotation.x = Math.PI / 2;
      group.add(handlebar);

      // Digital Dash
      const dashGeo = new THREE.BoxGeometry(0.15, 0.05, 0.28);
      const dash = new THREE.Mesh(dashGeo, darkMetal);
      dash.position.set(0.92, 2.12, 0);
      group.add(dash);

      // Headlight
      const headlightGeo = new THREE.BoxGeometry(0.2, 0.28, 0.45);
      const headlight = new THREE.Mesh(headlightGeo, glowingLed);
      headlight.position.set(1.4, 1.85, 0);
      group.add(headlight);

      // Taillight
      const taillightGeo = new THREE.BoxGeometry(0.1, 0.1, 0.35);
      const taillight = new THREE.Mesh(taillightGeo, redLed);
      taillight.position.set(-1.18, 1.65, 0);
      group.add(taillight);

    } else {
      // ==================== 3D ELECTRIC CAR / SUV MODEL ====================
      // 1. Aerodynamic Car Body (Lower Chassis)
      const bodyGeo = new THREE.BoxGeometry(4.4, 0.8, 1.95);
      const body = new THREE.Mesh(bodyGeo, glossyPaint);
      body.position.set(0, 0.75, 0);
      group.add(body);

      // Front Hood Slope
      const hoodGeo = new THREE.CylinderGeometry(0.9, 1.0, 1.2, 16);
      const hood = new THREE.Mesh(hoodGeo, glossyPaint);
      hood.position.set(1.4, 0.95, 0);
      hood.rotation.z = Math.PI / 2;
      hood.scale.set(0.4, 1.0, 0.9);
      group.add(hood);

      // 2. Glass Canopy / Cabin
      const cabinGeo = new THREE.BoxGeometry(2.3, 0.75, 1.6);
      const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
      cabin.position.set(-0.25, 1.45, 0);
      group.add(cabin);

      // Roof Cover
      const roofGeo = new THREE.BoxGeometry(2.0, 0.08, 1.45);
      const roof = new THREE.Mesh(roofGeo, darkMetal);
      roof.position.set(-0.25, 1.84, 0);
      group.add(roof);

      // 3. Four Wheels
      const carTireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 24);
      const carRimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.34, 16);

      const wheelPositions = [
        [1.4, 0.42, 0.98],   // Front Right
        [1.4, 0.42, -0.98],  // Front Left
        [-1.4, 0.42, 0.98],  // Rear Right
        [-1.4, 0.42, -0.98], // Rear Left
      ];

      wheelPositions.forEach(([wx, wy, wz]) => {
        const wheelGroup = new THREE.Group();
        const tire = new THREE.Mesh(carTireGeo, rubberTire);
        const rim = new THREE.Mesh(carRimGeo, chromeMetal);
        tire.rotation.x = Math.PI / 2;
        rim.rotation.x = Math.PI / 2;
        wheelGroup.add(tire, rim);
        wheelGroup.position.set(wx, wy, wz);
        group.add(wheelGroup);
      });

      // 4. Front Signature LED Lightbar
      const lightbarGeo = new THREE.BoxGeometry(0.08, 0.12, 1.75);
      const lightbar = new THREE.Mesh(lightbarGeo, glowingLed);
      lightbar.position.set(2.21, 0.85, 0);
      group.add(lightbar);

      // 5. Rear Full-Width Taillight
      const rearLightGeo = new THREE.BoxGeometry(0.08, 0.1, 1.8);
      const rearLight = new THREE.Mesh(rearLightGeo, redLed);
      rearLight.position.set(-2.21, 0.9, 0);
      group.add(rearLight);

      // 6. Aerodynamic Side Mirrors
      const mirrorGeo = new THREE.BoxGeometry(0.18, 0.1, 0.3);
      const mirrorR = new THREE.Mesh(mirrorGeo, darkMetal);
      const mirrorL = new THREE.Mesh(mirrorGeo, darkMetal);
      mirrorR.position.set(0.85, 1.35, 0.98);
      mirrorL.position.set(0.85, 1.35, -0.98);
      group.add(mirrorR, mirrorL);

      // Scale car slightly to fit viewport harmoniously
      group.scale.set(0.8, 0.8, 0.8);
    }

    // Ground Soft Shadow Plane
    const shadowGeo = new THREE.RingGeometry(0.2, cat === 'bike' ? 1.8 : 2.5, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    group.add(shadowMesh);

    return group;
  }, [wireframe]);

  // Setup Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.8, 2.3, 4.5);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with Alpha (Transparent Background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const bottomGlow = new THREE.DirectionalLight(0x6366f1, 0.6);
    bottomGlow.position.set(0, -3, 0);
    scene.add(bottomGlow);

    // 5. Build and attach Vehicle
    const vehicleModel = buildVehicle3DModel(
      vehicle?.category || 'bike',
      vehicle?.type,
      vehicle?.brand
    );
    vehicleGroupRef.current = vehicleModel;
    scene.add(vehicleModel);

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (vehicleGroupRef.current) {
        // Auto-rotation when not interacting
        if (isAutoRotating && !isDraggingRef.current) {
          targetRotationYRef.current += 0.008;
        }

        // Apply smooth damping / inertia
        vehicleGroupRef.current.rotation.y += (targetRotationYRef.current - vehicleGroupRef.current.rotation.y) * 0.1;
        vehicleGroupRef.current.rotation.x += (targetRotationXRef.current - vehicleGroupRef.current.rotation.x) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (renderer) renderer.dispose();
    };
  }, [vehicle, buildVehicle3DModel, isAutoRotating]);

  // Touch & Mouse Drag Handlers for 360° Orbiting
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const currentY = e.clientY || e.touches?.[0]?.clientY || 0;

    const deltaX = currentX - previousMousePositionRef.current.x;
    const deltaY = currentY - previousMousePositionRef.current.y;

    targetRotationYRef.current += deltaX * 0.012;
    targetRotationXRef.current = Math.max(
      -0.2,
      Math.min(0.6, targetRotationXRef.current + deltaY * 0.008)
    );

    previousMousePositionRef.current = { x: currentX, y: currentY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Quick Angle Presets
  const setPresetAngle = (preset) => {
    setActiveAngle(preset);
    setIsAutoRotating(false);
    if (!vehicleGroupRef.current) return;

    switch (preset) {
      case '3/4':
        targetRotationYRef.current = 0.6;
        targetRotationXRef.current = 0.2;
        break;
      case 'front':
        targetRotationYRef.current = Math.PI / 2;
        targetRotationXRef.current = 0.1;
        break;
      case 'side':
        targetRotationYRef.current = 0;
        targetRotationXRef.current = 0.05;
        break;
      case 'rear':
        targetRotationYRef.current = -Math.PI / 2;
        targetRotationXRef.current = 0.1;
        break;
      case 'top':
        targetRotationYRef.current = 0.6;
        targetRotationXRef.current = 0.6;
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`relative select-none overflow-hidden rounded-2xl flex flex-col justify-between ${className} ${
        isFullscreen ? 'fixed inset-4 z-50 bg-slate-900/95 shadow-2xl border border-indigo-500/30 backdrop-blur-xl' : ''
      }`}
      style={{ height: isFullscreen ? 'calc(100vh - 32px)' : height }}
    >
      {/* 360° Drag Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 dark:bg-black/60 backdrop-blur-md text-white text-[11px] font-bold tracking-wider shadow-sm border border-slate-700/50">
          <RotateCw className={`w-3 h-3 text-indigo-400 ${isAutoRotating ? 'animate-spin' : ''}`} />
          360° 3D Model
        </span>
        <span className="hidden sm:inline-block text-[10px] text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 px-2 py-0.5 rounded backdrop-blur-sm">
          Drag to inspect
        </span>
      </div>

      {/* Top Right Fullscreen & Wireframe Controls */}
      {showControls && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all border ${
              wireframe
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
            }`}
            title="Toggle Wireframe CAD Mode"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-xs font-semibold bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Expand 3D View"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      {showControls && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900/80 dark:bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-slate-700/60 shadow-lg z-10">
          {/* Play / Pause Auto-Rotate */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-1.5 rounded-full transition-all ${
              isAutoRotating
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title={isAutoRotating ? "Pause Turntable" : "Start Auto-Rotate"}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="w-px h-4 bg-slate-700 mx-0.5" />

          {/* Preset Camera Angles */}
          {[
            { id: '3/4', label: '3/4 View' },
            { id: 'side', label: 'Side' },
            { id: 'front', label: 'Front' },
            { id: 'rear', label: 'Rear' },
            { id: 'top', label: 'Top' }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setPresetAngle(preset.id)}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all ${
                activeAngle === preset.id && !isAutoRotating
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
