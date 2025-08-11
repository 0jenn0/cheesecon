export type SortOrder = 'asc' | 'desc';

export type BaseSortParams = {
  orderBy: string;
  order: SortOrder;
};

export type BaseApiRequest = {
  limit?: number;
  offset?: number;
  param?: BaseSortParams;
};

export type BaseApiResponse<T> = {
  data: T[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

export type ImageUrlWithOrder = {
  imageUrl: string;
  imageOrder: number;
  blurUrl?: string | null;
  webpUrl?: string | null;
};
