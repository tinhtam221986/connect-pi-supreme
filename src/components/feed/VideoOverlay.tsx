// @ts-nocheck
'use client';
import React from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Search, 
  ShoppingCart, Home, PlusSquare, Mail, ChevronDown, 
  Store, Bot 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

interface VideoOverlayProps {
  uploader?: { username: string; avatar: string };
  caption?: string;
  stats?: { likes: string | number; comments: string | number };
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ 
  uploader = { username: '@architect', avatar: '' }, 
  caption = '', 
  stats = { likes: '1.2K', comments: '45' } 
}) => {
  const { isNavVisible, toggleNav } = useNav();
  const iconStyle = { filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8))' };

  // Hệ tọa độ GridX/GridY đạt chuẩn 100% của Phó Giám đốc
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, className = '', style = {} }: any) => (
    <div 
      className={`absolute pointer-events-auto flex flex-col items-center justify-center z-50 ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)', ...style }}
    >
      {children}
    </div>
  );

  return (
    <div className="absolute inset-0 text-white pointer-events-none overflow-hidden select-none">
      
      {/* 1. CỤM TƯƠNG TÁC PHẢI - GIỮ NGUYÊN TỌA ĐỘ BẤT BIẾN */}
      <Node x={27.5} y={37.5}><Search size={22} style={iconStyle} /></Node>
      <Node x={27.5} y={24}><Heart size={24} fill="white" style={iconStyle} /><span className="text-[9px] font-bold">{stats.likes}</span></Node>
      <Node x={27.5} y={19}><MessageCircle size={24} style={iconStyle} /><span className="text-[9px] font-bold">{stats.comments}</span></Node>
      <Node x={27.5} y={14}><Share2 size={24} style={iconStyle} /></Node>
      <Node x={27.5} y={9}><Bookmark size={24} style={iconStyle} /></Node>

      {/* 2. #14 SHOP KHÁCH (Mạch máu dữ liệu thực) [cite: 2026-01-01] */}
      <Node x={2.5} y={7.5} className="items-start">
        <a href={`/profile/${uploader.username}/shop`} className="flex flex-col items-center p-1 bg-black/20 rounded-md border border-yellow-400/30">
          <Store size={18} className="text-yellow-400" />
          <span className="text-[7px] font-bold text-yellow-400 uppercase">SHOP</span>
        </a>
      </Node>

      {/* 3. #13 AVATAR & #12 CAPTION (Hạ xuống y=3.5 chuẩn hồ sơ) */}
      <div className="absolute pointer-events-auto z-40 px-4" style={{ ...getPos(0, 3.5), width: '70%', left: '4%' }}>
        <div className="flex items-center gap-2 mb-1">
           <img 
             src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} 
             className="w-8 h-8 rounded-full border border-white/80" 
             alt="avatar" 
           />
           <p className="font-bold text-[13px]">{uploader.username}</p>
        </div>
        <p className="text-[10px] opacity-90 bg-black/10 px-1 rounded line-clamp-2">{caption}</p>
      </div>

      {/* 4. THANH ĐIỀU HƯỚNG ĐÁY & MASTER V (#5) [cite: 2026-01-02] */}
      <AnimatePresence mode="wait">
        {isNavVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            key="nav-bar"
          >
            <Node x={7.0} y={1.2}><ShoppingCart size={26} /></Node>
            <Node x={11.0} y={1.2}><Store size={26} /></Node>
            <Node x={15.0} y={1.2}><PlusSquare size={26} /></Node>
            <Node x={19.0} y={1.2}><Home size={26} /></Node>
            <Node x={23.0} y={1.2}><Mail size={26} /></Node>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút #5 - Luôn cố định để xổ Menu [cite: 2026-01-02] */}
      <div 
        className="absolute pointer-events-auto cursor-pointer p-4 z-[60]"
        style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
        onClick={toggleNav}
      >
        <ChevronDown size={28} className={isNavVisible ? '' : 'rotate-180'} />
      </div>

      {/* #18 ĐỘC BẢN BOT AI - TRÔI NỔI TỰ DO (Z-INDEX 100) */}
      <motion.div 
        drag 
        dragMomentum={false}
        className="fixed z-[100] pointer-events-auto cursor-grab active:cursor-grabbing"
        style={{ top: '20%', right: '10%' }}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative bg-blue-500 p-3 rounded-full border-2 border-white/80 shadow-lg">
             <Bot size={24} color="white" /> 
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default VideoOverlay;
        
