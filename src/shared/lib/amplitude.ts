/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    amplitude: any;
  }
}

const getDeviceInfo = () => {
  if (typeof window === 'undefined') return {};

  return {
    device_type: window.innerWidth <= 768 ? 'mobile' : 'desktop',
    window_width: window.innerWidth,
    window_height: window.innerHeight,
    user_agent: navigator.userAgent,
    viewport_position:
      window.pageYOffset > 0
        ? window.pageYOffset > window.innerHeight
          ? 'bottom'
          : 'middle'
        : 'top',
  };
};

export const initializeAmplitude = () => {
  // CDN으로 이미 초기화되므로 추가 작업 없음
  if (typeof window !== 'undefined' && window.amplitude) {
    console.log('Amplitude initialized via CDN');
  }
};

export const trackEvent = (
  eventName: string,
  eventProperties?: Record<string, any>,
) => {
  if (typeof window !== 'undefined' && window.amplitude) {
    const deviceInfo = getDeviceInfo();
    const timestamp = new Date().toISOString();

    window.amplitude.track(eventName, {
      ...deviceInfo,
      timestamp,
      ...eventProperties,
    });
  }
};

export const setUserId = (userId: string) => {
  if (typeof window !== 'undefined' && window.amplitude) {
    window.amplitude.setUserId(userId);
  }
};

export const setUserProperties = (userProperties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.amplitude) {
    const identify = new window.amplitude.Identify();
    Object.keys(userProperties).forEach((key) => {
      identify.set(key, userProperties[key]);
    });
    window.amplitude.identify(identify);
  }
};
