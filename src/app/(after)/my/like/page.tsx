'use client';

import ViewEmoticon from '@/feature/view-activity/view-emoticon';
import { useAmplitudePageView } from '@/shared/lib/use-amplitude-page-view';

export default function MyLikePage() {
  useAmplitudePageView('my_likes');

  return <ViewEmoticon emoticonType='likes' />;
}
