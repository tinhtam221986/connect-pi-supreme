'use client';
import React, { useState } from 'react';
// QUAN TRỌNG: Phải có dòng này để không bị lỗi "Link is not defined"
import Link from 'next/link'; 
import { 
  Heart, MessageCircle, Share2, Bookmark, Search, 
  ShoppingCart, Home, PlusSquare, Mail, ChevronDown, 
  Store, Disc, Volume2, VolumeX, Plus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const VideoOverlay = ({ 
  uploader = { username: 'Unknown User', avatar: '', id: 'me' }, 
  caption = 'Kế hoạch tổng lực: Hoàn thiện hệ thống Connect-Pi...', 
  stats = { likes: 1200, comments: 85 } 
}) => {
  const { isNavVisible, toggleNav } = useNav();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  
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
      
      {/* 1. CỤM TƯƠNG TÁC PHẢI */}
      <Node x={27.5} y={37.5}><Search size={22} style={iconStyle} /></Node>
      <Node x={27.5} y={24}><Heart size={24} style={iconStyle} /><span className="text-[9px] mt-1 font-bold">{stats.likes}</span></Node>
      <Node x={27.5} y={19}><MessageCircle size={24} style={iconStyle} /><span className="text-[9px] mt-1 font-bold">{stats.comments}</span></Node>
      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} /></Node>
      <Node x={27.5} y={9.5}><Bookmark size={24} style={iconStyle} /></Node>

      {/* 2. CỤM THÔNG TIN BÊN TRÁI - BOTTOM: 46PX */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-1" 
           style={{ left: '1.5%', bottom: '46px', width: '75%' }}>
        
        {/* SHOP KHÁCH */}
        <div className="mb-0.5">
          <Link href={`/shop/${uploader.username}`} className="inline-flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-500/50 active:scale-95">
            <Store size={14} className="text-yellow-400" />
            <span className="text-[6px] font-black text-yellow-400 uppercase tracking-tighter">SHOP</span>
          </Link>
        </div>

        {/* AVATAR & NÚT FOLLOW ĐỎ (#16) */}
        <div className="flex items-center gap-2 relative">
           <div className="relative">
              <Link href={`/profile/${uploader.username}`} className="block active:scale-95 transition-transform">
                <div className="w-9 h-9 rounded-full border border-white/70 overflow-hidden shadow-lg bg-zinc-800">
                  <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
                </div>
              </Link>
              {!isFollowed && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsFollowed(true); }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 rounded-full p-0.5 border border-white active:scale-125 transition-transform"
                >
                  <Plus size={10} strokeWidth={4} className="text-white" />
                </button>
              )}
           </div>
           <Link href={`/profile/${uploader.username}`}>
              <p className="font-bold text-[13px] drop-shadow-md">@{uploader.username}</p>
           </Link>
        </div>
        
        {/* MÔ TẢ VIDEO */}
        <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
          <p className={`text-[11px] leading-tight drop-shadow-md font-medium bg-black/10 rounded p-0.5 ${isExpanded ? 'max-h-[30vh] overflow-y-auto' : 'line-clamp-1'}`}>
            {isExpanded ? caption : (caption.substring(0, 15) + "...")}
            <span className="ml-1 text-[9px] text-white/90 font-normal lowercase italic underline">
              {isExpanded ? ' (thu gọn)' : ' ...xem thêm'}
            </span>
          </p>
        </div>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG FIXED */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-[100]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}>
              <Node x={7.0} y={1.2}><ShoppingCart size={26} style={iconStyle} /></Node>
              <Node x={11.0} y={1.2}><Store size={26} style={iconStyle} /></Node>
              
              <Node x={15.0} y={1.2}>
                <Link href="/upload" className="pointer-events-auto active:scale-95 transition-all">
                   <div className="p-1 bg-red-600 rounded-lg shadow-lg border border-red-400">
                      <PlusSquare size={24} strokeWidth={2.5} className="text-white" />
                   </div>
                </Link>
              </Node>
              
              <Node x={19.0} y={1.2}>
                <Link href="/me" className="pointer-events-auto active:scale-95 transition-all">
                  <Home size={26} style={iconStyle} />
                </Link>
              </Node>
              
              <Node x={23.0} y={1.2}><Mail size={26} style={iconStyle} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NÚT XỔ MENU (#5) */}
        <div className="absolute pointer-events-auto p-3"
          style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
          onClick={(e) => { e.stopPropagation(); toggleNav(); }}
        >
          <ChevronDown size={28} className={`transition-transform duration-300 ${isNavVisible ? '' : 'rotate-180'}`} style={iconStyle} />
        </div>

        {/* ÂM THANH */}
        <div className="absolute left-[1.5%] bottom-[2.5%] flex items-center gap-1.5 pointer-events-auto">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} className="rounded-full bg-blue-500 p-0.5">
            <Disc size={24} className="text-white" />
          </motion.div>
          <button onClick={() => setIsMuted(!isMuted)} className="p-0.5 active:scale-125">
            {isMuted ? <VolumeX size={22} className="text-red-500" /> : <Volume2 size={22} className="text-green-400" />}
          </button>
        </div>
      </div>

    </div>
  );
};

// CỰC KỲ QUAN TRỌNG: Phải có dòng này ở cuối cùng
export default VideoOverlay;
           
