'use client';
import React, { useState, useRef, useEffect } from 'react';
import { HeartOverlay } from './HeartOverlay';

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
}

export default function VideoPlayer({ src, isActive }: VideoPlayerProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTap = useRef<number>(0);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        // QUAN TRỌNG: Phải ép Muted = true thì Pi Browser mới cho AutoPlay
        videoRef.current.muted = true; 
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const handleDoubleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      let x, y;
      if ('touches' in e && e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = (e as React.MouseEvent).clientX - rect.left;
        y = (e as React.MouseEvent).clientY - rect.top;
      }
      const newHeart = { id: now, x, y };
      setHearts(prev => [...prev, newHeart]);
      setTimeout(() => setHearts(prev => prev.filter(h => h.id !== newHeart.id)), 1000);
    }
    lastTap.current = now;
  };

  return (
    <div 
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center"
      onMouseDown={handleDoubleTap}
      onTouchStart={handleDoubleTap}
    >
      <video 
        ref={videoRef}
        src={src} 
        className="w-full h-full object-cover pointer-events-none" 
        loop 
        muted
        playsInline
        webkit-playsinline="true"
      />
      <div className="absolute inset-0 pointer-events-none z-10">
        <HeartOverlay hearts={hearts} />
      </div>
    </div>
  );
}
