import React from 'react';
import { motion } from 'motion/react';

interface Image3DCardProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g., 'aspect-[16/9]', 'aspect-[4/3]', 'aspect-square'
  badge?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const Image3DCard: React.FC<Image3DCardProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  badge,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0A2540]/5 border border-[#0A2540]/10 shadow-3d-card hover:shadow-3d-hover transition-all duration-500 ease-out cursor-pointer ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image Container with Smooth Zoom */}
      <div className={`w-full ${aspectRatio} overflow-hidden relative`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
        />

        {/* Subtle Ambient Light Sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-[#0A2540]/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

        {/* Optional Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="badge-academic bg-white/90 text-[#0A2540] border border-white/40 shadow-xs backdrop-blur-md">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Optional Caption Area */}
      {(title || subtitle) && (
        <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-gray-100 flex flex-col gap-1 transition-colors group-hover:bg-white">
          {title && (
            <h4 className="text-sm sm:text-base font-bold text-[#0A2540] font-sans group-hover:text-[#FF6B00] transition-colors line-clamp-1">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500 font-medium line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};
