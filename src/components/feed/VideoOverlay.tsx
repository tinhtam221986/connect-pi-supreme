'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, MessageCircle, Share2 } from 'lucide-react';

// Biểu tượng Boss AI Assistant - Người đồng hành cùng Pioneer
const BotIcon = () => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping"></div>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
      <path d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z" fill="currentColor"/>
      <path d="M12 14C9.79 14 8 15.79 8 18H16C16 15.79 14.21 14 12 14Z" fill="currentColor"/>
    </svg>
  </div>
);

const VideoOverlay = ({ uploader, caption, stats }: any) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none text-white flex flex-col justify-end pb-24 px-4">
      
      {/* CỘT TƯƠNG TÁC BÊN PHẢI (VỊ TRÍ CÁC NÚT ĐIỀU HƯỚNG) */}
      <div className="absolute right-3 bottom-32 flex flex-col gap-6 pointer-events-auto">
        
        {/* Nút Like */}
        <div className="flex flex-col items-center">
          <button className="bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/20 active:scale-90 transition-transform">
            <Heart size={26} fill="white" />
          </button>
          <span className="text-[11px] mt-1 font-bold shadow-sm">{stats?.likes || '1.2K'}</span>
        </div>

        {/* Nút Bình luận */}
        <div className="flex flex-col items-center">
          <button className="bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/20 active:scale-90 transition-transform">
            <MessageCircle size={26} fill="white" />
          </button>
          <span className="text-[11px] mt-1 font-bold shadow-sm">{stats?.comments || '85'}</span>
        </div>

        {/* Nút AI ASSISTANT (BOSS AI) */}
        <div className="relative group flex flex-col items-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-60 animate-pulse"></div>
          <button className="relative bg-blue-600 p-3 rounded-full border-2 border-white/80 shadow-lg active:scale-90 transition-transform">
             <BotIcon /> 
          </button>
          <span className="text-[8px] mt-1 font-black text-blue-400 whitespace-nowrap drop-shadow-md uppercase tracking-tighter">AI Assistant</span>
        </div>

        {/* NÚT SỐ 14: CỬA HÀNG CỦA CHỦ VIDEO (PROFILE KHÁCH) */}
        <Link href={`/shop/${uploader?.username || 'admin'}`} className="flex flex-col items-center group">
          <div className="bg-yellow-500 p-3 rounded-full border-2 border-white shadow-[0_0_15px_rgba(234,179,8,0.6)] group-active:scale-90 transition-transform">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <span className="text-[10px] mt-1 font-black text-yellow-500 uppercase drop-shadow-lg">Cửa hàng</span>
        </Link>

        {/* Nút Chia sẻ */}
        <div className="flex flex-col items-center">
          <button className="bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/20 active:scale-90 transition-transform">
            <Share2 size={24} fill="white" />
          </button>
        </div>
      </div>
      
      {/* PHẦN THÔNG TIN VIDEO BÊN TRÁI */}
      <div className="pointer-events-auto max-w-[75%] space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden bg-zinc-800">
             {/* Avatar uploader */}
             <img src={uploader?.avatar || `https://ui-avatars.com/api/?name=${uploader?.username}`} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg drop-shadow-md">@{uploader?.username || 'Pioneer'}</h3>
          <button className="bg-purple-600 px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">Follow</button>
        </div>
        
        <p className="text-sm opacity-95 drop-shadow-sm line-clamp-3 leading-snug">
          {caption || "Chào mừng ngài Phó Giám đốc đến với Connect Supreme! Hệ thống đang được rà soát cốt gốc."}
        </p>
        
        <div className="flex items-center gap-2 text-[10px] text-purple-300 font-mono italic">
          <span className="animate-bounce">🎵</span>
          <span>Âm thanh gốc - Connect Supreme 2026</span>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
