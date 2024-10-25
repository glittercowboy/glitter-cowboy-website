import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from './AudioContext';
import { Play, Pause } from 'lucide-react';

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
    paddingRight: '50px' // Add spacing between repetitions
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

const AudioPlayer = () => {
  const { currentTrack, isPlaying, progress, duration, togglePlay, seekTo } = useAudio();

  if (!currentTrack) return null;

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
          {/* Play/Pause Button */}
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

          {/* Artwork */}
          <img 
            src={currentTrack.artwork} 
            alt={currentTrack.title}
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

          {/* Time and Progress Bar */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;