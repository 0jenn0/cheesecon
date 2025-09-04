'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/shared/lib/amplitude';

export default function Home() {
  useEffect(() => {
    trackEvent('page_view', { page: 'home' });
  }, []);

  return <div>Home</div>;
}
