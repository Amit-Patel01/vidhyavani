import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sanchalak', '/shikshak', '/vidyarthi'],
    },
    sitemap: 'https://vidhyavani.com/sitemap.xml',
  };
}
