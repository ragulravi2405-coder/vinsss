import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Play, Award, Users, GraduationCap, 
  Trophy, BookOpen, UserCheck, Cpu, Briefcase, FlaskConical, Bus, PartyPopper, 
  Calendar, CheckCircle2, Sparkles, ShieldCheck, HeartHandshake, Globe, Shield,
  Building, Star, Quote, Eye, Image as ImageIcon, MapPin, Clock, Share2,
  Bell, FileText, Download, Megaphone, Video, ExternalLink, Layers
} from 'lucide-react';
import { COLLEGE_INFO, STATS_COUNTERS, HERO_SLIDES, NEWS_EVENTS, GALLERY_IMAGES } from '../data/collegeData';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { NOTIFICATIONS_DATA } from '../data/notificationsData';
import { NavigationTab, DocumentItem } from '../types';
import { RunningTickerBar } from '../components/common/RunningTickerBar';

import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { useAdminData } from '../context/AdminDataContext';
import { TiltCard } from '../components/common/TiltCard';
import { FloatingElement } from '../components/common/FloatingElement';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { EventNotificationPopup } from '../components/common/EventNotificationPopup';
import { FloatingEventsButton } from '../components/common/FloatingEventsButton';

interface HeroBgSlide {
  id: string;
  webp: string;
  fallback: string;
  alt: string;
}

// Dedicated Desktop / Window Background Slides (min-width: 768px)
const DESKTOP_HERO_BG_SLIDES: HeroBgSlide[] = [
  {
    id: 'desk-bg-1',
    webp: '/images/clg%20photo/vins_colleg_bg_windows.webp',
    fallback: '/images/clg%20photo/vins%20colleg%20bg%20windows%20%20img.png',
    alt: 'VINS Christian College Campus - Main Campus Panorama'
  },
  {
    id: 'desk-bg-2',
    webp: '/images/clg%20photo/bg7_window_view.webp',
    fallback: '/images/clg%20photo/bg7%20window%20view.png',
    alt: 'VINS Christian College Campus - Academic Complex Panorama'
  },
  {
    id: 'desk-bg-3',
    webp: '/images/clg%20photo/wind_view.webp',
    fallback: '/images/clg%20photo/wind%20view.png',
    alt: 'VINS Christian College Campus - Architectural Panorama'
  },
  {
    id: 'desk-bg-4',
    webp: '/images/clg%20photo/window_view.webp',
    fallback: '/images/clg%20photo/window%20view.png',
    alt: 'VINS Christian College Campus - Aerial Landscape'
  }
];

// Dedicated Mobile / Portrait Background Slides (max-width: 767px)
const MOBILE_HERO_BG_SLIDES: HeroBgSlide[] = [
  {
    id: 'mob-bg-1',
    webp: '/images/clg%20photo/vins_clg_bg_mobile_view.webp',
    fallback: '/images/clg%20photo/vins%20clg%20bg%20mobile%20view%20img.png',
    alt: 'VINS Christian College Campus - Mobile Portrait View'
  },
  {
    id: 'mob-bg-2',
    webp: '/images/clg%20photo/bg8_mobile_view.webp',
    fallback: '/images/clg%20photo/bg8%20mobile%20view.png',
    alt: 'VINS Christian College Campus - Mobile Campus View'
  },
  {
    id: 'mob-bg-3',
    webp: '/images/clg%20photo/mobile_view_sp.webp',
    fallback: '/images/clg%20photo/mobile%20view%20sp.png',
    alt: 'VINS Christian College Campus - Mobile Campus Panorama'
  },
  {
    id: 'mob-bg-4',
    webp: '/images/clg%20photo/mobile_viww.webp',
    fallback: '/images/clg%20photo/mobile%20viww.png',
    alt: 'VINS Christian College Campus - Campus View'
  }
];

interface HomePageProps {
  onTabChange: (tab: NavigationTab, anchorId?: string, departmentId?: string) => void;
  onOpenExplodedView?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onTabChange, onOpenExplodedView }) => {
  const { heroSlides, galleryImages, events, departments, notifications, siteTheme } = useAdminData();
  const activeSlides = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_SLIDES;
  const activeGallery = galleryImages && galleryImages.length > 0 ? galleryImages : GALLERY_IMAGES;
  const activeEvents = events && events.length > 0 ? events : NEWS_EVENTS;
  const activeDepartments = departments && departments.length > 0 ? departments : DEPARTMENTS_DATA;
  const activeNotifications = notifications && notifications.length > 0 ? notifications : NOTIFICATIONS_DATA;

  const [selectedEvent, setSelectedEvent] = useState<typeof NEWS_EVENTS[0] | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<DocumentItem | null>(null);
  const [marqueeHovered, setMarqueeHovered] = useState(false);

  // Responsive Viewport Detection (768px Breakpoint)
  // Ensures strictly desktop images on desktop, and strictly mobile images on mobile.
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };
    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  const activeBgSlides = isDesktop ? DESKTOP_HERO_BG_SLIDES : MOBILE_HERO_BG_SLIDES;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Single Hero Carousel Auto-advance Timer (6 seconds per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeBgSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeBgSlides.length]);

  // Preload next image in active collection for instant switching
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nextIdx = (currentSlideIndex + 1) % activeBgSlides.length;
    const nextImg = new Image();
    nextImg.src = activeBgSlides[nextIdx].webp;
  }, [currentSlideIndex, activeBgSlides]);

  // Hero Section 3D Parallax Tracking
  const heroRef = useRef<HTMLElement>(null);
  const heroRafId = useRef<number | null>(null);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || typeof window === 'undefined' || window.innerWidth < 768) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (heroRafId.current) cancelAnimationFrame(heroRafId.current);
    heroRafId.current = requestAnimationFrame(() => {
      setHeroMouse({ x: nx, y: ny });
    });
  }, []);

  const handleHeroMouseLeave = useCallback(() => {
    if (heroRafId.current) cancelAnimationFrame(heroRafId.current);
    setHeroMouse({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    return () => {
      if (heroRafId.current) cancelAnimationFrame(heroRafId.current);
    };
  }, []);

  // Filter gallery images
  const filteredGallery = galleryFilter === 'All' 
    ? activeGallery 
    : activeGallery.filter(img => img.category.toLowerCase().includes(galleryFilter.toLowerCase()) || (galleryFilter === 'Campus' && img.category.toLowerCase().includes('campus')));

  return (
    <div className="space-y-0 pb-0 bg-transparent text-[#252528] font-sans">
      {/* 1. HERO SECTION - RESPONSIVE CINEMATIC BACKGROUND SLIDER */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="w-full relative overflow-hidden mt-0 pt-0 h-[68vh] sm:h-[80vh] lg:h-[88vh] min-h-[460px] sm:min-h-[580px]"
        aria-label="VINS Christian College of Engineering Campus"
      >
        {/* Responsive Cinematic Ken Burns Background Image Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
          {activeBgSlides.map((slide, idx) => {
            const isActive = idx === (currentSlideIndex % activeBgSlides.length);
            return (
              <div
                key={`${isDesktop ? 'desktop' : 'mobile'}-${slide.id}`}
                className={`absolute inset-0 w-full h-full will-change-transform ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={{
                  transform: isDesktop
                    ? `translate3d(${-heroMouse.x * 10}px, ${-heroMouse.y * 8}px, 0px) scale(${isActive ? 1.05 : 1})`
                    : 'none',
                  transition: 'opacity 1.2s ease-in-out, transform 6.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <img
                  src={slide.webp}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== slide.fallback) {
                      target.src = slide.fallback;
                    }
                  }}
                  alt={slide.alt}
                  className="w-full h-full object-cover select-none block"
                  style={{
                    objectPosition: isDesktop ? 'center 22%' : 'center center',
                  }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* RUNNING LIVE CIRCULARS MARQUEE TICKER BAR */}
      <div className="m-0 p-0 mb-0 relative z-20">
        <RunningTickerBar onNavigateNotifications={() => onTabChange('notifications')} />
      </div>

      {/* 2. INFINITE AUTO-RUNNING MARQUEE IMAGE STRIP */}
      <section className="relative w-full mt-4 sm:mt-8 mb-10 sm:mb-16 z-20 overflow-hidden">
        <style>{`
          @keyframes marquee-slide {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee-slide 36s linear infinite;
            will-change: transform;
          }
          .marquee-track.paused {
            animation-play-state: paused;
          }
          .marquee-card {
            flex-shrink: 0;
            margin-right: 16px;
            border-radius: 18px;
            overflow: hidden;
            width: 340px;
            height: 220px;
            box-shadow: 0 8px 32px rgba(10,37,64,0.18);
            transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
            cursor: pointer;
            position: relative;
            border: 2px solid rgba(255,255,255,0.15);
          }
          @media (min-width: 640px) {
            .marquee-card {
              width: 440px;
              height: 290px;
              margin-right: 22px;
              border-radius: 22px;
            }
          }
          @media (min-width: 1024px) {
            .marquee-card {
              width: 580px;
              height: 360px;
              margin-right: 28px;
              border-radius: 26px;
            }
          }
          .marquee-card:hover {
            transform: scale(1.045) translateY(-4px);
            box-shadow: 0 22px 56px rgba(10,37,64,0.32), 0 0 0 3px rgba(251,191,36,0.5);
            z-index: 10;
          }
          .marquee-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition: transform 0.5s ease;
            display: block;
          }
          .marquee-card:hover img {
            transform: scale(1.06);
          }
          .marquee-card-overlay {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            background: linear-gradient(to top, rgba(6,16,33,0.82) 0%, transparent 100%);
            padding: 14px 18px 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .marquee-card:hover .marquee-card-overlay {
            opacity: 1;
          }
          /* Edge fade masks */
          .marquee-fade-left  { background: linear-gradient(to right, white 0%, transparent 100%); }
          .marquee-fade-right { background: linear-gradient(to left,  white 0%, transparent 100%); }
        `}</style>

        {/* Strip Header Badge */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center gap-3">
          <div className="h-[2px] flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-[#54524e] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            VINS CAMPUS &amp; EVENTS
            <Sparkles className="w-3 h-3 text-amber-500" />
          </span>
          <div className="h-[2px] flex-1 max-w-[40px] bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Marquee Wrapper with edge fade */}
        <div className="relative">
          {/* Left fade mask */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 marquee-fade-left z-10 pointer-events-none" />
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 marquee-fade-right z-10 pointer-events-none" />

          {/* The continuously scrolling track */}
          <div
            className={`marquee-track${marqueeHovered ? ' paused' : ''}`}
            onMouseEnter={() => setMarqueeHovered(true)}
            onMouseLeave={() => setMarqueeHovered(false)}
            aria-label="VINS Campus image gallery"
          >
            {/* Render slides twice for seamless looping */}
            {[...activeSlides, ...activeSlides].map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="marquee-card"
                title={slide.title}
              >
                <img
                  src={slide.visualUrl || slide.imagePath}
                  alt={slide.title}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
                {/* Hover Caption Overlay */}
                <div className="marquee-card-overlay">
                  <p className="text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider truncate">{slide.subtitle}</p>
                  <p className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-1 mt-0.5">{slide.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pause-on-hover label */}
        {marqueeHovered && (
          <div className="flex justify-center mt-3">
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">⏸ Paused — move cursor away to continue</span>
          </div>
        )}
      </section>

      {/* 3. REST OF HOME PAGE - LAYERED GLASSY CEMENT GREY */}
      {/* 3. REST OF HOME PAGE - LAYERED GLASSY CEMENT GREY */}
      <div className="bg-transparent text-[#252528] space-y-16 sm:space-y-24 py-12 sm:py-24 relative overflow-hidden">

        {/* Subtle Ambient 3D Depth Backdrop Orbs (Collegiate Soft Lighting) */}
        <div className="absolute top-24 -left-28 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none animate-float-a" aria-hidden="true" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl pointer-events-none animate-float-b" aria-hidden="true" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none animate-float-c" aria-hidden="true" />

        {/* SECTION A: "CELEBRATING THE BRIGHTEST MIND" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              
              <div className="space-y-2 sm:space-y-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
                  ACADEMIC EXCELLENCE &amp; LEADERSHIP
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#252528] leading-[1.15]">
                  CELEBRATING THE BRIGHTEST MIND
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#3A2A08] leading-relaxed font-sans">
                Our goal is to prepare the next generation of creative engineering professionals and industry leaders. We offer undergraduate, postgraduate, and management degrees in high-demand technological sectors.
              </p>

              <p className="text-sm sm:text-base text-[#3A2A08] leading-relaxed font-sans">
                Whether you begin your journey in our state-of-the-art AI &amp; GPU computing laboratories, modern robotics workshops, or through comprehensive research internships, our programs are engineered to help you along your path to global success.
              </p>

              {/* "VIEW PROGRAMS →" with hover link */}
              <div className="pt-2">
                <button
                  onClick={() => onTabChange('department')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors border-b-2 border-[#252528] hover:border-[#54524e] pb-1 cursor-pointer group"
                >
                  <span>VIEW PROGRAMS</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </button>
              </div>

              {/* 3 Key Stats Box */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-[#dedcd7]">
                <div>
                  <p className="text-xl sm:text-3xl font-bold font-playfair text-[#252528]">25+</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#6B4C14] uppercase tracking-wider mt-0.5">Years Legacy</p>
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-bold font-playfair text-[#252528]">15:1</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#6B4C14] uppercase tracking-wider mt-0.5">Student Ratio</p>
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-bold font-playfair text-[#363538]">90%+</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#6B4C14] uppercase tracking-wider mt-0.5">Placements</p>
                </div>
              </div>

            </div>

            {/* Right Column: 4-Layer 3D Floating Image Composition with Independent Depths */}
            <div className="lg:col-span-6 relative perspective-1000">
              <div className="relative preserve-3d w-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
                
                {/* Layer 3 (Deeper 3D Position): Innovation Laboratory Preview */}
                <FloatingElement 
                  duration={9.2} 
                  delay={1.4} 
                  distance={7} 
                  translateZ={-10} 
                  floatType="depth" 
                  className="absolute -top-4 -left-3 sm:-top-8 sm:-left-6 w-40 sm:w-48 z-0 hidden sm:block"
                >
                  <div className="royal-image-frame w-full shadow-lg opacity-85 hover:opacity-100 transition-opacity">
                    <div className="royal-image-inner w-full aspect-[4/3]">
                      <img 
                        src="/images/college events and news galeery/h5.jpg" 
                        alt="VINS Innovation Lab" 
                        className="w-full h-full object-cover img-hover-zoom"
                      />
                    </div>
                  </div>
                </FloatingElement>

                {/* Layer 1 (Vertical Float): Grand Campus & Central Library Main Photo */}
                <FloatingElement 
                  duration={8.0} 
                  delay={0.2} 
                  distance={8} 
                  translateZ={12} 
                  floatType="vertical" 
                  className="w-full max-w-md sm:max-w-none z-10"
                >
                  <div className="royal-image-frame w-full shadow-2xl">
                    <div className="royal-image-inner w-full aspect-[4/3]">
                      <img 
                        src="/images/college events and news galeery/h6.jpg" 
                        alt="VINS College Central Library and Quadrangle" 
                        className="w-full h-full object-cover img-hover-zoom"
                      />
                    </div>
                  </div>
                </FloatingElement>

                {/* Layer 2 (Diagonal Float): Overlapping Dignitaries and Students */}
                <FloatingElement 
                  duration={6.6} 
                  delay={0.8} 
                  distance={10} 
                  translateZ={28} 
                  floatType="diagonal" 
                  className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-4 w-1/2 max-w-[240px] sm:max-w-[280px] z-20"
                >
                  <div className="royal-image-frame w-full shadow-2xl">
                    <div className="royal-image-inner w-full aspect-[4/3]">
                      <img 
                        src="/images/college events and news galeery/1 (2).jpg" 
                        alt="VINS Academic Dignitaries and Students" 
                        className="w-full h-full object-cover img-hover-zoom"
                      />
                    </div>
                  </div>
                </FloatingElement>

                {/* Layer 4 (Opposite Reverse Float): Autonomous Engineering Excellence Badge */}
                <FloatingElement 
                  duration={7.4} 
                  delay={1.1} 
                  distance={8} 
                  translateZ={38} 
                  floatType="reverse" 
                  className="absolute bottom-6 left-2 sm:bottom-10 sm:-left-4 z-30"
                >
                  <div className="glass-navy p-3 sm:p-3.5 rounded-2xl border border-white/25 shadow-2xl flex items-center gap-2.5 backdrop-blur-md">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-amber-300 tracking-wider">Top Engineering Ranking</p>
                      <p className="text-xs font-bold text-white">Anna University Code 4982</p>
                    </div>
                  </div>
                </FloatingElement>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION B: EDITORIAL QUOTE SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gold-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-amber-400/40 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Big Typography Quote & Attribution */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Giant Serif Quotation Mark */}
                <div className="text-6xl sm:text-7xl font-serif text-[#54524e] leading-none select-none">
                  “
                </div>

                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#252528] leading-tight -mt-4">
                  Wisdom and character are the true cornerstones of engineering excellence; our mission is to ignite visionary minds that create meaningful solutions for the world.
                </blockquote>

                <div className="pt-2">
                  <p className="text-xs sm:text-sm font-bold text-[#6B4C14] font-cinzel tracking-wider uppercase">
                    Founder Chairman Shri Nanjil M. Vincent · (Ex-MLA, Ex-MP Rajya Sabha)
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dedcd7]">
                  <button
                    onClick={() => onTabChange('about', 'chairman')}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors group cursor-pointer"
                  >
                    <span>CONTINUE READING</span>
                    <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Large Vertical Chairman Photo in Royal Frame */}
              <div className="lg:col-span-5">
                <FloatingElement duration={8.5} distance={5} className="w-full">
                  <div className="royal-image-frame w-full">
                    <div className="royal-image-inner w-full aspect-[4/5] relative group">
                      <img 
                        src="/images/chairman and pricipal img/chairman img.jpg" 
                        alt="Founder Chairman Nanjil M. Vincent" 
                        className="w-full h-full object-cover img-hover-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#252528]/90 via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#eceae6] block">LEADERSHIP SPOTLIGHT</span>
                        <p className="text-sm font-playfair font-bold">VINS Group of Educational Institutions</p>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION C: "UPCOMING EVENTS" - COMPACT & MODERN 3D DISPLAY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <ScrollReveal direction="up" distance={20}>
            <div className="text-center space-y-2.5 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#dedcd7]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#6B4C14] font-cinzel">
                  FEEL FREE TO JOIN OUR ACADEMIC &amp; PUBLIC EVENTS
                </span>
                <span className="h-px w-10 bg-[#dedcd7]" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#252528] tracking-tight">
                UPCOMING EVENTS
              </h2>
            </div>
          </ScrollReveal>

          {/* Compact Dynamic Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeEvents.slice(0, 4).map((evt, idx) => (
              <ScrollReveal key={evt.id} delay={idx * 0.1} direction="up" distance={15}>
                <TiltCard
                  maxTilt={5}
                  scale={1.015}
                  onClick={() => setSelectedEvent({
                    id: evt.id,
                    title: evt.title,
                    date: evt.date,
                    category: evt.category,
                    imagePath: evt.imagePath,
                    description: evt.description
                  })}
                  className="rounded-2xl overflow-hidden border border-amber-400/40 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-xl transition-all cursor-pointer h-full"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Event Image / Thumbnail with smooth zoom */}
                    {evt.imagePath && (
                      <div className="sm:w-44 h-40 sm:h-auto shrink-0 relative overflow-hidden bg-slate-100">
                        <img
                          src={evt.imagePath}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-[#FF6B00] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {evt.category || 'Event'}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00]">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{evt.date}</span>
                          {evt.subtitle && <span className="text-slate-400 font-normal">· {evt.subtitle}</span>}
                        </div>

                        <h3 className="text-base font-bold font-playfair text-[#252528] group-hover:text-[#FF6B00] transition-colors leading-snug line-clamp-2">
                          {evt.title}
                        </h3>

                        <p className="text-xs text-[#54524e] font-sans line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#dedcd7]/60 flex items-center justify-between text-xs font-bold">
                        <span className="text-[#6B4C14] text-[11px] font-semibold">
                          {evt.category}
                        </span>
                        <span className="text-[#252528] group-hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="text-center pt-2">
            <button
              onClick={() => onTabChange('campus', 'events')}
              className="btn-valer-green btn-micro text-xs uppercase tracking-widest px-8 py-3.5 shadow-md cursor-pointer font-bold inline-flex items-center gap-2"
            >
              <span>VIEW ALL UPCOMING EVENTS</span>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </button>
          </div>

        </section>

        {/* SECTION D: EDITORIAL MAGAZINE & NEWS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dedcd7] pb-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
                CAMPUS JOURNAL &amp; HAPPENINGS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[#252528]">
                Latest News &amp; Stories
              </h2>
            </div>

            <button
              onClick={() => onTabChange('notifications')}
              className="text-xs font-bold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <span>ALL OFFICIAL CIRCULARS</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3-Column Magazine Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Featured Article Card with 3D Tilt */}
            <TiltCard maxTilt={5} scale={1.015} className="h-full">
              <div className="gold-card rounded-2xl p-6 border border-amber-400/40 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition-all h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B4C14] block">
                    SEPTEMBER 8, 2026 · RESEARCH
                  </span>
                  <h3 className="text-xl font-bold font-playfair text-[#252528] leading-snug">
                    Advanced AI &amp; Robotics Innovation Laboratory Commissioned at VINS
                  </h3>
                  <p className="text-xs text-[#3A2A08] leading-relaxed">
                    Equipped with cutting-edge Nvidia GPUs, humanoid robotics kits, and cloud compute nodes to accelerate student research in machine intelligence and computer vision.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dedcd7]">
                  <button
                    onClick={() => onTabChange('notifications')}
                    className="text-xs font-bold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>READ MORE</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* Column 2: Center Full-Height Featured Photo Card with Royal Frame */}
            <div className="royal-image-frame aspect-[3/4] md:aspect-auto">
              <div className="royal-image-inner w-full h-full relative group">
                <img 
                  src="/images/college events and news galeery/h1.jpg" 
                  alt="VINS College Event Lamp Lighting" 
                  className="w-full h-full object-cover img-hover-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252528]/90 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#eceae6]">ANNUAL MILESTONE</span>
                  <h3 className="text-lg font-playfair font-bold text-white">Inauguration of the 2026-27 Academic Year</h3>
                </div>
              </div>
            </div>

            {/* Column 3: Secondary Article Card with 3D Tilt */}
            <TiltCard maxTilt={5} scale={1.015} className="h-full">
              <div className="gold-card rounded-2xl p-6 border border-amber-400/40 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition-all h-full">
                <div className="space-y-3">
                  <div className="royal-card-highlight w-full aspect-[16/9]">
                    <div className="rounded-xl overflow-hidden w-full h-full bg-[#ebe9e4]">
                      <img 
                        src="/images/college events and news galeery/h5.jpg" 
                        alt="VINS Architectural Complex" 
                        className="w-full h-full object-cover img-hover-zoom"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B4C14] block">
                    AUGUST 17, 2026 · CAMPUS INFRASTRUCTURE
                  </span>
                  <h3 className="text-lg font-bold font-playfair text-[#252528] leading-snug">
                    Expansion of High-Tech Research Quadrangle &amp; Digital Library
                  </h3>
                  <p className="text-xs text-[#3A2A08] leading-relaxed">
                    State-of-the-art facility housing 50,000+ technical volumes, IEEE Xplore access, and dedicated team collaboration pods.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dedcd7]">
                  <button
                    onClick={() => onTabChange('facilities')}
                    className="text-xs font-bold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>READ MORE</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </TiltCard>

          </div>

        </section>

        {/* SECTION E: ACADEMICS & 8 ENGINEERING DEPARTMENTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <ScrollReveal direction="up" distance={20}>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
                DEGREE PROGRAMS &amp; DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[#252528]">
                Engineering &amp; Management Courses
              </h2>
              <p className="text-xs sm:text-sm text-[#6B4C14]">
                Anna University curriculum with state-of-the-art laboratories, expert PhD professors, and hands-on industrial projects.
              </p>
            </div>
          </ScrollReveal>

          {/* Departments Grid with Interactive 3D Perspective Tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeDepartments.slice(0, 8).map((dept, idx) => (
              <ScrollReveal key={dept.id} delay={idx * 0.06} direction="up" distance={15}>
                <TiltCard
                  maxTilt={6}
                  scale={1.02}
                  onClick={() => onTabChange('department', undefined, dept.id)}
                  className="rounded-2xl h-full cursor-pointer"
                >
                  <div className="gold-card rounded-2xl border border-amber-400/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full">
                    <div className="space-y-3 p-4">
                      <div className="royal-card-highlight w-full aspect-[16/10]">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-[#ebe9e4] relative">
                          <img
                            src={dept.courseImage || dept.bannerPath}
                            alt={dept.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#252528]/80 text-white font-extrabold text-[10px] backdrop-blur-xs">
                            {dept.degree}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#54524e] uppercase tracking-wider block">
                          Intake: {dept.intake} Seats
                        </span>
                        <h3 className="text-sm font-playfair font-bold text-[#252528] mt-1 group-hover:text-[#54524e] transition-colors line-clamp-1">
                          {dept.name}
                        </h3>
                        <p className="text-[11px] text-[#6B4C14] line-clamp-2 mt-1">
                          {dept.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-800/20 border-t border-amber-400/30 flex items-center justify-between text-xs font-bold text-[#5C4010] group-hover:text-[#8A6418]">
                      <span>Explore Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onTabChange('department')}
              className="btn-valer-green text-xs uppercase tracking-widest px-8 py-3.5 shadow-md cursor-pointer font-bold inline-flex items-center gap-2"
            >
              <span>VIEW ALL DEGREE PROGRAMS</span>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </button>
          </div>

        </section>

        {/* DEDICATED FEATURED YOUTUBE VIDEOS SECTION - WHITE BACKGROUND WITH ORANGE ACCENTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: '1200px' }}>
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-orange-200 space-y-8 relative overflow-hidden">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-bold tracking-widest uppercase border border-orange-200 shadow-xs">
                <Video className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>OFFICIAL VIDEO BROADCASTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 leading-tight">
                Experience VINS in Motion
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                Watch our official institutional documentaries, state-of-the-art laboratory infrastructure, student innovations, and campus celebrations directly below.
              </p>
            </div>

          {/* 2 Responsive Video Frames: Side-by-Side on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* Video 1: Official Campus & Academic Tour */}
            <div className="bg-white rounded-3xl border-2 border-orange-200/80 shadow-md hover:border-[#FF6B00] flex flex-col justify-between transform-gpu transition-all duration-300 hover:shadow-xl">
              <div className="p-4 sm:p-6 flex flex-col h-full space-y-4">
                
                {/* Header bar of Video Card 1 */}
                <div className="flex items-center justify-between gap-3 border-b-2 border-orange-100 pb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-black">
                      01
                    </span>
                    <div className="truncate">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00] block">CAMPUS DOCUMENTARY</span>
                      <h3 className="font-playfair font-bold text-sm sm:text-base text-slate-900 truncate">
                        VINS Christian College Institutional Tour
                      </h3>
                    </div>
                  </div>

                  <a
                    href="https://youtu.be/LtP5bsUIWew?si=_WX5lBdkREoxqx1B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs active:scale-95"
                    title="Open on YouTube"
                  >
                    <Play className="w-3 h-3 fill-current text-white" />
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </a>
                </div>

                {/* Embedded Video Player 1 */}
                <div className="rounded-2xl overflow-hidden aspect-video w-full shadow-inner border border-slate-200 bg-slate-900">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew?rel=0&modestbranding=1"
                    title="VINS Christian College of Engineering Official Campus Documentary"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Caption / Description for Video 1 */}
                <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <p>
                    Discover our high-tech computing centres, robotics labs, smart lecture halls, mechanical engineering workshops, and lush green Chunkankadai campus.
                  </p>
                </div>

              </div>
            </div>

            {/* Video 2: Campus Life, Culture & Student Excellence */}
            <div className="bg-white rounded-3xl border-2 border-orange-200/80 shadow-md hover:border-[#FF6B00] flex flex-col justify-between transform-gpu transition-all duration-300 hover:shadow-xl">
              <div className="p-4 sm:p-6 flex flex-col h-full space-y-4">
                
                {/* Header bar of Video Card 2 */}
                <div className="flex items-center justify-between gap-3 border-b-2 border-orange-100 pb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-black">
                      02
                    </span>
                    <div className="truncate">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00] block">CAMPUS LIFE &amp; CELEBRATION</span>
                      <h3 className="font-playfair font-bold text-sm sm:text-base text-slate-900 truncate">
                        Annual Day, Cultural Fest &amp; Student Events
                      </h3>
                    </div>
                  </div>

                  <a
                    href="https://youtu.be/yg6Qb6HH60o?si=tIYDgG6-BiQHenr0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs active:scale-95"
                    title="Open on YouTube"
                  >
                    <Play className="w-3 h-3 fill-current text-white" />
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </a>
                </div>

                {/* Embedded Video Player 2 */}
                <div className="rounded-2xl overflow-hidden aspect-video w-full shadow-inner border border-slate-200 bg-slate-900">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/yg6Qb6HH60o?rel=0&modestbranding=1"
                    title="VINS Engineering Annual Day & Student Life Highlights"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Caption / Description for Video 2 */}
                <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <p>
                    Experience the dynamic pulse of student extracurriculars, technical symposiums, hackathon competitions, campus placement drives, and cultural celebrations.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

        {/* SECTION F: CAMPUS PHOTO & VIDEO TOUR GALLERY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
              CAMPUS VISUAL TOUR
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[#252528]">
              Campus Life &amp; Gallery
            </h2>
          </div>

          {/* Gallery Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'College Day', 'Campus', 'Labs', 'Events', 'Sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === cat
                    ? 'bg-[#363538] text-white shadow-md border border-amber-400/40/20'
                    : 'bg-white text-[#252528] hover:bg-[#ebe9e4] border border-amber-400/40'
                }`}
              >
                {cat === 'All' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          {/* 3D Bento Grid Gallery with Clean Unobstructed Campus Images & Layered Depth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.slice(0, 6).map((img, idx) => {
              // Staggered depth and column spanning for true 3D Bento rhythm
              const isLargeBento = idx === 0 || idx === 3;
              const depthLevels = [20, 12, 16, 22, 14, 18];
              const cardDepth = depthLevels[idx % depthLevels.length];

              return (
                <ScrollReveal key={img.id} delay={idx * 0.08} direction="up" distance={20} className={isLargeBento ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'}>
                  <TiltCard
                    maxTilt={5}
                    scale={1.02}
                    translateZ={cardDepth}
                    onClick={() => setSelectedGalleryImg(img)}
                    className="rounded-3xl overflow-hidden glass-premium border border-amber-400/35 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col justify-between group"
                  >
                    {/* Clean Pristine Image Container — Absolutely No Text Covering the Image */}
                    <div className={`w-full overflow-hidden bg-[#ebe9e4] relative ${isLargeBento ? 'aspect-[16/9] sm:aspect-[21/10]' : 'aspect-[4/3]'}`}>
                      <img
                        src={img.imagePath || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Dedicated Clean Caption Area Below the Image */}
                    <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-white/90 border-t border-amber-300/30">
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-extrabold text-[#7A4B00] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-300/60 inline-block">
                          {img.category}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold font-playfair text-[#252528] group-hover:text-[#FF6B00] transition-colors truncate">
                          {img.title}
                        </h3>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-[#FF6B00] group-hover:bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-sm transition-colors duration-300">
                        <Eye className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>

        </section>

        {/* SECTION G: ADMISSIONS CTA BANNER - WHITE BACKGROUND WITH ORANGE ACCENTS & BLACK TEXT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-12 lg:p-14 shadow-lg border-2 border-orange-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative overflow-hidden">

            <div className="lg:col-span-7 space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-bold tracking-wider uppercase border border-orange-200 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>ADMISSIONS OPEN 2026-2027</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 leading-tight">
                Begin Your Engineering Journey at VINS
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
                Join a distinguished community where curious minds are empowered with cutting-edge skills, global recruitment access, and leadership values.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => onTabChange('admissions', 'online-form')}
                  className="bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white text-xs font-bold uppercase tracking-widest px-6 sm:px-8 py-3.5 rounded-full cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto border border-transparent"
                >
                  <span>APPLY ONLINE NOW</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onTabChange('admissions', 'scholarships')}
                  className="bg-white border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white active:scale-95 text-xs font-bold uppercase tracking-widest px-5 sm:px-6 py-3.5 rounded-full cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>SCHOLARSHIPS &amp; AID</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative z-10">
              <FloatingElement duration={7.2} distance={6} floatType="gentle" className="w-full">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-orange-200 shadow-xl p-2 bg-orange-50/50">
                  <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src="/images/college events and news galeery/5 (1).jpg" 
                      alt="VINS College Students" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </section>

      </div>

      {/* MODAL 1: EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#28272b]/95 backdrop-blur-xl text-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-[#dedcd7]/25 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#dedcd7]/20 pb-3">
              <span className="bg-[#363538] text-[#f7f6f4] text-xs font-bold px-3 py-1 rounded-full uppercase border border-amber-400/30">
                {selectedEvent.category}
              </span>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xs cursor-pointer border border-white/15"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
              <img
                src={selectedEvent.imagePath}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#d3d1cc] font-bold">
                <Calendar className="w-4 h-4 text-[#D4A843]" />
                <span>{selectedEvent.date}</span>
                <span>•</span>
                <MapPin className="w-4 h-4 text-[#D4A843]" />
                <span>VINS Auditorium / Campus Grounds</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-white">
                {selectedEvent.title}
              </h3>
              <p className="text-xs text-[#d3d1cc] leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#dedcd7]/20 flex items-center justify-between">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer border border-white/15 transition-all"
              >
                Close Details
              </button>
              <a
                href={`mailto:${COLLEGE_INFO.email}?subject=Inquiry regarding ${selectedEvent.title}`}
                className="btn-valer-green text-xs uppercase tracking-wider px-5 py-2"
              >
                Inquire Details →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GALLERY LIGHTBOX VIEWER */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="max-w-4xl w-full space-y-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <span className="text-xs text-[#D4A843] font-bold uppercase tracking-wider">{selectedGalleryImg.category}</span>
                <h3 className="font-playfair font-bold text-base">{selectedGalleryImg.title}</h3>
              </div>
              <button
                onClick={() => setSelectedGalleryImg(null)}
                className="w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center font-bold cursor-pointer border border-white/20"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/10] bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src={selectedGalleryImg.imagePath}
                alt={selectedGalleryImg.title}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedGalleryImg.description && (
              <p className="text-xs text-[#d3d1cc] bg-[#28272b]/85 backdrop-blur-md p-3.5 rounded-xl border border-white/15 leading-relaxed">
                {selectedGalleryImg.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: VIDEO TOUR MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#28272b]/95 backdrop-blur-xl rounded-2xl max-w-3xl w-full p-5 border border-[#dedcd7]/25 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
              <h3 className="font-playfair font-bold text-sm">VINS Campus Video Tour</h3>
              <button onClick={() => setVideoModalOpen(false)} className="text-white/60 hover:text-white font-bold cursor-pointer">✕</button>
            </div>
            <div className="aspect-video bg-black/80 rounded-xl overflow-hidden border border-white/10 shadow-inner">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew"
                title="VINS Campus Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DOCUMENT VIEWER FOR PDF NOTICES */}
      <DocumentViewerModal document={selectedPdfDoc} onClose={() => setSelectedPdfDoc(null)} />

      {/* SMART CURRENT / UPCOMING EVENT NOTIFICATION POPUP */}
      <EventNotificationPopup
        events={activeEvents}
        onSelectEvent={(evt) => setSelectedEvent(evt)}
        onNavigateEvents={() => onTabChange('campus', 'events')}
      />

      {/* SEPARATE FLOATING UPCOMING EVENTS BUTTON (HOME PAGE ONLY) */}
      <FloatingEventsButton onClick={() => onTabChange('campus', 'events')} />

    </div>
  );
};
