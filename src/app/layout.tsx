import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Inter,
  Montserrat,
  Playfair_Display,
  Poppins,
} from 'next/font/google';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { SITE_NAME, SITE_URL } from '@/lib/site';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

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
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${inter.variable} ${cormorant.variable} ${playfair.variable}`}
    >
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
