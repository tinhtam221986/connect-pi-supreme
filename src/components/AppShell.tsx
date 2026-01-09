"use client";
import React, { useState } from 'react';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow pb-24">
        {children}
      </main>
      <BottomNav onTabChange={(tab) => setActiveTab(tab)} initialTab={activeTab} />
    </div>
  );
}
