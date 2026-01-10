'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, Search, ShoppingCart, Home, PlusSquare, Mail, ChevronDown, Store, Disc, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const VideoOverlay = ({ uploader = { username: 'Unknown User', avatar: '' }, caption = '', stats = { likes: 0, comments: 0 } }) => {
  const { isNavVisible, toggleNav } = useNav();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iconStyle = { filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 1))' };

  // TỌA ĐỘ GRID CHUẨN
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  return (
    <div className="absolute inset-0 text-white pointer-events-none select-none z-[50]">
      
      {/* 1. CỤM TƯƠNG TÁC PHẢI - GIỮ NGUYÊN VỊ TRÍ */}
      <div className="absolute right-[2%] bottom-[20%] flex flex-col items-center gap-6 pointer-events-auto">
        <Search size={24} style={iconStyle} />
        <div className="flex flex-col items-center">
          <Heart size={28} style={iconStyle} strokeWidth={2.5} />
          {stats.likes > 0 && <span className="text-[10px] font-bold">{stats.likes}</span>}
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle size={28} style={iconStyle} />
          {stats.comments > 0 && <span className="text-[10px] font-bold">{stats.comments}</span>}
        </div>
        <Share2 size={28} style={iconStyle} />
        <Bookmark size={28} style={iconStyle} />
      </div>

      {/* 2. CỤM THÔNG TIN & CAPTION (FIX LỖI BAY MÀN HÌNH) */}
      <div className="absolute bottom-[8%] left-[1.5%] w-[70%] pointer-events-auto flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-xl bg-zinc-800">
              <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
           </div>
           <p className="font-bold text-[14px] drop-shadow-lg">@{uploader.username}</p>
        </div>

        {/* VÙNG CAPTION: Tối đa 1/2 màn hình, có thể cuộn */}
        <div className={`transition-all duration-300 overflow-hidden bg-black/20 rounded-lg p-2 ${isExpanded ? 'max-h-[40vh] overflow-y-auto' : 'max-h-[40px]'}`}>
          <p className="text-[11px] leading-snug drop-shadow-md">
            {isExpanded ? caption : (caption.substring(0, 15) + "...")}
            <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2 text-yellow-400 font-black uppercase text-[9px]">
              {isExpanded ? ' Thu gọn' : ' Xem thêm'}
            </button>
          </p>
        </div>
      </div>

      {/* 3. #14 SHOP KHÁCH (DỊCH LÊN TRÊN AVATAR MỘT CHÚT) */}
      <div className="absolute bottom-[22%] left-[1.5%] pointer-events-auto">
        <Link href={`/shop/${uploader.username}`} className="flex flex-col items-center p-1.5 bg-black/60 rounded-md border-2 border-yellow-500 active:scale-90">
          <Store size={18} className="text-yellow-400" />
          <span className="text-[7px] font-black text-yellow-400">SHOP</span>
        </Link>
      </div>

      {/* 4. THANH ĐIỀU HƯỚNG CỐ ĐỊNH (FIXED - CHỐNG TRÔI TUYỆT ĐỐI) */}
      <div className="fixed bottom-0 left-0 right-0 h-[65px] bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-[100]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} className="flex justify-around items-center h-full px-4 pointer-events-auto">
              <ShoppingCart size={28} style={iconStyle} />
              <Store size={28} style={iconStyle} />
              <PlusSquare size={32} strokeWidth={2.5} className="text-white" />
              <Home size={28} style={iconStyle} />
              <Mail size={28} style={iconStyle} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* NÚT MASTER V */}
        <div className="absolute right-4 bottom-4 pointer-events-auto cursor-pointer" onClick={toggleNav}>
          <ChevronDown size={32} className={`transition-transform duration-300 ${isNavVisible ? '' : 'rotate-180'}`} style={iconStyle} />
        </div>

        {/* 5. CỤM TIỆN ÍCH CHO NGƯỜI CAO TUỔI (LỚN HƠN 3/2) */}
        <div className="absolute left-4 bottom-4 flex items-center gap-4 pointer-events-auto">
          {/* Đĩa xoay màu sắc + Chuyển động quay */}
          <div className="relative flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="p-1 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 shadow-inner shadow-black"
            >
              <Disc size={26} className="text-white drop-shadow-md" />
            </motion.div>
          </div>
          
          {/* Nút loa lớn cho người già */}
          <button onClick={() => setIsMuted(!isMuted)} className="p-1 bg-white/10 rounded-full active:scale-125 transition-transform">
            {isMuted ? <VolumeX size={24} className="text-red-500" /> : <Volume2 size={24} className="text-green-400" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default VideoOverlay;
