import type { Metadata } from 'next';

import About from '@/features/About';

export const metadata: Metadata = {
  title: {
    absolute:
      "About Us - Lakshmi Ganapathi Events | Rajahmundry's Premier Event Planners",
  },
  description:
    "Learn about Lakshmi Ganapathi Events - Rajahmundry's most trusted event management company. Creating unforgettable celebrations since 2015 with 500+ successful events.",
  keywords: [
    'about event planner',
    'event management company',
    'Rajahmundry events',
  ],
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <About />;
}
