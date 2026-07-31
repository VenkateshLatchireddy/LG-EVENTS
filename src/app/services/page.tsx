import type { Metadata } from 'next';

import Services from '@/features/Services';

export const metadata: Metadata = {
  title: {
    absolute: 'లక్ష్మీ గణపతి ఈవెంట్స్ | తూర్పు గోదావరి',
  },
  description:
    'మీ ప్రతి వేడుకను అత్యంత అందంగా, అద్భుతంగా మరియు యాదుగా చేసే నిపుణుల బృందం.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return <Services />;
}
