'use client';

import React from 'react';
import { usePi } from '@/providers/PiSDKProvider';

export default function ProfilePage() {
  const { user, loading } = usePi();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h1>
      {user ? (
        <div className="bg-gray-900 p-4 rounded-lg">
          <p>Chào mừng, <span className="text-purple-400">{user.username}</span></p>
        </div>
      ) : (
        <p className="text-gray-400">Vui lòng đăng nhập qua Pi Browser</p>
      )}
    </div>
  );
}
