import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import NextTopLoader from 'nextjs-toploader';

import '@/styles/globals.css';
import Providers from '@/components/providers/providers';
import { Toaster } from '@/components/ui/sonner';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'SJob',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${beVietnamPro.className}`}
      suppressHydrationWarning
    >
      <body>
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <Providers>
            <Toaster position='top-right' closeButton />
            {children}
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
