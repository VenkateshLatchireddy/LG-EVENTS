import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

const routes = ['', '/events', '/services', '/gallery', '/about', '/contact', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
