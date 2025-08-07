'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { CreateCommentReactionRequest } from './type';

export async function getCommentReactions(commentId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('comment_reactions')
    .select('*')
    .eq('comment_id', commentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createCommentReaction({
  commentId,
  emoji,
}: CreateCommentReactionRequest) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log('user:', user);
  console.log('authError:', authError);

  if (authError || !user) {
    throw new Error('로그인 후 이용해주세요.');
  }

  const { data, error } = await supabase.from('comment_reactions').insert({
    user_id: user.id,
    comment_id: commentId,
    emoji: emoji,
  });

  if (error) {
    console.log('Insert error:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCommentReaction({
  commentId,
  emoji,
}: CreateCommentReactionRequest) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인 후 이용해주세요.');
  }

  const { data, error } = await supabase
    .from('comment_reactions')
    .delete()
    .eq('comment_id', commentId)
    .eq('user_id', user.id)
    .eq('emoji', emoji);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
