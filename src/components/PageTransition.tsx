import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import HeaderNav from './HeaderNav';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#EDDABE]">
      {/* Base background layers that persist during transitions */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 gentle-gradient opacity-80" />
        <div className="absolute inset-0 gentle-gradient-overlay opacity-40" />
        <div className="absolute inset-0 radial-overlay" />
        <div className="absolute inset-0 bg-[#EDDABE] opacity-20" />
      </div>

      {/* Header Navigation - persists across transitions */}
      <HeaderNav />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="absolute inset-0 w-full h-full"
          initial={{ x: '100%' }}
          animate={{ 
            x: 0,
            transition: {
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1]
            }
          }}
          exit={{ 
            x: '-100%',
            transition: {
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1]
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;