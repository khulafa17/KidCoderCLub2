import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  // Fun background music URLs (royalty-free kids music)
  const musicTracks = [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder - you'll need actual music URLs
    // Add more music URLs here
  ];

  useEffect(() => {
    // Check if user has music preference saved
    const musicPreference = localStorage.getItem('kidcoder-music');
    if (musicPreference === 'enabled') {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log('Audio play failed:', e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    localStorage.setItem('kidcoder-music', !isPlaying ? 'enabled' : 'disabled');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-purple-200">
        <div className="flex items-center space-x-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isPlaying 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-full transition-all duration-300 ${
              isMuted 
                ? 'bg-red-100 text-red-600' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Volume Slider */}
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Music Note Animation */}
          {isPlaying && (
            <div className="flex space-x-1">
              <div className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0ms' }}></div>
              <div className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ height: '16px', animationDelay: '150ms' }}></div>
              <div className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ height: '10px', animationDelay: '300ms' }}></div>
            </div>
          )}
        </div>

        {/* Music Title */}
        {isPlaying && (
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-600 font-medium">🎵 Happy Coding Music</p>
          </div>
        )}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* Using a simple tone generator for demo - replace with actual music files */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;