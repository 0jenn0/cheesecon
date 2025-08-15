'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import {
  CreateCommentReactionRequest,
  CreateCommentReactionResponse,
  DeleteCommentReactionRequest,
  DeleteCommentReactionResponse,
  GetCommentReactionsRequest,
  GetCommentReactionsResponse,
} from './type';

export async function getCommentReactions({
  commentId,
}: GetCommentReactionsRequest): Promise<GetCommentReactionsResponse> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('comment_reactions')
    .select('*')
    .eq('comment_id', commentId);

  if (error) {
    return {
      success: false,
      error: {
        code: 'GET_ERROR',
        message: '코멘트 리액션을 불러오는데 실패했어요. 다시 시도해주세요.',
      },
    };
  }

  return {
    success: true,
    data,
  };
}

export async function createCommentReaction({
  commentId,
  emoji,
}: CreateCommentReactionRequest): Promise<CreateCommentReactionResponse> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '로그인 후 이용해주세요.',
      },
    };
  }

  const { data, error } = await supabase
    .from('comment_reactions')
    .insert({
      user_id: user.id,
      comment_id: commentId,
      emoji: emoji,
    })
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: {
        code: 'INSERT_ERROR',
        message: '코멘트 리액션에 실패했어요. 다시 시도해주세요.',
      },
    };
  }

  return {
    success: true,
    data,
  };
}

export async function deleteCommentReaction({
  commentId,
  emoji,
}: DeleteCommentReactionRequest): Promise<DeleteCommentReactionResponse> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '로그인 후 이용해주세요.',
      },
    };
  }

  const { data, error } = await supabase
    .from('comment_reactions')
    .delete()
    .eq('comment_id', commentId)
    .eq('user_id', user.id)
    .eq('emoji', emoji)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: {
        code: 'DELETE_ERROR',
        message: '코멘트 리액션에 실패했어요. 다시 시도해주세요.',
      },
    };
  }

  return {
    success: true,
    data,
  };
}
