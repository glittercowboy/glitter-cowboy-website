import React from 'react';

const ParticleBackground = () => {
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
    <div className="fixed inset-0 pointer-events-none">
      {/* Base background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gentle-gradient opacity-80" />
        <div className="absolute inset-0 gentle-gradient-overlay opacity-40" />
        <div className="absolute inset-0 radial-overlay" />
        <div className="absolute inset-0 bg-[#EDDABE] opacity-20" />
      </div>

      {/* Particles */}
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
  );
};

export default ParticleBackground;