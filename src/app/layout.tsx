import type { Metadata } from 'next';
import {
  ModalProvider,
  ToastContainer,
  ToastProvider,
} from '@/shared/ui/feedback';
import { Footer } from '@/shared/ui/layout/footer';
import GlobalNavigationBar from '@/shared/ui/navigation/global-navigation-bar/global-navigation-bar';
import AmplitudeProvider from '@/shared/ui/providers/amplitude-provider';
import AuthProvider from '@/feature/auth/provider/auth-provider';
import ReactQueryClientProvider from '@/provider/QueryProvider';
import '../shared/ui/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: '치즈콘 - 이모티콘 피드백 커뮤니티',
    template: '%s | 치즈콘',
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
  alternates: {
    canonical: 'https://cheesecon.kr',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/cheesecon-favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <AmplitudeProvider>
        <AuthProvider>
          <ToastProvider>
            <ModalProvider>
              <link
                rel='preconnect'
                href='https://vbdbvqzfphlwkizvsjkx.supabase.co'
                crossOrigin=''
              />
              <html lang='ko'>
                <head>
                  <link rel='icon' href='/favicon.ico' sizes='any' />
                  <link rel='icon' href='/cheesecon-favicon.ico' type='image/x-icon' />
                  <link rel='shortcut icon' href='/favicon.ico' />
                  <script
                    src='https://cdn.amplitude.com/libs/analytics-browser-2.11.1-min.js.gz'
                    async
                  />
                  <script
                    src='https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.8.0-min.js.gz'
                    async
                  />
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        (function() {
                          function initAmplitude() {
                            if (window.amplitude && window.sessionReplay) {
                              window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
                              window.amplitude.init('adf6b32978318ffcd89a1a6989b8b08d', {
                                "autocapture": {"elementInteractions": true}
                              });
                            } else {
                              setTimeout(initAmplitude, 100);
                            }
                          }
                          initAmplitude();
                        })();
                      `,
                    }}
                  />
                </head>
                {/* <ReactScan /> */}
                <body className='bg-secondary relative flex min-h-dvh flex-col antialiased'>
                  <div id='modal' />
                  <GlobalNavigationBar />
                  <main className='m-auto w-full max-w-[1024px] flex-1'>
                    {children}
                  </main>
                  <Footer />
                  <ToastContainer />
                </body>
              </html>
            </ModalProvider>
          </ToastProvider>
        </AuthProvider>
      </AmplitudeProvider>
    </ReactQueryClientProvider>
  );
}
