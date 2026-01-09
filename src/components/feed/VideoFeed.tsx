"use client";
import React from 'react';
import { Heart, MessageCircle, Share2, ShoppingCart, Bookmark, MoreVertical } from 'lucide-react';

export const VideoFeed = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
  return (
    <div className="h-full w-full bg-black relative flex flex-col justify-end pb-28">
      {/* 1. KHU VỰC NỘI DUNG VIDEO (GIỮ CHỖ CHO DATA CỦA JULES) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         {/* Sau này Jules sẽ thay bằng thẻ <video> thực tế */}
         <div className="animate-pulse text-gray-800 text-6xl">Connect Pi</div>
      </div>

      {/* 2. CỤM NÚT TƯƠNG TÁC BÊN PHẢI (17 NÚT VÀ CHỨC NĂNG) */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-30">
        {/* Nút Số 14: Cửa hàng cá nhân của Profile khách */}
        <div className="group flex flex-col items-center">
          <button 
            onClick={() => onNavigate('market')} 
            className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center active:scale-90 transition-all"
          >
            <ShoppingCart size={28} className="text-white" />
          </button>
          <span className="text-[11px] mt-1 text-yellow-500 font-bold shadow-black">SHOP</span>
        </div>

        {/* Cụm nút tương tác mạng xã hội */}
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="flex flex-col items-center">
            <Heart size={35} fill="red" className="drop-shadow-md" />
            <span className="text-xs font-semibold">1.2M</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle size={35} className="drop-shadow-md" />
            <span className="text-xs font-semibold">85K</span>
          </div>
          <div className="flex flex-col items-center">
            <Bookmark size={35} className="drop-shadow-md" />
            <span className="text-xs font-semibold">Saved</span>
          </div>
          <div className="flex flex-col items-center">
            <Share2 size={35} className="drop-shadow-md" />
            <span className="text-xs font-semibold">Share</span>
          </div>
          <MoreVertical size={30} className="mt-2 opacity-70" />
        </div>
      </div>

      {/* 3. THÔNG TIN MÔ TẢ (GÓC TRÁI DƯỚI) */}
      <div className="px-4 mb-4 z-20 max-w-[80%]">
        <h3 className="font-bold text-lg text-white mb-1 drop-shadow-lg">@Connect_User</h3>
        <p className="text-sm text-white/90 line-clamp-2 drop-shadow-md">
          Chào mừng ngài đến với Connect Pi Supreme! Hệ thống đang khởi tạo trải nghiệm Web3 đỉnh cao... 🚀🚨
        </p>
        <div className="flex items-center mt-2 gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-spin" />
          <span className="text-xs text-purple-300 font-medium">Original Audio - Connect Pi</span>
        </div>
      </div>
    </div>
  );
};
