"use client";
import React from 'react';
import { NavProvider, useNav } from '@/contexts/NavContext';
import BottomNav from './BottomNav';
import { FloatingAIBot } from '@/components/ai/FloatingAIBot';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { isNavVisible, activeTab, setActiveTab } = useNav();

  return (
    <div className="w-full h-[100dvh] bg-black relative overflow-hidden flex flex-col">
      {/* Vùng nội dung chính */}
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>

      {/* Nút số 5 & Thanh điều hướng - Logic không bao giờ ẩn hoàn toàn */}
      <div className={`transition-all duration-300 z-50 ${isNavVisible ? 'translate-y-0' : 'translate-y-[70%]'}`}>
         <BottomNav onTabChange={setActiveTab} initialTab={activeTab} />
      </div>

      {/* Robot AI của Jules - Luôn nổi lên trên */}
      <FloatingAIBot />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <ShellContent>{children}</ShellContent>
    </NavProvider>
  );
}
