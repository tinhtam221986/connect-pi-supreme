// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Store, Disc, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoOverlay = ({ videoData, isActive }: any) => {
  const [isMuted, setIsMuted] = useState(true);
  const uploader = videoData?.uploader || {};
  const stats = videoData?.stats || { likes: 0, comments: 0 };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: nextMuted }));
  };

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[40]">
      {/* CỤM NÚT TƯƠNG TÁC PHẢI - Căn giữa chiều dọc */}
      <div className="absolute right-2 bottom-28 flex flex-col gap-5 items-center pointer-events-auto">
        <div className="flex flex-col items-center">
          <Heart size={30} className="drop-shadow-md" />
          <span className="text-[11px] font-bold mt-1">{stats.likes}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle size={30} className="drop-shadow-md" />
          <span className="text-[11px] font-bold mt-1">{stats.comments}</span>
        </div>
        <Share2 size={30} className="drop-shadow-md" />
        <Bookmark size={30} className="drop-shadow-md" />
      </div>

      {/* THÔNG TIN BÊN TRÁI - Hạ thấp xuống sát thanh điều hướng */}
      <div className="absolute left-3 bottom-6 w-[75%] pointer-events-auto flex flex-col gap-2">
        {/* Nút Shop chuẩn kích cỡ (Không bị tràn ngang) */}
        <div className="flex">
          <button className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full border border-yellow-500/50 shadow-lg">
            <Store size={14} className="text-yellow-400" />
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-tighter">Cửa hàng khách</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden shadow-lg">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avatar" />
          </div>
          <p className="font-bold text-sm shadow-black drop-shadow-md">@{uploader.username || 'user'}</p>
        </div>
        
        <p className="text-[13px] leading-tight drop-shadow-md line-clamp-2 pr-4">
          {videoData?.description || videoData?.caption}
        </p>

        {/* Cụm Loa và Đĩa nhạc */}
        <div className="flex items-center gap-4 mt-1">
          <button onClick={toggleAudio} className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-400" />}
          </button>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
            <Disc size={16} className="animate-spin-slow text-zinc-400" />
            <span className="text-[10px] text-zinc-300 max-w-[100px] truncate">Âm thanh gốc - {uploader.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
