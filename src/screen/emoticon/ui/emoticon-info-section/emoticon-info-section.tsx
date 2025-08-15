import { ComponentProps } from 'react';
import { LabelValuePair } from '@/shared/ui/display';
import { EmoticonSetInfo } from '@/entity/emoticon-set/type';
import {
  EmoticonInfoHeader,
  EmoticonPlatformItem,
  EmoticonTypeItem,
} from './ui';

interface EmoticonInfoSectionProps extends ComponentProps<'section'> {
  emoticonInfo: EmoticonSetInfo;
}

export default function EmoticonInfoSection({
  emoticonInfo,
}: EmoticonInfoSectionProps) {
  return (
    <section className='tablet:border-radius-2xl bg-primary padding-24 flex flex-col gap-24'>
      <EmoticonInfoHeader emoticonInfo={emoticonInfo} />
      <EmoticonInfoContent emoticonInfo={emoticonInfo} />
    </section>
  );
}

function EmoticonInfoContent({
  emoticonInfo,
}: {
  emoticonInfo: EmoticonSetInfo;
}) {
  const { platform, type, description } = emoticonInfo;

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
