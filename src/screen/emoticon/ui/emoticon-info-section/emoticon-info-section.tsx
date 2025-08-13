import { ComponentProps } from 'react';
import { LabelValuePair } from '@/shared/ui/display';
import { EmoticonImageSimple } from '@/entity/emoticon-images/type/emoticon-image.type';
import { EmoticonSet } from '@/entity/emoticon-set/type';
import {
  EmoticonInfoHeader,
  EmoticonPlatformItem,
  EmoticonTypeItem,
} from './ui';

interface EmoticonInfoSectionProps extends ComponentProps<'section'> {
  emoticonSet: EmoticonSet;
  representativeImage: EmoticonImageSimple;
}

export default function EmoticonInfoSection({
  emoticonSet,
  representativeImage,
}: EmoticonInfoSectionProps) {
  return (
    <section className='tablet:border-radius-2xl bg-primary padding-24 flex flex-col gap-24'>
      <EmoticonInfoHeader
        emoticonSet={emoticonSet}
        representativeImage={representativeImage}
      />
      <EmoticonInfoContent emoticonSet={emoticonSet} />
    </section>
  );
}

function EmoticonInfoContent({ emoticonSet }: { emoticonSet: EmoticonSet }) {
  const { platform, type, description } = emoticonSet;

  return (
    <div className='bg-primary flex flex-col gap-8'>
      <LabelValuePair
        label='이모티콘 플랫폼'
        value={<EmoticonPlatformItem platform={platform} />}
      />
      <LabelValuePair
        label='이모티콘 유형'
        value={<EmoticonTypeItem type={type} />}
      />
      <LabelValuePair label='이모티콘 설명' value={description} />
    </div>
  );
}
