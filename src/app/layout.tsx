import type { Metadata } from 'next';
import ModalProvider from '@/components/Modal/ModalProvider';
import '../styles/globals.css';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading/Loading';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: 'WINE',
  description: '현명한 와인 구매를 위한 리뷰 플랫폼',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://wine-five-gamma.vercel.app/',
    title: 'WINE',
    description: '현명한 와인 구매를 위한 리뷰 플랫폼',
    siteName: 'WINE',
    images: [
      {
        url: '/og-image.png',
      },
    ],
  },
};

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
        <Loading />
        <ModalProvider>
          <Header isLogin={false} />
          <main>{children}</main>
        </ModalProvider>
      </body>
    </html>
  );
}
