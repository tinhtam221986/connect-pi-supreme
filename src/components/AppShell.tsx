"use client";

import React from 'react';
import HorizontalBottomNav from '@/components/feed/HorizontalBottomNav';
import { FloatingAIBot } from '@/components/ai/FloatingAIBot';
import { NavProvider } from '@/contexts/NavContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <NavProvider>
            <div className="w-full h-[100dvh] bg-black relative overflow-hidden">
                <main className="w-full h-full">{children}</main>
                <HorizontalBottomNav />
                <FloatingAIBot />
            </div>
        </NavProvider>
    );
}
