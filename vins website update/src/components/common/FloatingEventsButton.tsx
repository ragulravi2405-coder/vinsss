import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingEventsButtonProps {
  onClick: () => void;
}

export const FloatingEventsButton: React.FC<FloatingEventsButtonProps> = ({ onClick }) => {
  return (
    <div 
      className="fixed z-40 pointer-events-auto transition-all duration-300 left-3 bottom-4 sm:left-6 sm:bottom-6"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
    >
      <motion.button
        onClick={onClick}
        aria-label="Upcoming Events Shortcut"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex items-center gap-1.5 sm:gap-2.5 px-2 py-2 sm:px-4.5 sm:py-3 rounded-full bg-[#0A2540]/95 hover:bg-[#0A2540] text-white shadow-xl hover:shadow-2xl border border-amber-400/40 backdrop-blur-md transition-all duration-300 cursor-pointer select-none active:brightness-110 max-w-[120px] sm:max-w-full"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400/30 to-red-700/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Icon with subtle pulse */}
        <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:rotate-12 transition-transform duration-300">
          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>

        {/* Responsive Text */}
        <div className="relative z-10 flex flex-col text-left">
          {/* Mobile version: compact text */}
          <span className="sm:hidden text-[11px] font-black tracking-wider uppercase font-poppins text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
            EVENTS
          </span>

          {/* Tablet/Desktop version: full text */}
          <span className="hidden sm:inline-block text-xs font-black tracking-widest uppercase font-poppins text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
            UPCOMING EVENTS
          </span>

          <span className="text-[9px] text-amber-200/80 font-semibold hidden sm:inline-block">
            Campus Highlights &amp; Fests
          </span>
        </div>

        {/* Arrow (hidden on small mobile to keep button ultra-sleek, shown on tablet/desktop) */}
        <div className="relative z-10 text-amber-300 group-hover:translate-x-1 transition-transform duration-300 ml-0.5 hidden sm:block">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </motion.button>
    </div>
  );
};
