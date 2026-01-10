import './globals.css';
import { PiSDKProvider } from '@/components/PiSDKProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* Không xóa các meta data cũ của Jules nếu có */}
      </head>
      <body className="antialiased bg-black text-white">
        <PiSDKProvider>
          {/* AppShell hoặc các thành phần điều hướng cũ của Jules sẽ nằm ở đây */}
          <main className="min-h-screen">
            {children}
          </main>
        </PiSDKProvider>
      </body>
    </html>
  );
}
