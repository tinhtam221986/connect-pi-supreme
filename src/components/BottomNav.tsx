"use client";
import React from "react";
import { Home, ShoppingBag, PlusCircle, Mail, User, ChevronUp, ChevronDown } from "lucide-react";
import { useNav } from "@/contexts/NavContext";
import { cn } from "@/lib/utils";

export default function BottomNav({ onTabChange, initialTab }: any) {
  const { isNavVisible, toggleNav, activeTab } = useNav();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'market', icon: ShoppingBag, label: 'Market' },
    { id: 'menu', icon: isNavVisible ? ChevronDown : ChevronUp, label: 'Menu', isSpecial: true },
    { id: 'inbox', icon: Mail, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="flex items-center justify-around h-24 bg-black/90 border-t border-white/10 px-4 pb-safe pointer-events-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        if (item.isSpecial) {
          return (
            <button key={item.id} onClick={toggleNav} className="flex flex-col items-center justify-center -translate-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 border-2 border-white">
                <Icon size={30} className="text-white" />
              </div>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn("flex flex-col items-center gap-1", isActive ? "text-purple-400" : "text-gray-500")}
          >
            <Icon size={26} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
