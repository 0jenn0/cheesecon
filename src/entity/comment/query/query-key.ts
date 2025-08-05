export const COMMENT_QUERY_KEY = {
  all: ['comment'] as const,
  lists: () => [...COMMENT_QUERY_KEY.all, 'list'] as const,
  list: (filters: string) =>
    [...COMMENT_QUERY_KEY.lists(), { filters }] as const,
  details: () => [...COMMENT_QUERY_KEY.all, 'detail'] as const,
  detail: (id: string) => [...COMMENT_QUERY_KEY.details(), id] as const,
} as const;
