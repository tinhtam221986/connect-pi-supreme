'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import VideoFeed một cách an toàn để không bị lỗi SSR
const VideoFeed = dynamic(() => import('@/components/feed/VideoFeed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
    </div>
  )
});

export default function HomePage() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <VideoFeed />
    </main>
  );
}
