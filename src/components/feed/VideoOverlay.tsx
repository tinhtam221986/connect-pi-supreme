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
  const iconStyle = { filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8))' };

  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, className = '', style = {} }: any) => (
    <div className={`absolute pointer-events-auto flex flex-col items-center justify-center z-50 ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)', ...style }}>
      {children}
    </div>
  );

  return (
    <div className="absolute inset-0 text-white pointer-events-none overflow-hidden select-none bg-transparent z-[50]">
      
      {/* 1. CỤM TƯƠNG TÁC PHẢI (TRẢ VỀ SIZE 24 & VỊ TRÍ CŨ) */}
      <Node x={27.5} y={37.5}><Search size={22} style={iconStyle} strokeWidth={1.5} /></Node>
      <Node x={27.5} y={24}><Heart size={24} style={iconStyle} strokeWidth={2} /><span className="text-[9px] mt-1">{stats.likes || 0}</span></Node>
      <Node x={27.5} y={19}><MessageCircle size={24} style={iconStyle} strokeWidth={2} /><span className="text-[9px] mt-1">{stats.comments || 0}</span></Node>
      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} strokeWidth={2} /></Node>
      <Node x={27.5} y={9.5}><Bookmark size={24} style={iconStyle} strokeWidth={2} /></Node>

      {/* 2. #14 SHOP KHÁCH (TRẢ VỀ SIZE NHỎ 1/2) */}
      <Node x={1.5} y={7.5} className="items-start">
        <Link href={`/shop/${uploader.username}`} className="flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-500/50 active:scale-95 transition-all">
          <Store size={14} className="text-yellow-400" />
          <span className="text-[6px] font-black text-yellow-400">SHOP</span>
        </Link>
      </Node>

      {/* 3. AVATAR & CAPTION (LOGIC BẤM CHỮ TỰ ẨN/HIỆN) */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-1.5" 
           style={{ ...getPos(0, 3.5), width: '75%', left: '1.5%' }}>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full border border-white/70 overflow-hidden shadow-lg">
              <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
           </div>
           <p className="font-bold text-[13px] drop-shadow-md">@{uploader.username}</p>
        </div>
        
        {/* Nhấn vào vùng text này để Toggle cao/thấp */}
        <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
          <p className={`text-[10px] leading-tight drop-shadow-md font-medium bg-black/10 rounded-sm p-0.5 ${isExpanded ? 'max-h-[30vh] overflow-y-auto' : 'line-clamp-1'}`}>
            {isExpanded ? caption : (caption.substring(0, 15) + "...")}
            <span className="ml-1 text-[8px] font-black text-yellow-400 uppercase italic">
              {isExpanded ? ' [Đóng]' : ' ...xem thêm'}
            </span>
          </p>
        </div>
      </div>

      {/* 4. THANH ĐIỀU HƯỚNG CỐ ĐỊNH (SIZE 26 NHƯ CŨ) */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-[100]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
              <Node x={7.0} y={1.2}><ShoppingCart size={26} style={iconStyle} /></Node>
              <Node x={11.0} y={1.2}><Store size={26} style={iconStyle} /></Node>
              <Node x={15.0} y={1.2}><PlusSquare size={28} strokeWidth={2} style={iconStyle} /></Node>
              <Node x={19.0} y={1.2}><Home size={26} style={iconStyle} /></Node>
              <Node x={23.0} y={1.2}><Mail size={26} style={iconStyle} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* #5 MASTER V */}
        <div className="absolute pointer-events-auto cursor-pointer p-3"
          style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
          onClick={(e) => { e.stopPropagation(); toggleNav(); }}
        >
          <ChevronDown size={28} className={`transition-transform duration-300 ${isNavVisible ? '' : 'rotate-180'}`} style={iconStyle} />
        </div>

        {/* 5. CỤM TIỆN ÍCH CHO NGƯỜI GIÀ (TĂNG KÍCH THƯỚC NHẸ & MÀU SẮC) */}
        <div className="absolute left-[4%] bottom-[2.5%] flex items-center gap-4 pointer-events-auto">
          {/* Đĩa xoay: Size 24, xoay tròn, có viền màu */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-0.5 shadow-lg shadow-blue-500/20"
          >
            <Disc size={24} className="text-white" />
          </motion.div>
          
          {/* Loa: Size 22, có màu nhận diện */}
          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX size={22} className="text-red-500" /> : <Volume2 size={22} className="text-green-400 shadow-sm" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default VideoOverlay;
        
