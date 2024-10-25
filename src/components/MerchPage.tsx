// MerchPage.tsx
import React, { useState, useEffect } from 'react';

const MerchPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample merchandise items
  const merchItems = [
    {
      id: 1,
      name: 'GLITTER COWBOY Classic Tee',
      price: '$35',
      description: 'Organic cotton, minimalist design'
    },
    {
      id: 2,
      name: 'Nature Series Hoodie',
      price: '$75',
      description: 'Sustainable materials, earthy tones'
    }
  ];

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
              MERCH
            </h1>
            <p className="text-xl text-[#2D1B00] opacity-80 mb-12 tracking-wide">
              Ethically produced, minimalist designs inspired by nature
            </p>
            
            {/* Merchandise Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {merchItems.map((item) => (
                <div key={item.id} className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <div className="w-full h-64 bg-[#2D1B00] bg-opacity-10 rounded-lg mb-4">
                    {/* Placeholder for product image */}
                    <img
                      src="/api/placeholder/400/320"
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D1B00] mb-2">{item.name}</h3>
                  <p className="text-[#2D1B00] opacity-80 mb-2">{item.description}</p>
                  <p className="text-xl font-bold text-[#2D1B00]">{item.price}</p>
                </div>
              ))}
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

export default MerchPage;