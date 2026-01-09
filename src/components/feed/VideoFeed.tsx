"use client";
import React from 'react';

export const VideoFeed = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
  return (
    <div className="h-full w-full bg-black relative">
      {/* Video Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-700">
        [Video Content Area]
      </div>

      {/* Cụm nút chức năng bên phải - Bảo vệ logic Nút số 14 */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-30">
        {/* Nút 14: Cửa hàng cá nhân của profile khách */}
        <div className="flex flex-col items-center">
          <button 
            onClick={() => onNavigate('market')} 
            className="w-14 h-14 bg-gradient-to-tr from-orange-400 to-yellow-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center"
          >
            🛒
          </button>
          <span className="text-[10px] mt-1 text-white font-bold">CỬA HÀNG</span>
        </div>

        {/* Nút AI Bot của Jules */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-600 rounded-full border border-white/50 flex items-center justify-center animate-pulse">
            🤖
          </div>
          <span className="text-[10px] mt-1 text-white/70">AI BOT</span>
        </div>
      </div>

      {/* Thông tin mô tả video */}
      <div className="absolute bottom-10 left-4 z-20">
        <h3 className="font-bold text-white">@Pi_Creator_Vip</h3>
        <p className="text-sm text-white/80">Nội dung sáng tạo trên mạng Pi #Web3</p>
      </div>
    </div>
  );
};
