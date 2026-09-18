import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, ArrowRight, Play 
} from 'lucide-react';
import { FloatingElement } from './FloatingElement';

interface Vins3DExplodedHeroTextProps {
  heroMouse: { x: number; y: number };
  onNavigateAdmissions: () => void;
  onOpenVideo: () => void;
  onOpenExplodedView?: () => void;
  tneaCode?: string;
}

export const Vins3DExplodedHeroText: React.FC<Vins3DExplodedHeroTextProps> = ({
  heroMouse,
  onNavigateAdmissions,
  onOpenVideo,
  onOpenExplodedView,
  tneaCode = '4982',
}) => {



  const handleOpenExploded = () => {
    if (onOpenExplodedView) {
      onOpenExplodedView();
    } else {
      window.location.hash = 'exlodview';
    }
  };

  return (
    <div
      id="vins-exploded-hero"
      className="relative w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col items-center text-center select-none"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >


      {/* College Crest Emblem with Smooth 3D Floating Motion */}
      <motion.div
        animate={{
          x: heroMouse.x * 12,
          y: heroMouse.y * 10,
          rotateX: heroMouse.y * -8,
          rotateY: heroMouse.x * 10,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="mb-2 sm:mb-3 z-20"
      >
        <FloatingElement duration={6} distance={5} floatType="gentle">
          <div
            onClick={handleOpenExploded}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-black/40 backdrop-blur-md border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group"
            style={{ transform: 'translateZ(25px)' }}
            title="VINS Christian College Crest"
          >
            <img
              src="/images/logo/vins logooo.jpg"
              alt="VINS College Crest"
              className="w-full h-full object-contain rounded-xl drop-shadow-md group-hover:rotate-3 transition-transform"
            />
          </div>
        </FloatingElement>
      </motion.div>

      {/* Welcome Tagline Badge */}
      <motion.div
        animate={{
          x: heroMouse.x * 10,
          y: heroMouse.y * 8,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="mb-1 sm:mb-2 z-20"
      >
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-black tracking-[0.24em] uppercase text-amber-300 shadow-sm"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>WELCOME TO</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </span>
      </motion.div>

      {/* ========================================================================= */}
      {/* VINS HERO TYPOGRAPHY — Clean, Normal, Non-3D                             */}
      {/* ========================================================================= */}
      <div 
        className="relative my-2 sm:my-3 py-2 w-full flex items-center justify-center cursor-pointer group"
        onClick={handleOpenExploded}
        title="VINS Christian College of Engineering"
      >
        <h1
          className="select-none font-black font-playfair tracking-normal transition-opacity duration-300 group-hover:opacity-90"
          style={{
            fontSize: 'clamp(4.5rem, 16vw, 9.8rem)',
            lineHeight: 0.9,
            color: '#F5D78E',
            textShadow: '0 2px 18px rgba(0,0,0,0.55)',
          }}
        >
          VINS
        </h1>
      </div>

      {/* College Full Subtitle & Accreditation */}
      <motion.div
        animate={{
          x: heroMouse.x * 14,
          y: heroMouse.y * 10,
        }}
        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
        className="mt-5 sm:mt-6 space-y-2 max-w-2xl z-20"
      >
        <h2
          className="font-black font-playfair tracking-tight text-white uppercase text-xl sm:text-2xl lg:text-3xl leading-snug"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.7)',
          }}
        >
          Christian College of Engineering
        </h2>

        {/* Elegant Gold Divider Line */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-[1.5px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-amber-400" />
          <div className="w-2 h-2 rotate-45 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
          <div className="h-[1.5px] flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Counselling Code & Location */}
        <p
          className="font-extrabold tracking-[0.16em] uppercase font-cinzel text-xs sm:text-sm text-amber-300"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
        >
          NAGERCOIL, TAMIL NADU · ANNA UNIVERSITY COUNSELLING CODE: <span className="underline decoration-amber-400 font-black text-white">{tneaCode}</span>
        </p>

        <p
          className="font-medium text-xs sm:text-[13px] text-slate-100 max-w-xl mx-auto leading-relaxed px-2"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
        >
          Empowering future engineers with advanced robotic labs, AI innovation centers, state-of-the-art research facilities, and premier global campus placements.
        </p>
      </motion.div>

      {/* CTA Action Buttons */}
      <motion.div
        animate={{
          x: heroMouse.x * 10,
          y: heroMouse.y * 8,
        }}
        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full z-20"
      >
        <button
          onClick={onNavigateAdmissions}
          className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(255,107,0,0.45)] transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 50%, #C2410C 100%)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
          }}
        >
          <span className="relative z-10 font-black">EXPLORE WITH US</span>
          <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>



        <button
          onClick={onOpenVideo}
          className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-black/40 hover:bg-black/60 border border-white/30 hover:border-white shadow-md backdrop-blur-md transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
        >
          <span className="w-4 h-4 rounded-full flex items-center justify-center bg-white/20 group-hover:bg-white/30 border border-white/50 transition-colors">
            <Play className="w-2 h-2 fill-white text-white ml-0.5" />
          </span>
          <span>WATCH TOUR</span>
        </button>
      </motion.div>

      {/* Floating Highlight Stat Badges */}
      <motion.div
        animate={{
          x: heroMouse.x * 8,
          y: heroMouse.y * 6,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="mt-6 sm:mt-7 pt-4 border-t border-white/15 w-full max-w-2xl grid grid-cols-3 gap-2 sm:gap-4 text-center z-20"
      >
        <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
          <p className="font-black text-amber-400 text-sm sm:text-lg">96%+</p>
          <p className="text-[10px] sm:text-xs text-white/90 font-semibold uppercase tracking-wider">Placement Record</p>
        </div>
        <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
          <p className="font-black text-white text-sm sm:text-lg">{tneaCode}</p>
          <p className="text-[10px] sm:text-xs text-amber-300 font-semibold uppercase tracking-wider">Counselling Code</p>
        </div>
        <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
          <p className="font-black text-amber-400 text-sm sm:text-lg">20+ Yrs</p>
          <p className="text-[10px] sm:text-xs text-white/90 font-semibold uppercase tracking-wider">Academic Legacy</p>
        </div>
      </motion.div>
    </div>
  );
};
