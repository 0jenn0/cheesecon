export const COMMENT_QUERY_KEY = {
  root: ['comments'] as const,
  lists: () => [...COMMENT_QUERY_KEY.root, 'list'] as const,
  list: ({
    scope,
    id,
    limit = 100,
    offset = 0,
  }: {
    scope: 'image' | 'set';
    id: string | null;
    limit?: number;
    offset?: number;
  }) => [...COMMENT_QUERY_KEY.lists(), id, limit, scope, offset] as const,
};
