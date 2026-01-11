// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Store, Disc, Volume2, VolumeX, Plus, Save, Play, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const VideoOverlay = ({ videoData, isActive }) => {
  const { isNavVisible } = useNav(); // Lấy trạng thái từ hệ thống Nav tổng
  const [isMuted, setIsMuted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  // Mạch máu dữ liệu thật từ DB (Hồ sơ IV)
  const uploader = videoData?.uploader || { username: 'DANG21986' };
  const stats = videoData?.stats || { likes: 0, comments: 0 };
  const caption = videoData?.description || "Connect-Pi: Supreme Version 2026";
  const shortDesc = caption.length > 15 ? caption.substring(0, 15) + "..." : caption;

  // Hệ tọa độ Vàng 30x40 (Hồ sơ II)
  const getPos = (gridX, gridY) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  // Tự động phát âm thanh khi lướt (Logic 1/3 video)
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsMuted(false);
        window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: false }));
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowFullDesc(false);
      setShowMusicMenu(false);
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[50] select-none overflow-hidden">
      
      {/* #17 KÍNH LÚP - Tọa độ (27.5, 37.5) */}
      <div className="absolute pointer-events-auto" style={getPos(27.5, 37.5)}>
        <Search size={22} className="drop-shadow-lg" />
      </div>

      {/* CỤM TƯƠNG TÁC PHẢI (#1 - #4) */}
      <div className="absolute right-[8.3%] bottom-[22.5%] flex flex-col gap-6 items-center pointer-events-auto">
        <div className="flex flex-col items-center"> {/* #1 Like */}
          <Heart size={26} className="drop-shadow-lg" />
          <span className="text-[10px] font-bold mt-1">{stats.likes}</span>
        </div>
        <div className="flex flex-col items-center"> {/* #2 Comment */}
          <MessageCircle size={26} className="drop-shadow-lg" />
          <span className="text-[10px] font-bold mt-1">{stats.comments}</span>
        </div>
        <Share2 size={26} /> {/* #3 Share */}
        <Bookmark size={26} /> {/* #4 Save */}
      </div>

      {/* #14 SHOP KHÁCH - Tọa độ (2.5, 7.5) - Rỗng ruột, Xuyên thấu */}
      <div className="absolute pointer-events-auto" style={getPos(2.5, 10)}>
        <a href={`/profile/${uploader.username}/shop`} className="flex flex-col items-center justify-center w-12 h-12 bg-black/10 backdrop-blur-sm rounded-lg border border-yellow-500/50 shadow-xl">
          <Store size={20} className="text-yellow-400" />
          <span className="text-[8px] font-black text-yellow-400 mt-1">SHOP</span>
        </a>
      </div>

      {/* #13 AVATAR & #15 FOLLOW - Tọa độ x=4, y=3.5 */}
      <div className="absolute pointer-events-auto flex flex-col gap-2" style={{ left: '4%', bottom: '8%' }}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-lg">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white">
              <Plus size={10} strokeWidth={4} />
            </div>
          </div>
          <p className="font-bold text-[14px] drop-shadow-md">@{uploader.username}</p>
        </div>

        {/* #12 CAPTION - 15 ký tự - Nhấn bung 1/2 màn hình */}
        <div 
          onClick={() => setShowFullDesc(!showFullDesc)}
          className={`max-w-[240px] transition-all duration-300 ${showFullDesc ? 'bg-black/80 p-4 rounded-xl fixed inset-x-4 bottom-20 z-[110] h-[40vh] overflow-y-auto' : ''}`}
        >
          <p className="text-[13px] leading-tight drop-shadow-md">
            {showFullDesc ? caption : shortDesc}
            {!showFullDesc && caption.length > 15 && <span className="text-zinc-400 ml-1 italic">xem thêm</span>}
          </p>
        </div>
      </div>

      {/* #11 ĐĨA XOAY & #16 LOA - Menu 3 ngăn */}
      <div className="absolute pointer-events-auto flex items-center gap-3" style={{ left: '4%', bottom: '2%' }}>
        <button onClick={() => setShowMusicMenu(!showMusicMenu)} className="animate-spin-slow">
          <Disc size={22} className="text-zinc-300" />
        </button>
        <AnimatePresence>
          {showMusicMenu && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex gap-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
              <button onClick={() => { setIsMuted(!isMuted); window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: !isMuted })); }} className="px-2 py-1 flex items-center gap-1">
                {isMuted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} className="text-green-400" />}
                <span className="text-[10px]">tắt/mở</span>
              </button>
              <button className="px-2 py-1 text-[10px] font-bold">lưu</button>
              <button className="px-2 py-1 text-[10px] font-bold text-yellow-400">sử dụng</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* #18 BOT AI - TRÔI NỔI TOÀN CỤC (Z-INDEX 100) */}
      <motion.div drag dragMomentum={false} className="fixed z-[100] pointer-events-auto" style={{ top: '20%', right: '10%' }}>
        <div className="bg-blue-600 p-2.5 rounded-full border-2 border-white shadow-2xl animate-pulse">
          <Bot size={24} color="white" />
        </div>
      </motion.div>
    </div>
  );
};

export default VideoOverlay;
                                                                                
