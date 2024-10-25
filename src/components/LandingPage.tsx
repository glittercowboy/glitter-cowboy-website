import React, { useState, useEffect } from 'react';
import logo from '../assets/gc-logo.png';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const particles = Array.from({ length: 800 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + (index % 3 === 0 ? 2 : 0.5),
    delay: Math.random() * 5,
    speed: Math.floor(Math.random() * 3),
    opacity: Math.random() * 0.2 + (index % 4 === 0 ? 0.3 : 0.1)
  }));

  const getParticleSpeedClass = (speed: number) => {
    switch(speed) {
      case 0:
        return 'particle-slow';
      case 1:
        return 'particle-medium';
      default:
        return 'particle-fast';
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Content container */}
      <div className="relative h-full w-full z-10">
        {/* Center content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Logo with gentle rocking animation */}
          <div className="relative w-[36rem] h-[36rem] mb-12">
            <img
              src={logo}
              alt="GLITTER COWBOY"
              className="w-full h-full object-contain rocking-logo"
            />
          </div>

          {/* Brand name and Tagline */}
          <h1 className="text-5xl font-bold tracking-widest text-[#2D1B00] mb-4">
            GLITTER COWBOY
          </h1>
          <p className="text-2xl font-light tracking-widest text-[#2D1B00] opacity-80">
            EST. 2017
          </p>
        </div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`floating-particle ${getParticleSpeedClass(particle.speed)}`}
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;