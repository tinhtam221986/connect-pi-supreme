'use client';
import React from 'react';
import { ShoppingCart, Store, PlusSquare, Home, Mail, ChevronDown, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

export default function GlobalUI({ children }: { children: React.ReactNode }) {
  const { isNavVisible, toggleNav, activeTab, setActiveTab } = useNav();

  // Hệ tọa độ Grid 30x40 chuẩn xác 100%
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, onClick, className = "" }: any) => (
    <div 
      onClick={onClick}
      className={`absolute pointer-events-auto flex flex-col items-center justify-center z-[60] cursor-pointer ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}
    >
      {children}
    </div>
  );

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
      {/* Z-INDEX [0-40]: CONTENT LAYER */}
      <main className="w-full h-full z-0">{children}</main>

      {/* Z-INDEX [50-90]: SYSTEM LAYER (PHẦN CỨNG GIAO DIỆN) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Cụm Nav Đáy - Cố định y=1.2 trên mọi Tab */}
        <AnimatePresence shadow-xl>
          {isNavVisible && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <Node x={7.0} y={1.2} onClick={() => setActiveTab('cart')}><ShoppingCart size={26} strokeWidth={1.5} /></Node>
              <Node x={11.0} y={1.2} onClick={() => setActiveTab('market')}><Store size={26} strokeWidth={1.5} /></Node>
              <Node x={15.0} y={1.2} onClick={() => setActiveTab('upload')}><PlusSquare size={26} strokeWidth={2.0} /></Node>
              <Node x={19.0} y={1.2} onClick={() => setActiveTab('home')}><Home size={26} strokeWidth={1.5} /></Node>
              <Node x={23.0} y={1.2} onClick={() => setActiveTab('inbox')}><Mail size={26} strokeWidth={1.5} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút Master V (#5) - Không bao giờ ẩn */}
        <div 
          className="absolute pointer-events-auto cursor-pointer p-2 z-[70] transition-transform duration-300"
          style={{ ...getPos(27.5, 1.2), transform: `translate(-50%, 0%) rotate(${isNavVisible ? 0 : 180}deg)` }}
          onClick={toggleNav}
        >
          <ChevronDown size={28} strokeWidth={2.0} />
        </div>
      </div>

      {/* Z-INDEX [100]: AI LAYER - BOT #18 TRÔI NỔI TOÀN CỤC */}
      <motion.div 
        drag 
        dragMomentum={false}
        className="fixed z-[100] pointer-events-auto cursor-grab active:cursor-grabbing"
        style={{ top: '20%', right: '10%' }}
      >
        <div className="relative p-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] border-2 border-white">
          <Bot size={24} color="white" />
        </div>
      </motion.div>
    </div>
  );
}
