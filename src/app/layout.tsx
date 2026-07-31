import type { Metadata, Viewport } from 'next';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { SITE_NAME, SITE_URL } from '@/lib/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Premium Event Management`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Professional event planning and management for weddings, ceremonies, parties, and celebrations in Rajahmundry.',
  applicationName: SITE_NAME,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getUTCFullYear();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-grow w-full">{children}</main>
          <Footer year={currentYear} />
        </div>
      </body>
    </html>
  );
}
