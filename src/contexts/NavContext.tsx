"use client";
import React, { createContext, useContext, useState } from 'react';

interface NavContextType {
  isNavVisible: boolean;
  toggleNav: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const toggleNav = () => setIsNavVisible(!isNavVisible);

  return (
    <NavContext.Provider value={{ isNavVisible, toggleNav, activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error("useNav must be used within NavProvider");
  return context;
};
// Activate
