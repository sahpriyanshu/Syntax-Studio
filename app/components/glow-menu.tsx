"use client"

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlowMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const GlowMenuItem = ({ children, onClick }: GlowMenuItemProps) => {
  return (
    <motion.div
      className="glow-menu-item relative px-4 py-2 rounded-lg cursor-pointer overflow-hidden"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
      style={{
        background: 'rgba(100, 149, 237, 0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{
          opacity: 1,
          scale: 1.2,
          transition: { duration: 0.3 }
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(100, 149, 237, 0.4), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.2 }
        }}
        style={{
          background: 'linear-gradient(45deg, rgba(100, 149, 237, 0.3), rgba(147, 197, 253, 0.3))',
          boxShadow: '0 0 30px 5px rgba(100, 149, 237, 0.3)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface GlowMenuProps {
  children: ReactNode;
  className?: string;
}

export const GlowMenu = ({ children, className = '' }: GlowMenuProps) => {
  return (
    <div className={`flex gap-4 p-4 ${className}`}>
      {children}
    </div>
  );
};
