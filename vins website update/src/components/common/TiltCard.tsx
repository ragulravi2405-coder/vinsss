import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (subtle: 4-7)
  scale?: number; // Slight hover scale (e.g. 1.018)
  translateZ?: number; // Subtle 3D forward translation on hover (e.g. 12-18px)
  perspective?: number; // CSS perspective in px
  onClick?: () => void;
  style?: React.CSSProperties;
  enableLightEffect?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  scale = 1.018,
  translateZ = 14,
  perspective = 1000,
  onClick,
  style = {},
  enableLightEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50, opacity: 0 });
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const rotateX = -normalizedY * maxTilt;
      const rotateY = normalizedX * maxTilt;

      setTransformStyle(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ}px) scale3d(${scale}, ${scale}, 1)`
      );

      if (enableLightEffect) {
        setLightPosition({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.18,
        });
      }
    });
  }, [maxTilt, scale, translateZ, perspective, enableLightEffect]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setIsHovered(false);
    setTransformStyle(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`);
    if (enableLightEffect) {
      setLightPosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-all ${
        isHovered
          ? 'duration-150 ease-out shadow-2xl ring-1 ring-amber-400/30'
          : 'duration-500 ease-out shadow-md ring-0'
      } ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
        ...style,
      }}
    >
      {/* Card Content with 3D child preservation */}
      <div className="relative w-full h-full preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Subtle Mouse-Following Ambient Light Glow (Collegiate Gold/White Highlight) */}
      {enableLightEffect && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30 overflow-hidden"
          style={{
            background: `radial-gradient(circle 240px at ${lightPosition.x}% ${lightPosition.y}%, rgba(255, 215, 0, 0.15) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)`,
            opacity: lightPosition.opacity,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
