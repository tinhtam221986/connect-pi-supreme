'use client';
import React, { useState } from 'react';
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
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const iconStyle = { filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8))' };

  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, className = '', onClick }: any) => (
    <div 
      className={`absolute pointer-events-auto flex flex-col items-center justify-center z-50 cursor-pointer ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}
      onClick={onClick}
    >
      {children}
    </div>
  );

  return (
    <div className="absolute inset-0 text-white pointer-events-none overflow-hidden select-none bg-transparent z-[50]">
      
      {/* CỤM TƯƠNG TÁC PHẢI */}
      <Node x={27.5} y={37.5}><Search size={22} style={iconStyle} /></Node>
      
      <Node x={27.5} y={24} onClick={() => setLiked(!liked)}>
        <motion.div animate={{ scale: liked ? [1, 1.5, 1] : 1 }}>
          <Heart size={24} fill={liked ? "#ef4444" : "none"} className={liked ? "text-red-500" : "text-white"} style={iconStyle} />
        </motion.div>
        <span className="text-[9px] mt-1 font-bold">{liked ? (parseInt(stats.likes as any) + 1) : stats.likes}</span>
      </Node>

      <Node x={27.5} y={19}><MessageCircle size={24} style={iconStyle} /><span className="text-[9px] mt-1 font-bold">{stats.comments}</span></Node>
      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} /></Node>
      <Node x={27.5} y={9.5}><Bookmark size={24} style={iconStyle} /></Node>

      {/* CỤM THÔNG TIN BÊN TRÁI */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-1" style={{ left: '1.5%', bottom: '46px', width: '75%' }}>
        <div className="mb-0.5">
          <Link href={`/shop/${uploader.username}`} className="inline-flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-500/50">
            <Store size={14} className="text-yellow-400" />
            <span className="text-[6px] font-black text-yellow-400 uppercase">SHOP KHÁCH</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 relative">
           <Link href={`/profile/${uploader.username}`} className="block">
              <div className="w-9 h-9 rounded-full border border-white/70 overflow-hidden shadow-lg bg-zinc-800">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
              </div>
           </Link>
           {!isFollowed && (
             <button onClick={() => setIsFollowed(true)} className="absolute -bottom-1 left-4 bg-red-600 rounded-full p-0.5 border border-white"><Plus size={10} strokeWidth={4} /></button>
           )}
           <p className="font-bold text-[13px]">@{uploader.username}</p>
        </div>
        
        <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
          <p className={`text-[11px] leading-tight ${isExpanded ? '' : 'line-clamp-1'}`}>
            {caption} <span className="text-zinc-400 text-[9px]">{isExpanded ? 'thu gọn' : '...xem thêm'}</span>
          </p>
        </div>
      </div>

      {/* THANH ĐIỀU HƯỚNG */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-[100]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}>
              <Node x={7.0} y={1.2}><ShoppingCart size={26} /></Node>
              <Node x={11.0} y={1.2}><Store size={26} /></Node>
              <Node x={15.0} y={1.2}><Link href="/upload" className="p-1 bg-red-600 rounded-lg"><PlusSquare size={24} /></Link></Node>
              <Node x={19.0} y={1.2}><Link href="/me"><Home size={26} /></Link></Node>
              <Node x={23.0} y={1.2}><Mail size={26} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NÚT SỐ 5 - XỔ MENU */}
        <div className="absolute pointer-events-auto p-3" style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }} onClick={toggleNav}>
          <ChevronDown size={28} className={`transition-transform ${isNavVisible ? '' : 'rotate-180'}`} />
        </div>

        {/* ÂM THANH & ĐĨA QUAY */}
        <div className="absolute left-[1.5%] bottom-[2.5%] flex items-center gap-1.5 pointer-events-auto">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} className="rounded-full bg-blue-500 p-0.5 shadow-lg shadow-blue-500/20">
            <Disc size={24} className="text-white" />
          </motion.div>
          {/* NÚT LOA: KHI BẤM SẼ PHÁT TIẾNG */}
          <button onClick={() => setIsMuted(!isMuted)} className="p-0.5">
            {isMuted ? <VolumeX size={22} className="text-red-500" /> : <Volume2 size={22} className="text-green-400" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
          
