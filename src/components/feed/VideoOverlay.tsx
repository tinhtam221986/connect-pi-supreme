// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Store, Disc, Volume2, VolumeX, Plus, Save, Play, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoOverlay = ({ videoData, isActive }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  const uploader = videoData?.uploader || { username: 'DANG21986' };
  const caption = videoData?.description || "";
  const shortDesc = caption.length > 15 ? caption.substring(0, 15) + "..." : caption;
  const getPos = (gridX, gridY) => ({ left: `${(gridX / 30) * 100}%`, bottom: `${(gridY / 40) * 100}%` });

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
    <div className="absolute inset-0 text-white pointer-events-none z-[50] select-none">
      {/* #17 Search (27.5, 37.5) */}
      <div className="absolute pointer-events-auto" style={getPos(27.5, 37.5)}><Search size={22} /></div>

      {/* Cụm Tương tác Phải (#1-#4) */}
      <div className="absolute right-[8.3%] bottom-[22.5%] flex flex-col gap-6 items-center pointer-events-auto">
        <div className="flex flex-col items-center"><Heart size={26} /><span className="text-[10px] font-bold">{videoData?.stats?.likes || 0}</span></div>
        <div className="flex flex-col items-center"><MessageCircle size={26} /><span className="text-[10px] font-bold">{videoData?.stats?.comments || 0}</span></div>
        <Share2 size={26} /><Bookmark size={26} />
      </div>

      {/* #14 SHOP KHÁCH - Tọa độ (2.5, 7.5) - Nhỏ 2/3, Xuyên thấu */}
      <div className="absolute pointer-events-auto" style={getPos(2.5, 9.5)}>
        <a href={`/profile/${uploader.username}/shop`} className="flex flex-col items-center justify-center w-11 h-11 bg-white/5 backdrop-blur-md rounded-lg border border-yellow-500/40">
          <Store size={18} className="text-yellow-400" />
          <span className="text-[8px] font-black text-yellow-400">SHOP</span>
        </a>
      </div>

      {/* #13 Avatar & #12 Caption - Tọa độ y=3.5 */}
      <div className="absolute pointer-events-auto flex flex-col gap-2" style={{ left: '4%', bottom: '7.5%' }}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} className="w-10 h-10 rounded-full border border-white" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white"><Plus size={8} /></div>
          </div>
          <p className="font-bold text-[14px]">@{uploader.username}</p>
        </div>
        <div onClick={() => setShowFullDesc(!showFullDesc)} className={showFullDesc ? "fixed inset-x-4 bottom-24 bg-black/90 p-5 rounded-2xl h-[40vh] overflow-y-auto z-[110]" : ""}>
          <p className="text-[13px] leading-tight">{showFullDesc ? caption : shortDesc}</p>
        </div>
      </div>

      {/* #11 Đĩa xoay & Menu 3 ngăn */}
      <div className="absolute pointer-events-auto flex items-center gap-3" style={{ left: '4%', bottom: '1.5%' }}>
        <button onClick={() => setShowMusicMenu(!showMusicMenu)} className="animate-spin-slow"><Disc size={22} className="text-zinc-400" /></button>
        <AnimatePresence>
          {showMusicMenu && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2 bg-black/70 backdrop-blur-xl p-1.5 rounded-full border border-white/10">
              <button onClick={() => {setIsMuted(!isMuted); window.dispatchEvent(new CustomEvent('toggle-video-audio', {detail: !isMuted}))}} className="px-2 text-[10px] flex items-center gap-1">
                {isMuted ? <VolumeX size={12} className="text-red-500" /> : <Volume2 size={12} className="text-green-400" />} tắt/mở
              </button>
              <button className="px-2 text-[10px]">lưu</button>
              <button className="px-2 text-[10px] text-yellow-400">sử dụng</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* #18 BOT AI - TRÔI NỔI Z-100 */}
      <motion.div drag dragMomentum={false} className="fixed z-[100] pointer-events-auto" style={{ top: '20%', right: '10%' }}>
        <div className="bg-blue-600 p-2.5 rounded-full border-2 border-white shadow-2xl active:scale-95"><Bot size={24} color="white" /></div>
      </motion.div>
    </div>
  );
};

export default VideoOverlay;
              
