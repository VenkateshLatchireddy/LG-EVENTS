import type { Metadata } from 'next';

import Events from '@/features/Events';

export const metadata: Metadata = {
  title: {
    absolute:
      'Our Events - Lakshmi Ganapathi Events | Premium Event Management',
  },
  description:
    'Explore our portfolio of successful events including weddings, housewarmings, half saree, haldi, naming ceremonies, and charity events.',
  keywords: [
    'event portfolio',
    'wedding gallery',
    'housewarming',
    'half saree',
    'haldi',
    'naming ceremony',
  ],
  alternates: {
    canonical: '/events',
  },
};

export default function EventsPage() {
  return <Events />;
}
