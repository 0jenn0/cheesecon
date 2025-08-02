export const emoticonImageQueryKey = {
  all: ['emoticon-images'] as const,
  bySetId: (setId: string) => [...emoticonImageQueryKey.all, setId] as const,
};
