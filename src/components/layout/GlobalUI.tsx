// @ts-nocheck
'use client';
import React from 'react';
import { ShoppingCart, Store, PlusSquare, Home, Mail, ChevronDown, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '@/contexts/NavContext';

const Node = ({ x, y, children, getPos }) => (
  <div 
    className="absolute pointer-events-auto flex flex-col items-center justify-center z-50"
    style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}
  >
    {children}
  </div>
);

const GlobalUI = ({ children }) => {
  const { isNavVisible, toggleNav } = useNav();
  
  const getPos = (gridX, gridY) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black shadow-2xl">
      {/* NỘI DUNG THAY ĐỔI THEO TAB */}
      <main className="w-full h-full relative z-0">
        {children}
      </main>

      {/* LỚP HỆ THỐNG CỐ ĐỊNH (SYSTEM LAYER) */}
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }}
            >
              <Node x={7.0} y={1.2} getPos={getPos}><ShoppingCart size={26} /></Node>
              <Node x={11.0} y={1.2} getPos={getPos}><Store size={26} /></Node>
              <Node x={15.0} y={1.2} getPos={getPos}><PlusSquare size={26} /></Node>
              <Node x={19.0} y={1.2} getPos={getPos}><Home size={26} /></Node>
              <Node x={23.0} y={1.2} getPos={getPos}><Mail size={26} /></Node>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút Master V - Không bao giờ ẩn */}
        <div 
          className="absolute pointer-events-auto cursor-pointer p-4"
          style={{ ...getPos(27.5, 1.2), transform: 'translate(-50%, 0%)' }}
          onClick={toggleNav}
        >
          <ChevronDown size={28} color="white" className={isNavVisible ? '' : 'rotate-180'} />
        </div>

        {/* Độc bản Bot AI #18 - Trôi nổi toàn cục */}
        <motion.div 
          drag 
          dragMomentum={false} 
          className="fixed z-[100] pointer-events-auto shadow-xl"
          style={{ top: '20%', right: '10%' }}
        >
           <div className="relative bg-blue-500 p-3 rounded-full border-2 border-white shadow-lg">
              <Bot size={24} color="white" /> 
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalUI;
