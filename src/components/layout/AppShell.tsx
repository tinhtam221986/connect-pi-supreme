'use client';

import React from 'react';
import BottomNav from '@/components/navigation/BottomNav';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-x-hidden">
      {/* Khu vực nội dung chính */}
      <div className="flex-1 w-full max-w-md mx-auto relative">
        {children}
      </div>
      
      {/* Thanh điều hướng 5 nút luôn ở dưới cùng */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-md">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
