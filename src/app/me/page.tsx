'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Settings, Grid, Heart, Bookmark } from 'lucide-react';
import { usePi } from '@/components/pi/pi-provider';

export default function MyProfilePage() {
  const router = useRouter();
  const { user } = usePi();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <ChevronLeft onClick={() => router.back()} className="cursor-pointer" />
        <span className="font-bold text-lg">Hồ sơ của tôi</span>
        <Settings className="w-5 h-5 text-zinc-400" />
      </div>

      {/* Thông tin User */}
      <div className="flex flex-col items-center py-8">
        <div className="w-24 h-24 rounded-full border-2 border-yellow-500 overflow-hidden mb-4">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'me'}`} 
            alt="avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">@{user?.username || 'Người dùng Pi'}</h2>
        <div className="flex gap-6 mt-4 text-sm text-zinc-400">
          <div className="text-center"><p className="text-white font-bold">0</p>Đang follow</div>
          <div className="text-center"><p className="text-white font-bold">0</p>Follower</div>
          <div className="text-center"><p className="text-white font-bold">0</p>Thích</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-zinc-800">
        <div className="flex-1 flex justify-center py-3 border-b-2 border-white"><Grid size={20}/></div>
        <div className="flex-1 flex justify-center py-3 text-zinc-500"><Heart size={20}/></div>
        <div className="flex-1 flex justify-center py-3 text-zinc-500"><Bookmark size={20}/></div>
      </div>
    </div>
  );
}
