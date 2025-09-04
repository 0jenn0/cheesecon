import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/my/',
          '/auth/',
          '/api/',
          '/emoticon/*/edit',
          '/register',
          '/admin/',
          '/*?*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/my/',
          '/auth/',
          '/api/',
          '/emoticon/*/edit',
          '/register',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://cheesecon.kr/sitemap.xml',
    host: 'https://cheesecon.kr',
  };
}
