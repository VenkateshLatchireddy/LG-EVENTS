import type { Metadata } from 'next';

import Contact from '@/features/Contact';

export const metadata: Metadata = {
  title: {
    absolute:
      "Contact Us - Lakshmi Ganapathi Events | Let's Plan Your Dream Event",
  },
  description:
    'Get in touch with our event planning experts. Free consultation, customized quotes, and professional advice for your next event.',
  keywords: [
    'contact event planner',
    'event consultation',
    'book event planner',
  ],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
