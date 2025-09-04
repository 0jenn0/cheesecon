'use client';

import { useEffect } from 'react';
import { useTrackEmoticonView } from '@/entity/view/hooks/use-track-emoticon-view';
import { useAuth } from '@/feature/auth/provider/auth-provider';

interface EmoticonViewTrackerProps {
  emoticonSetId: string;
}

export default function EmoticonViewTracker({
  emoticonSetId,
}: EmoticonViewTrackerProps) {
  const { session } = useAuth();
  const trackView = useTrackEmoticonView();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      trackView.mutate({
        setId: emoticonSetId,
        userId: session?.user?.id,
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [emoticonSetId, session?.user?.id, trackView]);

  return null;
}
