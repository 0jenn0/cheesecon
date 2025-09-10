export const EMOTICON_TYPE = ['static', 'animated'] as const;
export const EMOTICON_PLATFORM = ['kakaotalk', 'ogq'] as const;

export type EmoticonPlatform = (typeof EMOTICON_PLATFORM)[number];
export type EmoticonType = (typeof EMOTICON_TYPE)[number];

export const EMOTICON_CONFIG = {
  kakaotalk: {
    static: {
      count: 32,
      size: 320,
    },
    animated: {
      count: 24,
      size: 320,
    },
  },
  ogq: {
    static: {
      count: 32,
      size: 320,
    },
    animated: {
      count: 24,
      size: 320,
    },
  },
} satisfies Record<
  EmoticonPlatform,
  Record<EmoticonType, { count: number; size: number }>
>;
