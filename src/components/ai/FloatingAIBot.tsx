"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function FloatingAIBot() {
  return (
    <motion.div
      drag
      dragConstraints={{
        top: -200,
        left: -50,
        right: 200,
        bottom: 200,
      }}
      className="fixed bottom-28 right-3 z-50 p-0 m-0"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg cursor-pointer active:cursor-grabbing">
        <Bot className="w-8 h-8" />
      </div>
    </motion.div>
  );
}
