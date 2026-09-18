import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, Play, BookOpen, Cpu, Laptop, 
  Users, Layers, X, ChevronRight
} from 'lucide-react';
import { FloatingElement } from './FloatingElement';

interface ExplodedStudentLifeHeroProps {
  heroMouse: { x: number; y: number };
  onNavigateAdmissions: () => void;
  onOpenVideo: () => void;
  tneaCode?: string;
}

export const ExplodedStudentLifeHero: React.FC<ExplodedStudentLifeHeroProps> = ({
  heroMouse,
  onNavigateAdmissions,
  onOpenVideo,
  tneaCode = '4983',
}) => {
  const [isExploded, setIsExploded] = useState<boolean>(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [mobileDetailCard, setMobileDetailCard] = useState<any | null>(null);

  const leftStudentCards = [
    {
      id: 'student-tech-lab',
      title: 'AI & Coding Lab',
      subtitle: 'Hands-on Programming',
      tag: 'TECH STUDY',
      icon: <Laptop className="w-3 h-3 text-amber-300" />,
      image: '/images/course img/cse.jpg',
      fallbackImage: '/images/college events and news galeery/h11.jpg',
      description: 'Hands-on Python, AI neural networks & high-speed cloud programming labs.',
      stats: '500+ PCs',
      explodedX: -26,
      explodedY: -22,
      rotateZ: -3,
      rotateY: 15,
      depth: 35,
    },
    {
      id: 'student-group-collab',
      title: 'Group Study & Collab',
      subtitle: 'Project Brainstorming',
      tag: 'INNOVATION',
      icon: <Users className="w-3 h-3 text-sky-300" />,
      image: '/images/course img/aids.jpg',
      fallbackImage: '/images/college events and news galeery/h12.jpg',
      description: 'Student engineering teams collaborating on hackathons & capstone innovations.',
      stats: 'Team Projects',
      explodedX: -20,
      explodedY: 34,
      rotateZ: 2,
      rotateY: 12,
      depth: 25,
    }
  ];

  const rightStudentCards = [
    {
      id: 'student-robotics',
      title: 'Robotics & Hardware',
      subtitle: 'Embedded IoT & Circuits',
      tag: 'HARDWARE R&D',
      icon: <Cpu className="w-3 h-3 text-emerald-300" />,
      image: '/images/course img/ece.jpg',
      fallbackImage: '/images/college events and news galeery/h14.jpg',
      description: 'Microcontroller testing, autonomous robotics & smart IoT prototype research.',
      stats: 'IoT Lab',
      explodedX: 26,
      explodedY: -22,
      rotateZ: 3,
      rotateY: -15,
      depth: 35,
    },
    {
      id: 'student-library',
      title: 'Digital Library Study',
      subtitle: 'Delnet & IEEE Research',
      tag: 'SCHOLARSHIP',
      icon: <BookOpen className="w-3 h-3 text-amber-300" />,
      image: '/images/course img/mba.jpg',
      fallbackImage: '/images/college events and news galeery/h10.jpg',
      description: 'Quiet bays, university rank holder circles & 45,000+ technical volumes.',
      stats: '45K+ Books',
      explodedX: 20,
      explodedY: 34,
      rotateZ: -2,
      rotateY: -12,
      depth: 25,
    }
  ];

  const allCards = [...leftStudentCards, ...rightStudentCards];

  return (
    <div 
      id="vins-exploded-hero" 
      className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-4 preserve-3d"
      style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
    >
      {/* Compact Explode Toggle Chip */}
      <div className="flex justify-center mb-2 sm:mb-3">
        <button
          onClick={() => setIsExploded(!isExploded)}
          className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 border border-amber-400/40 backdrop-blur-md text-white text-[11px] font-bold shadow-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          title="Toggle 3D Exploded View"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <Layers className="w-3 h-3 text-amber-300" />
          <span className="text-amber-200">
            {isExploded ? '3D Exploded View' : 'Assembled View'}
          </span>
          <span className="text-[9px] uppercase tracking-wider bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-black border border-amber-400/30">
            {isExploded ? 'Exploded' : 'Compact'}
          </span>
        </button>
      </div>

      {/* Main Row: Left Compact Cards + Center VINS Hero + Right Compact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-3 xl:gap-4 relative preserve-3d">
        
        {/* ================= LEFT SIDE: COMPACT 3D EXPLODED STUDENT CARDS ================= */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-end relative preserve-3d z-20 pointer-events-auto">
          {leftStudentCards.map((card) => {
            const isHovered = activeCardId === card.id;
            const xOffset = isExploded ? card.explodedX : 0;
            const yOffset = isExploded ? card.explodedY : 0;
            const rotZ = isExploded ? card.rotateZ : 0;
            const rotY = isExploded ? card.rotateY : 0;
            const zDepth = isExploded ? (isHovered ? card.depth + 30 : card.depth) : 0;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setActiveCardId(card.id)}
                onMouseLeave={() => setActiveCardId(null)}
                animate={{
                  x: xOffset + (heroMouse.x * -12),
                  y: yOffset + (heroMouse.y * -10),
                  rotateY: rotY + (heroMouse.x * 5),
                  rotateZ: rotZ,
                  scale: isHovered ? 1.05 : (isExploded ? 1 : 0.96),
                  z: zDepth,
                }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-48 xl:w-54 rounded-xl p-2 bg-gradient-to-b from-white/20 via-white/10 to-black/70 backdrop-blur-md border border-white/30 hover:border-amber-400 shadow-xl hover:shadow-[0_12px_30px_rgba(255,107,0,0.35)] cursor-pointer transition-colors group"
              >
                {/* Header Tag */}
                <div 
                  className="flex items-center justify-between gap-1 mb-1.5 px-0.5"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-400/40">
                    {card.icon}
                    <span>{card.tag}</span>
                  </span>
                  <span className="text-[9px] font-bold text-slate-200 bg-white/10 px-1.5 py-0.5 rounded-full">
                    {card.stats}
                  </span>
                </div>

                {/* Photo */}
                <div 
                  className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/20 shadow-inner group-hover:scale-[1.02] transition-transform duration-300"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = card.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-1.5 text-left">
                    <p className="text-white text-[11px] font-black font-playfair leading-tight drop-shadow">
                      {card.title}
                    </p>
                    <p className="text-amber-200 text-[9px] font-medium leading-none drop-shadow">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Micro Description */}
                <p 
                  className="mt-1 px-0.5 text-[10px] text-slate-200 leading-snug line-clamp-1 text-left"
                  style={{ transform: 'translateZ(8px)' }}
                >
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ================= CENTER: COMPACT VINS HERO CORE ================= */}
        <div className="lg:col-span-6 w-full text-center flex flex-col items-center gap-3 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 rounded-2xl sm:rounded-3xl bg-black/30 backdrop-blur-md border border-white/20 shadow-xl relative z-10 preserve-3d">
          
          {/* Crest Logo */}
          <div 
            className="flex justify-center transition-transform duration-500 ease-out preserve-3d"
            style={{
              transform: `perspective(1000px) translate3d(${heroMouse.x * 16}px, ${heroMouse.y * 14}px, 25px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <FloatingElement duration={6.5} distance={5} floatType="gentle">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1.5 sm:p-2 flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                }}
              >
                <img
                  src="/images/logo/vins logooo.jpg"
                  alt="VINS College Crest"
                  className="w-full h-full object-contain rounded-lg filter drop-shadow-md"
                />
              </div>
            </FloatingElement>
          </div>

          {/* VINS Headings */}
          <div 
            className="space-y-2 sm:space-y-2.5 transition-transform duration-500 ease-out w-full"
            style={{
              transform: `translate3d(${heroMouse.x * 20}px, ${heroMouse.y * 16}px, 35px)`,
            }}
          >
            <span
              className="text-[9px] sm:text-xs font-extrabold tracking-[0.26em] uppercase font-cinzel block text-white/95"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
            >
              WELCOME TO
            </span>

            <h1
              className="font-extrabold font-playfair leading-[1.1] tracking-tight"
              style={{
                fontSize: 'clamp(1.75rem, 4.2vw, 3.25rem)',
                color: '#ffffff',
                textShadow: '0 3px 20px rgba(0,0,0,0.9), 0 0px 40px rgba(0,0,0,0.7)',
              }}
            >
              VINS Christian College
            </h1>

            {/* Divider Accent */}
            <div className="flex items-center justify-center gap-2.5 py-0.5">
              <div className="h-px flex-1 max-w-[50px] bg-gradient-to-r from-transparent to-amber-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
              <div className="h-px flex-1 max-w-[50px] bg-gradient-to-l from-transparent to-amber-300" />
            </div>

            <p
              className="font-bold tracking-[0.14em] uppercase font-cinzel leading-tight text-[11px] sm:text-xs text-[#fde047]"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
            >
              OF ENGINEERING · NAGERCOIL · ANNA UNIVERSITY CODE: {tneaCode}
            </p>

            <p
              className="font-medium max-w-lg mx-auto leading-relaxed text-[11px] sm:text-xs text-[#fdfbf7] px-2"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
            >
              Empowering engineers through hands-on technical labs, world-class digital libraries, and collaborative research innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full pt-1.5">
              <button
                onClick={onNavigateAdmissions}
                className="btn-valer-green btn-micro text-xs uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 shadow-md hover:scale-105 active:scale-95 cursor-pointer font-extrabold w-full sm:w-auto justify-center inline-flex items-center gap-1.5"
              >
                <span>EXPLORE WITH US</span>
                <ArrowRight className="w-3.5 h-3.5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenVideo}
                className="btn-hero-outline btn-micro text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 shadow-md active:scale-95 cursor-pointer hover:border-white hover:bg-white/15 font-extrabold w-full sm:w-auto justify-center inline-flex items-center gap-1.5 border border-white/60 bg-black/30 text-white"
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-white/20 border border-white/50">
                  <Play className="w-2 h-2 fill-current ml-0.5 text-white" />
                </span>
                <span>WATCH TOUR</span>
              </button>
            </div>
          </div>

          {/* ================= MOBILE VIEW: SLEEK COMPACT STUDENT CHIPS STRIP ================= */}
          <div className="lg:hidden w-full pt-2 mt-1 border-t border-white/10">
            <div className="flex items-center justify-center gap-1.5 mb-2 text-[10px] font-black uppercase tracking-wider text-amber-300 font-poppins">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Student Study Highlights</span>
            </div>

            {/* 4 Mini Compact Student Study Pills - Clean, Attractive, Fits Mobile perfectly */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {allCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setMobileDetailCard(card)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 active:border-amber-400 transition-all text-left cursor-pointer group"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-9 h-9 rounded-lg object-cover border border-amber-400/50 shrink-0 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = card.fallbackImage;
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-white truncate leading-tight group-hover:text-amber-300">
                      {card.title}
                    </p>
                    <span className="text-[9px] text-amber-200/80 font-semibold block truncate">
                      {card.stats}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: COMPACT 3D EXPLODED STUDENT CARDS ================= */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-start relative preserve-3d z-20 pointer-events-auto">
          {rightStudentCards.map((card) => {
            const isHovered = activeCardId === card.id;
            const xOffset = isExploded ? card.explodedX : 0;
            const yOffset = isExploded ? card.explodedY : 0;
            const rotZ = isExploded ? card.rotateZ : 0;
            const rotY = isExploded ? card.rotateY : 0;
            const zDepth = isExploded ? (isHovered ? card.depth + 30 : card.depth) : 0;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setActiveCardId(card.id)}
                onMouseLeave={() => setActiveCardId(null)}
                animate={{
                  x: xOffset + (heroMouse.x * 12),
                  y: yOffset + (heroMouse.y * -10),
                  rotateY: rotY + (heroMouse.x * 5),
                  rotateZ: rotZ,
                  scale: isHovered ? 1.05 : (isExploded ? 1 : 0.96),
                  z: zDepth,
                }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-48 xl:w-54 rounded-xl p-2 bg-gradient-to-b from-white/20 via-white/10 to-black/70 backdrop-blur-md border border-white/30 hover:border-amber-400 shadow-xl hover:shadow-[0_12px_30px_rgba(255,107,0,0.35)] cursor-pointer transition-colors group"
              >
                {/* Header Tag */}
                <div 
                  className="flex items-center justify-between gap-1 mb-1.5 px-0.5"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-400/40">
                    {card.icon}
                    <span>{card.tag}</span>
                  </span>
                  <span className="text-[9px] font-bold text-slate-200 bg-white/10 px-1.5 py-0.5 rounded-full">
                    {card.stats}
                  </span>
                </div>

                {/* Photo */}
                <div 
                  className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/20 shadow-inner group-hover:scale-[1.02] transition-transform duration-300"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = card.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-1.5 text-left">
                    <p className="text-white text-[11px] font-black font-playfair leading-tight drop-shadow">
                      {card.title}
                    </p>
                    <p className="text-amber-200 text-[9px] font-medium leading-none drop-shadow">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Micro Description */}
                <p 
                  className="mt-1 px-0.5 text-[10px] text-slate-200 leading-snug line-clamp-1 text-left"
                  style={{ transform: 'translateZ(8px)' }}
                >
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Optional Mobile Detail Modal on Tap */}
      <AnimatePresence>
        {mobileDetailCard && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0A2540] border border-amber-400/50 rounded-2xl p-4 max-w-xs w-full text-white shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-300 flex items-center gap-1">
                  {mobileDetailCard.icon}
                  {mobileDetailCard.tag}
                </span>
                <button
                  onClick={() => setMobileDetailCard(null)}
                  className="p-1 rounded-full text-white/70 hover:text-white bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden border border-white/20">
                <img
                  src={mobileDetailCard.image}
                  alt={mobileDetailCard.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = mobileDetailCard.fallbackImage;
                  }}
                />
              </div>

              <div>
                <h4 className="font-playfair font-black text-sm text-white">
                  {mobileDetailCard.title}
                </h4>
                <p className="text-xs text-amber-200 font-semibold">
                  {mobileDetailCard.subtitle} · {mobileDetailCard.stats}
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {mobileDetailCard.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
