import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PiSDKProvider } from "@/components/pi/pi-provider";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Pi Network",
  description: "Mạng xã hội Video Web3 trên Pi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={inter.className} style={{ backgroundColor: "black", margin: 0 }}>
        {/* Sử dụng Next Script để nạp SDK an toàn hơn */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive"
        />
        <LanguageProvider>
          <PiSDKProvider>
            {children}
            <Toaster />
          </PiSDKProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
