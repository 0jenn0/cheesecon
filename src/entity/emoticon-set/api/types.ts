import {
  ApiResult,
  BaseApiRequest,
  BaseApiResponse,
  ImageUrlWithOrder,
} from '@/shared/types';
import { Tables } from '@/types/types_db';
import {
  EmoticonSet,
  EmoticonSetSortParams,
  EmoticonSetWithRepresentativeImage,
} from '../type';

export type CreateEmoticonSetRequest = {
  emoticonSet: EmoticonSet;
  imageUrls: ImageUrlWithOrder[];
};

export type GetEmoticonSetsRequest = BaseApiRequest & {
  param?: EmoticonSetSortParams;
};

export type CreateEmoticonSetResponse = {
  emoticonSet: EmoticonSet;
  emoticonImages: Tables<'emoticon_images'>[];
  representativeImage: Tables<'emoticon_images'>;
};

export type CreateEmoticonSetResult = ApiResult<CreateEmoticonSetResponse>;

export type GetEmoticonSetsWithRepresentativeImageResult = ApiResult<
  BaseApiResponse<EmoticonSetWithRepresentativeImage>
>;
