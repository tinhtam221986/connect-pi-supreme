import './globals.css';

export const metadata = {
  title: 'Connect Pi Supreme',
  description: 'Hệ sinh thái Web3 Pioneer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ backgroundColor: 'black', color: 'white', margin: 0 }}>
        {/* Chúng ta sẽ tạm thời bỏ qua PiSDKProvider bên ngoài để thông cổng 404 trước */}
        {children}
      </body>
    </html>
  );
}
