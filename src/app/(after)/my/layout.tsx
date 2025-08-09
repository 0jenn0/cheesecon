import { Tabs } from '@/shared/ui/navigation';
import { TabItemProps } from '@/shared/ui/navigation/tabs/ui/tab-item';
import { EditProfileSection } from '@/feature/edit-profile';

const tabs = [
  { label: '활동 기록', href: '/my/activity', icon: 'calendar' },
  { label: '내 이모티콘', href: '/my/likes', icon: 'heart' },
  { label: '좋아요', href: '/my/likes', icon: 'heart' },
] satisfies TabItemProps[];

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-primary flex w-full flex-col gap-4'>
      <EditProfileSection />
      <Tabs items={tabs} />
      <div className='padding-16 tablet:padding-24 w-full flex-1'>
        {children}
      </div>
    </div>
  );
}
