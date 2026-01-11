// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Store, Disc, Volume2, VolumeX, Plus, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoOverlayProps {
  videoData?: any;
  isActive?: boolean;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoData, isActive }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  // Mạch máu dữ liệu thực từ hồ sơ quy hoạch
  const uploader = videoData?.uploader || { username: 'DANG21986' };
  const caption = videoData?.description || "Connect-Pi: Supreme Version 2026";
  const stats = videoData?.stats || { likes: 0, comments: 0 };
  const shortDesc = caption.length > 15 ? caption.substring(0, 15) + "..." : caption;

  // Hệ tọa độ Vàng 30x40
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsMuted(false);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: false }));
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowFullDesc(false);
      setShowMusicMenu(false);
    }
  }, [isActive]);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: nextMuted }));
    }
  };

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[50] select-none overflow-hidden">
      
      {/* #17 Search (27.5, 37.5) */}
      <div className="absolute pointer-events-auto" style={getPos(27.5, 37.5)}>
        <Search size={22} className="drop-shadow-lg" />
      </div>

      {/* CỤM TƯƠNG TÁC PHẢI (#1 - #4) */}
      <div className="absolute right-[8.3%] bottom-[22.5%] flex flex-col gap-6 items-center pointer-events-auto">
        <div className="flex flex-col items-center">
          <Heart size={26} className="drop-shadow-lg" />
          <span className="text-[10px] font-bold mt-1">{stats.likes}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle size={26} className="drop-shadow-lg" />
          <span className="text-[10px] font-bold mt-1">{stats.comments}</span>
        </div>
        <Share2 size={26} />
        <Bookmark size={26} />
      </div>

      {/* #14 SHOP KHÁCH - Tọa độ (2.5, 9.5) - Rỗng ruột, Xuyên thấu */}
      <div className="absolute pointer-events-auto" style={getPos(2.5, 9.5)}>
        <button className="flex flex-col items-center justify-center w-11 h-11 bg-white/5 backdrop-blur-md rounded-lg border border-yellow-500/40">
          <Store size={18} className="text-yellow-400" />
          <span className="text-[8px] font-black text-yellow-400 mt-1 uppercase">SHOP</span>
        </button>
      </div>

      {/* #13 AVATAR & #12 CAPTION - Tọa độ y=3.5 chuẩn hồ sơ */}
      <div className="absolute pointer-events-auto flex flex-col gap-2" style={{ left: '4%', bottom: '7.5%' }}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border border-white overflow-hidden shadow-lg bg-zinc-800">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} 
                alt="avatar"
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white">
              <Plus size={8} strokeWidth={4} />
            </div>
          </div>
          <p className="font-bold text-[14px] drop-shadow-md">@{uploader.username}</p>
        </div>

        {/* #12 CAPTION - Nhấn bung 1/2 màn hình */}
        <div 
          onClick={() => setShowFullDesc(!showFullDesc)}
          className={`max-w-[240px] transition-all duration-300 ${showFullDesc ? 'bg-black/90 p-4 rounded-xl fixed inset-x-4 bottom-24 z-[110] h-[40vh] overflow-y-auto pointer-events-auto' : ''}`}
        >
          <p className="text-[13px] leading-tight drop-shadow-md">
            {showFullDesc ? caption : shortDesc}
            {!showFullDesc && caption.length > 15 && <span className="text-zinc-400 ml-1 italic">xem thêm</span>}
          </p>
          {showFullDesc && (
            <button className="mt-4 text-red-400 font-bold text-xs" onClick={(e) => { e.stopPropagation(); setShowFullDesc(false); }}>
              Đóng lại
            </button>
          )}
        </div>
      </div>

      {/* #11 ĐĨA XOAY & MENU 3 NGĂN */}
      <div className="absolute pointer-events-auto flex items-center gap-3" style={{ left: '4%', bottom: '1.5%' }}>
        <button onClick={() => setShowMusicMenu(!showMusicMenu)} className="relative z-10 p-1 bg-black/20 rounded-full border border-white/10">
          <Disc size={22} className={`text-zinc-300 ${isActive ? 'animate-spin-slow' : ''}`} />
        </button>
        <AnimatePresence>
          {showMusicMenu && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }} 
              className="flex gap-2 bg-black/60 backdrop-blur-xl p-1 rounded-full border border-white/10"
            >
              <button onClick={handleToggleAudio} className="px-2 py-1 flex items-center gap-1">
                {isMuted ? <VolumeX size={12} className="text-red-500" /> : <Volume2 size={12} className="text-green-400" />}
                <span className="text-[10px] font-bold">tắt/mở</span>
              </button>
              <button className="px-2 text-[10px] font-bold">lưu</button>
              <button className="px-2 text-[10px] font-bold text-yellow-400 uppercase">sử dụng</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* #18 BOT AI - TRÔI NỔI TỰ DO */}
      <motion.div 
        drag 
        dragMomentum={false} 
        className="fixed z-[120] pointer-events-auto shadow-2xl" 
        style={{ top: '20%', right: '10%' }}
      >
        <div className="bg-blue-600 p-2.5 rounded-full border-2 border-white animate-pulse">
          <Bot size={24} color="white" />
        </div>
      </motion.div>
    </div>
  );
};

export default VideoOverlay;
            
