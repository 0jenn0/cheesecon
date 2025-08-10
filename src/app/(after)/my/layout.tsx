import { Tabs } from '@/shared/ui/navigation';
import { TabItemProps } from '@/shared/ui/navigation/tabs/ui/tab-item';
import { getProfile } from '@/entity/profile/api/profile-api';
import { EditProfileSection } from '@/feature/edit-profile';

const tabs = [
  { label: '활동 기록', href: '/my/activity', icon: 'logo' },
  { label: '내 이모티콘', href: '/my/emoticon', icon: 'smile' },
  { label: '좋아요', href: '/my/like', icon: 'heart' },
] satisfies TabItemProps[];

export default async function MyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <div className='bg-primary flex w-full flex-col gap-4'>
      <EditProfileSection
        initialProfile={profile.success ? profile.data : null}
      />
      <Tabs items={tabs} />
      <div className='padding-16 tablet:padding-24 w-full flex-1'>
        {children}
      </div>
    </div>
  );
}
