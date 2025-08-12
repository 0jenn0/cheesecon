'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { DeleteCommentParams, UpdateCommentParams } from '../type';
import {
  CommentDetail,
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResult,
} from './types';

export async function getComments(
  request: GetCommentsRequest,
  signal?: AbortSignal,
): Promise<GetCommentsResult> {
  try {
    const supabase = await createServerSupabaseClient();

    const {
      set_id = null,
      image_id = null,
      user_id = null,
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

    const { data, error } = await supabase
      .rpc('get_comments_v2', {
        p_set_id: set_id ?? undefined,
        p_image_id: image_id ?? undefined,
        p_user_id: user_id ?? undefined,
        p_parent_comment_id: parent_comment_id ?? undefined,
        p_parent_is_null: p_parent_is_null ?? undefined,
        p_sort_order: sortOrder ?? 'asc',
        p_limit: limit,
        p_offset: offset,
      })
      .abortSignal(signal ?? new AbortController().signal);

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
        data: rows.map(({ total_count, ...rest }) => ({
          ...rest,
          images: null,
        })),
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

export async function createComment(
  req: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('인증되지 않은 사용자입니다.');

  const { data, error } = await supabase
    .from('comments')
    .insert({
      content: req.comment.content,
      set_id: req.comment.set_id ?? null,
      parent_comment_id: req.comment.parent_comment_id ?? null,
      image_id: req.comment.image_id,
      images: req.comment.images,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return { comment: data as CommentDetail };
}

export async function updateComment(
  params: UpdateCommentParams,
): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('comments')
    .update({
      content: params.content,
      images: params.images,
      updated_at: params.updated_at ?? new Date().toISOString(),
    })
    .eq('id', params.commentId);
  if (error) throw error;
}

export async function deleteComment(
  params: DeleteCommentParams,
): Promise<void> {
  const supabase = await createServerSupabaseClient();
  if (!params.commentId) throw new Error('commentId가 없습니다.');
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', params.commentId);
  if (error) throw error;
}
