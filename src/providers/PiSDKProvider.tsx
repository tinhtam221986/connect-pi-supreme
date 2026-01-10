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
    const initPi = async () => {
      // Đảm bảo chỉ chạy trong trình duyệt
      if (typeof window === 'undefined') return;

      try {
        const Pi = (window as any).Pi;
        if (Pi) {
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

// Hook an toàn không gây sập Build
export const usePi = () => {
  const context = useContext(PiContext);
  if (!context) {
    return { user: null, authenticated: false, loading: true };
  }
  return context;
};
