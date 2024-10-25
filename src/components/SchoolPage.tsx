// SchoolPage.tsx
import React, { useState, useEffect } from 'react';

const SchoolPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="relative h-full w-full z-10">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold tracking-widest text-[#2D1B00] mb-8">
              UNDERGROUND ACCELERATOR
            </h1>
            <p className="text-xl text-[#2D1B00] opacity-80 mb-12 tracking-wide">
              A premium community that nurtures music producers, focusing on holistic artist development
            </p>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#2D1B00] mb-4">Courses & Mentorship</h3>
                <p className="text-[#2D1B00] opacity-80">
                  Comprehensive training in music production, branding, and artistic vision
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#2D1B00] mb-4">Live Sessions</h3>
                <p className="text-[#2D1B00] opacity-80">
                  Interactive coaching calls and workshops with industry experts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(200)].map((_, index) => (
          <div
            key={index}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + (index % 3 === 0 ? 2 : 0.5)}px`,
              height: `${Math.random() * 2 + (index % 3 === 0 ? 2 : 0.5)}px`,
              opacity: Math.random() * 0.2 + (index % 4 === 0 ? 0.3 : 0.1),
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SchoolPage;