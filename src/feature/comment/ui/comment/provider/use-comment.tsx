import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface CommentItemContext {
  commentId: string;
  emoticonSetId: string;
  isEditing: boolean;
  toggleEditing: () => void;
  userType: 'me' | 'author' | 'other';
}

const CommentItemContext = createContext<CommentItemContext>({
  commentId: '',
  emoticonSetId: '',
  isEditing: false,
  toggleEditing: () => {},
  userType: 'other',
});

export function CommentItemProvider({
  children,
  commentId,
  emoticonSetId,
  userType = 'other',
}: PropsWithChildren<Omit<CommentItemContext, 'toggleEditing' | 'isEditing'>>) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <CommentItemContext.Provider
      value={{ commentId, emoticonSetId, isEditing, toggleEditing, userType }}
    >
      {children}
    </CommentItemContext.Provider>
  );
}

export function useCommentItem() {
  const context = useContext(CommentItemContext);
  if (!context) {
    throw new Error(
      'CommentItemContext는 CommentItemProvider 안에서 사용되어야 합니다.',
    );
  }
  return context;
}
