'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { usePi } from '@/providers/PiSDKProvider';

// Tạo component nội dung bên trong
function ProfileContent() {
  const { user, loading } = usePi();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h1>
      {user ? (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-1">Tên người dùng</p>
          <p className="text-xl font-semibold text-purple-400">@{user.username}</p>
        </div>
      ) : (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-center">
          <p className="text-zinc-400">Vui lòng truy cập qua Pi Browser để xem hồ sơ</p>
        </div>
      )}
    </div>
  );
}

// Export trang profile với tùy chọn disable SSR (Server Side Rendering)
export default dynamic(() => Promise.resolve(ProfileContent), {
  ssr: false
});
