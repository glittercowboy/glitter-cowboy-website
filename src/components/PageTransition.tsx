import React from 'react';
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

      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;