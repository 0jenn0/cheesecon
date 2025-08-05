import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment, updateComment } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentMutationParams } from './types';

export const useCreateCommentMutation = (params?: CommentMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
      params?.onSuccess?.();
    },
    onError: params?.onError,
  });
};

export const useUpdateCommentMutation = (params?: CommentMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
      params?.onSuccess?.();
    },
    onError: params?.onError,
  });
};

export const useDeleteCommentMutation = (params?: CommentMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
      params?.onSuccess?.();
    },
    onError: params?.onError,
  });
};
