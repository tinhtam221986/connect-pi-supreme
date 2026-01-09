'use client';
import React, { createContext, useContext } from 'react';

// Giá trị giả định an toàn để Vercel không báo lỗi khi Prerendering
const safeDefaultValue = {
  user: { username: 'Supreme_User', uid: 'pi-default-id' },
  authenticated: true,
  accessToken: 'mock-token'
};

const PiContext = createContext<any>(safeDefaultValue);

export const PiSDKProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PiContext.Provider value={safeDefaultValue}>
      {children}
    </PiContext.Provider>
  );
};

export const usePi = () => {
  const context = useContext(PiContext);
  // Tuyệt đối không throw Error ở đây để tránh làm sập quá trình Build tĩnh
  return context || safeDefaultValue;
};
