'use client';
import React, { useState } from 'react';
// SỬA LỖI: Import Default (không có dấu ngoặc nhọn {})
import CameraRecorder from './CameraRecorder'; 
import { Upload, X } from 'lucide-react';

export default function CreateFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState('camera');

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button onClick={onClose}><X className="text-white" /></button>
        <span className="text-white font-bold">Tạo Video Mới</span>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {step === 'camera' ? (
          <CameraRecorder />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Bước tiếp theo...
          </div>
        )}
      </div>
    </div>
  );
}
