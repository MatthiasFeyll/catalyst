import { NavigationProvider } from '@/provider/NavigationProvider';
import { ResponsiveProvider } from '@/provider/ResponsiveProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/global.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Matthias Feyll | Software Developer',
  description:
    'Professional Frontend Developer specializing in React, Next.js, and modern web development.',
  keywords: 'software developer, frontend, react, nextjs, web development, darmstadt',
  author: 'Matthias Feyll',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/icon.png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'Matthias Feyll | Software Developer',
    description:
      'Professional Frontend Developer specializing in React, Next.js, and modern web development.',
    url: 'https://matthias-feyll.de',
    siteName: 'Matthias Feyll',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        m-0 p-0 w-full font-sans 
        relative bg-dark
        after:content-[''] after:fixed after:inset-0
        after:bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_90%)]
        md:after:bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_60%)]
        after:-z-10`}
      >
        <Analytics />
        <SpeedInsights />
        <NavigationProvider>
          <ReCaptchaProvider reCaptchaKey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}>
            <ResponsiveProvider>{children}</ResponsiveProvider>
          </ReCaptchaProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
