import type { Metadata } from 'next';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading/Loading';
import ModalProvider from '@/components/Modal/ModalProvider';
import ToastProvider from '@/components/Toast/ToastProvider';

import '../styles/globals.css';

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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'WINE',
    description: '현명한 와인 구매를 위한 리뷰 플랫폼',
    siteName: 'WINE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WINE 서비스 이미지',
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
        <ToastProvider />
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
