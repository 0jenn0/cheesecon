import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Tables } from '@/types/types_db';

type EmoticonSetRequest = Tables<'emoticon_sets'>;

interface EmoticonRegisterContextType {
  emoticonSet: EmoticonSetRequest;
  imageUrls: { imageUrl: string; imageOrder: number }[];
  setEmoticonSet: (emoticonSet: EmoticonSetRequest) => void;
  setImageUrls: (imageUrls: { imageUrl: string; imageOrder: number }[]) => void;
}

const EmoticonRegisterContext = createContext<EmoticonRegisterContextType>({
  emoticonSet: {
    id: '',
    author_name: '',
    description: null,
    is_private: null,
    password_hash: null,
    comments_count: null,
    likes_count: null,
    views_count: null,
    created_at: null,
    updated_at: null,
    platform: '',
    representative_image_url: null,
    title: '',
    type: '',
    user_id: null,
  },
  imageUrls: [],
  setImageUrls: () => {
    throw new Error('setImageUrls 함수를 정의해주세요.');
  },
  setEmoticonSet: () => {
    throw new Error('setEmoticonSet 함수를 정의해주세요.');
  },
});

export function EmoticonRegisterProvider({ children }: PropsWithChildren) {
  const [emoticonSet, setEmoticonSet] = useState<EmoticonSetRequest>({
    id: '',
    author_name: '',
    description: null,
    is_private: null,
    password_hash: null,
    comments_count: null,
    likes_count: null,
    views_count: null,
    created_at: null,
    updated_at: null,
    platform: '',
    representative_image_url: null,
    title: '',
    type: '',
    user_id: null,
  });
  const [imageUrls, setImageUrls] = useState<
    { imageUrl: string; imageOrder: number }[]
  >([]);
  return (
    <EmoticonRegisterContext.Provider
      value={{ emoticonSet, setEmoticonSet, imageUrls, setImageUrls }}
    >
      {children}
    </EmoticonRegisterContext.Provider>
  );
}

export default function useEmoticonRegister() {
  const context = useContext(EmoticonRegisterContext);
  if (!context) {
    throw new Error(
      'useEmoticonRegister는 EmoticonRegisterProvider 내에서 사용되어야 합니다.',
    );
  }
  return context;
}

export { EmoticonRegisterContext };
