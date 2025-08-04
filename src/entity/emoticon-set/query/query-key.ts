export const EMOTICON_SET_QUERY_KEY = {
  all: ['emoticon-sets'],
  order: (order: string, param?: { offset: number; limit: number }) => [
    ...EMOTICON_SET_QUERY_KEY.all,
    order,
    param?.offset,
    param?.limit,
  ],
};
