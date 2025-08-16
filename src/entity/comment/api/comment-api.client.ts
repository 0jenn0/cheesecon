import { createBrowserSupabaseClient } from '@/shared/lib/supabase';
import { GetCommentsRequest, GetCommentsResult } from './types';

export async function getComments(
  request: GetCommentsRequest,
  signal?: AbortSignal,
): Promise<GetCommentsResult> {
  try {
    const supabase = await createBrowserSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    const {
      set_id = null,
      image_id = null,
      parent_comment_id,
      sortOrder = 'asc',
      limit = 30,
      offset = 0,
    } = request ?? {};

    const p_parent_is_null =
      request?.parent_comment_id === null
        ? true
        : request?.parent_comment_id === undefined
          ? null
          : false;

    const query = supabase.rpc('get_comments_v5', {
      p_set_id: set_id ?? undefined,
      p_image_id: image_id ?? undefined,
      p_user_id: user_id ?? undefined,
      p_parent_comment_id: parent_comment_id ?? undefined,
      p_parent_is_null: p_parent_is_null ?? undefined,
      p_sort_order: sortOrder ?? 'asc',
      p_limit: limit,
      p_offset: offset,
    });

    if (signal) {
      query.abortSignal(signal);
    }

    const { data, error } = await query;

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    const rows = (data ?? []) as Array<{
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
      reaction_summary: Array<{ emoji: string; count: number }>;
      total_count: number;
    }>;

    const total = rows[0]?.total_count ?? 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const hasMore = offset + limit < total;

    return {
      success: true,
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data,
        total,
        currentPage,
        totalPages,
        hasMore,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: { message: err instanceof Error ? err.message : 'Unknown error' },
    };
  }
}
