import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronDown, GraduationCap, ArrowRight, ShieldCheck, Bell, Sparkles, BookOpen, Layers, Award, Building, Phone, Trophy, Globe, FileText, ExternalLink } from 'lucide-react';
import { NavigationTab, DocumentItem, CustomNavButton } from '../../types';
import { DEPARTMENTS_DATA } from '../../data/departmentsData';
import { DOCUMENTS_LIST } from '../../data/collegeData';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import { useAdminData } from '../../context/AdminDataContext';

interface NavbarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab, anchorId?: string, departmentId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const { customNavButtons, siteTheme, documents } = useAdminData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Subtle desktop 3D mouse tracking (disabled if prefers-reduced-motion)
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const tiltRafId = useRef<number | null>(null);

  // Detect user reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (tiltRafId.current) cancelAnimationFrame(tiltRafId.current);
    tiltRafId.current = requestAnimationFrame(() => {
      setMouseTilt({ x: nx, y: ny });
    });
  }, []);

  const handleNavMouseLeave = useCallback(() => {
    if (tiltRafId.current) cancelAnimationFrame(tiltRafId.current);
    setMouseTilt({ x: 0, y: 0 });
  }, []);

  const allDocs = documents && documents.length > 0 ? documents : DOCUMENTS_LIST;
  const mandatoryDoc = allDocs.find((d) => d.id === 'doc-mandatory') || allDocs[0];

  // Dynamic custom navbar buttons
  const navbarButtons = customNavButtons.filter(b => b.location === 'navbar' && b.isActive);

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
  };

  const handleNavClick = (tab: NavigationTab, anchorId?: string, departmentId?: string) => {
    onTabChange(tab, anchorId, departmentId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleCustomButtonClick = (btn: CustomNavButton) => {
    if (btn.actionType === 'url' && btn.targetUrl) {
      if (btn.openInNewTab) {
        window.open(btn.targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = btn.targetUrl;
      }
    } else if (btn.actionType === 'tab' && btn.targetTab) {
      handleNavClick(btn.targetTab, btn.targetAnchor);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-3.5 h-3.5 text-sky-400" />;
      case 'Trophy': return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      case 'Award': return <Award className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Bell': return <Bell className="w-3.5 h-3.5 text-rose-400" />;
      case 'Globe': return <Globe className="w-3.5 h-3.5 text-blue-400" />;
      case 'FileText': return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full transition-all"
      >
        {/* MAIN BRAND HEADER ROW - Layer 3: Glassmorphic Pure White with 3D Depth */}
        <div className={`bg-white border-b border-gray-200/80 transition-all duration-300 relative z-30 ${isScrolled ? 'py-1.5 sm:py-2.5 shadow-[0_4px_16px_rgba(10,37,64,0.06)]' : 'py-2.5 sm:py-3.5 shadow-[0_2px_10px_rgba(10,37,64,0.03)]'}`}>
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between gap-3 sm:gap-6 w-full">
              
              {/* BRANDING LEFT COLUMN: Logo + College Title */}
              <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                {/* VINS LOGO & TITLE */}
                <div 
                  onClick={() => handleNavClick('home')}
                  className="cursor-pointer group flex items-center gap-3 shrink-0 py-1 transition-transform duration-200 hover:-translate-y-0.5"
                  title="VINS Christian College of Engineering - Home"
                >
                  <img
                    src="/images/logo/vins spell logo.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/logo/vins logooo.jpg';
                    }}
                    alt="VINS Logo"
                    className={`w-auto max-w-[260px] min-[360px]:max-w-[290px] min-[390px]:max-w-[340px] sm:max-w-[480px] lg:max-w-[620px] object-contain drop-shadow-md group-hover:scale-[1.01] transition-all duration-300 ${
                      isScrolled 
                        ? 'h-11 min-[360px]:h-13 min-[390px]:h-14 sm:h-18 lg:h-20' 
                        : 'h-12 min-[360px]:h-14 min-[390px]:h-16 sm:h-20 lg:h-24'
                    }`}
                  />
                </div>
              </div>

              {/* ACCREDITATION LOGOS RIGHT COLUMN (NIRF, NAAC, CODE 4982, IIC, ERP) */}
              <div className="hidden lg:flex items-center gap-2.5 shrink-0">
                {/* NIRF */}
                <div className="p-1.5 bg-white/90 rounded-lg shadow-sm border border-gray-200/80 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0" title="NIRF Ranked Institution">
                  <img src="/images/logo/nirf.jpeg" alt="NIRF" className="h-9 lg:h-10 object-contain rounded-xs" />
                </div>
                {/* NAAC */}
                <div className="p-1.5 bg-white/90 rounded-lg shadow-sm border border-gray-200/80 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0" title="NAAC Accredited">
                  <img src="/images/logo/naac.png" alt="NAAC" className="h-9 lg:h-10 object-contain" />
                </div>
                {/* CODE 4982 */}
                <div 
                  className="px-3.5 py-1 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#4A0000] text-white font-black shadow-[0_4px_12px_rgba(139,0,0,0.4)] border-2 border-white/30 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(139,0,0,0.55)] transition-all duration-200 cursor-pointer select-none flex flex-col items-center justify-center shrink-0 min-w-[72px]"
                  title="Anna University Counselling Code: 4982"
                >
                  <span className="text-[7px] font-black uppercase tracking-wider text-white/95 leading-tight">CODE</span>
                  <span className="text-base font-black tracking-tight leading-none text-white">{siteTheme?.tneaCode || '4982'}</span>
                </div>
                {/* IIC */}
                <div className="p-1.5 bg-white/90 rounded-lg shadow-sm border border-gray-200/80 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0" title="Institution's Innovation Council">
                  <img src="/images/logo/iic.png" alt="IIC" className="h-9 lg:h-10 object-contain" />
                </div>
                {/* ERP */}
                <div className="p-1.5 bg-white/90 rounded-lg shadow-sm border border-gray-200/80 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0" title="ERP Automation System">
                  <img src="/images/logo/erp.png" alt="ERP" className="h-9 lg:h-10 object-contain" />
                </div>
              </div>

              {/* MOBILE HAMBURGER BUTTON */}
              <div className="xl:hidden flex items-center gap-2">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 rounded-xl text-white bg-[#0A2540] hover:bg-[#1E40AF] border border-white/30 transition-all shadow-md active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>
              </div>


</div>
            {/* MOBILE ACCREDITATION LOGOS HORIZONTAL SCROLL ROW */}
            <div className="lg:hidden flex items-center justify-start gap-2 pt-2 overflow-x-auto no-scrollbar border-t border-gray-100 mt-2">
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/nirf.jpeg" alt="NIRF" className="h-6 sm:h-7 object-contain rounded-xs" />
              </div>
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/naac.png" alt="NAAC" className="h-6 sm:h-7 object-contain" />
              </div>
              <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#8B0000] to-[#4A0000] text-white font-black border border-white/25 shrink-0 flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(139,0,0,0.35)]">
                <span className="text-[6px] font-black uppercase text-white/90 leading-tight">CODE</span>
                <span className="text-[10px] font-black leading-none text-white">{siteTheme?.tneaCode || '4982'}</span>
              </div>
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/iic.png" alt="IIC" className="h-6 sm:h-7 object-contain" />
              </div>
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/erp.png" alt="ERP" className="h-6 sm:h-7 object-contain" />
              </div>
            </div>
          </div>
        </div>

        

        {/* BOTTOM ROW - Layer 4: DESKTOP NAVIGATION MENU — Deep Navy Blue (#0A2540) with 3D Depth */}
        <div className={`w-full transition-all duration-300 border-t border-white/10 bg-[#0A2540] relative z-20 ${isScrolled ? 'py-2 shadow-[0_8px_30px_rgba(10,37,64,0.45)]' : 'py-2.5 shadow-[0_6px_20px_rgba(10,37,64,0.3)]'}`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="hidden xl:flex items-center justify-center relative w-full perspective-1000 preserve-3d"
              onMouseMove={handleNavMouseMove}
              onMouseLeave={handleNavMouseLeave}
              style={{
                transform: !isScrolled 
                  ? `perspective(1000px) rotateX(${mouseTilt.y * -1.2}deg) rotateY(${mouseTilt.x * 1.5}deg)` 
                  : 'none',
                transition: 'transform 0.15s ease-out'
              }}
            >
              <nav className="flex items-center space-x-1.5 2xl:space-x-2.5 font-sans flex-nowrap mx-auto preserve-3d">
                
                {/* Home */}
                <button
                  onClick={() => handleNavClick('home')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'home'
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'home' ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  Home
                </button>

                {/* About */}
                <button
                  onClick={() => handleNavClick('about')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'about'
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'about' ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  About
                </button>

                {/* Academics */}
                <button
                  onClick={() => handleNavClick('department')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'department' && !activeDropdown
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'department' && !activeDropdown ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  Academics
                </button>

                {/* Admissions */}
                <button
                  onClick={() => handleNavClick('admissions')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'admissions'
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'admissions' ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  Admissions
                </button>

                {/* Departments Dropdown */}
                <div 
                  className="relative preserve-3d"
                  onMouseEnter={() => setActiveDropdown('courses')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick('department')}
                    className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer whitespace-nowrap relative ${
                      activeDropdown === 'courses' || (currentTab === 'department')
                        ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                        : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                    }`}
                    style={{
                      transform: activeDropdown === 'courses' || currentTab === 'department' ? 'translateZ(6px) scale(1.02)' : undefined
                    }}
                  >
                    <span>Departments</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-white' : ''}`} />
                  </button>

                  {/* 3D Glassmorphic Dropdown Container */}
                  {activeDropdown === 'courses' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl text-[#0A2540] rounded-2xl shadow-[0_20px_40px_rgba(10,37,64,0.3)] border border-[#0A2540]/15 p-4 grid grid-cols-2 gap-2.5 animate-fade-in z-50">
                      <div className="col-span-2 pb-2 mb-1 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-[#8B0000] uppercase tracking-widest flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          Engineering &amp; Management Programs
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold">Anna Univ Code: 4982</span>
                      </div>
                      {DEPARTMENTS_DATA.map((dept) => (
                        <button
                          key={dept.id}
                          onClick={() => handleNavClick('department', undefined, dept.id)}
                          className="text-left px-3 py-2 rounded-xl bg-gray-50/80 hover:bg-[#1E40AF] text-xs font-bold text-[#0A2540] hover:text-white transition-all duration-150 flex items-center justify-between border border-gray-200/70 hover:border-[#1E40AF] hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
                        >
                          <span className="truncate pr-1">{dept.shortName ? `${dept.shortName} - ` : ''}{dept.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Placements */}
                <button
                  onClick={() => handleNavClick('placement')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'placement'
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'placement' ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  Placements
                </button>

                {/* NAAC */}
                <button
                  onClick={() => handleNavClick('naac')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'naac'
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'naac' ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  NAAC
                </button>

                {/* Contact */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`nav-3d-link px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap relative ${
                    currentTab === 'contact'
                      ? 'text-white bg-gradient-to-r from-[#8B0000] to-[#A51D1D] shadow-[0_4px_14px_rgba(139, 0, 0,0.45)] border border-amber-300/30'
                      : 'text-white/90 hover:text-white hover:bg-white/12 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-transparent'
                  }`}
                  style={{
                    transform: currentTab === 'contact' ? 'translateZ(6px) scale(1.02)' : undefined
                  }}
                >
                  Contact
                </button>

              </nav>

              {/* APPLY ONLINE NOW - Premium Floating 3D CTA */}
              <button
                onClick={() => handleNavClick('admissions', 'online-form')}
                className="cta-3d-floating absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#8B0000] via-[#941818] to-[#5B0000] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_6px_20px_rgba(139, 0, 0,0.45)] flex items-center gap-2 cursor-pointer shrink-0 border border-white/30 group select-none"
                style={{ transform: 'translateZ(8px)' }}
                title="Apply Online for Admissions 2026-2027"
              >
                <span>APPLY ONLINE NOW</span>
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A2540]/98 backdrop-blur-xl border-t border-white/20 px-4 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in shadow-2xl text-white mobile-dropdown-menu">
            <button
              onClick={() => handleNavClick('admissions', 'online-form')}
              className="w-full bg-gradient-to-r from-[#8B0000] to-[#5B0000] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-full shadow-[0_4px_16px_rgba(139, 0, 0,0.4)] flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-white/30"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Custom Dynamic Buttons */}
            {navbarButtons.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                {navbarButtons.map((btn) => (
                  <button
                    key={`mob-${btn.id}`}
                    onClick={() => handleCustomButtonClick(btn)}
                    className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-left text-xs font-bold flex items-center gap-2 hover:bg-white/20 text-white transition-colors"
                  >
                    {renderIcon(btn.iconName)}
                    <span className="truncate">{btn.label}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2.5 font-bold text-sm text-white hover:text-[#8B0000] border-b border-white/15 px-2 hover:bg-white/5 rounded transition-all duration-200"
            >
              Home
            </button>

            {/* Placement & NAAC Top-Level */}
            <button
              onClick={() => handleNavClick('placement')}
              className="w-full text-left py-2.5 font-bold text-sm text-white hover:text-[#8B0000] border-b border-white/15 px-2 hover:bg-white/5 rounded transition-all duration-200"
            >
              Placement
            </button>
            <button
              onClick={() => handleNavClick('naac')}
              className="w-full text-left py-2.5 font-bold text-sm text-white hover:text-[#8B0000] border-b border-white/15 px-2 hover:bg-white/5 rounded transition-all duration-200"
            >
              NAAC
            </button>

            {/* Pages Accordion */}
            <div className="border-b border-white/15 pb-2">
              <button
                onClick={() => toggleMobileSection('pages')}
                className="w-full text-left py-2.5 font-bold text-sm text-white flex items-center justify-between px-2 hover:bg-white/5 rounded"
              >
                Pages
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'pages' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'pages' && (
                <div className="pl-4 pt-2 space-y-1.5 text-xs text-white/90">
                  <button onClick={() => handleNavClick('about', 'vision')} className="block py-1.5 hover:text-[#8B0000] font-medium w-full text-left px-2 rounded hover:bg-white/5 transition-all duration-200">Vision &amp; Mission</button>
                  <button onClick={() => handleNavClick('about', 'profile')} className="block py-1.5 hover:text-[#8B0000] font-medium w-full text-left px-2 rounded hover:bg-white/5 transition-all duration-200">College Profile &amp; Legacy</button>
                  <button onClick={() => handleNavClick('about', 'chairman')} className="block py-1.5 hover:text-[#8B0000] font-medium w-full text-left px-2 rounded hover:bg-white/5 transition-all duration-200">Founder Chairman</button>
                  <button onClick={() => handleNavClick('facilities')} className="block py-1.5 hover:text-[#8B0000] font-medium w-full text-left px-2 rounded hover:bg-white/5 transition-all duration-200">Campus Facilities &amp; Labs</button>
                  <button onClick={() => handleNavClick('committees')} className="block py-1.5 hover:text-[#8B0000] font-medium w-full text-left px-2 rounded hover:bg-white/5 transition-all duration-200">Statutory Committees</button>
                </div>
              )}
            </div>

            {/* Courses Accordion */}
            <div className="border-b border-white/15 pb-2">
              <button
                onClick={() => toggleMobileSection('courses')}
                className="w-full text-left py-2.5 font-bold text-sm text-white flex items-center justify-between px-2 hover:bg-white/5 rounded"
              >
                Courses &amp; Departments (8)
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'courses' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'courses' && (
                <div className="pl-4 pt-2 space-y-1 text-xs text-white/90 max-h-48 overflow-y-auto">
                  <button onClick={() => handleNavClick('department')} className="block py-1.5 font-bold text-[#8B0000] w-full text-left px-2 rounded hover:bg-white/5">View All Degree Programs</button>
                  {DEPARTMENTS_DATA.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => handleNavClick('department', undefined, dept.id)}
                      className="block py-1.5 hover:text-[#8B0000] font-medium w-full text-left px-2 rounded hover:bg-white/5 w-full truncate"
                    >
                      {dept.shortName ? `${dept.shortName} - ` : ''}{dept.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick('notifications')} className="w-full text-left py-2.5 font-bold text-sm text-white bg-white/10 px-3 rounded-xl flex items-center justify-between hover:bg-white/15 transition-all border border-white/15">
              <span className="flex items-center gap-2 min-w-0">
                <Bell className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span className="truncate">Live Notifications & News</span>
              </span>
              <span className="text-[10px] bg-[#8B0000] text-white font-bold px-2 py-0.5 rounded-full animate-live-breathing shrink-0">LIVE</span>
            </button>

            <button onClick={() => handleNavClick('campus')} className="w-full text-left py-2.5 font-bold text-sm text-white border-b border-white/15 px-2 hover:bg-white/5 rounded">Events & Campus Life</button>
            <button onClick={() => handleNavClick('admissions')} className="w-full text-left py-2.5 font-bold text-sm text-white border-b border-white/15 px-2 hover:bg-white/5 rounded">Admissions 2026-27</button>
            <button onClick={() => handleNavClick('contact')} className="w-full text-left py-2.5 font-bold text-sm text-white border-b border-white/15 px-2 hover:bg-white/5 rounded">Contact Us</button>

            <button onClick={() => handleNavClick('admin')} className="w-full text-left py-3 font-bold text-sm text-white bg-white/10 px-3 rounded-xl flex items-center justify-between hover:bg-white/15 transition-all duration-200 border border-white/15">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
                <span>Admin Management Console</span>
              </span>
              <span className="text-[10px] bg-[#8B0000] text-white font-bold px-2 py-0.5 rounded">PORTAL</span>
            </button>

            <button
              onClick={() => setSelectedDoc(mandatoryDoc)}
              className="w-full py-2.5 text-xs font-bold text-white/90 bg-white/10 rounded-lg text-center border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              📄 Mandatory Disclosure PDF
            </button>
          </div>
        )}
      </motion.div>

      {/* Document Modal */}
      <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </>
  );
};

