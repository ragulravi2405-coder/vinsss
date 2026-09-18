import React from 'react';
import { motion } from 'motion/react';

interface CircularNoticeProps {
  /** Text to display inside the circular notice */
  text: string;
  /** Optional size in pixels (diameter). Default 120 */
  size?: number;
  /** Optional background color */
  bgColor?: string;
}

/**
 * A premium circular notice badge that continuously rotates.
 * Uses Framer‑Motion (via the `motion` package) for a smooth infinite spin.
 * The component is fully responsive – size can be overridden via the `size` prop.
 */
export const CircularNotice: React.FC<CircularNoticeProps> = ({
  text,
  size = 120,
  bgColor = 'rgba(255,255,255,0.12)',
}) => {
  const style = {
    width: size,
    height: size,
    background: bgColor,
    borderRadius: '50%',
  } as React.CSSProperties;

  return (
    <motion.div
      className="circular-notice flex items-center justify-center text-sm font-medium text-white shadow-lg"
      style={style}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
    >
      {text}
    </motion.div>
  );
};
