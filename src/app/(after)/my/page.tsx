'use client';

import { useAmplitudePageView } from '@/shared/lib/use-amplitude-page-view';

export default function MePage() {
  useAmplitudePageView('my_profile');

  return <></>;
}
