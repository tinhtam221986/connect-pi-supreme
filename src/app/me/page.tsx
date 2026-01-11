'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Settings, Grid, Heart, Bookmark, Play } from 'lucide-react';
import { usePi } from '@/components/pi/pi-provider';
import { apiClient } from '@/lib/api-client';
import AppShell from '@/components/AppShell';

export default function MyProfilePage() {
  const router = useRouter();
  const { user } = usePi();
  const [myVideos, setMyVideos] = useState<any[]>([]);

  // LỆNH ĐẤU NỐI: Lấy video của tôi từ Server
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await apiClient.feed.get(); // Tạm thời dùng feed, sau này Jules đổi thành getMyVideos
        if (Array.isArray(res)) {
          // Chỉ lọc lấy video của chính mình
          const filtered = res.filter(v => v.uploader?.username === user?.username);
          setMyVideos(filtered.length > 0 ? filtered : res.slice(0, 6)); // Nếu chưa có video, hiện tạm video hệ thống
        }
      } catch (e) { console.error(e); }
    };
    fetchContent();
  }, [user]);

  return (
    <AppShell>
      <div className="min-h-screen bg-black text-white pb-24 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 sticky top-0 bg-black z-50">
          <button onClick={() => router.push('/')} className="flex items-center gap-1"><ChevronLeft size={24} /><span>Video</span></button>
          <span className="font-bold">Hồ sơ của tôi</span>
          <Settings className="w-5 h-5" />
        </div>

        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 rounded-full border-2 border-yellow-500 overflow-hidden mb-3">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'me'}`} className="w-full h-full object-cover" />
          </div>
          <h2 className="font-bold text-lg">@{user?.username || 'Guest'}</h2>
          <div className="flex gap-8 mt-4 text-xs text-zinc-400">
            <div className="text-center"><p className="text-white font-bold">1.2K</p>Đang follow</div>
            <div className="text-center"><p className="text-white font-bold">45K</p>Follower</div>
            <div className="text-center"><p className="text-white font-bold">800K</p>Thích</div>
          </div>
        </div>

        <div className="flex border-t border-zinc-900 sticky top-[57px] bg-black z-40">
          <div className="flex-1 flex justify-center py-3 border-b-2 border-white"><Grid size={20}/></div>
          <div className="flex-1 flex justify-center py-3 text-zinc-600"><Heart size={20}/></div>
          <div className="flex-1 flex justify-center py-3 text-zinc-600"><Bookmark size={20}/></div>
        </div>

        {/* LƯỚI VIDEO: Nơi video sẽ xuất hiện */}
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {myVideos.map((vid) => (
            <div key={vid._id} className="aspect-[3/4] bg-zinc-900 relative group cursor-pointer" onClick={() => router.push('/')}>
              <video src={vid.video_url} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1 flex items-center gap-1 text-[10px] font-bold">
                <Play size={10} fill="white" /> {vid.stats?.likes || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
