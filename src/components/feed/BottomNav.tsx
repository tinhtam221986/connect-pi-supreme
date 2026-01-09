
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';
import { Home, Mail, Plus, ShoppingCart, Store, ChevronDown, ChevronUp, User, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav({ isNavOpen }: { isNavOpen: boolean }) {
  const router = useRouter();

  const iconSize = "w-7 h-7";
  const mainIconContainerClass = "flex flex-col items-center gap-1 text-white drop-shadow-lg";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 h-20 bg-transparent pointer-events-none">
      <div className="container mx-auto h-full flex justify-between items-center px-4">

        {}
        <div className={cn(
            "flex-1 flex justify-center items-center gap-5 transition-all duration-300 pointer-events-auto",
            isNavOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}>
          {}
          <Link href="/cart" className={mainIconContainerClass}>
            <ShoppingCart className={iconSize} />
            <span className="text-xs font-bold"></span>
          </Link>
          {}
          <Link href="/marketplace" className={mainIconContainerClass}>
            <Store className={iconSize} />
            <span className="text-xs font-bold"></span>
          </Link>
          {}
          <Link href="/upload" className="bg-white text-black rounded-full p-2 shadow-lg">
            <Plus className="w-6 h-6" />
          </Link>
          {}
           <Popover.Root>
                <Popover.Trigger asChild>
                    <button className={mainIconContainerClass}>
                        <Home className={iconSize}/>
                        <span className="text-xs font-bold"></span>
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content side="top" align="center" sideOffset={10} className="z-50 w-56 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 p-2 shadow-lg pointer-events-auto">
                        <button onClick={() => router.push('/profile/me')} className="w-full flex items-center gap-2 text-left p-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors">
                            <User className="w-4 h-4" />
                            Go to Personal Profile
                        </button>
                         <button onClick={() => router.push('/')} className="w-full flex items-center gap-2 text-left p-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors">
                            <Tv className="w-4 h-4" />
                            Return to Main Screen
                        </button>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
          {}
          <Link href="/notifications" className={cn(mainIconContainerClass, "relative")}>
            <Mail className={iconSize} />
            <span className="text-xs font-bold"></span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-transparent"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
