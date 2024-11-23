import React, { useState, useEffect } from 'react';
import { useAudio } from './AudioContext';
import { Track, Release } from '../types';
import { fetchTracks } from '../utils/fetchTracks';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 max-w-7xl mx-auto">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex flex-col items-center animate-pulse">
          <div className="w-full aspect-square mb-6 bg-[#EDDABE] rounded-lg"></div>
          <div className="h-4 bg-[#EDDABE] rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-[#EDDABE] rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

const LabelPage: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { playTrack, setAllReleases } = useAudio();

  useEffect(() => {
    loadReleases();
    setIsVisible(true);
  }, []);

  const loadReleases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting to fetch releases...');
      const fetchedReleases = await fetchTracks();
      console.log('Fetched releases:', fetchedReleases);
      
      if (!fetchedReleases || fetchedReleases.length === 0) {
        throw new Error('No releases found');
      }
      
      setReleases(fetchedReleases);
      setAllReleases(fetchedReleases); // Update the AudioContext with all releases
    } catch (error) {
      console.error('Error loading releases:', error);
      setError(error instanceof Error ? error.message : 'Failed to load releases');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="relative h-full w-full z-10">
        <div className={`absolute inset-0 flex flex-col items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative w-full h-full">
            {/* Scrollable content with mask */}
            <div className="w-full h-full pt-52 px-8 pb-36 overflow-y-auto" style={{
              maskImage: 'linear-gradient(to top, white 72%, transparent 84%)',
              WebkitMaskImage: 'linear-gradient(to top, white 72%, transparent 84%)'
            }}>
              {isLoading ? (
                <SkeletonLoader />
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-[#2D1B00]">{error}</div>
                </div>
              ) : releases.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-[#2D1B00]">No releases found</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 max-w-7xl mx-auto">
                  {releases.map((release) => (
                    <div 
                      key={release.id} 
                      className="flex flex-col items-center"
                      onClick={() => {
                        if (release.tracks.length > 0) {
                          playTrack(release.tracks[0], release);
                        }
                      }}
                    >
                      <div className="w-full aspect-square mb-6 cursor-pointer transition-transform hover:scale-105">
                        <img
                          src={release.artworkUrl}
                          alt={`${release.title} cover art`}
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                          onError={(e) => {
                            console.error('Failed to load image:', release.artworkUrl);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <h2 className="text-lg font-bold text-[#2D1B00] text-center mb-2">
                        {release.title}
                      </h2>
                      <p className="text-sm text-[#2D1B00] text-center opacity-80">
                        {release.artist}
                      </p>
                      {release.type !== 'SINGLE' && (
                        <p className="text-xs text-[#2D1B00] text-center opacity-60 mt-1">
                          {release.tracks.length} tracks
                        </p>
                      )}
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
    </div>
  );
};

export default LabelPage;