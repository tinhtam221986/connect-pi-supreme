// @ts-nocheck
"use client";
import React from 'react';
import HorizontalBottomNav from '@/components/feed/HorizontalBottomNav';
import { FloatingAIBot } from '@/components/ai/FloatingAIBot';
import { NavProvider } from '@/contexts/NavContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <NavProvider>
            <div className="fixed inset-0 bg-black overflow-hidden flex flex-col">
                <main className="flex-1 w-full relative">
                    {children}
                </main>
                
                {/* Thanh điều hướng nằm cố định ở dưới cùng, z-index cực cao */}
                <div className="relative z-[100]">
                    <HorizontalBottomNav />
                </div>

                <div className="fixed z-[99]">
                    <FloatingAIBot />
                </div>
            </div>
        </NavProvider>
    );
}
