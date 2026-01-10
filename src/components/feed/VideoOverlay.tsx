'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, Search, ShoppingCart, Home, PlusSquare, Mail, ChevronDown, Store, Disc, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const VideoOverlay = ({ uploader = { username: '@Pioneer', avatar: '' }, caption = '', stats = { likes: '1.2K', comments: '45' } }) => {
  const { isNavVisible, toggleNav } = useNav();
  const iconStyle = { filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.9))' };

  // HỆ TỌA ĐỘ GRID 30x40 - BẤT KHẢ XÂM PHẠM
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
    <div className="absolute inset-0 text-white pointer-events-none overflow-hidden select-none bg-transparent">
      
      {/* 1. CỤM TƯƠNG TÁC PHẢI (x=27.5) */}
      <Node x={27.5} y={37.5}><Search size={22} style={iconStyle} strokeWidth={1.5} /></Node>
      
      <Node x={27.5} y={24}>
        <button className="active:scale-90 transition-transform">
          {/* NÚT TIM RỖNG RUỘT THEO YÊU CẦU */}
          <Heart size={24} style={iconStyle} strokeWidth={2} />
        </button>
        <span className="text-[9px] font-bold mt-1">{stats.likes}</span>
      </Node>

      <Node x={27.5} y={19}>
        <button className="active:scale-90">
          <MessageCircle size={24} style={iconStyle} strokeWidth={2} />
        </button>
        <span className="text-[9px] font-bold mt-1">{stats.comments}</span>
      </Node>

      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} strokeWidth={2} /></Node>
      <Node x={27.5} y={9}><Bookmark size={24} style={iconStyle} strokeWidth={2} /></Node>

      {/* 2. #14 SHOP KHÁCH (THU NHỎ 1/2) - x=1.5 (Dịch sát lề hơn) */}
      <Node x={1.5} y={7.5} className="items-start">
        <Link href={`/shop/${uploader.username}`} className="flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-500/50 active:scale-95 transition-all">
          <Store size={14} className="text-yellow-400" />
          <span className="text-[6px] font-black text-yellow-400">SHOP</span>
        </Link>
      </Node>

      {/* 3. #13 AVATAR & #12 CAPTION (DỊCH SÁT LỀ TRÁI 1/3) */}
      {/* Thay đổi left từ 4% xuống còn 1.5% để sát mép màn hình */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-1.5" 
           style={{ ...getPos(0, 3.5), width: '80%', left: '1.5%' }}>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full border border-white/70 overflow-hidden shadow-lg">
              <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
           </div>
           <p className="font-bold text-[13px] drop-shadow-lg text-white">@{uploader.username}</p>
        </div>
        <p className="text-[10px] leading-tight drop-shadow-md font-medium line-clamp-2 bg-black/10 rounded-sm p-0.5">
          {caption || "Connect Supreme - Pioneer Social Network"}
        </p>
      </div>

      {/* 4. THANH ĐIỀU HƯỚNG ĐÁY (y=1.2) */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.2 }}>
            <Node x={7.0} y={1.2}><ShoppingCart size={26} style={iconStyle} /></Node>
            <Node x={11.0} y={1.2}><Store size={26} style={iconStyle} /></Node>
            <Node x={15.0} y={1.2}><PlusSquare size={28} strokeWidth={2} style={iconStyle} /></Node>
            <Node x={19.0} y={1.2}><Home size={26} style={iconStyle} /></Node>
            <Node x={23.0} y={1.2}><Mail size={26} style={iconStyle} /></Node>
          </motion.div>
        )}
      </AnimatePresence>

      {/* #5 MASTER V (x=27.5, y=1.2) */}
      <div className="absolute pointer-events-auto cursor-pointer p-2 z-[70]"
        style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
        onClick={(e) => { e.stopPropagation(); toggleNav(); }}
      >
        <ChevronDown size={28} className={`transition-transform duration-300 ${isNavVisible ? '' : 'rotate-180'}`} style={iconStyle} />
      </div>

      {/* #11 & #16 CỤM TIỆN ÍCH TRÁI (y=1.2) */}
      <Node x={1.8} y={1.2}><Disc size={16} className="animate-spin-slow text-white/60" /></Node>
      <Node x={3.5} y={1.2}><Volume2 size={14} className="text-white/60" /></Node>

    </div>
  );
};

export default VideoOverlay;
