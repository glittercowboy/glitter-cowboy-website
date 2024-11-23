import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderNav = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { name: 'LABEL', path: '/label' },
    { name: 'ARTISTS', path: '/artists' },
    { name: 'STORY', path: '/story' },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isHomePage) {
    return (
      <nav className="fixed top-12 w-full z-50">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-8 md:space-x-16">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[#2D1B00] text-sm tracking-[0.2em] ${
                  isActive(item.path) ? 'font-bold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-6 md:top-12 w-full z-50">
      <div className="flex flex-col items-center justify-center px-4">
        <Link to="/" className="mb-4">
          <h1 className="text-2xl md:text-4xl text-center text-[#2D1B00] tracking-[0.2em] font-['Ocotillo']">
            GLITTER COWBOY
          </h1>
        </Link>
        <div className="flex space-x-8 md:space-x-16">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[#2D1B00] text-sm tracking-[0.2em] ${
                isActive(item.path) ? 'font-bold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;