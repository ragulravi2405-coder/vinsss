import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, X, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';

interface EventNotificationPopupProps {
  events: EventItem[];
  onSelectEvent?: (event: EventItem) => void;
  onNavigateEvents?: () => void;
}

export const EventNotificationPopup: React.FC<EventNotificationPopupProps> = ({
  events,
  onSelectEvent,
  onNavigateEvents,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [featuredEvent, setFeaturedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    // Check if previously dismissed in this browser session
    const isDismissed = sessionStorage.getItem('vins_event_popup_dismissed');
    if (isDismissed) {
      return;
    }

    // Must have at least 1 valid event with title and date
    const validEvents = (events || []).filter(
      (e) => e && e.title && e.title.trim() !== '' && e.date && e.date.trim() !== ''
    );

    if (validEvents.length === 0) {
      return;
    }

    // Prioritization: Look for active/current keywords or nearest date, else first valid event
    const nowYear = new Date().getFullYear();
    const currentOrUpcoming = validEvents.find((e) => {
      const lower = (e.category + ' ' + e.title + ' ' + e.date).toLowerCase();
      return lower.includes('2026') || lower.includes('upcoming') || lower.includes('annual') || lower.includes('symposium');
    }) || validEvents[0];

    setFeaturedEvent(currentOrUpcoming);

    // Delayed entrance: 1.6 seconds after landing on Home
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, [events]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('vins_event_popup_dismissed', 'true');
  };

  const handleClickDetails = () => {
    if (featuredEvent) {
      if (onSelectEvent) {
        onSelectEvent(featuredEvent);
      } else if (onNavigateEvents) {
        onNavigateEvents();
      }
      handleClose();
    }
  };

  if (!featuredEvent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-16 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-22 z-40 max-w-sm sm:max-w-md pointer-events-auto"
          role="dialog"
          aria-label="Event Notification"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-amber-300/60 shadow-2xl elevation-3d-3 text-[#252528] p-4 sm:p-5">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A2540] via-[#8B0000] to-[#0A2540]" />

            {/* Header / Dismiss Row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-[#7A4B00] text-[10px] font-extrabold uppercase tracking-wider border border-amber-300/70">
                <Sparkles className="w-3 h-3 text-[#8B0000] animate-sparkle" />
                <span>Spotlight Event</span>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close notification"
                className="text-[#64748B] hover:text-[#0A2540] hover:bg-black/5 p-1 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Event Content Body */}
            <div className="flex gap-3.5 items-start">
              {featuredEvent.imagePath && (
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 relative group">
                  <img
                    src={featuredEvent.imagePath}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Hide image container on broken image link
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B0000]">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{featuredEvent.date}</span>
                  {featuredEvent.category && (
                    <span className="text-slate-400 font-normal">· {featuredEvent.category}</span>
                  )}
                </div>

                <h4 className="text-sm font-bold font-playfair text-[#0A2540] leading-snug line-clamp-2">
                  {featuredEvent.title}
                </h4>

                {featuredEvent.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {featuredEvent.description}
                  </p>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 font-medium">
                VINS Campus Activity
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleClickDetails}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#8B0000] px-3.5 py-1.5 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
