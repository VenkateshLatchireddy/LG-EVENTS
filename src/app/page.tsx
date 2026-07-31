import type { Metadata } from 'next';

import Home from '@/features/Home';

const socialImage =
  'https://res.cloudinary.com/dqgjdxwgw/image/upload/c_fill,w_1200,h_630,q_auto/f_auto/events/birthday.jpg';

export const metadata: Metadata = {
  title: {
    absolute:
      'Lakshmi Ganapathi Events - Creating Unforgettable Events | Premium Event Management Services',
  },
  description:
    'Professional event management services for weddings, corporate events, parties, conferences, and more. Make your event extraordinary with Lakshmi Ganapathi Events.',
  keywords: [
    'event management',
    'wedding planner',
    'corporate events',
    'party planning',
    'conference organizer',
    'event production',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lakshmi Ganapathi Events - Premium Event Management Services',
    description:
      'Creating unforgettable moments with professional event planning and execution.',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [socialImage],
  },
};

export default function HomePage() {
  return <Home />;
}
