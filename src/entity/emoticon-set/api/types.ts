import { ApiResult, BaseApiRequest, BaseApiResponse } from '@/shared/types';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { Tables } from '@/types/types_db';
import {
  EmoticonSet,
  EmoticonSetSortParams,
  EmoticonSetWithRepresentativeImage,
} from '../type';

export type CreateEmoticonSetRequest = {
  emoticonSet: CreateEmoticonSetForm;
  imageUrls: EmoticonImageState[];
};

export type UpdateEmoticonSetRequest = {
  emoticonSet: UpdateEmoticonSetForm;
  imageUrls: EmoticonImageState[];
};

export type GetEmoticonSetsRequest = BaseApiRequest & {
  param?: EmoticonSetSortParams;
};

export type CreateEmoticonSetResponse = {
  emoticonSet: EmoticonSet;
  emoticonImages: Tables<'emoticon_images'>[];
  representativeImage: Tables<'emoticon_images'>;
};

export type UpdateEmoticonSetResponse = EmoticonSet;

export type CreateEmoticonSetResult = ApiResult<CreateEmoticonSetResponse>;

export type UpdateEmoticonSetResult = ApiResult<UpdateEmoticonSetResponse>;

export type GetEmoticonSetsWithRepresentativeImageResult = ApiResult<
  BaseApiResponse<EmoticonSetWithRepresentativeImage>
>;

export type CreateEmoticonSetForm = Pick<
  EmoticonSet,
  'title' | 'author_name' | 'description' | 'platform' | 'type' | 'is_private'
>;

export type UpdateEmoticonSetForm = Pick<
  EmoticonSet,
  | 'id'
  | 'title'
  | 'author_name'
  | 'description'
  | 'platform'
  | 'type'
  | 'is_private'
>;
