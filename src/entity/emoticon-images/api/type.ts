import { ApiResult } from '@/shared/types';
import { EmoticonImage } from '@/entity/emoticon-set';
import { EmoticonImageSimple } from '../type/emoticon-image.type';

export type GetEmoticonImageResult = ApiResult<EmoticonImage>;
export type GetRepresentativeImageBySetIdResult =
  ApiResult<EmoticonImageSimple>;
