"use client";

import { usePi } from '@/components/pi/pi-provider';
import LoginView from '@/components/LoginView';
import AppShell from '@/components/AppShell';
import VideoFeed from '@/components/feed/VideoFeed';
import { NavProvider } from '@/contexts/NavContext';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { isInitialized, isAuthenticated } = usePi();
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Cơ chế bảo vệ: Nếu sau 5s SDK không phản hồi, vẫn cho phép hiện màn hình đăng nhập
  useEffect(() => {
    const timer = setTimeout(() => setTimeoutReached(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized && !timeoutReached) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-light tracking-widest animate-pulse">CONNECT SUPREME ĐANG KHỞI TẠO...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <NavProvider>
        <AppShell>
          <VideoFeed />
        </AppShell>
      </NavProvider>
    );
  }

  return <LoginView />;
}
