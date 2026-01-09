'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

// Placeholder for BotIcon as per plan
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
    <path d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z" fill="white"/>
    <path d="M12 14C9.79 14 8 15.79 8 18H16C16 15.79 14.21 14 12 14Z" fill="white"/>
  </svg>
);

// Giữ nguyên các hàm bổ trợ tọa độ và CSS tinh tế của Phó Giám đốc
const VideoOverlay = ({ uploader, caption, stats }: any) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none text-white">
      {}
      <div className="absolute right-3 bottom-32 flex flex-col gap-5 pointer-events-auto">
        {}
        <div className="flex flex-col items-center">
          <div className="bg-black/20 backdrop-blur-md p-2.5 rounded-full border border-white/20">
            <Heart size={24} fill="white" />
          </div>
          <span className="text-[10px] mt-1 shadow-sm">{stats?.likes || '1.2K'}</span>
        </div>

        {}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative bg-blue-500 p-3 rounded-full border-2 border-white/80 shadow-lg">
             {}
             <BotIcon /> 
          </div>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-bold text-blue-400 whitespace-nowrap">AI ASSISTANT</span>
        </div>

        {}
        <Link href={`/profile/${uploader?.username}/shop`}>
          <div className="bg-yellow-500 p-2.5 rounded-full border border-white/20 shadow-lg">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="text-[10px] mt-1 text-center font-bold text-yellow-400">Shop</span>
        </Link>
      </div>
      
      {}
      <div className="absolute bottom-24 left-4 pointer-events-auto max-w-[80%]">
        <h3 className="font-bold text-base drop-shadow-md">@{uploader?.username || 'Admin'}</h3>
        <p className="text-xs opacity-90 drop-shadow-sm line-clamp-2">{caption}</p>
        {}
        <p className="text-[9px] opacity-60 mt-1 font-mono">
          UI v{process.env.NEXT_PUBLIC_UI_VERSION || '27.4'}
        </p>
      </div>
    </div>
  );
};

export default VideoOverlay;