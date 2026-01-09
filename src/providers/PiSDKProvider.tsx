'use client';
import React, { createContext, useContext } from 'react';

// Tạo giá trị mặc định an toàn để không bao giờ bị null
const defaultContext = {
  user: { username: 'Supreme_User', uid: 'pi-123' },
  authenticated: false,
  accessToken: null,
};

const PiContext = createContext<any>(defaultContext);

export const PiSDKProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PiContext.Provider value={defaultContext}>
      {children}
    </PiContext.Provider>
  );
};

export const usePi = () => {
  const context = useContext(PiContext);
  // AN TOÀN TUYỆT ĐỐI: Nếu không tìm thấy context, trả về mặc định thay vì báo lỗi
  if (!context) {
    return defaultContext;
  }
  return context;
};
