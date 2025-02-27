"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const LandingGlowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Only show glow cursor on the landing page
  const isLandingPage = pathname === '/';

  useEffect(() => {
    if (!isLandingPage) return;

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLandingPage]);

  if (!isVisible || !isLandingPage) return null;

  return (
    <>
      {/* Large outer glow */}
      <div
        className="pointer-events-none fixed z-[999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(100, 149, 237, 0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Medium glow */}
      <div
        className="pointer-events-none fixed z-[1000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="absolute"
          style={{
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(100, 149, 237, 0.3) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Core cursor glow */}
      <div
        className="pointer-events-none fixed z-[1001]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="absolute"
          style={{
            width: '20px',
            height: '20px',
            background: 'rgba(100, 149, 237, 0.8)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px 4px rgba(100, 149, 237, 0.4)',
          }}
        />
      </div>
    </>
  );
};
