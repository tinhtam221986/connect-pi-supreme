'use client';

import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-x-hidden">
      {/* Khu vực hiển thị nội dung chính */}
      <div className="flex-1 w-full max-w-md mx-auto relative pb-20">
        {children}
      </div>
    </div>
  );
}
