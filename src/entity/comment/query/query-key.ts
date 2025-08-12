export const COMMENT_QUERY_KEY = {
  root: ['comments'] as const,
  lists: () => [...COMMENT_QUERY_KEY.root, 'list'] as const,
  list: (scope: 'image' | 'set', id: string | null, limit = 100, offset = 0) =>
    [...COMMENT_QUERY_KEY.lists(), scope, id, limit, offset] as const,
};
