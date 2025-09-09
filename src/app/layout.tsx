import type { Metadata } from 'next';
import {
  ModalProvider,
  ToastContainer,
  ToastProvider,
} from '@/shared/ui/feedback';
import GlobalNavigationBar from '@/shared/ui/navigation/global-navigation-bar/global-navigation-bar';
import AuthProvider from '@/feature/auth/provider/auth-provider';
import ReactQueryClientProvider from '@/provider/QueryProvider';
import '../shared/ui/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: '치즈콘 - 이모티콘 피드백 커뮤니티',
    template: '치즈콘 | %s',
  },
  description:
    '나만의 이모티콘을 업로드하고 다른 사람들의 피드백과 댓글을 받아보세요. 이모티콘 크리에이터들이 모이는 소통 공간이에요.',
  keywords: [
    '이모티콘',
    '치즈콘',
    'cheesecon',
    '이모티콘 업로드',
    '피드백',
    '댓글',
    '크리에이터',
    '커뮤니티',
  ],
  authors: [{ name: '치즈콘 팀' }],
  creator: '치즈콘',
  publisher: '치즈콘',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://cheesecon.kr',
    siteName: '치즈콘',
    title: '치즈콘 - 이모티콘 피드백 커뮤니티',
    description:
      '나만의 이모티콘을 업로드하고 다른 사람들의 피드백과 댓글을 받아보세요. 이모티콘 크리에이터들이 모이는 소통 공간이에요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '치즈콘 - 이모티콘 피드백 커뮤니티',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cheesecon',
    creator: '@cheesecon',
    title: '치즈콘 - 이모티콘 피드백 커뮤니티',
    description:
      '나만의 이모티콘을 업로드하고 다른 사람들의 피드백과 댓글을 받아보세요. 이모티콘 크리에이터들이 모이는 소통 공간이에요.',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: 'https://cheesecon.kr',
  },
  icons: {
    icon: '/cheesecon-favicon.ico',
    shortcut: '/cheesecon-favicon.ico',
    apple: '/cheesecon-favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>
            <link
              rel='preconnect'
              href='https://vbdbvqzfphlwkizvsjkx.supabase.co'
              crossOrigin=''
            />
            <html lang='ko'>
              {/* <ReactScan /> */}
              <body className='bg-secondary relative flex h-dvh flex-col antialiased'>
                <div id='modal' />
                <GlobalNavigationBar />
                <main className='m-auto h-full w-full max-w-[1024px] flex-1'>
                  {children}
                </main>
                <ToastContainer />
              </body>
            </html>
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
