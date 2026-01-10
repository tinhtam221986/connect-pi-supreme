'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Chúng ta sử dụng dynamic import để tránh lỗi đồng bộ dữ liệu lúc khởi tạo
const VideoFeed = dynamic(() => import('@/components/feed/VideoFeed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-zinc-500 text-sm animate-pulse">Đang kết nối hệ thống Pi...</p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* VideoFeed sẽ chiếm toàn bộ màn hình trang chủ */}
      <VideoFeed />
    </main>
  );
}
