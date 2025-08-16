import Image from 'next/image';
import { ComponentPropsWithRef } from 'react';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/icon/config';
import { ProfileActivity } from '@/entity/profile/type';

interface ProfileViewItemProps extends ComponentPropsWithRef<'section'> {
  profileActivity: ProfileActivity;
  index: number;
}

function ProfileViewItem({ profileActivity, index }: ProfileViewItemProps) {
  return (
    <section className='flex gap-24'>
      <Thumbnail index={index} profileActivity={profileActivity} />
      <Content profileActivity={profileActivity} />
    </section>
  );
}

export default ProfileViewItem;

function Thumbnail({
  index,
  profileActivity,
}: {
  index: number;
  profileActivity: ProfileActivity;
}) {
  return (
    <div className='border-radius-lg relative flex gap-8 overflow-hidden font-semibold'>
      <div className='height-24 width-24 flex items-center justify-center'>
        <span className='text-body-sm font-regular'>{index}</span>
      </div>
      <Image
        src={profileActivity.avatar_url ?? ''}
        alt={profileActivity.nickname}
        className='border-radius-lg border-ghost tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px] border object-cover'
        width={80}
        height={80}
      />
    </div>
  );
}

function Content({ profileActivity }: { profileActivity: ProfileActivity }) {
  return (
    <div className='flex h-full flex-1 flex-col justify-center gap-24'>
      <h1 className='text-body-lg'>{profileActivity.nickname}</h1>
      <div className='flex w-full justify-between'>
        <div className='flex gap-12'>
          <IconLabel
            icon='message-circle'
            label={profileActivity.comment_count}
          />
          <IconLabel
            icon='heart'
            label={profileActivity.total_likes_received}
          />
          <IconLabel icon='image' label={profileActivity.emoticon_count} />
        </div>
      </div>
    </div>
  );
}

function IconLabel({
  icon,
  label,
}: {
  icon: (typeof ICON_NAMES)[number];
  label: number | null;
}) {
  return (
    <div className='flex gap-2'>
      <Icon name={icon} className='icon-disabled' />
      <p className='text-body-sm text-secondary'>{label}</p>
    </div>
  );
}
