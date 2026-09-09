import { useState, useRef } from 'react';
import {
  ZoomIn, ZoomOut, Maximize2, Minimize2,
  RefreshCw, MoveHorizontal
} from 'lucide-react';

export default function Vehicle360Viewer({
  vehicle,
  height = "340px",
  className = ""
}) {
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360
  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 1.8
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);
  const containerRef = useRef(null);

  // Mouse / Touch handlers for dragging to rotate
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const newAngle = (currentAngleRef.current + Math.round(deltaX * 0.8)) % 360;
    setRotationAngle((newAngle + 360) % 360);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      currentAngleRef.current = rotationAngle;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newAngle = (currentAngleRef.current + Math.round(deltaX * 0.8)) % 360;
    setRotationAngle((newAngle + 360) % 360);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    setRotationAngle(0);
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Perspective calculations for the 360 turntable effect
  // We use scaleX reflection and slight skew/translate to simulate a rotating studio turntable
  const rad = (rotationAngle * Math.PI) / 180;
  const perspectiveScaleX = Math.cos(rad);
  const isRearAngle = rotationAngle > 90 && rotationAngle < 270;
  const shadowScale = 0.8 + 0.2 * Math.abs(perspectiveScaleX);

  return (
    <div
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800 select-none flex flex-col justify-between ${className}`}
      style={{ height }}
    >
      {/* Top Controls Strip */}
      <div className="flex items-center justify-between p-3.5 z-20 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            360° Studio Turntable
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Angle: {rotationAngle}°
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset View"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Turntable Canvas Stage */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden p-6"
      >
        {/* Radial Studio Light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.12)_0%,_rgba(15,23,42,0)_70%)] pointer-events-none" />

        {/* Studio Pedestal Disc */}
        <div
          className="absolute bottom-6 w-72 sm:w-96 h-12 rounded-full border border-cyan-500/30 bg-gradient-to-t from-cyan-950/20 to-slate-900/60 shadow-[0_0_30px_rgba(6,182,212,0.15)] pointer-events-none"
          style={{ transform: `scaleX(${shadowScale})` }}
        />

        {/* Vehicle Image with Turntable Simulated Transform */}
        <div
          className="relative transition-transform duration-75 flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel}) scaleX(${perspectiveScaleX >= 0 ? 1 : -1})`,
            filter: isRearAngle ? 'brightness(0.92)' : 'brightness(1)'
          }}
        >
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="max-h-52 sm:max-h-64 max-w-[90%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)] pointer-events-none transition-all"
          />
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 backdrop-blur-md pointer-events-none">
          <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Click & Drag or Touch to Rotate 360°</span>
        </div>
      </div>

      {/* Preset Viewpoints Strip */}
      <div className="p-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-center gap-2 z-20">
        {[
          { label: 'Front 3/4', angle: 45 },
          { label: 'Side Profile', angle: 90 },
          { label: 'Rear 3/4', angle: 135 },
          { label: 'Rear', angle: 180 },
          { label: 'Opposite Side', angle: 270 },
          { label: 'Front Face', angle: 0 }
        ].map((view) => (
          <button
            key={view.angle}
            onClick={() => setRotationAngle(view.angle)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              Math.abs(rotationAngle - view.angle) < 15
                ? 'bg-cyan-500 text-slate-950 font-black shadow-sm shadow-cyan-500/50'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}
