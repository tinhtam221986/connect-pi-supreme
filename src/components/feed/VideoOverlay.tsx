// @ts-nocheck
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

const VideoOverlay = ({ uploader, caption, stats }) => {
  const { isNavVisible, toggleNav } = useNav();
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  // Tọa độ vàng 30 điểm của ngài
  const getPos = (gridX, gridY) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, onClick, className = "" }) => (
    <div 
      className={`absolute pointer-events-auto flex flex-col items-center justify-center z-50 cursor-pointer ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}
      onClick={onClick}
    >
      {children}
    </div>
  );

  const toggleAudio = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: nextMuted }));
  };

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[50]">
      
      {/* CỤM TƯƠNG TÁC PHẢI (Nút 19, 24, v.v.) */}
      <Node x={27.5} y={37.5}><Search size={22} /></Node>
      
      <Node x={27.5} y={24} onClick={() => setLiked(!liked)}>
        <Heart size={26} fill={liked ? "#ef4444" : "none"} className={liked ? "text-red-500" : "text-white"} />
        <span className="text-[10px] font-bold mt-1">{liked ? (parseInt(stats?.likes || 0) + 1) : (stats?.likes || 0)}</span>
      </Node>

      <Node x={27.5} y={19}><MessageCircle size={26} /><span className="text-[10px] font-bold mt-1">{stats?.comments || 0}</span></Node>
      <Node x={27.5} y={14}><Share2 size={26} /></Node>
      <Node x={27.5} y={9.5}><Bookmark size={26} /></Node>

      {/* CỤM THÔNG TIN BÊN TRÁI (Nút 14 - Cửa hàng khách & Avatar) */}
      <div className="absolute pointer-events-auto z-40 flex flex-col gap-2" style={{ left: '1.5%', bottom: '50px', width: '70%' }}>
        <div>
          <Link href={`/profile/${uploader?.username}/shop`} className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded border border-yellow-500/50">
            <Store size={14} className="text-yellow-400" />
            <span className="text-[9px] font-black text-yellow-400 uppercase">SHOP KHÁCH</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
           <Link href={`/profile/${uploader?.username}`}>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg bg-zinc-800">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader?.username}`} className="w-full h-full object-cover" />
              </div>
           </Link>
           <p className="font-bold text-sm">@{uploader?.username || 'user'}</p>
        </div>
        
        <p className="text-[12px] leading-tight line-clamp-2 pr-4">{caption}</p>
      </div>

      {/* THANH ĐIỀU HƯỚNG DƯỚI (Nút 1-5) */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-[100]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
              <Node x={7.0} y={1.2}><ShoppingCart size={26} /></Node>
              <Node x={11.0} y={1.2}><Store size={26} /></Node>
              <Node x={15.0} y={1.2}><Link href="/upload" className="p-1.5 bg-red-600 rounded-lg"><PlusSquare size={24} /></Link></Node>
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
        <div className="absolute left-[1.5%] bottom-[1.2%] flex items-center gap-3 pointer-events-auto">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}>
            <Disc size={22} className="text-zinc-400" />
          </motion.div>
          <button onClick={toggleAudio} className="p-1.5 bg-black/20 rounded-full backdrop-blur-sm border border-white/10">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-400" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
