'use client';

import { useAmplitudePageView } from '@/shared/lib/use-amplitude-page-view';

export default function NewPageClientWrapper({ children }: { children: React.ReactNode }) {
  useAmplitudePageView('new_emoticons');

  return <>{children}</>;
}