'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, MessageCircle, Share2 } from 'lucide-react';

const VideoOverlay = ({ uploader, caption, stats }: any) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none text-white flex flex-col justify-end pb-24 px-4">
      
      {/* CỘT TƯƠNG TÁC PHẢI - CĂN CHỈNH TỌA ĐỘ THẤP XUỐNG CHO ĐIỆN THOẠI */}
      <div className="absolute right-3 bottom-28 flex flex-col gap-5 pointer-events-auto items-center">
        
        {/* Nút Like - Zai chuẩn 26px */}
        <div className="flex flex-col items-center">
          <button className="bg-black/30 backdrop-blur-lg p-3 rounded-full border border-white/10 active:scale-90 transition-transform">
            <Heart size={26} fill="white" />
          </button>
          <span className="text-[10px] mt-1 font-bold shadow-sm">{stats?.likes || '1.2K'}</span>
        </div>

        {/* Nút Bình luận */}
        <div className="flex flex-col items-center">
          <button className="bg-black/30 backdrop-blur-lg p-3 rounded-full border border-white/10 active:scale-90 transition-transform">
            <MessageCircle size={26} fill="white" />
          </button>
          <span className="text-[10px] mt-1 font-bold shadow-sm">{stats?.comments || '85'}</span>
        </div>

        {/* NÚT SỐ 14: CỬA HÀNG (ĐÃ TỐI ƯU TỌA ĐỘ VÀ MÀU SẮC) */}
        <Link href={`/shop/${uploader?.username || 'admin'}`} className="flex flex-col items-center group">
          <div className="bg-yellow-500 p-3 rounded-full border-2 border-white shadow-[0_0_15px_rgba(234,179,8,0.7)] group-active:scale-90 transition-transform">
            <ShoppingBag size={22} className="text-white" />
          </div>
          <span className="text-[9px] mt-1 font-black text-yellow-500 uppercase tracking-tighter">Cửa hàng</span>
        </Link>

        {/* Nút Chia sẻ */}
        <button className="bg-black/30 backdrop-blur-lg p-3 rounded-full border border-white/10 active:scale-90">
          <Share2 size={24} />
        </button>
      </div>
      
      {/* THÔNG TIN CHỦ VIDEO BÊN TRÁI - DỌN RÁC HIỂN THỊ */}
      <div className="pointer-events-auto max-w-[80%] mb-2 space-y-1">
        <div className="flex items-center gap-2">
           <h3 className="font-bold text-base drop-shadow-md text-purple-400">@{uploader?.username || 'Pioneer'}</h3>
           <div className="bg-purple-600/80 px-2 py-0.5 rounded text-[9px] font-bold uppercase">Follow</div>
        </div>
        <p className="text-xs opacity-90 line-clamp-2 leading-tight drop-shadow-md">{caption || "Đang tải dữ liệu thật từ Connect Supreme..."}</p>
        <div className="flex items-center gap-1 text-[10px] text-zinc-400 italic">
          <span className="animate-spin-slow text-purple-500">💿</span>
          <span>Âm thanh gốc - Connect Supreme 2026</span>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
