import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const scope = url.searchParams.get('scope');
    const id = url.searchParams.get('id');
    const limit = clampInt(url.searchParams.get('limit'), 1, 200, 100);
    const offset = clampInt(
      url.searchParams.get('offset'),
      0,
      Number.MAX_SAFE_INTEGER,
      0,
    );
    const sortOrderParam = (
      url.searchParams.get('sortOrder') ?? 'asc'
    ).toLowerCase();

    const userId = url.searchParams.get('user_id');
    const parentId = url.searchParams.get('parent_comment_id');
    const parentIsNullParam = url.searchParams.get('parent_is_null');

    if (!id || (scope !== 'image' && scope !== 'set')) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid params' } },
        { status: 400 },
      );
    }

    const supabase = await createServerSupabaseClient();

    const p_parent_comment_id =
      parentId && parentId.length > 0 ? parentId : null;
    let p_parent_is_null: boolean | null = null;
    if (parentIsNullParam !== null) {
      p_parent_is_null = parentIsNullParam === 'true';
    }

    const rpc = supabase
      .rpc('get_comments_v2', {
        p_set_id: scope === 'set' ? id : undefined,
        p_image_id: scope === 'image' ? id : undefined,
        p_user_id: userId ?? undefined,
        p_parent_comment_id: p_parent_comment_id ?? undefined,
        p_parent_is_null: p_parent_is_null ?? undefined,
        p_sort_order: sortOrderParam === 'desc' ? 'desc' : 'asc',
        p_limit: limit,
        p_offset: offset,
      })
      .abortSignal(req.signal);

    const { data, error } = await rpc;
    if (error) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: 500 },
      );
    }

    type Row = {
      id: string;
      content: string;
      set_id: string | null;
      image_id: string | null;
      parent_comment_id: string | null;
      user_id: string;
      created_at: string;
      updated_at: string;
      profile: {
        id: string;
        nickname: string | null;
        avatar_url: string | null;
        description: string | null;
      };
      reaction_summary: { emoji: string; count: number }[];
      total_count: number;
    };

    const rows = (data ?? []) as Row[];

    const total = rows[0]?.total_count ?? 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const hasMore = offset + limit < total;

    return NextResponse.json({
      success: true,
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: rows.map(({ total_count, ...rest }) => ({
          ...rest,
          images: null,
        })),
        total,
        currentPage,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: { message: 'aborted' } },
        { status: 499 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 },
    );
  }
}

function clampInt(
  v: string | null,
  min: number,
  max: number,
  fallback: number,
) {
  const n = Number(v);
  if (Number.isFinite(n)) return Math.min(max, Math.max(min, Math.trunc(n)));
  return fallback;
}
