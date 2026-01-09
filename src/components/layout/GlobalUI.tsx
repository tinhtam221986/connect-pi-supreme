'use client';
import React from 'react';
import { 
  ShoppingCart, 
  Store, 
  PlusSquare, 
  Home, 
  Mail, 
  ChevronDown, 
  Bot 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

export default function GlobalUI({ children }: { children: React.ReactNode }) {
  const { isNavVisible, toggleNav, setActiveTab } = useNav();

  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, onClick }: any) => (
    <div 
      onClick={onClick}
      className="absolute pointer-events-auto flex flex-col items-center justify-center z-[60] cursor-pointer"
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}
    >
      {children}
    </div>
  );

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
      {/* LỚP NỘI DUNG (Z-0) */}
      <main className="w-full h-full relative z-0">{children}</main>

      {/* LỚP HỆ THỐNG (SYSTEM LAYER) */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <Node x={7.0} y={1.2} onClick={() => setActiveTab('cart')}><ShoppingCart size={26} /></Node>
              <Node x={11.0} y={1.2} onClick={() => setActiveTab('market')}><Store size={26} /></Node>
              <Node x={15.0} y={1.2} onClick={() => setActiveTab('upload')}><PlusSquare size={26} /></Node>
              <Node x={19.0} y={1.2} onClick={() => setActiveTab('home')}><Home size={26} /></Node>
              <Node x={23.0} y={1.2} onClick={() => setActiveTab('inbox')}><Mail size={26} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NÚT MASTER V #5 (LUÔN HIỆN) */}
        <div 
          className="absolute pointer-events-auto cursor-pointer p-2 z-[70] transition-transform duration-300"
          style={{ ...getPos(27.5, 1.2), transform: `translate(-50%, 0%) rotate(${isNavVisible ? 0 : 180}deg)` }}
          onClick={toggleNav}
        >
          <ChevronDown size={28} />
        </div>
      </div>

      {/* BOT AI #18 (LỚP TRÊN CÙNG) */}
      <motion.div drag dragMomentum={false} className="fixed z-[100] pointer-events-auto" style={{ top: '20%', right: '10%' }}>
        <div className="bg-cyan-500 p-3 rounded-full shadow-lg border-2 border-white">
          <Bot size={24} color="white" />
        </div>
      </motion.div>
    </div>
  );
}
