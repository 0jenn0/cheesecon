'use client';

import ViewEmoticon from '@/feature/view-activity/view-emoticon';
import { useAmplitudePageView } from '@/shared/lib/use-amplitude-page-view';

export default function MyEmoticonScreen() {
  useAmplitudePageView('my_emoticons');

  return <ViewEmoticon emoticonType='emoticons' />;
}
