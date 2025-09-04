'use client';

import { useEffect } from 'react';
import { trackEvent } from './amplitude';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useAmplitudePageView(
  pageName: string,
  properties?: Record<string, any>,
) {
  useEffect(() => {
    trackEvent('page_view', { page: pageName, ...properties });
  }, [pageName, properties]);
}

export default useAmplitudePageView;
