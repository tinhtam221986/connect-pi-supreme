"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Interface matches the spec and usage in VideoOverlay
interface NavContextType {
  isNavVisible: boolean;
  toggleNav: () => void;
}

// Export the context directly to be used by consumers
export const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  // Renamed state to match the interface and spec
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNav = () => {
    setIsNavVisible(prev => !prev);
  };

  return (
    <NavContext.Provider value={{ isNavVisible, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};
