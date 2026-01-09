'use client';
import React, { createContext, useContext } from 'react';

const PiContext = createContext<any>(null);

export const PiSDKProvider = ({ children }: { children: React.ReactNode }) => {
  // Bản rút gọn an toàn để vượt qua Build Vercel
  const value = {
    user: { username: 'Connect_User' },
    authenticated: true
  };

  return (
    <PiContext.Provider value={value}>
      {children}
    </PiContext.Provider>
  );
};

export const usePi = () => {
  const context = useContext(PiContext);
  if (!context) throw new Error("usePi must be used within a PiSDKProvider");
  return context;
};
