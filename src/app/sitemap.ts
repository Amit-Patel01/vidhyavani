import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vidhyavani.com';

  const routes = [
    '',
    '/amara-vishe',
    '/dhoran',
    '/dhoran/7',
    '/dhoran/8',
    '/dhoran/9',
    '/dhoran/10',
    '/dhoran/11',
    '/dhoran/12',
    '/vishayo',
    '/video-lecture',
    '/abhyas-nondho',
    '/pariksha-taiyari',
    '/prashnottari',
    '/youtube',
    '/sampark',
    '/pravesh',
    '/nondhani',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
