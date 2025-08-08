import { EMOTICON_SET_QUERY_KEY } from '@/entity/emoticon-set';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment, updateComment } from '../api';
import { DeleteCommentParams } from '../type';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentMutationParams } from './types';

export const useCreateCommentMutation = (
  params?: CommentMutationParams & { emoticonSetId?: string },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });

      if (params?.emoticonSetId && params.emoticonSetId.trim() !== '') {
        queryClient.invalidateQueries({
          queryKey: EMOTICON_SET_QUERY_KEY.byId(params.emoticonSetId),
        });
      }

      params?.onSuccess?.();
    },
    onError: params?.onError,
  });
};

export const useUpdateCommentMutation = (
  params?: CommentMutationParams & { emoticonSetId?: string },
) => {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });

      if (params?.emoticonSetId && params.emoticonSetId.trim() !== '') {
        queryClient.invalidateQueries({
          queryKey: EMOTICON_SET_QUERY_KEY.byId(params.emoticonSetId),
        });
      }

      params?.onSuccess?.();
    },
    onError: params?.onError,
  });
};

export const useDeleteCommentMutation = (params?: DeleteCommentParams) => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, { emoticonSetId }) => {
      if (emoticonSetId && emoticonSetId.trim() !== '') {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.lists(),
        });
      }
      params?.onSuccess?.();
    },
    onError: params?.onError,
  });
};
