// @ts-nocheck
'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function VideoPlayer({ src, isActive }: { src: string; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleAudioToggle = (e: any) => {
      if (videoRef.current) {
        videoRef.current.muted = e.detail;
        setIsMuted(e.detail);
      }
    };
    window.addEventListener('toggle-video-audio', handleAudioToggle);
    
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
    return () => window.removeEventListener('toggle-video-audio', handleAudioToggle);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video 
        ref={videoRef}
        src={src} 
        className="max-h-full max-w-full object-contain" 
        loop 
        playsInline
        muted={isMuted}
      />
    </div>
  );
}
