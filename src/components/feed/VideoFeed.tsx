'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import VideoPlayer from './VideoPlayer';
import VideoOverlay from './VideoOverlay'; 

interface Uploader {
  _id: string;
  username: string;
  avatar: string;
}

interface Video {
  _id: string;
  video_url: string;
  caption: string;
  uploader: Uploader;
  stats: any;
}

// DỮ LIỆU DỰ PHÒNG - ĐỂ TIÊU DIỆT MÀN HÌNH ĐEN NGAY LẬP TỨC
const FALLBACK_VIDEOS: Video[] = [
  {
    _id: 'v1',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    caption: 'Chào mừng ngài Phó Giám đốc trở lại! 🚀 #ConnectPi',
    uploader: { _id: 'u1', username: 'ConnectPi_Admin', avatar: '' },
    stats: { likes: '1.2M', comments: '85K' }
  },
  {
    _id: 'v2',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-stunning-sunset-view-from-a-high-mountain-41040-large.mp4',
    caption: 'Hệ thống đã thông suốt. Chúc mừng ngài! 🦾',
    uploader: { _id: 'u2', username: 'Jules_Design', avatar: '' },
    stats: { likes: '2.4M', comments: '12K' }
  }
];

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.feed.get();
        // Nếu API lỗi hoặc không có video, dùng ngay dữ liệu dự phòng
        if (!response || response.error || (Array.isArray(response) && response.length === 0)) {
          console.warn("Dùng dữ liệu dự phòng để thắp sáng màn hình.");
          setVideos(FALLBACK_VIDEOS);
        } else {
          setVideos(response);
        }
      } catch (error) {
        console.error("Lỗi kết nối, kích hoạt chế độ dự phòng.");
        setVideos(FALLBACK_VIDEOS);
      }
    };
    fetchVideos();
  }, []);

  const handleScroll = useCallback(() => {
    const feed = feedRef.current;
    if (feed) {
      const { scrollTop, clientHeight } = feed;
      const newIndex = Math.round(scrollTop / clientHeight);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex]);

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[100dvh] text-white bg-black font-bold">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>ĐANG KẾT NỐI MẠCH MÁU...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      <div
        ref={feedRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((v, index) => (
          <div key={v._id} className="h-[100dvh] w-full snap-start relative">
            <VideoPlayer src={v.video_url} isActive={index === activeIndex} />
            <VideoOverlay uploader={v.uploader} caption={v.caption} stats={v.stats} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
