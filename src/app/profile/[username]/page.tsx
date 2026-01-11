'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Grid, Heart, Bookmark, Store, MessageCircle } from 'lucide-react';
import { NavProvider } from '@/contexts/NavContext';
import AppShell from '@/components/AppShell';

export default function GuestProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  return (
    <NavProvider>
      <AppShell>
        <div className="min-h-screen bg-black text-white pb-24">
          {/* Header với nút Quay lại Video */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 sticky top-0 bg-black z-50">
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center gap-1 active:scale-90 transition-transform text-white"
            >
              <ChevronLeft size={24} />
              <span className="text-sm">Video</span>
            </button>
            <span className="font-bold text-lg">@{username}</span>
            <div className="w-6" /> {/* Giữ cân bằng cho header */}
          </div>

          {/* Thông tin Chủ Video (Khách) */}
          <div className="flex flex-col items-center py-8">
            <div className="w-24 h-24 rounded-full border-2 border-zinc-700 overflow-hidden mb-4 shadow-lg">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
                alt="avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">@{username}</h2>
            
            {/* Nút Tương tác: Nhắn tin & Cửa hàng */}
            <div className="flex gap-3 mt-4">
              <button className="px-6 py-2 bg-zinc-800 rounded-md font-bold text-sm flex items-center gap-2 active:scale-95 transition-all">
                <MessageCircle size={16} /> Nhắn tin
              </button>
              <button 
                onClick={() => router.push(`/shop/${username}`)}
                className="px-6 py-2 bg-yellow-600 rounded-md font-bold text-sm text-black flex items-center gap-2 active:scale-95 transition-all"
              >
                <Store size={16} /> Cửa hàng
              </button>
            </div>

            <div className="flex gap-6 mt-6 text-sm text-zinc-400">
              <div className="text-center"><p className="text-white font-bold">1.2K</p>Follow</div>
              <div className="text-center"><p className="text-white font-bold">45K</p>Follower</div>
              <div className="text-center"><p className="text-white font-bold">800K</p>Thích</div>
            </div>
          </div>

          {/* Lưới Video của Khách */}
          <div className="flex border-t border-zinc-800">
            <div className="flex-1 flex justify-center py-3 border-b-2 border-white text-white"><Grid size={20}/></div>
            <div className="flex-1 flex justify-center py-3 text-zinc-500"><Heart size={20}/></div>
            <div className="flex-1 flex justify-center py-3 text-zinc-500"><Bookmark size={20}/></div>
          </div>
          
          <div className="grid grid-cols-3 gap-0.5 mt-0.5 px-0.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 animate-pulse rounded-sm" />
            ))}
          </div>
        </div>
      </AppShell>
    </NavProvider>
  );
}
