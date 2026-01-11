'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// Nhập khẩu đầy đủ thư viện để tránh lỗi build (X đỏ)
import { 
  Heart, MessageCircle, Share2, Bookmark, Search, 
  ShoppingCart, Home, PlusSquare, Mail, ChevronDown, 
  Store, Disc, Volume2, VolumeX, Plus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const VideoOverlay = ({ 
  uploader = { username: 'Unknown User', avatar: '', id: 'me' }, 
  caption = 'Kế hoạch tổng lực: Hoàn thiện mạch máu dữ liệu...', 
  stats = { likes: 0, comments: 0 } 
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
      <Node x={27.5} y={24}><Heart size={24} style={iconStyle} /><span className="text-[9px] mt-1">{stats.likes}</span></Node>
      <Node x={27.5} y={19}><MessageCircle size={24} style={iconStyle} /><span className="text-[9px] mt-1">{stats.comments}</span></Node>
      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} /></Node>
      <Node x={27.5} y={9.5}><Bookmark size={24} style={iconStyle} /></Node>

      {/* 2. CỤM THÔNG TIN BÊN TRÁI - ĐÓNG BĂNG 46PX */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-1" 
           style={{ left: '1.5%', bottom: '46px', width: '75%' }}>
        
        {/* #14 SHOP KHÁCH - ĐÃ HOẠT ĐỘNG */}
        <div className="mb-0.5">
          <Link href={`/shop/${uploader.username}`} className="inline-flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-500/50">
            <Store size={14} className="text-yellow-400" />
            <span className="text-[6px] font-black text-yellow-400 uppercase">SHOP</span>
          </Link>
        </div>

        {/* AVATAR & NÚT THEO DÕI #16 */}
        <div className="flex items-center gap-2 relative">
           <div className="relative">
              <div className="w-8 h-8 rounded-full border border-white/70 overflow-hidden bg-zinc-800">
                <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
              </div>
              {!isFollowed && (
                <button onClick={() => setIsFollowed(true)} className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 rounded-full p-0.5 border border-white">
                  <Plus size={10} strokeWidth={4} />
                </button>
              )}
           </div>
           <p className="font-bold text-[13px]">@{uploader.username}</p>
        </div>
        
        {/* MÔ TẢ VIDEO */}
        <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
          <p className={`text-[10px] leading-tight ${isExpanded ? 'max-h-[30vh] overflow-y-auto' : 'line-clamp-1'}`}>
            {isExpanded ? caption : (caption.substring(0, 15) + "...")}
            <span className="ml-1 text-[9px] text-white/80 lowercase italic underline">
              {isExpanded ? ' (thu gọn)' : ' ...xem thêm'}
            </span>
          </p>
        </div>
      </div>

      {/* 3. LỚP ĐIỀU HƯỚNG HỆ THỐNG */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-[100]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
              <Node x={7.0} y={1.2}><ShoppingCart size={26} /></Node>
              <Node x={11.0} y={1.2}><Store size={26} /></Node>
              
              {/* #15 NÚT ĐĂNG VIDEO - ĐÃ XỬ LÝ LỖI LÓA ĐỎ */}
              <Node x={15.0} y={1.2}>
                <Link href="/upload" className="pointer-events-auto active:scale-95 transition-all">
                   <div className="p-1 bg-red-600 rounded-md shadow-[0_0_10px_rgba(220,38,38,0.8)] border border-red-400">
                      <PlusSquare size={24} strokeWidth={2.5} className="text-white" />
                   </div>
                </Link>
              </Node>
              
              {/* #19/7 NÚT HOME - NỐI VÀO TRANG CÁ NHÂN */}
              <Node x={19.0} y={1.2}>
                <Link href="/me" className="pointer-events-auto active:scale-95 transition-all">
                  <Home size={26} style={iconStyle} />
                </Link>
              </Node>
              
              <Node x={23.0} y={1.2}><Mail size={26} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* #5 MASTER V MENU */}
        <div className="absolute pointer-events-auto p-3"
          style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
          onClick={(e) => { e.stopPropagation(); toggleNav(); }}
        >
          <ChevronDown size={28} className={`transition-transform ${isNavVisible ? '' : 'rotate-180'}`} />
        </div>

        {/* #11 & #16 ÂM THANH */}
        <div className="absolute left-[1.5%] bottom-[2.5%] flex items-center gap-1 pointer-events-auto">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} className="rounded-full bg-blue-500 p-0.5">
            <Disc size={24} className="text-white" />
          </motion.div>
          <button onClick={() => setIsMuted(!isMuted)} className="p-0.5">
            {isMuted ? <VolumeX size={22} className="text-red-500" /> : <Volume2 size={22} className="text-green-400" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default VideoOverlay;
                                                                                              
