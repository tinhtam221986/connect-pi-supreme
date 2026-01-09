import './globals.css';
import { NavProvider } from '@/contexts/NavContext';
import { PiSDKProvider } from '@/providers/PiSDKProvider'; 
import GlobalUI from '@/components/layout/GlobalUI';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-black">
        <PiSDKProvider>
          <NavProvider>
            <GlobalUI>
              {children}
            </GlobalUI>
          </NavProvider>
        </PiSDKProvider>
      </body>
    </html>
  );
}
