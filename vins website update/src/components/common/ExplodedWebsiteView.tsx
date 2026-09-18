import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, RotateCcw, Eye, ArrowRight, Sparkles, Building, GraduationCap, 
  Award, Shield, Phone, Mail, ChevronRight, CheckCircle2, Compass, Maximize2
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface ExplodedWebsiteViewProps {
  onClose: () => void;
  onNavigateSection: (tab: NavigationTab, anchorId?: string) => void;
}

export const ExplodedWebsiteView: React.FC<ExplodedWebsiteViewProps> = ({
  onClose,
  onNavigateSection,
}) => {
  // Explosion separation depth (0 = Flat, 100 = Maximum 3D separation)
  const [explosionDepth, setExplosionDepth] = useState<number>(65);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // 3D rotation angles
  const [rotX, setRotX] = useState<number>(22);
  const [rotY, setRotY] = useState<number>(-18);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRot = useRef<{ x: number; y: number }>({ x: 22, y: -18 });
  const autoRotateTimer = useRef<number | null>(null);

  // Auto rotation effect when idle
  useEffect(() => {
    if (!autoRotate) return;
    let angle = 0;
    const interval = window.setInterval(() => {
      angle += 0.008;
      setRotY(-18 + Math.sin(angle) * 12);
      setRotX(20 + Math.cos(angle) * 6);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Pointer drag for manual 3D orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    setAutoRotate(false);
    isDragging.current = true;
    startMousePos.current = { x: e.clientX, y: e.clientY };
    startRot.current = { x: rotX, y: rotY };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startMousePos.current.x;
    const dy = e.clientY - startMousePos.current.y;
    setRotY(startRot.current.y + dx * 0.35);
    setRotX(Math.max(-45, Math.min(60, startRot.current.x - dy * 0.35)));
  }, [rotX, rotY]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Touch drag for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setAutoRotate(false);
      isDragging.current = true;
      startMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startRot.current = { x: rotX, y: rotY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startMousePos.current.x;
    const dy = e.touches[0].clientY - startMousePos.current.y;
    setRotY(startRot.current.y + dx * 0.4);
    setRotX(Math.max(-45, Math.min(60, startRot.current.x - dy * 0.4)));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const resetView = () => {
    setRotX(22);
    setRotY(-18);
    setExplosionDepth(65);
    setAutoRotate(true);
  };

  // Layers definition for VINS Website Architecture
  const layers = [
    {
      id: 'layer-topbar',
      title: 'Top Utility & Emergency Contact Bar',
      badge: 'LAYER 01',
      tag: 'Helpline & TNEA Code 4983',
      color: '#0A2540',
      accentColor: '#8B0000',
      zMultiplier: 3.2,
      tab: 'contact' as NavigationTab,
      content: (
        <div className="p-3.5 sm:p-4 bg-[#0A2540] text-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> TNEA Code: 4983
            </span>
            <span className="hidden sm:inline text-slate-300 text-[11px] font-medium">
              Chunkankadai, Nagercoil, Kanyakumari
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Phone className="w-3 h-3" /> +91 94437 94440
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3 h-3" /> vinschristianengg@gmail.com
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'layer-navbar',
      title: 'Glassmorphic Sticky Navigation Header',
      badge: 'LAYER 02',
      tag: 'Institutional Identity & Nav Links',
      color: '#FFFFFF',
      accentColor: '#0A2540',
      zMultiplier: 2.2,
      tab: 'home' as NavigationTab,
      content: (
        <div className="p-4 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between text-[#0A2540] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0A2540] text-amber-400 font-cinzel font-black flex items-center justify-center text-sm shadow">
              VINS
            </div>
            <div>
              <h4 className="font-playfair font-black text-sm text-[#0A2540] leading-tight">
                VINS Christian College of Engineering
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
                Approved by AICTE · Affiliated to Anna University, Chennai
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-[#0A2540]">
            <span className="text-[#8B0000] border-b-2 border-[#8B0000] pb-0.5">Home</span>
            <span className="hover:text-[#8B0000]">About</span>
            <span className="hover:text-[#8B0000]">Admissions</span>
            <span className="hover:text-[#8B0000]">Departments</span>
            <span className="hover:text-[#8B0000]">Placements</span>
            <span className="hover:text-[#8B0000]">NAAC</span>
          </div>
        </div>
      )
    },
    {
      id: 'layer-hero',
      title: 'Hero Banner, 3D Parallax & Counseling Hub',
      badge: 'LAYER 03',
      tag: 'Prime Value Proposition & Admissions 2026',
      color: '#0A2540',
      accentColor: '#8B0000',
      zMultiplier: 1.2,
      tab: 'admissions' as NavigationTab,
      content: (
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0A2540] via-[#0F365E] to-[#0A2540] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#8B0000]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> 20+ Years of Academic Brilliance
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-playfair leading-snug">
              Shape Your Engineering Future at VINS Christian College
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed">
              Anna University Affiliated · State-of-the-art Labs · 90%+ Consistent Campus Placements · 15-Acre Lush Green Campus
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#8B0000] text-white text-xs font-bold shadow-md">
                Apply for UG/PG 2026
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold">
                TNEA Counseling Code 4983
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'layer-departments',
      title: 'Engineering Departments & Innovation Hubs',
      badge: 'LAYER 04',
      tag: 'B.E., M.E., MBA Academic Architecture',
      color: '#FFFFFF',
      accentColor: '#0A2540',
      zMultiplier: 0.2,
      tab: 'department' as NavigationTab,
      content: (
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 text-[#0A2540]">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8B0000]">Departments</span>
              <h3 className="font-playfair font-bold text-base text-[#0A2540]">Undergraduate &amp; Postgraduate Programs</h3>
            </div>
            <span className="text-xs font-bold text-slate-500">6 Core Disciplines</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left">
            {[
              { code: 'CSE', name: 'Computer Science & Engg', seats: '120 Seats' },
              { code: 'AI&DS', name: 'Artificial Intelligence & Data', seats: '60 Seats' },
              { code: 'ECE', name: 'Electronics & Comm.', seats: '60 Seats' },
              { code: 'MECH', name: 'Mechanical Engineering', seats: '60 Seats' },
              { code: 'CIVIL', name: 'Civil Engineering', seats: '60 Seats' },
              { code: 'MBA', name: 'Master of Business Admin', seats: '60 Seats' },
            ].map((dept, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-xs font-black text-[#8B0000]">{dept.code}</span>
                <p className="text-[11px] font-bold text-[#0A2540] truncate">{dept.name}</p>
                <span className="text-[9px] text-slate-500 font-semibold">{dept.seats}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'layer-campus',
      title: 'Campus Life, Labs & Student Facilities',
      badge: 'LAYER 05',
      tag: 'Hostel, Library, Auditorium & Sports',
      color: '#FFFFFF',
      accentColor: '#10B981',
      zMultiplier: -0.8,
      tab: 'campus' as NavigationTab,
      content: (
        <div className="p-5 sm:p-6 bg-white border-t border-slate-200 text-[#0A2540]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Infrastructure</span>
            <span className="text-xs text-slate-500 font-bold">15-Acre Smart Campus</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0A2540]">
              <Building className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              1500-Seat AC Auditorium
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0A2540]">
              <GraduationCap className="w-4 h-4 mx-auto mb-1 text-sky-600" />
              Digital Library &amp; Delnet
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0A2540]">
              <Shield className="w-4 h-4 mx-auto mb-1 text-amber-600" />
              Safe Hostels &amp; Fleet Buses
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0A2540]">
              <Sparkles className="w-4 h-4 mx-auto mb-1 text-rose-600" />
              NSS, YRC &amp; Cultural Fests
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'layer-footer',
      title: 'Statutory Compliance & Accreditation Footer',
      badge: 'LAYER 06',
      tag: 'NAAC, AICTE Approvals, Anti-Ragging & Map',
      color: '#0A2540',
      accentColor: '#F59E0B',
      zMultiplier: -1.8,
      tab: 'naac' as NavigationTab,
      content: (
        <div className="p-5 bg-[#0A2540] text-white border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-amber-300">VINS Christian College of Engineering</p>
            <p className="text-[11px] text-slate-400">© 2026 All Rights Reserved · Accredited Campus</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span>NAAC SSR</span>
            <span>·</span>
            <span>Mandatory Disclosure</span>
            <span>·</span>
            <span>AICTE Approval</span>
            <span>·</span>
            <span>Anti-Ragging</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#071321] text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Background Ambience & Starfield Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#8B0000 1px, transparent 1px), radial-gradient(#38BDF8 1px, #071321 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Interactive Controls HUD */}
      <header className="relative z-50 bg-[#0A2540]/90 backdrop-blur-xl border-b border-white/15 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B0000] to-amber-400 flex items-center justify-center text-white shadow-md">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black font-playfair tracking-wide text-white">
                3D Exploded View Architecture
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold tracking-wider uppercase border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live 3D
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
              Interactive Layered Breakdown of VINS Christian College Website · Route: <code className="text-amber-300 font-mono">/exlodview</code>
            </p>
          </div>
        </div>

        {/* Sliders & Toggles */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Explosion Separation Slider */}
          <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider hidden sm:inline">
              3D Separation:
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={explosionDepth}
              onChange={(e) => setExplosionDepth(Number(e.target.value))}
              className="w-24 sm:w-32 accent-[#8B0000] cursor-pointer"
              title="Adjust 3D Explosion Spacing"
            />
            <span className="text-xs font-mono font-bold text-white w-8 text-right">
              {explosionDepth}%
            </span>
          </div>

          {/* Auto-Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              autoRotate 
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300' 
                : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">{autoRotate ? 'Orbit On' : 'Orbit Off'}</span>
          </button>

          {/* Reset View Button */}
          <button
            onClick={resetView}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset 3D Angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Return to Standard Website Button */}
          <button
            onClick={onClose}
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#8B0000] to-amber-500 hover:brightness-110 text-white shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Live Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main 3D Canvas Stage */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden perspective-[1400px]"
        style={{ perspective: '1400px' }}
      >
        {/* Helper Orbit Hint */}
        <div className="absolute top-4 left-6 z-20 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
          <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Click &amp; Drag anywhere to rotate in 3D · Hover layers to inspect</span>
        </div>

        {/* 3D Transform Object World */}
        <div
          className="relative transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            width: 'min(92vw, 840px)',
            height: '480px',
          }}
        >
          {layers.map((layer, index) => {
            const zDistance = (layer.zMultiplier * (explosionDepth * 1.5));
            const isActive = activeLayerIndex === index;

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayerIndex(index)}
                onMouseLeave={() => setActiveLayerIndex(null)}
                onClick={() => {
                  onNavigateSection(layer.tab);
                  onClose();
                }}
                className="absolute left-0 right-0 rounded-2xl shadow-2xl transition-all duration-300 group cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${zDistance}px) scale(${isActive ? 1.04 : 1})`,
                  zIndex: 10 + index,
                  boxShadow: isActive
                    ? '0 25px 60px -15px rgba(139, 0, 0,0.45), 0 0 30px 2px rgba(251,191,36,0.35)'
                    : '0 20px 40px -10px rgba(0,0,0,0.7)',
                }}
              >
                {/* Floating Architectural Tag Tagged in 3D Space */}
                <div 
                  className={`absolute -top-3 left-4 z-30 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 border shadow-lg transition-all ${
                    isActive 
                      ? 'bg-[#8B0000] text-white border-amber-300 scale-105' 
                      : 'bg-[#0A2540] text-amber-300 border-white/20'
                  }`}
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <span>{layer.badge}</span>
                  <span className="text-white/60">|</span>
                  <span className="text-white">{layer.title}</span>
                  <ChevronRight className="w-3 h-3 text-amber-300" />
                </div>

                {/* Layer Actual Rendered Surface */}
                <div 
                  className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isActive ? 'border-[#8B0000] ring-4 ring-[#8B0000]/30' : 'border-white/30 group-hover:border-amber-400/80'
                  }`}
                >
                  {layer.content}
                </div>

                {/* Layer Base Glass Depth Floor */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
                  style={{ transform: 'translateZ(-4px)' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Information Footer Bar */}
      <footer className="relative z-50 bg-[#0A2540]/90 backdrop-blur-xl border-t border-white/15 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-bold text-amber-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> VINS Web Engine 2026
          </span>
          <span className="hidden md:inline text-slate-400">
            Rendered with 3D Hardware Accelerated CSS Matrix Transformation
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Click any layer to jump to that section directly</span>
          <button
            onClick={onClose}
            className="text-[11px] font-bold text-amber-300 hover:text-white underline ml-2 cursor-pointer"
          >
            Close &amp; Return
          </button>
        </div>
      </footer>
    </div>
  );
};
