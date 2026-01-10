'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface PiContextType {
  user: any;
  authenticated: boolean;
  loading: boolean;
}

const PiContext = createContext<PiContextType | undefined>(undefined);

export function PiSDKProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chỉ chạy SDK khi ở phía client
    const initPi = async () => {
      try {
        if (typeof window !== 'undefined' && (window as any).Pi) {
          const Pi = (window as any).Pi;
          Pi.init({ version: "1.5", sandbox: true });
          
          const auth = await Pi.authenticate(['username', 'payments'], (payment: any) => {
            console.log("Payment in progress", payment);
          });
          
          setUser(auth.user);
        }
      } catch (error) {
        console.error("Pi SDK Init Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initPi();
  }, []);

  return (
    <PiContext.Provider value={{ user, authenticated: !!user, loading }}>
      {children}
    </PiContext.Provider>
  );
}

export const usePi = () => {
  const context = useContext(PiContext);
  // Thay vì ném lỗi (throw error), chúng ta trả về giá trị mặc định nếu context chưa sẵn sàng
  if (context === undefined) {
    return { user: null, authenticated: false, loading: true };
  }
  return context;
};
