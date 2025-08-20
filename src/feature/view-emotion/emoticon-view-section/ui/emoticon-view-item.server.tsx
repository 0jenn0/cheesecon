'use server';

import type { ComponentPropsWithRef } from 'react';
import type {
  EmoticonSetDetail,
  EmoticonSetWithRepresentativeImage,
} from '@/entity/emoticon-set/type';
import EmoticonViewItemClient from './emoticon-view-item.client';

interface EmoticonViewItemProps extends ComponentPropsWithRef<'section'> {
  item: EmoticonSetDetail | EmoticonSetWithRepresentativeImage;
  index?: number;
  hideLikes?: boolean;
}

export default async function EmoticonViewItemServer({
  item,
  index,
  hideLikes = false,
}: EmoticonViewItemProps) {
  return (
    <EmoticonViewItemClient
      item={item as EmoticonSetWithRepresentativeImage}
      index={index}
      hideLikes={hideLikes}
    />
  );
}
