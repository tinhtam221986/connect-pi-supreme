// @ts-nocheck
'use client';
import React, { useRef, useEffect } from 'react';

export default function VideoPlayer({ src, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleAudio = (e) => { if (videoRef.current) videoRef.current.muted = e.detail; };
    window.addEventListener('toggle-video-audio', handleAudio);
    
    if (videoRef.current) {
      if (isActive) videoRef.current.play().catch(() => {});
      else { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    }
    return () => window.removeEventListener('toggle-video-audio', handleAudio);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video ref={videoRef} src={src} className="max-h-full max-w-full object-contain" loop playsInline muted />
    </div>
  );
}
