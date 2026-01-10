"use client";
import React, { useState } from 'react';

export default function Home() {
  const [agreed, setAgreed] = useState(false);

  const handleConnectPi = () => {
    if (!agreed) {
      alert("Ngài vui lòng đồng ý với Sách trắng trước khi kết nối!");
      return;
    }
    alert("Đang kết nối với Pi Network... Boss AI đang kiểm tra quyền truy cập!");
    // Logic Pi SDK Login sẽ đấu nối tại đây
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {/* Boss AI Welcome */}
      <div className="mb-8 text-center">
        <div className="w-24 h-24 bg-purple-600 rounded-full mx-auto mb-4 animate-pulse shadow-[0_0_30px_rgba(147,51,234,0.8)] flex items-center justify-center">
          <span className="text-4xl">🤖</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-purple-500">CONNECT SUPREME</h1>
        <p className="text-gray-400 mt-2">Vũ trụ Web3 - Tầm nhìn 2026</p>
      </div>

      {/* Cổng đăng nhập */}
      <div className="w-full max-w-md bg-zinc-900 border border-purple-900/50 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-yellow-500">Cổng Đăng Nhập Hệ Thống</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
            <input 
              type="checkbox" 
              id="whitepaper"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1 w-5 h-5 accent-purple-600 cursor-pointer"
            />
            <label htmlFor="whitepaper" className="text-sm text-gray-400 leading-relaxed">
              Tôi xác nhận đã đọc và tuyệt đối tuân thủ bản <span className="text-purple-400 font-bold underline cursor-pointer">Sách trắng (Whitepaper)</span> của Connect Supreme.
            </label>
          </div>

          <button 
            onClick={handleConnectPi}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-500 ${
              agreed 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 shadow-[0_0_25px_rgba(147,51,234,0.6)]' 
              : 'bg-zinc-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            KẾT NỐI PI NETWORK 🚀
          </button>
        </div>
      </div>

      {/* Footer Sách trắng */}
      <div className="mt-12 text-center text-xs text-gray-600 uppercase tracking-widest">
        Dự án đang trong giai đoạn Enclosed Mainnet <br/>
        Cố vấn & Phó Giám đốc rà soát hệ thống
      </div>
    </div>
  );
}
