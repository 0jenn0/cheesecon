import { NextRequest, NextResponse } from 'next/server';
import { createAnonServerClient } from '@/shared/lib/supabase/anon';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ setId: string }> },
) {
  try {
    const { setId } = await params;
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json(
        { success: false, error: '이미지 ID가 필요합니다.' },
        { status: 400 },
      );
    }

    const imageIds = ids.split(',').filter(Boolean);

    if (imageIds.length === 0) {
      return NextResponse.json(
        { success: false, error: '유효한 이미지 ID가 없습니다.' },
        { status: 400 },
      );
    }

    const supabase = createAnonServerClient();

    const { data, error } = await supabase
      .from('emoticon_images')
      .select('*, likes(count)')
      .eq('set_id', setId)
      .in('id', imageIds)
      .order('image_order');

    if (error) {
      console.error('Query error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (err) {
    console.error('getEmoticonImagesNearby 전체 에러:', err);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
