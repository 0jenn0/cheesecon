// useCommentListQuery.ts
import { useQuery } from '@tanstack/react-query';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentInfiniteQueryParams } from './types';

export const useCommentListQuery = (params: CommentInfiniteQueryParams) => {
  const scope = params.image_id ? 'image' : 'set';

  const id = (params.image_id ?? params.set_id ?? '').trim();
  const limit = params.limit ?? 100;
  const offset = params.offset ?? 0;

  const enabled = id.length > 0;
  const key = COMMENT_QUERY_KEY.list({
    scope,
    id: enabled ? id : null,
    limit,
    offset,
  });

  return useQuery({
    queryKey: key,
    queryFn: async ({ signal }) => {
      const controller = new AbortController();

      if (signal) {
        signal.addEventListener('abort', () => {
          controller.abort();
        });
      }

      const qs = new URLSearchParams({
        scope,
        id,
        limit: String(limit),
        offset: String(offset),
        sortOrder: 'asc',
      });

      try {
        const res = await fetch(`/api/comments?${qs.toString()}`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json?.success)
          throw new Error(json?.error?.message ?? 'Unknown error');

        return json.data;
      } catch (error) {
        // AbortError인 경우 명시적으로 처리
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Request was aborted');
        }
        throw error;
      }
    },
    enabled,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
