"use client";
import './globals.css';
import React, { useEffect } from 'react';

// Khởi tạo Provider trực tiếp trong layout để tránh lỗi thiếu file
function PiSDKProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadPi = () => {
        if (window.Pi) return;
        const script = document.createElement('script');
        script.src = "https://sdk.minepi.com/pi-sdk.js";
        script.async = true;
        script.onload = () => {
          if (window.Pi) {
            window.Pi.init({ version: "1.5", sandbox: true });
            console.log("Connect Supreme: Pi SDK Ready!");
          }
        };
        document.head.appendChild(script);
      };
      loadPi();
    }
  }, []);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-black text-white antialiased">
        <PiSDKProvider>
          {children}
        </PiSDKProvider>
      </body>
    </html>
  );
}
