import type { Metadata } from 'next';
import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';

export const revalidate = 3600;
export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const emoticonInfo = await getEmoticonSetCached(id);

  if (!emoticonInfo) {
    return {
      title: '이모티콘을 찾을 수 없습니다',
      description: '요청하신 이모티콘을 찾을 수 없습니다.',
    };
  }

  const { title, description, representative_image } = emoticonInfo;
  const imageUrl = representative_image || '/og-image.png';

  return {
    title: title,
    description:
      description ||
      `${title} 이모티콘에 대한 여러분의 소중한 피드백을 남겨주세요. 크리에이터와 소통해보세요!`,
    keywords: [
      '이모티콘',
      title,
      '치즈콘',
      '피드백',
      '댓글',
      '좋아요',
      '크리에이터',
    ],
    openGraph: {
      title: `치즈콘 | ${title}`,
      description:
        description ||
        `${title} 이모티콘에 대한 여러분의 소중한 피드백을 남겨주세요. 크리에이터와 소통해보세요!`,
      url: `https://cheesecon.kr/emoticon/${id}`,
      images: [
        {
          url: imageUrl.webp_url ?? imageUrl.image_url,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `치즈콘 | ${title}`,
      description:
        description ||
        `${title} 이모티콘에 대한 여러분의 소중한 피드백을 남겨주세요. 크리에이터와 소통해보세요!`,
      images: [imageUrl.webp_url ?? imageUrl.image_url],
    },
    alternates: {
      canonical: `https://cheesecon.kr/emoticon/${id}`,
    },
  };
}

export default async function EmoticonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const emoticonInfo = await getEmoticonSetCached(id);

  return (
    <EmoticonScreen
      emoticonSetId={id}
      isUnlocked={true}
      emoticonInfo={emoticonInfo}
    />
  );
}
