import { getActivityUsersCached } from '@/entity/profile/model/main-cache';
import { ActivityScreen } from '@/screen/main';

export default async function ActivityPage() {
  const initial = await getActivityUsersCached({
    limit: 8,
    offset: 0,
  });

  return <ActivityScreen initial={initial} />;
}
