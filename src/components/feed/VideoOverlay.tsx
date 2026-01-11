'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, Search, Store, Disc, Volume2, VolumeX, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoOverlay = ({ uploader, caption, stats }: any) => {
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  // Hàm xử lý Bật/Tắt tiếng (Sẽ kết nối với VideoPlayer qua sự kiện Window)
  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    window.dispatchEvent(new CustomEvent('toggle-video-audio', { detail: nextMuted }));
  };

  return (
    <div className="absolute inset-0 text-white pointer-events-none z-[50]">
      {/* NÚT TƯƠNG TÁC PHẢI */}
      <div className="absolute right-2 bottom-32 flex flex-col gap-5 items-center pointer-events-auto">
        <div onClick={() => setLiked(!liked)} className="flex flex-col items-center">
          <Heart size={28} fill={liked ? "#ef4444" : "none"} className={liked ? "text-red-500" : "text-white"} />
          <span className="text-[10px] font-bold mt-1">{liked ? 1201 : 1200}</span>
        </div>
        <div className="flex flex-col items-center">
           <MessageCircle size={28} />
           <span className="text-[10px] font-bold mt-1">85</span>
        </div>
        <Share2 size={28} />
        <Bookmark size={28} />
      </div>

      {/* THÔNG TIN BÊN TRÁI & NÚT SHOP SỬA LỖI SIZE */}
      <div className="absolute left-3 bottom-24 w-[70%] pointer-events-auto">
        <div className="mb-3">
          <Link href={`/shop/${uploader?.username}`} 
                className="inline-flex items-center gap-1 px-2 py-1 bg-black/60 rounded border border-yellow-500/50 max-w-fit">
            <Store size={14} className="text-yellow-400" />
            <span className="text-[9px] font-black text-yellow-400">SHOP KHÁCH</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full border border-white overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader?.username}`} className="w-full h-full object-cover" />
          </div>
          <p className="font-bold text-sm">@{uploader?.username || 'Pi_User'}</p>
        </div>
        <p className="text-xs line-clamp-2">{caption}</p>
      </div>

      {/* NÚT LOA & ĐĨA QUAY */}
      <div className="absolute left-3 bottom-6 flex items-center gap-3 pointer-events-auto">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
          <Disc size={24} className="text-zinc-400" />
        </motion.div>
        <button onClick={toggleAudio} className="p-2 bg-black/20 rounded-full backdrop-blur-sm">
          {isMuted ? <VolumeX size={20} className="text-red-500" /> : <Volume2 size={20} className="text-green-400" />}
        </button>
      </div>
    </div>
  );
};

export default VideoOverlay;
