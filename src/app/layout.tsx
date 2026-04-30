import ModalProvider from '@/components/Modal/ModalProvider';
import '../styles/globals.css';
import Header from '@/components/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <ModalProvider>
          <Header isLogin={false} HeaderBg={false} />
          <main>{children}</main>
        </ModalProvider>
      </body>
    </html>
  );
}
