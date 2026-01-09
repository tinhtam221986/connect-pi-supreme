"use client";
import React from "react";
import { Home, ShoppingBag, Mail, User, ChevronUp, ChevronDown } from "lucide-react";
import { useNav } from "@/contexts/NavContext";

export default function BottomNav({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const { isNavVisible, toggleNav, activeTab, setActiveTab } = useNav();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'market', icon: ShoppingBag, label: 'Market' },
    { id: 'menu', icon: isNavVisible ? ChevronDown : ChevronUp, label: 'Menu', isSpecial: true },
    { id: 'inbox', icon: Mail, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="flex items-center justify-around h-24 bg-black border-t border-white/10 px-4 pb-safe w-full">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        if (item.isSpecial) {
          return (
            <button key={item.id} onClick={toggleNav} className="flex flex-col items-center justify-center -translate-y-4">
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
            className={`flex flex-col items-center gap-1 ${isActive ? "text-purple-400" : "text-gray-500"}`}
          >
            <Icon size={24} />
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
