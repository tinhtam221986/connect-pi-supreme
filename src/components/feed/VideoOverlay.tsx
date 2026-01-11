// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Store, Disc, Volume2, VolumeX, Plus, Music2, Save, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoOverlay = ({ videoData, isActive }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  
  const uploader = videoData?.uploader || { username: 'DANG21986' };
  const desc = videoData?.description || "Connect-Pi: The Supreme Web3 Experience";
  const shortDesc = desc.length > 15 ? desc.substring(0, 15) + "..." : desc;

  // Tự động mở tiếng sau 0.5s khi lướt tới
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

  const handleAudioAction = (action) => {
    if (action === 'toggle') {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: nextMuted }));
    }
    setShowMusicMenu(false);
  };

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[60]">
      
      {/* CỤM TƯƠNG TÁC PHẢI - Nhấc cao lên để không bị che */}
      <div className="absolute right-2 bottom-32 flex flex-col gap-6 items-center pointer-events-auto">
        <div className="flex flex-col items-center">
          <Heart size={32} className="drop-shadow-lg text-white fill-none" />
          <span className="text-[11px] font-bold mt-1">{videoData?.stats?.likes || 0}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle size={32} className="drop-shadow-lg" />
          <span className="text-[11px] font-bold mt-1">{videoData?.stats?.comments || 0}</span>
        </div>
        <Share2 size={32} />
        <Bookmark size={32} />
      </div>

      {/* THÔNG TIN BÊN TRÁI - Nhấc cao lên tầm 80px từ đáy */}
      <div className="absolute left-3 bottom-20 w-[75%] pointer-events-auto flex flex-col gap-3">
        
        {/* Nút Shop: Rỗng ruột, kích thước 2/3 */}
        <div className="mb-1">
          <button className="flex flex-col items-center justify-center w-11 h-11 bg-black/20 backdrop-blur-sm rounded-lg border border-yellow-500/60 active:scale-90 transition-all">
            <Store size={20} className="text-yellow-400" />
            <span className="text-[8px] font-bold text-yellow-400 leading-none mt-1 uppercase">SHOP</span>
          </button>
        </div>

        {/* Avatar + Nút Follow (+) */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-lg bg-zinc-800">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white">
              <Plus size={10} strokeWidth={4} />
            </div>
          </div>
          <p className="font-bold text-[15px] drop-shadow-md">@{uploader.username}</p>
        </div>
        
        {/* Dòng mô tả 15 ký tự - Nhấn để bung 1/2 màn hình */}
        <div 
          onClick={() => setShowFullDesc(!showFullDesc)}
          className={`transition-all duration-300 ${showFullDesc ? 'bg-black/80 p-3 rounded-t-2xl h-[45vh] overflow-y-auto fixed bottom-0 left-0 right-0 z-[110] pointer-events-auto' : 'bg-transparent'}`}
        >
          <p className={`${showFullDesc ? 'text-[15px]' : 'text-[13px]'} leading-tight drop-shadow-md`}>
            {showFullDesc ? desc : shortDesc}
            {desc.length > 15 && !showFullDesc && <span className="text-zinc-400 ml-1 italic">xem thêm</span>}
          </p>
          {showFullDesc && <button className="mt-4 text-red-400 font-bold" onClick={(e) => {e.stopPropagation(); setShowFullDesc(false)}}>Thu gọn</button>}
        </div>

        {/* CỤM ĐĨA XOAY & MENU 3 NGĂN */}
        <div className="relative flex items-center mt-2">
          <button 
            onClick={() => setShowMusicMenu(!showMusicMenu)}
            className="relative z-10 p-1 bg-black/40 rounded-full border border-white/20 animate-spin-slow"
          >
            <Disc size={24} className="text-zinc-300" />
          </button>

          <AnimatePresence>
            {showMusicMenu && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 10 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-8 flex gap-2 bg-black/60 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl"
              >
                <button onClick={() => handleAudioAction('toggle')} className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20">
                  {isMuted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} className="text-green-400" />}
                  <span className="text-[10px] font-bold">tắt/mở</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
                  <Save size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold">lưu</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-yellow-400">
                  <Play size={14} />
                  <span className="text-[10px] font-bold text-white">sử dụng</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
                    
