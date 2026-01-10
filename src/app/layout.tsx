import './globals.css';
import PiSDKProvider from '@/components/PiSDKProvider'; // Đảm bảo đường dẫn này khớp với file dưới

export const metadata = {
  title: 'Connect Pi Supreme',
  description: 'Vũ trụ Web3 trên Pi Network',
};

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
