import { MetadataRoute } from 'next';
import { getEmoticonSetsWithRepresentativeImage } from '@/entity/emoticon-set/api/emoticon-set-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cheesecon.kr';

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/main/popular`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/main/new`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/main/activity`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  try {
    const result = await getEmoticonSetsWithRepresentativeImage({
      limit: 1000,
      offset: 0,
      param: {
        orderBy: 'created_at',
        order: 'desc',
        userId: '',
        title: '',
        isPrivate: false,
      },
    });

    if (result.success && result.data.data.length > 0) {
      const emoticonRoutes = result.data.data.map((emoticon) => ({
        url: `${baseUrl}/emoticon/${emoticon.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

      return [...routes, ...emoticonRoutes];
    }

    return routes;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
