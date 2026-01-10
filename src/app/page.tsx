"use client";

import { usePi } from '@/components/pi/pi-provider';
import LoginView from '@/components/LoginView';
import AppShell from '@/components/AppShell';
// Corrected: VideoFeed is a default export
import VideoFeed from '@/components/feed/VideoFeed';
// Corrected: NavProvider is needed for the VideoOverlay to function
import { NavProvider } from '@/contexts/NavContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isInitialized, isAuthenticated, user } = usePi();
  const router = useRouter();

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2">Initializing Pi SDK...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      // Corrected: Wrap the authenticated view in NavProvider
      <NavProvider>
        <AppShell>
          <VideoFeed />
        </AppShell>
      </NavProvider>
    );
  }

  return <LoginView />;
}
