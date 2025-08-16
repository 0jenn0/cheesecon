'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { DeleteCommentParams, UpdateCommentParams } from '../type';
import {
  CommentDetail,
  CreateCommentRequest,
  CreateCommentResponse,
} from './types';

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
