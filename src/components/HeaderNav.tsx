import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/gc-logo.png';

const HeaderNav: React.FC = () => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const leftNavItems = ['ABOUT', 'LABEL'];
  const rightNavItems = ['EDUCATION', 'MERCH'];

  const getLinkClasses = (item: string) => {
    const isActive = location.pathname === `/${item.toLowerCase()}`;
    return `text-[#2D1B00] text-lg tracking-widest transition-all duration-300 py-2 ${
      hoveredNav === item ? 'opacity-100' : 'opacity-60'
    } hover:opacity-100 ${
      isActive ? 'opacity-100 border-b border-[#2D1B00]' : ''
    }`;
  };

  // Homepage layout - centered navigation without logo
  if (isHomePage) {
    return (
      <nav className="absolute top-8 h-16 left-0 right-0 flex justify-center items-center space-x-16 z-10">
        {[...leftNavItems, ...rightNavItems].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className={getLinkClasses(item)}
            onMouseEnter={() => setHoveredNav(item)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            {item}
          </Link>
        ))}
      </nav>
    );
  }

  // Other pages layout - compact navigation with centered logo
  return (
    <nav className="absolute top-8 h-16 left-0 right-0 z-10">
      <div className="flex items-center justify-center h-full">
        {/* Left nav items */}
        <div className="flex space-x-8">
          {leftNavItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={getLinkClasses(item)}
              onMouseEnter={() => setHoveredNav(item)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Center logo with fade animation */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-8"
          >
            <Link 
              to="/"
              className="transform transition-transform duration-300 hover:scale-110 block"
            >
              <img
                src={logo}
                alt="GLITTER COWBOY"
                className="w-16 h-16 object-contain"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Right nav items */}
        <div className="flex space-x-8">
          {rightNavItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={getLinkClasses(item)}
              onMouseEnter={() => setHoveredNav(item)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;