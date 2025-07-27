
import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, VolumeUpIcon } from './icons/Icons';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="flex items-center gap-4 p-4 bg-brand-blue-50 border border-brand-blue-200 rounded-lg">
      <audio ref={audioRef} src={src} preload="metadata"></audio>
      <button
        onClick={togglePlayPause}
        className="p-3 bg-brand-blue-600 text-white rounded-full hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-transform transform hover:scale-105"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
      </button>
      <div className="flex items-center gap-2">
        <VolumeUpIcon className="h-6 w-6 text-brand-blue-600" />
        <p className="font-medium text-brand-blue-800">Listen to the melody</p>
      </div>
    </div>
  );
};

export default AudioPlayer;
