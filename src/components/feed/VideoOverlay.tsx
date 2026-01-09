'use client';
import React from 'react';

export default function VideoOverlay({ uploader = { username: 'architect' }, stats = { likes: '1.2K', comments: '45' } }: any) {
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const SvgIcon = ({ children, size = 24 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );

  return (
    <div className="absolute inset-0 pointer-events-none select-none text-white z-40">
      {/* Nút Tìm Kiếm #17 */}
      <div className="absolute pointer-events-auto" style={getPos(27.5, 37.5)}>
        <SvgIcon size={22}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></SvgIcon>
      </div>

      {/* Cụm Tương Tác Phải #1, #2, #3, #4 */}
      <div className="absolute pointer-events-auto flex flex-col items-center gap-4" style={getPos(27.5, 20)}>
        <div className="flex flex-col items-center">
          <SvgIcon><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></SvgIcon>
          <span className="text-[10px]">{stats.likes}</span>
        </div>
        <SvgIcon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></SvgIcon>
        <SvgIcon><path d="m22 2-7 20-4-9-9-4Z"/></SvgIcon>
        <SvgIcon><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></SvgIcon>
      </div>

      {/* #14 SHOP KHÁCH - Tọa độ vàng 2.5, 7.5 */}
      <div className="absolute pointer-events-auto" style={getPos(2.5, 7.5)}>
        <div className="flex flex-col items-center p-1 bg-black/40 rounded border border-yellow-400">
          <SvgIcon size={18}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></SvgIcon>
          <span className="text-[7px] font-bold text-yellow-400">SHOP</span>
        </div>
      </div>

      {/* Thông tin #13, #12 */}
      <div className="absolute pointer-events-auto px-4" style={{...getPos(0, 3.5), left: '4%'}}>
        <p className="font-bold text-[13px]">@{uploader.username}</p>
        <p className="text-[10px] opacity-80">Connect Pi Supreme 🚀</p>
      </div>
    </div>
  );
}
