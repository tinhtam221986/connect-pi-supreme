'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Settings, Grid, Heart, Bookmark } from 'lucide-react';
import { usePi } from '@/components/pi/pi-provider';
import { NavProvider } from '@/contexts/NavContext';
import AppShell from '@/components/AppShell';

export default function MyProfilePage() {
  const router = useRouter();
  const { user } = usePi();

  return (
    <NavProvider>
      <AppShell> {/* Bọc AppShell để có thanh điều hướng và nút số 5 */}
        <div className="min-h-screen bg-black text-white pb-20">
          {/* Header với nút Quay lại */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 sticky top-0 bg-black z-50">
            <button onClick={() => router.push('/')} className="flex items-center gap-1 active:scale-90 transition-transform">
              <ChevronLeft size={24} />
              <span className="text-sm">Video</span>
            </button>
            <span className="font-bold text-lg">Hồ sơ của tôi</span>
            <Settings className="w-5 h-5 text-zinc-400" />
          </div>

          {/* Nội dung Profile (Giữ nguyên như bản trước) */}
          <div className="flex flex-col items-center py-8">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-500 overflow-hidden mb-4 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
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

          {/* Tabs bên dưới */}
          <div className="flex border-t border-zinc-800">
            <div className="flex-1 flex justify-center py-3 border-b-2 border-white"><Grid size={20}/></div>
            <div className="flex-1 flex justify-center py-3 text-zinc-500"><Heart size={20}/></div>
            <div className="flex-1 flex justify-center py-3 text-zinc-500"><Bookmark size={20}/></div>
          </div>
        </div>
      </AppShell>
    </NavProvider>
  );
}
