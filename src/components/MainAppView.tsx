"use client";
import React, { useState } from 'react';
import { VideoFeed } from '@/components/feed/VideoFeed';
import { MarketplaceView } from '@/components/market/MarketplaceView';
import { UserProfile } from '@/components/profile/UserProfile';
import { BottomNav } from '@/components/BottomNav';

export default function MainAppView() {
  const [activeTab, setActiveTab] = useState('home');

  // GIỮ NGUYÊN LOGIC KẾT NỐI CỦA JULES
  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'home': return <VideoFeed onNavigate={setActiveTab} />;
        case 'market': return <MarketplaceView onBack={() => setActiveTab('home')} />;
        case 'profile': return <UserProfile onBack={() => setActiveTab('home')} />;
        default: return <VideoFeed onNavigate={setActiveTab} />;
      }
    } catch (error) {
      // Nếu logic của Jules gặp lỗi dữ liệu, màn hình sẽ không đen mà hiện thông báo này
      return <div className="flex items-center justify-center h-full text-white p-10 text-center">
        Hệ thống đang đồng bộ dữ liệu Pi Network... <br/> Vui lòng chờ trong giây lát.
      </div>;
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-black text-white relative overflow-hidden">
      <main className="flex-1 w-full h-full relative z-0">
        {renderContent()}
      </main>
      {/* NÚT ĐIỀU HƯỚNG CỦA CHÚNG TA - LUÔN NẰM TRÊN CÙNG (Z-50) */}
      <div className="relative z-50">
        <BottomNav onTabChange={setActiveTab} initialTab={activeTab} />
      </div>
    </div>
  );
}
