import { getUserStatsWithWeekly } from '@/entity/user-stats/api';
import StatsItem from './ui/stats-item';

export default async function ViewActivitySection() {
  const user_stats = await getUserStatsWithWeekly();

  if (!user_stats.success) {
    return <div>Error</div>;
  }

  return (
    <div className='tablet:grid-cols-2 grid w-full grid-cols-1 gap-x-32 gap-y-16'>
      <StatsItem
        iconName='smile'
        label='등록한 이모티콘'
        value={user_stats.data.emoticon_count ?? 0}
        changes={user_stats.data.emoticons_change ?? 0}
      />
      <StatsItem
        iconName='message-loading'
        label='등록한 댓글'
        value={user_stats.data.comment_count ?? 0}
        changes={user_stats.data.comments_change ?? 0}
      />
      <StatsItem
        iconName='heart'
        label='받은 좋아요'
        value={user_stats.data.total_likes_received ?? 0}
        changes={user_stats.data.likes_received_change ?? 0}
      />
      <StatsItem
        iconName='message-heart'
        label='누른 좋아요'
        value={user_stats.data.total_likes_given ?? 0}
        changes={user_stats.data.likes_given_change ?? 0}
      />
    </div>
  );
}
