import React from 'react';

export type FloatMotionType = 'vertical' | 'sway' | 'gentle' | 'diagonal' | 'depth' | 'reverse';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // seconds
  delay?: number; // seconds
  distance?: number; // floating distance in px
  translateZ?: number; // 3D depth position in px
  style?: React.CSSProperties;
  floatType?: FloatMotionType;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  duration = 6,
  delay = 0,
  distance = 8,
  translateZ = 0,
  style = {},
  floatType = 'vertical',
}) => {
  // Generate distinct keyframe animation based on props
  const safeZ = translateZ || 0;
  const animationName = `float_${duration}s_${delay}s_${distance}px_${safeZ}z_${floatType}`;

  const getKeyframeCss = () => {
    switch (floatType) {
      case 'diagonal':
        return `
          @keyframes ${animationName} {
            0%, 100% { transform: translate3d(0px, 0px, ${safeZ}px) rotate(0deg); }
            50% { transform: translate3d(${Math.round(distance * 0.7)}px, -${distance}px, ${safeZ + 5}px) rotate(0.4deg); }
          }
        `;
      case 'depth':
        return `
          @keyframes ${animationName} {
            0%, 100% { transform: translate3d(0px, 0px, ${safeZ}px) scale(1); }
            50% { transform: translate3d(-${Math.round(distance * 0.4)}px, -${distance}px, ${safeZ + 12}px) scale(1.015); }
          }
        `;
      case 'reverse':
        return `
          @keyframes ${animationName} {
            0%, 100% { transform: translate3d(0px, 0px, ${safeZ}px); }
            50% { transform: translate3d(0px, ${distance}px, ${safeZ - 4}px); }
          }
        `;
      case 'sway':
        return `
          @keyframes ${animationName} {
            0%, 100% { transform: translate3d(0px, 0px, ${safeZ}px) rotate(0deg); }
            50% { transform: translate3d(0px, -${distance}px, ${safeZ + 6}px) rotate(0.6deg); }
          }
        `;
      case 'gentle':
        return `
          @keyframes ${animationName} {
            0%, 100% { transform: translate3d(0px, 0px, ${safeZ}px) scale(1); }
            50% { transform: translate3d(0px, -${distance}px, ${safeZ + 8}px) scale(1.01); }
          }
        `;
      case 'vertical':
      default:
        return `
          @keyframes ${animationName} {
            0%, 100% { transform: translate3d(0px, 0px, ${safeZ}px); }
            50% { transform: translate3d(0px, -${distance}px, ${safeZ + 4}px); }
          }
        `;
    }
  };

  return (
    <>
      <style>{getKeyframeCss()}</style>
      <div
        className={`transform-gpu ${className}`}
        style={{
          animation: `${animationName} ${duration}s ease-in-out ${delay}s infinite`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
};
