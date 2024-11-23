import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from './AudioContext';
import { Play, Pause, SkipBack, SkipForward, List, Shuffle } from 'lucide-react';
import { Track } from '../types';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ScrollingText = ({ text, className }: { text: string, className?: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setShouldScroll(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  const fullClassName = `overflow-hidden whitespace-nowrap ${className}`;
  const animationStyle = shouldScroll ? {
    animation: hovering ? `scroll ${text.length * 0.15}s linear infinite` : 'none',
    paddingRight: '50px'
  } : {};

  return (
    <div 
      className={fullClassName}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        ref={textRef}
        className="inline-block"
        style={animationStyle}
      >
        {text}
        {shouldScroll && hovering && <span className="pl-8">{text}</span>}
      </div>
    </div>
  );
};

const PlaylistDrawer = ({ showPlaylist, setShowPlaylist }: { showPlaylist: boolean, setShowPlaylist: (show: boolean) => void }) => {
  const { currentRelease, currentTrack, playTrack } = useAudio();

  if (!currentRelease || !currentTrack) return null;

  return (
    <div className="fixed bottom-16 right-0 w-80 bg-[#2D1B00] rounded-tl-lg shadow-lg p-4 text-[#EDDABE]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{currentRelease.title}</h3>
        <button 
          onClick={() => setShowPlaylist(false)} 
          className="hover:opacity-70"
        >×</button>
      </div>
      <div className="space-y-2">
        {currentRelease.tracks.map((track: Track) => (
          <div 
            key={track.id}
            className={`flex items-center p-2 hover:bg-[#EDDABE] hover:bg-opacity-10 rounded cursor-pointer
              ${currentTrack.id === track.id ? 'bg-[#EDDABE] bg-opacity-10' : ''}`}
            onClick={() => playTrack(track, currentRelease)}
          >
            <span className="w-6 text-sm opacity-60">{track.trackNumber}</span>
            <span className="flex-1">{track.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AudioPlayer = () => {
  const { 
    currentTrack, 
    currentRelease,
    isPlaying, 
    progress, 
    duration, 
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    isShuffled,
    toggleShuffle
  } = useAudio();
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Base player container that's always rendered
  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="fixed bottom-0 left-0 right-0 bg-[#2D1B00] h-16 flex items-center px-6 z-50">
        <div className="max-w-6xl w-full mx-auto flex items-center gap-6">
          {currentTrack && currentRelease ? (
            <>
              {/* Track Controls */}
              <div className="flex items-center gap-2">
                {currentRelease.type !== 'SINGLE' && (
                  <>
                    <button 
                      onClick={playPrevious}
                      className="p-1.5 hover:bg-[#EDDABE] hover:bg-opacity-10 rounded-full transition-colors"
                    >
                      <SkipBack className="w-4 h-4 text-[#EDDABE]" />
                    </button>
                    <button 
                      onClick={toggleShuffle}
                      className={`p-1.5 hover:bg-[#EDDABE] hover:bg-opacity-10 rounded-full transition-colors ${isShuffled ? 'text-[#EDDABE]' : 'text-[#EDDABE] opacity-50'}`}
                    >
                      <Shuffle className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                <button 
                  onClick={togglePlay}
                  className="p-1.5 hover:bg-[#EDDABE] hover:bg-opacity-10 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-[#EDDABE]" />
                  ) : (
                    <Play className="w-5 h-5 text-[#EDDABE]" />
                  )}
                </button>

                {currentRelease.type !== 'SINGLE' && (
                  <button 
                    onClick={playNext}
                    className="p-1.5 hover:bg-[#EDDABE] hover:bg-opacity-10 rounded-full transition-colors"
                  >
                    <SkipForward className="w-4 h-4 text-[#EDDABE]" />
                  </button>
                )}
              </div>

              {/* Artwork */}
              <img 
                src={currentRelease.artworkUrl} 
                alt={currentRelease.title}
                className="h-10 w-10 rounded shadow"
              />

              {/* Track Info */}
              <div className="flex-shrink-0 w-48">
                <ScrollingText 
                  text={currentTrack.title}
                  className="text-sm font-medium text-[#EDDABE]"
                />
                <ScrollingText 
                  text={currentTrack.artist}
                  className="text-xs text-[#EDDABE] opacity-60"
                />
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 flex-1">
                <span className="text-xs text-[#EDDABE] opacity-60 w-10">
                  {formatTime(progress)}
                </span>
                
                <div className="flex-1 h-1 bg-[#EDDABE] bg-opacity-10 rounded-full cursor-pointer group"
                    onClick={(e) => {
                      const bounds = e.currentTarget.getBoundingClientRect();
                      const percent = (e.clientX - bounds.left) / bounds.width;
                      seekTo(percent * duration);
                    }}>
                  <div 
                    className="h-full bg-[#EDDABE] rounded-full group-hover:bg-opacity-90 transition-opacity"
                    style={{ width: `${(progress / duration) * 100}%` }}
                  />
                </div>
                
                <span className="text-xs text-[#EDDABE] opacity-60 w-10">
                  {formatTime(duration)}
                </span>

                {/* Playlist Toggle */}
                {currentRelease.type !== 'SINGLE' && (
                  <button 
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className="p-1.5 hover:bg-[#EDDABE] hover:bg-opacity-10 rounded-full transition-colors ml-2"
                  >
                    <List className="w-5 h-5 text-[#EDDABE]" />
                  </button>
                )}
              </div>
            </>
          ) : (
            // Placeholder content - empty but maintains height
            <div className="w-full h-full"></div>
          )}
        </div>
      </div>

      {/* Playlist Drawer */}
      {showPlaylist && (
        <PlaylistDrawer 
          showPlaylist={showPlaylist} 
          setShowPlaylist={setShowPlaylist} 
        />
      )}
    </>
  );
};

export default AudioPlayer;
