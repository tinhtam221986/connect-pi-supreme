// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Store, Disc, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoOverlay = ({ videoData, isActive }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const desc = videoData?.description || "";
  const shortDesc = desc.length > 15 ? desc.substring(0, 15) + "..." : desc;

  // Tự động bật tiếng khi lướt (khi video bắt đầu active)
  useEffect(() => {
    if (isActive) {
      // Logic: Nếu video được active, gửi tín hiệu bật âm thanh
      const timer = setTimeout(() => {
        setIsMuted(false);
        window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: false }));
      }, 500); // Trễ 0.5s để đảm bảo người dùng đã lướt xong 1/3 video
      return () => clearTimeout(timer);
    } else {
      setShowFullDesc(false); // Tự động thu gọn khi lướt qua video khác
    }
  }, [isActive]);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: nextMuted }));
  };

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[50]">
      
      {/* CỤM TƯƠNG TÁC PHẢI - Cố định tọa độ vàng */}
      <div className="absolute right-2 bottom-28 flex flex-col gap-5 items-center pointer-events-auto">
        <div className="flex flex-col items-center">
          <Heart size={30} className="drop-shadow-md" />
          <span className="text-[11px] font-bold mt-1">{videoData?.stats?.likes || 0}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle size={30} className="drop-shadow-md" />
          <span className="text-[11px] font-bold mt-1">{videoData?.stats?.comments || 0}</span>
        </div>
        <Share2 size={30} />
        <Bookmark size={30} />
      </div>

      {/* THÔNG TIN BÊN TRÁI & NÚT SHOP MỚI */}
      <div className="absolute left-3 bottom-8 w-[70%] pointer-events-auto flex flex-col gap-3">
        
        {/* Nút Shop: Thu gọn 1/3, nâng cao */}
        <div className="mb-2">
          <button className="flex flex-col items-center justify-center w-14 h-14 bg-yellow-500/90 rounded-xl border-2 border-white shadow-2xl scale-90 active:scale-75 transition-transform">
            <Store size={22} className="text-black" />
            <span className="text-[9px] font-black text-black leading-none mt-1">SHOP</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${videoData?.uploader?.username}`} />
          </div>
          <p className="font-bold text-sm">@{videoData?.uploader?.username || 'user'}</p>
        </div>
        
        {/* Dòng mô tả 15 ký tự & Bung lên 1/2 màn hình */}
        <div 
          onClick={() => setShowFullDesc(!showFullDesc)}
          className={`bg-black/20 rounded-lg p-1 transition-all duration-300 ${showFullDesc ? 'max-h-[40vh] overflow-y-auto bg-black/60 backdrop-blur-md' : ''}`}
        >
          <p className="text-[13px] leading-tight drop-shadow-md">
            {showFullDesc ? desc : shortDesc}
            {desc.length > 15 && !showFullDesc && <span className="text-blue-400 ml-1">...xem thêm</span>}
          </p>
        </div>

        {/* Loa & Đĩa quay */}
        <div className="flex items-center gap-4">
          <button onClick={toggleAudio} className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-400" />}
          </button>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full border border-white/5">
            <Disc size={16} className="animate-spin-slow text-zinc-400" />
            <span className="text-[10px] text-zinc-300">Âm thanh gốc</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
