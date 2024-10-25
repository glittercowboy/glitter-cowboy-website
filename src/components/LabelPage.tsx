import React, { useState, useEffect } from 'react';

interface Release {
  "Album": string;
  "Artist": string;
  "Cover Art URL": string;
}

const LabelPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxwtABP2ctSCcqTP1abdG_8Ugr8UbjRekzqQn645Q5aEqotBL4S1w7xvqVkpFQxk5HQ/exec');
      const data = await response.json();
      setReleases(data);
    } catch (error) {
      console.error('Error fetching releases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#EDDABE]">
        <div className="text-[#2D1B00]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#EDDABE]">
      {/* Add top padding to account for header navigation */}
      <div className="pt-32 px-8 pb-16">
        <div 
          className={`transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 max-w-7xl mx-auto">
            {releases.map((release, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Cover Art */}
                <div className="w-full aspect-square mb-6">
                  <img
                    src={release["Cover Art URL"]}
                    alt={`${release["Album"]} cover art`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Album Title */}
                <h2 className="text-lg font-bold text-[#2D1B00] text-center mb-2">
                  {release["Album"]}
                </h2>
                
                {/* Artist Name */}
                <p className="text-sm text-[#2D1B00] text-center opacity-80">
                  {release["Artist"]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPage;