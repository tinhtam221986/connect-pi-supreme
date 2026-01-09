"use client";
import React from "react";
import { Home, ShoppingBag, Mail, User, ChevronUp, ChevronDown } from "lucide-react";
import { useNav } from "@/contexts/NavContext";
import { cn } from "@/lib/utils";

// Khai báo rõ ràng interface để Vercel không báo lỗi đỏ
interface BottomNavProps {
  onTabChange: (tab: string) => void;
  initialTab?: string;
}

export default function BottomNav({ onTabChange, initialTab }: BottomNavProps) {
  const { isNavVisible, toggleNav, activeTab, setActiveTab } = useNav();

  // Hàm xử lý điều hướng thông minh
  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'market', icon: ShoppingBag, label: 'Market' },
    { id: 'menu', icon: isNavVisible ? ChevronDown : ChevronUp, label: 'Menu', isSpecial: true },
    { id: 'inbox', icon: Mail, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="flex items-center justify-around h-24 bg-black/95 border-t border-white/10 px-4 pb-safe pointer-events-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        // Xử lý riêng cho Nút số 5 (Menu xổ lên/xuống)
        if (item.isSpecial) {
          return (
            <button 
              key={item.id} 
              onClick={toggleNav} 
              className="flex flex-col items-center justify-center -translate-y-4 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 border-2 border-white/80">
                <Icon size={28} className="text-white" />
              </div>
              <span className="text-[10px] mt-1 text-white font-bold uppercase tracking-tighter">Menu</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200",
              isActive ? "text-purple-400 scale-110" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("text-[9px] font-medium uppercase", isActive ? "opacity-100" : "opacity-70")}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
