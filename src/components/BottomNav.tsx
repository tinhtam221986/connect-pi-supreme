"use client";
import React, { useState } from "react";
import { Home, ShoppingBag, Mail, User, ChevronUp, ChevronDown } from "lucide-react";

export default function BottomNav({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  // Tự quản lý trạng thái bên trong để không phụ thuộc file khác
  const [activeTab, setActiveTab] = useState('home');
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'market', icon: ShoppingBag, label: 'Market' },
    { id: 'menu', icon: isNavVisible ? ChevronDown : ChevronUp, label: 'Menu', isSpecial: true },
    { id: 'inbox', icon: Mail, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const handleNavClick = (tabId: string) => {
    if (tabId === 'menu') {
      setIsNavVisible(!isNavVisible);
    } else {
      setActiveTab(tabId);
      if (onTabChange) onTabChange(tabId);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : 'translate-y-[65%]'}`}>
      <nav className="flex items-center justify-around h-24 bg-black border-t border-white/10 px-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isSpecial) {
            return (
              <button key={item.id} onClick={() => handleNavClick('menu')} className="flex flex-col items-center justify-center -translate-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Icon size={28} className="text-white" />
                </div>
                <span className="text-[10px] mt-1 text-white font-bold">MENU</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-purple-400" : "text-gray-500"}`}
            >
              <Icon size={24} />
              <span className="text-[9px] font-medium uppercase tracking-tighter">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
