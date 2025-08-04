import {
  ApiResult,
  BaseApiRequest,
  BaseApiResponse,
  ImageUrlWithOrder,
} from '@/shared/types';
import { Tables } from '@/types/types_db';
import { EmoticonSetSortParams } from '../type';

export type CreateEmoticonSetRequest = {
  emoticonSet: Tables<'emoticon_sets'>;
  imageUrls: ImageUrlWithOrder[];
};

export type GetEmoticonSetsRequest = BaseApiRequest & {
  param?: EmoticonSetSortParams;
};

export type CreateEmoticonSetResponse = {
  emoticonSet: Tables<'emoticon_sets'>;
  emoticonImages: Tables<'emoticon_images'>[];
};

export type CreateEmoticonSetResult = ApiResult<CreateEmoticonSetResponse>;
export type GetEmoticonSetsResult = ApiResult<
  BaseApiResponse<Tables<'emoticon_sets'>>
>;
