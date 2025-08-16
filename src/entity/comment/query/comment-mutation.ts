import { useToast } from '@/shared/ui/feedback';
import { EMOTICON_SET_QUERY_KEY } from '@/entity/emoticon-set';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import { createComment, deleteComment, updateComment } from '../api';
import { DeleteCommentParams } from '../type';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentMutationParams } from './types';

export const useCreateCommentMutation = (params?: CommentMutationParams) => {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });

      if (params?.emoticonSetId && params.emoticonSetId.trim() !== '') {
        queryClient.invalidateQueries({
          queryKey: EMOTICON_SET_QUERY_KEY.byId(params.emoticonSetId),
        });
      }

      if (params?.emoticonImageId && params.emoticonImageId.trim() !== '') {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.lists(),
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
  const { addToast } = useToast();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
      addToast({
        type: 'success',
        message: '댓글 수정에 성공했어요.',
      });

      if (params?.emoticonSetId && params.emoticonSetId.trim() !== '') {
        queryClient.invalidateQueries({
          queryKey: EMOTICON_SET_QUERY_KEY.byId(params.emoticonSetId),
        });
      }

      params?.onSuccess?.();
    },
    onError: () => {
      addToast({
        type: 'error',
        message: '댓글 수정에 실패했어요.',
      });
    },
  });
};

export const useDeleteCommentMutation = (params?: DeleteCommentParams) => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
      addToast({
        type: 'success',
        message: '댓글 삭제에 성공했어요.',
      });
      params?.onSuccess?.();
    },
    onError: () => {
      addToast({
        type: 'error',
        message: '댓글 삭제에 실패했어요.',
      });
    },
  });
};
