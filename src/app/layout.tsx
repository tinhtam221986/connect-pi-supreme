import { NavProvider } from '@/contexts/NavContext';
import GlobalUI from '@/components/layout/GlobalUI';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <NavProvider>
          <GlobalUI>{children}</GlobalUI>
        </NavProvider>
      </body>
    </html>
  );
}
