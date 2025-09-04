'use client';

import { useEffect } from 'react';
import { initializeAmplitude } from '@/shared/lib/amplitude';

export default function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAmplitude();
  }, []);

  return <>{children}</>;
}