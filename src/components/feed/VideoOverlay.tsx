'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, MessageCircle, Share2 } from 'lucide-react';

const VideoOverlay = ({ uploader, caption, stats }: any) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none text-white flex flex-col justify-end pb-28 px-4">
      {/* CỘT TƯƠNG TÁC PHẢI - TỌA ĐỘ CHUẨN JULES 99% */}
      <div className="absolute right-3 bottom-36 flex flex-col gap-6 pointer-events-auto">
        {/* Nút Like */}
        <div className="flex flex-col items-center gap-1">
          <button className="bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/20 active:scale-90 transition-transform">
            <Heart size={28} fill="white" />
          </button>
          <span className="text-[11px] font-bold shadow-sm">{stats?.likes || '1.2K'}</span>
        </div>

        {/* NÚT SỐ 14: CỬA HÀNG KHÁCH (ĐÃ SỬA ĐƯỜNG DẪN) */}
        <Link href={`/shop/${uploader?.username || 'admin'}`} className="flex flex-col items-center gap-1 group">
          <div className="bg-yellow-500 p-3 rounded-full border-2 border-white shadow-[0_0_15px_rgba(234,179,8,0.5)] group-active:scale-90 transition-transform">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <span className="text-[10px] font-black text-yellow-500 uppercase">Shop</span>
        </Link>

        {/* Nút Chia sẻ */}
        <button className="bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/20 active:scale-90">
          <Share2 size={24} />
        </button>
      </div>
      
      {/* THÔNG TIN VIDEO - NỐI MẠCH MÁU DỮ LIỆU */}
      <div className="pointer-events-auto max-w-[80%] mb-4">
        <h3 className="font-bold text-lg mb-1 drop-shadow-md">@{uploader?.username || 'Pioneer'}</h3>
        <p className="text-sm opacity-90 line-clamp-2 leading-snug">{caption || "Connect Supreme - Mạng xã hội của Pioneer"}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-purple-400">
           <span className="animate-pulse">🎵</span> <span>Âm thanh gốc - Connect Pi</span>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
