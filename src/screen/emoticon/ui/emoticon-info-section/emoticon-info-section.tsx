import { ComponentProps } from 'react';
import { LabelValuePair } from '@/shared/ui/display';
import { EmoticonSet, EmoticonSetDetail } from '@/entity/emoticon-set/type';
import {
  EmoticonInfoHeader,
  EmoticonPlatformItem,
  EmoticonTypeItem,
} from './ui';

interface EmoticonInfoSectionProps extends ComponentProps<'section'> {
  emoticonSetDetail: EmoticonSetDetail;
}

export default function EmoticonInfoSection({
  emoticonSetDetail,
}: EmoticonInfoSectionProps) {
  return (
    <section className='tablet:border-radius-2xl bg-primary padding-24 flex flex-col gap-24'>
      <EmoticonInfoHeader emoticonSetDetail={emoticonSetDetail} />
      <EmoticonInfoContent emoticonSetDetail={emoticonSetDetail} />
    </section>
  );
}

function EmoticonInfoContent({
  emoticonSetDetail,
}: {
  emoticonSetDetail: EmoticonSetDetail;
}) {
  const { platform, type, description } = emoticonSetDetail;

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
