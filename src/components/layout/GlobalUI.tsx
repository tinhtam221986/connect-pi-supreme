'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

// Tự định nghĩa các Icon để đảm bảo Build luôn Xanh
const Icon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const PATHS = {
  cart: "M9 22a1 1 0 1 0 0 2 1 1 0 1 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 1 0 0-2zm-7-3h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z",
  market: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  plus: "M12 5v14M5 12h14",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z m16 0l-8 7-8-7"
};

export default function GlobalUI({ children }: { children: React.ReactNode }) {
  const { isNavVisible, toggleNav, setActiveTab }: any = useNav();

  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
      <main className="w-full h-full relative z-0">{children}</main>

      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} className="absolute inset-0">
              <div className="absolute pointer-events-auto cursor-pointer" style={getPos(7, 1.2)} onClick={() => setActiveTab('cart')}><Icon path={PATHS.cart} /></div>
              <div className="absolute pointer-events-auto cursor-pointer" style={getPos(11, 1.2)} onClick={() => setActiveTab('market')}><Icon path={PATHS.market} /></div>
              <div className="absolute pointer-events-auto cursor-pointer" style={getPos(15, 1.2)} onClick={() => setActiveTab('upload')}><Icon path={PATHS.plus} /></div>
              <div className="absolute pointer-events-auto cursor-pointer" style={getPos(19, 1.2)} onClick={() => setActiveTab('home')}><Icon path={PATHS.home} /></div>
              <div className="absolute pointer-events-auto cursor-pointer" style={getPos(23, 1.2)} onClick={() => setActiveTab('inbox')}><Icon path={PATHS.mail} /></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút Master V #5 */}
        <div 
          className="absolute pointer-events-auto cursor-pointer p-2 transition-transform"
          style={{ ...getPos(27.5, 1.2), transform: `translate(-50%, 0%) rotate(${isNavVisible ? 0 : 180}deg)` }}
          onClick={toggleNav}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
              }
