'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, Search, ShoppingCart, Home, PlusSquare, Mail, ChevronDown, Store, Disc, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const VideoOverlay = ({ uploader = { username: 'Unknown User', avatar: '' }, caption = '', stats = { likes: 0, comments: 0 } }) => {
  const { isNavVisible, toggleNav } = useNav();
  const [isExpanded, setIsExpanded] = useState(false);
  const iconStyle = { filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.9))' };

  // HỆ TỌA ĐỘ GRID 30x40 - ĐÓNG BĂNG TUYỆT ĐỐI
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

  // LOGIC MIÊU TẢ VIDEO: 15 KÝ TỰ + XEM THÊM
  const displayCaption = isExpanded ? caption : (caption.length > 15 ? caption.substring(0, 15) + "..." : caption);

  return (
    <div className="absolute inset-0 text-white pointer-events-none overflow-hidden select-none bg-transparent z-[50]">
      
      {/* 1. CỤM TƯƠNG TÁC PHẢI - KÉO LẠI GẦN NHAU (Tăng mật độ Y) */}
      <Node x={27.5} y={37.5}><Search size={22} style={iconStyle} strokeWidth={1.5} /></Node>
      
      {/* Cụm 4 nút chính: xích lại gần nhau (Y từ 24 xuống 12) */}
      <Node x={27.5} y={23}>
        <button className="active:scale-90 transition-transform"><Heart size={24} style={iconStyle} strokeWidth={2} /></button>
        {stats.likes > 0 && <span className="text-[9px] font-bold mt-1">{stats.likes}</span>}
      </Node>

      <Node x={27.5} y={18.5}>
        <button className="active:scale-90"><MessageCircle size={24} style={iconStyle} strokeWidth={2} /></button>
        {stats.comments > 0 && <span className="text-[9px] font-bold mt-1">{stats.comments}</span>}
      </Node>

      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} strokeWidth={2} /></Node>
      <Node x={27.5} y={9.5}><Bookmark size={24} style={iconStyle} strokeWidth={2} /></Node>

      {/* 2. #14 SHOP KHÁCH (Tỉ lệ 1/2) */}
      <Node x={1.5} y={7.5} className="items-start">
        <Link href={`/shop/${uploader.username}`} className="flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-500/50 active:scale-95 transition-all">
          <Store size={14} className="text-yellow-400" />
          <span className="text-[6px] font-black text-yellow-400">SHOP</span>
        </Link>
      </Node>

      {/* 3. #13 AVATAR & #12 CAPTION (MIÊU TẢ VIDEO CHUẨN 15 KÝ TỰ) */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-1.5" 
           style={{ ...getPos(0, 3.5), width: '70%', left: '1.5%' }}>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full border border-white/70 overflow-hidden shadow-lg bg-zinc-800">
              <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
           </div>
           <p className="font-bold text-[13px] drop-shadow-lg">@{uploader.username || 'Pioneer'}</p>
        </div>
        <div className="text-[10px] leading-tight drop-shadow-md font-medium bg-black/5 rounded-sm p-0.5 max-w-full">
          {displayCaption}
          {caption.length > 15 && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="ml-1 text-[8px] font-black text-zinc-300 italic uppercase">
              {isExpanded ? ' Thu gọn' : ' xem thêm'}
            </button>
          )}
        </div>
      </div>

      {/* 4. LỚP HỆ THỐNG CỐ ĐỊNH - KHÔNG TRÔI KHI VUỐT VIDEO */}
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-[60]">
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
        <div className="absolute pointer-events-auto cursor-pointer p-2"
          style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
          onClick={(e) => { e.stopPropagation(); toggleNav(); }}
        >
          <ChevronDown size={28} className={`transition-transform duration-300 ${isNavVisible ? '' : 'rotate-180'}`} style={iconStyle} />
        </div>

        {/* #11 & #16 */}
        <Node x={1.8} y={1.2}><Disc size={16} className="animate-spin-slow text-white/60" /></Node>
        <Node x={3.5} y={1.2}><Volume2 size={14} className="text-white/60" /></Node>
      </div>

    </div>
  );
};

export default VideoOverlay;
                
