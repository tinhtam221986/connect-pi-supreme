"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Home, Plus, Store, ShoppingCart, User, Video } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';
import { useNav } from '@/contexts/NavContext';

const HorizontalBottomNav = () => {
  const { isNavOpen } = useNav();
  const pathname = usePathname();
  const [hasNotification, setHasNotification] = useState(true); // Mock state

  const navItems = [
    { href: '/inbox', icon: Mail, label: 'Hộp thư' },
    { component: HomeMenu, label: 'HOME' },
    { href: '/create', icon: Plus, label: 'Tạo mới' },
    { href: '/market', icon: Store, label: 'Siêu thị' },
    { href: '/cart', icon: ShoppingCart, label: 'Giỏ hàng' },
  ];

  // The user-specified clockwise order: Cart -> Store -> + -> Home -> Inbox
  const orderedNavItems = [
      navItems[4], // Giỏ hàng
      navItems[3], // Siêu thị
      navItems[2], // +
      navItems[1], // HOME
      navItems[0], // Hộp thư
  ];


  if (pathname === '/create') {
    return null;
  }

  return (
    <AnimatePresence>
      {isNavOpen && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-20 bg-transparent flex justify-center items-center pointer-events-none pb-safe z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-center items-center w-full max-w-xs h-full pointer-events-auto gap-x-4">
            {orderedNavItems.map((item) => {
              const iconSize = item.label === 'Tạo mới' ? 'w-7 h-7' : 'w-6 h-6';
              return (
                <div key={item.label} className="flex justify-center items-center">
                   {item.component ? (
                      <item.component iconSize={iconSize} />
                  ) : (
                      <Link href={item.href || '#'} className="relative p-2">
                          <item.icon className={`${iconSize} text-white`} />
                          {item.label === 'Hộp thư' && hasNotification && (
                              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-black" />
                          )}
                      </Link>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HomeMenu = ({ iconSize = 'w-7 h-7' }) => {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="p-2">
            <Home className={`${iconSize} text-white`} />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="top" align="center" sideOffset={15} className="z-50 w-48 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 p-2 shadow-lg pointer-events-auto">
            <Link href="/profile/me">
                <div className="flex items-center gap-3 p-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Vào trang cá nhân</span>
                </div>
            </Link>
             <Link href="/">
                <div className="flex items-center gap-3 p-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors">
                    <Video className="w-4 h-4" />
                    <span>Quay lại Video</span>
                </div>
            </Link>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
}

export default HorizontalBottomNav;
