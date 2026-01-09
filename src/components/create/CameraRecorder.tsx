'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, StopCircle } from 'lucide-react';

interface CameraRecorderProps {
  onVideoRecorded: (blob: Blob) => void;
}

export default function CameraRecorder({ onVideoRecorded }: CameraRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => onVideoRecorded(new Blob(chunks, { type: 'video/webm' }));
    
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="relative h-full bg-black flex flex-col items-center justify-center">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
      
      <div className="absolute bottom-10 flex gap-6 items-center">
        {!stream ? (
          <button onClick={startCamera} className="p-4 bg-white text-black rounded-full font-bold">
            Bật Camera
          </button>
        ) : (
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-6 rounded-full ${isRecording ? 'bg-red-600 animate-pulse' : 'bg-white'}`}
          >
            {isRecording ? <StopCircle size={32} /> : <div className="w-8 h-8 bg-red-600 rounded-full" />}
          </button>
        )}
      </div>
    </div>
  );
}
