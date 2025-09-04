'use client';

import EmoticonFormScreen from '@/screen/emoticon-form/screen';
import { useAmplitudePageView } from '@/shared/lib/use-amplitude-page-view';

export default function EmoticonRegisterPage() {
  useAmplitudePageView('emoticon_register');

  return <EmoticonFormScreen action='create' />;
}
