import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PiSDKProvider } from "@/providers/PiSDKProvider";
import { LanguageProvider } from "@/components/i18n/language-provider";
import AppShell from "@/components/layout/AppShell";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Pi Supreme",
  description: "The premium social layer for Pi Network",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LanguageProvider>
          <PiSDKProvider>
            <AppShell>
              {children}
            </AppShell>
            <Toaster position="top-center" richColors />
          </PiSDKProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
