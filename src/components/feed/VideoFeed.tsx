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
  stats: any; // Add stats to the interface
}

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.feed.get();
        if (response.error) {
          console.warn("API returned a fallback scenario:", response.error.message);
          setErrorMessage(response.error.message);
          setVideos(response.fallbackData || []);
        } else {
          setVideos(response);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setErrorMessage("Could not connect to the server. Please check your network.");
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

  // If there are no videos and no error message, show a loading state.
  if (videos.length === 0 && !errorMessage) {
    return (
      <div className="flex items-center justify-center h-[100dvh] text-white bg-black font-bold">
        <div className="animate-pulse">Loading Feed...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      {errorMessage && (
        <div className="absolute top-0 left-0 right-0 z-[60] bg-red-800/90 text-white text-xs text-center p-2 backdrop-blur-sm">
          {errorMessage}
        </div>
      )}

      <div
        ref={feedRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
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
