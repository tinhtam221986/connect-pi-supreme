import './globals.css';
import { NavProvider } from '@/contexts/NavContext';
import { PiSDKProvider } from '@/providers/PiSDKProvider'; // Đảm bảo đường dẫn này đúng
import GlobalUI from '@/components/layout/GlobalUI';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
