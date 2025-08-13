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
  emoticonSet: CreateEmoticonSetForm;
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

export type CreateEmoticonSetForm = Pick<
  EmoticonSet,
  'title' | 'author_name' | 'description' | 'platform' | 'type' | 'is_private'
> & {
  representative_image: Pick<
    Tables<'emoticon_images'>,
    'image_url' | 'blur_url' | 'image_order' | 'is_representative' | 'webp_url'
  >;
};
