'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { DeleteCommentParams, UpdateCommentParams } from '../type';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResult,
} from './types';

export async function getComments(
  request: GetCommentsRequest,
): Promise<GetCommentsResult> {
  try {
    const supabase = await createServerSupabaseClient();

    let query = supabase
      .from('comments')
      .select(
        '*, profile:profiles!comments_user_id_fkey(id, nickname, avatar_url)',
      );

    if (request?.set_id) {
      query = query.eq('set_id', request?.set_id);
    }

    if (request?.user_id) {
      query = query.eq('user_id', request.user_id);
    }

    if (request?.parent_comment_id !== undefined) {
      if (request.parent_comment_id === null) {
        query = query.is('parent_comment_id', null);
      } else {
        query = query.eq('parent_comment_id', request.parent_comment_id);
      }
    }

    if (request.sortBy) {
      query = query.order(request.sortBy, {
        ascending: request.sortOrder === 'asc',
      });
    } else {
      query = query.order('created_at', { ascending: true });
    }

    const limit = request?.limit || 100;
    const offset = request?.offset || 0;

    const [countResult, dataResult] = await Promise.all([
      (() => {
        let countQuery = supabase
          .from('comments')
          .select('*', { count: 'exact', head: true });

        if (request.set_id) {
          countQuery = countQuery.eq('set_id', request.set_id);
        }
        if (request.user_id) {
          countQuery = countQuery.eq('user_id', request.user_id);
        }
        if (request.parent_comment_id !== undefined) {
          if (request.parent_comment_id === null) {
            countQuery = countQuery.is('parent_comment_id', null);
          } else {
            countQuery = countQuery.eq(
              'parent_comment_id',
              request.parent_comment_id,
            );
          }
        }

        return countQuery;
      })(),

      query.range(offset, offset + limit - 1),
    ]);

    if (dataResult.error) {
      return {
        success: false,
        error: {
          message: dataResult.error.message,
          code: dataResult.error.code,
        },
      };
    }

    if (countResult.error) {
      return {
        success: false,
        error: {
          message: countResult.error.message,
          code: countResult.error.code,
        },
      };
    }

    const validComments = (dataResult.data || [])
      .filter((item) => item.profile !== null)
      .map((item) => ({
        ...item,
        profile: item.profile!,
      }));

    const total = countResult.count || 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const hasMore = offset + limit < total;

    return {
      success: true,
      data: {
        data: validComments,
        total,
        currentPage,
        totalPages,
        hasMore,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

export async function createComment(
  request: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const commentData = {
    content: request.comment.content,
    set_id: request.comment.set_id || null,
    parent_comment_id: request.comment.parent_comment_id || null,
    image_id: request.comment.image_id,
    images: request.comment.images,
    user_id: user.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('comments')
    .insert(commentData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    comment: data,
  };
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
      updated_at: params.updated_at || new Date().toISOString(),
    })
    .eq('id', params.commentId);

  if (error) {
    throw error;
  }
}

export async function deleteComment(
  params: DeleteCommentParams,
): Promise<void> {
  const supabase = await createServerSupabaseClient();

  if (!params.commentId) {
    throw new Error('commentId가 없습니다.');
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', params.commentId);

  if (error) {
    throw error;
  }
}
