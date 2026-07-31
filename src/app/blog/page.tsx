import type { Metadata } from 'next';

import Blog from '@/features/Blog';

export const metadata: Metadata = {
  title: {
    absolute: 'Event Reels - Lakshmi Ganapathi Events',
  },
  description: 'Watch our latest event highlights.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <Blog />;
}
