import React, { useState, useEffect } from 'react';
import { useAudio } from './AudioContext';

interface Release {
  "Album": string;
  "Artist": string;
  "Cover Art URL": string;
  "Track URL": string;
  "Track Title": string;
}

const LabelPage: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { playTrack } = useAudio();

  useEffect(() => {
    fetchReleases();
    setIsVisible(true);
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

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Content container */}
      <div className="relative h-full w-full z-10">
        {/* Label Content */}
        <div className={`absolute inset-0 flex flex-col items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full pt-32 px-8 pb-36 overflow-y-auto h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-[#2D1B00]">Hold your horses partner...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 max-w-7xl mx-auto">
                {releases.map((release, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center"
                    onClick={() => playTrack({
                      url: release["Track URL"],
                      title: release["Track Title"],
                      artist: release["Artist"],
                      artwork: release["Cover Art URL"]
                    })}
                  >
                    {/* Cover Art */}
                    <div className="w-full aspect-square mb-6 cursor-pointer transition-transform hover:scale-105">
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
            )}
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

export default LabelPage;
