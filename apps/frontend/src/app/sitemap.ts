import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mindgraphix.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
    '/team',
    '/careers',
    '/devis',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
