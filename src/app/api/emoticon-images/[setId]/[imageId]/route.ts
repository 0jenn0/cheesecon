import { NextRequest, NextResponse } from 'next/server';
import { getEmoticonImage } from '@/entity/emoticon-images/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { setId: string; imageId: string } },
) {
  try {
    const { setId, imageId } = params;

    if (!setId || !imageId) {
      return NextResponse.json(
        { error: 'setId와 imageId가 필요합니다.' },
        { status: 400 },
      );
    }

    const result = await getEmoticonImage({ setId, imageId });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error?.message || '이미지를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('getEmoticonImage API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
