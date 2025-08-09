import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface CommentItemContext {
  commentId: string;
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  isEditing: boolean;
  toggleEditing: () => void;
  userType: 'me' | 'author' | 'other';
}

const CommentItemContext = createContext<CommentItemContext>({
  commentId: '',
  targetId: '',
  targetType: 'emoticon_set',
  isEditing: false,
  toggleEditing: () => {},
  userType: 'other',
});

export function CommentItemProvider({
  children,
  commentId,
  targetId,
  targetType,
  userType = 'other',
}: PropsWithChildren<Omit<CommentItemContext, 'toggleEditing' | 'isEditing'>>) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <CommentItemContext.Provider
      value={{
        commentId,
        targetId,
        targetType,
        isEditing,
        toggleEditing,
        userType,
      }}
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
