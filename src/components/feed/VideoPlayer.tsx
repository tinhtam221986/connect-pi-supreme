'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function VideoPlayer({ src, isActive }: { src: string; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
      <video 
        ref={videoRef}
        src={src} 
        className="w-full h-full object-cover" 
        loop 
        playsInline
        muted={true} // Bắt buộc muted để tự chạy, tiếng sẽ điều khiển qua nút Loa ở Overlay
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <Play size={40} fill="white" className="text-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
