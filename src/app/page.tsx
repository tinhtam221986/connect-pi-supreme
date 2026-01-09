"use client";
import React, { Suspense } from 'react';
import AppShell from '@/components/AppShell';

// Component dự phòng khi đang tải
const Loading = () => <div className="bg-black h-screen w-full flex items-center justify-center text-white">Đang tải Connect Pi...</div>;

export default function HomePage() {
  return (
    <AppShell>
      <div className="relative h-[calc(100vh-96px)] w-full bg-black overflow-hidden">
        {/* Lớp Video nền giả lập để test hiển thị nút */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-0" />
        
        {/* Khu vực thông tin người dùng và nội dung */}
        <div className="absolute bottom-4 left-4 z-10 space-y-2">
          <h2 className="text-white font-bold text-lg">@Connect_User</h2>
          <p className="text-white/80 text-sm max-w-[280px]">Chào mừng ngài đến với Connect Pi Supreme! Hệ thống đang khởi tạo...</p>
        </div>

        {/* Nút Shop (Nút số 14) nằm bên phải */}
        <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
               <span className="text-white text-[10px]">AI</span>
            </div>
            <span className="text-[10px] text-white">ASSISTANT</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
               🛒
            </button>
            <span className="text-[10px] text-white">Shop</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
