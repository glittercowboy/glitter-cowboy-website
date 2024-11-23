import React, { createContext, useContext, ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import { Track, Release } from '../types';
import { shuffleArray } from '../utils/arrayUtils';

interface AudioContextType {
  play: (url: string) => void;
  pause: () => void;
  playTrack: (track: Track, release: Release) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  currentTrack: Track | null;
  currentRelease: Release | null;
  progress: number;
  duration: number;
  seekTo: (time: number) => void;
  allReleases: Release[];
  setAllReleases: (releases: Release[]) => void;
  isShuffled: boolean;
  toggleShuffle: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);
  const [allReleases, setAllReleases] = useState<Release[]>([]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledTracks, setShuffledTracks] = useState<Array<{track: Track, release: Release}>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Helper function to get all tracks from all releases
  const getAllTracks = useCallback(() => {
    return allReleases.flatMap(release => 
      release.tracks.map(track => ({
        track,
        release
      }))
    );
  }, [allReleases]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev);
    if (!isShuffled) {
      setShuffledTracks(shuffleArray(getAllTracks()));
    }
  }, [isShuffled, getAllTracks]);

  const findNextTrack = useCallback(() => {
    if (!currentTrack || !currentRelease || allReleases.length === 0) return null;

    if (isShuffled) {
      const currentIndex = shuffledTracks.findIndex(item => 
        item.track.id === currentTrack.id && item.release.id === currentRelease.id
      );
      
      if (currentIndex < shuffledTracks.length - 1) {
        return shuffledTracks[currentIndex + 1];
      }
      // If we're at the end of the shuffled tracks, start over
      return shuffledTracks[0];
    }

    // Non-shuffled behavior remains the same
    // Try next track in current release
    if (currentRelease.tracks.findIndex(t => t.id === currentTrack.id) < currentRelease.tracks.length - 1) {
      return {
        track: currentRelease.tracks[currentRelease.tracks.findIndex(t => t.id === currentTrack.id) + 1],
        release: currentRelease
      };
    }

    // Try first track of next release
    if (allReleases.findIndex(r => r.id === currentRelease.id) < allReleases.length - 1) {
      const nextRelease = allReleases[allReleases.findIndex(r => r.id === currentRelease.id) + 1];
      if (nextRelease.tracks.length > 0) {
        return {
          track: nextRelease.tracks[0],
          release: nextRelease
        };
      }
    }

    return null;
  }, [currentTrack, currentRelease, allReleases, isShuffled, shuffledTracks]);

  const findPreviousTrack = () => {
    if (!currentTrack || !currentRelease || allReleases.length === 0) return null;

    const releaseIndex = allReleases.findIndex(r => r.id === currentRelease.id);
    if (releaseIndex === -1) return null;

    const release = allReleases[releaseIndex];
    const trackIndex = release.tracks.findIndex(t => t.id === currentTrack.id);

    // Try previous track in current release
    if (trackIndex > 0) {
      return {
        track: release.tracks[trackIndex - 1],
        release: release
      };
    }

    // Try last track of previous release
    if (releaseIndex > 0) {
      const previousRelease = allReleases[releaseIndex - 1];
      if (previousRelease.tracks.length > 0) {
        return {
          track: previousRelease.tracks[previousRelease.tracks.length - 1],
          release: previousRelease
        };
      }
    }

    return null;
  };

  const playTrack = useCallback((track: Track, release: Release) => {
    console.log('Playing track:', track, 'from release:', release);
    if (audioRef.current) {
      audioRef.current.src = track.trackUrl;
      audioRef.current.play().catch(error => console.error('Error playing track:', error));
      setIsPlaying(true);
      setCurrentTrack(track);
      setCurrentRelease(release);
      
      // When starting playback from a new track, reshuffle all tracks if shuffle is enabled
      if (isShuffled) {
        setShuffledTracks(shuffleArray(getAllTracks()));
      }
    }
  }, [isShuffled, getAllTracks]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
        setProgress(audio.currentTime);
      };

      const handleDurationChange = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        console.log('Track ended, finding next track');
        const next = findNextTrack();
        if (next) {
          console.log('Found next track:', next.track.title);
          playTrack(next.track, next.release);
        } else {
          console.log('No next track found, playback stopped');
          setIsPlaying(false);
          setProgress(0);
        }
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('durationchange', handleDurationChange);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('durationchange', handleDurationChange);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [findNextTrack, playTrack]);

  const play = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    console.log('Playing next track. Current track:', currentTrack?.title);
    const next = findNextTrack();
    if (next) {
      console.log('Found next track:', next.track.title);
      playTrack(next.track, next.release);
    }
  };

  const playPrevious = () => {
    console.log('Playing previous track. Current track:', currentTrack?.title);
    const previous = findPreviousTrack();
    if (previous) {
      console.log('Found previous track:', previous.track.title);
      playTrack(previous.track, previous.release);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        pause();
      } else {
        audioRef.current.play().catch(error => console.error('Error toggling play:', error));
        setIsPlaying(true);
      }
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return (
    <AudioContext.Provider value={{
      play,
      pause,
      playTrack,
      playNext,
      playPrevious,
      togglePlay,
      isPlaying,
      currentTrack,
      currentRelease,
      progress,
      duration,
      seekTo,
      allReleases,
      setAllReleases,
      isShuffled,
      toggleShuffle
    }}>
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
};
