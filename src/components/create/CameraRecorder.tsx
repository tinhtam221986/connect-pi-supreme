"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Circle } from 'lucide-react';

export const CameraRecorder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    setupCamera();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-black">
      <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8">
          <button className="p-4 bg-white/20 rounded-full backdrop-blur-md">
            <RefreshCw className="text-white" size={28} />
          </button>
          
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className="w-20 h-20 bg-red-600 rounded-full border-4 border-white flex items-center justify-center"
          >
            {isRecording && <div className="w-8 h-8 bg-white rounded-sm" />}
          </button>

          <button className="p-4 bg-white/20 rounded-full backdrop-blur-md">
            <Camera className="text-white" size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
