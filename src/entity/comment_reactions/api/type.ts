export type CreateCommentReactionRequest = {
  commentId: string;
  emoji: string;
};

export type DeleteCommentReactionRequest = {
  commentId: string;
  emoji: string;
};
