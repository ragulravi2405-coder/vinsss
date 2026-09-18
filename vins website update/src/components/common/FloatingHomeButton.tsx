import React, { useState, useEffect } from 'react';
import { Home, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationTab } from '../../types';

interface FloatingHomeButtonProps {
  currentTab: NavigationTab;
  onNavigateHome: () => void;
}

export const FloatingHomeButton: React.FC<FloatingHomeButtonProps> = ({
  currentTab,
  onNavigateHome,
}) => {
  const [scrolledDown, setScrolledDown] = useState(false);
  const isHome = currentTab === 'home';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed z-40 pointer-events-auto transition-all duration-300 right-3 bottom-4 sm:right-6 sm:bottom-6"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
    >
      <motion.button
        onClick={handleClick}
        aria-label="Go to Home Page"
        title={isHome ? "Back to Top" : "Go to Home Page"}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex items-center gap-1.5 sm:gap-2.5 px-2 py-2 sm:px-4.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0A2540] via-[#0F365E] to-[#0A2540] text-white shadow-xl hover:shadow-[0_10px_25px_-5px_rgba(139, 0, 0,0.5)] border border-amber-400/40 backdrop-blur-lg transition-all duration-300 cursor-pointer select-none active:brightness-110 max-w-[120px] sm:max-w-full"
      >
        {/* Glow ambient pulse */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#8B0000]/40 to-amber-400/40 blur-sm opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Icon Circle */}
        <span className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8B0000] group-hover:bg-amber-400 text-white group-hover:text-[#0A2540] flex items-center justify-center shrink-0 shadow-md transition-all duration-300">
          {isHome && scrolledDown ? (
            <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
          )}
        </span>

        {/* Responsive Label */}
        <span className="relative z-10 flex flex-col text-left pr-0.5">
          {/* Mobile Text */}
          <span className="sm:hidden text-[11px] font-black tracking-wider uppercase font-poppins text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
            {isHome && scrolledDown ? 'TOP' : 'HOME'}
          </span>

          {/* Tablet/Desktop Text */}
          <span className="hidden sm:inline-block text-xs font-black tracking-wider uppercase font-poppins text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
            {isHome && scrolledDown ? 'BACK TO TOP' : 'HOME'}
          </span>

          <span className="text-[9px] text-amber-200/80 font-medium hidden sm:inline-block leading-tight">
            {isHome ? 'Main Campus' : 'Return Home'}
          </span>
        </span>

        {/* Live Active Pulse Dot if currently away from Home */}
        {!isHome && (
          <span className="relative z-10 flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0000]"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
