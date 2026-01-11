'use client';
import React, { useState, useRef, useEffect } from 'react';
// Nếu HeartOverlay cũng đang bị đỏ, hãy tạm ẩn dòng này hoặc đảm bảo file đó đã có.
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
    const video = videoRef.current;
    if (video) {
      if (isActive) {
        video.muted = true; // Bắt buộc muted để tự chạy
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Auto-play bị chặn bởi trình duyệt:", error);
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isActive]);

  const handleDoubleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      let x = 0, y = 0;
      
      if ('touches' in e) {
        const touch = (e as React.TouchEvent).touches[0];
        if (touch) {
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        }
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
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center pointer-events-auto"
      onMouseDown={handleDoubleTap}
      onTouchStart={handleDoubleTap}
    >
      <video 
        ref={videoRef}
        src={src} 
        className="w-full h-full object-cover" 
        loop 
        muted
        playsInline
        autoPlay
        // Đã sửa: Chuyển webkit-playsinline sang dạng React chuẩn
        {...{ "webkit-playsinline": "true" } as any}
      />
      
      {/* Lớp phủ trái tim khi double tap */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <HeartOverlay hearts={hearts} />
      </div>
    </div>
  );
}
