// @ts-nocheck
'use client';
import React from 'react';
import HorizontalBottomNav from '@/components/feed/HorizontalBottomNav';
import { useNav } from '@/contexts/NavContext';
import { ChevronDown } from 'lucide-react';

export default function AppShell({ children }) {
  const { isNavVisible, toggleNav } = useNav();
  const getPos = (gridX, gridY) => ({ left: `${(gridX / 30) * 100}%`, bottom: `${(gridY / 40) * 100}%` });

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      {/* TẦNG 1: NỘI DUNG (VIDEO/PROFILE/SHOP) */}
      <main className="flex-1 w-full relative z-0 overflow-hidden">
        {children}
      </main>

      {/* TẦNG 2: PHẦN CỨNG HỆ THỐNG (Z-INDEX 100) */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        
        {/* Nút Master V (#5) - Không bao giờ độn thổ */}
        <div 
          className="absolute pointer-events-auto cursor-pointer p-5 transition-transform active:scale-90"
          style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
          onClick={toggleNav}
        >
          <ChevronDown size={32} color="white" className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-500 ${isNavVisible ? '' : 'rotate-180'}`} />
        </div>

        {/* Thanh Nav Đáy (#6 - #10) */}
        <div className={`absolute inset-x-0 bottom-0 transition-all duration-500 ease-in-out transform ${isNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
          <HorizontalBottomNav />
        </div>
      </div>
    </div>
  );
}
