'use client';
import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Store, Disc, Volume2 } from 'lucide-react';

export const VideoOverlay = ({ uploader = { username: 'architect' }, stats = { likes: '1.2K', comments: '45' } }) => {
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, className = "" }: any) => (
    <div className={`absolute pointer-events-auto flex flex-col items-center z-50 ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}>
      {children}
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* CỤM TƯƠNG TÁC PHẢI */}
      <Node x={27.5} y={37.5}><Search size={22} /></Node>
      <Node x={27.5} y={24}><Heart size={24} fill="white" /><span className="text-[9px] mt-1">{stats.likes}</span></Node>
      <Node x={27.5} y={19}><MessageCircle size={24} /><span className="text-[9px] mt-1">{stats.comments}</span></Node>
      <Node x={27.5} y={14}><Share2 size={24} /></Node>
      <Node x={27.5} y={9}><Bookmark size={24} /></Node>

      {/* #14 SHOP KHÁCH (Mạch máu quan trọng nhất) */}
      <Node x={2.5} y={7.5} className="items-start">
        <a href={`/profile/${uploader.username}/shop`} className="flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-400">
          <Store size={18} className="text-yellow-400" />
          <span className="text-[7px] font-bold text-yellow-400">SHOP</span>
        </a>
      </Node>

      {/* #13 AVATAR & #12 CAPTION (Tọa độ y=3.5) */}
      <div className="absolute pointer-events-auto px-4" style={{ ...getPos(4, 3.5), width: '70%', transform: 'translate(0, 0)' }}>
        <p className="font-bold text-[13px]">@{uploader.username}</p>
        <p className="text-[10px] opacity-80 line-clamp-2">Connect Pi Supreme Version 2026 🚀</p>
      </div>

      {/* #11 ĐĨA XOAY & #16 LOA */}
      <Node x={2.2} y={1.2}><Disc size={18} className="animate-spin-slow" /></Node>
      <Node x={3.8} y={1.2}><Volume2 size={16} className="opacity-80" /></Node>
    </div>
  );
};
