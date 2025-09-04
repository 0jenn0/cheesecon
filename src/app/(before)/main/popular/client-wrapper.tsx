'use client';

import { useAmplitudePageView } from '@/shared/lib/use-amplitude-page-view';

export default function PopularPageClientWrapper({ children }: { children: React.ReactNode }) {
  useAmplitudePageView('popular_emoticons');

  return <>{children}</>;
}