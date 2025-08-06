import Error from 'next/error';

export type CommentMutationParams = {
  commentId?: string;
  emoticonSetId?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
