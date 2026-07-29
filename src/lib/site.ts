const DEFAULT_SITE_URL = 'https://lakshmiganapathievents.com';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, '');

export const SITE_NAME = 'Lakshmi Ganapathi Events';
