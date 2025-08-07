import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export const CommentSectionUiContext = createContext<{
  isShowingMore: (id: string) => boolean;
  toggleMore: (id: string) => void;

  isShowingReaction: (id: string) => boolean;
  toggleReaction: (id: string) => void;

  isShowingForm: (id: string | null) => boolean;
  toggleForm: (id: string) => void;
} | null>(null);

export function CommentSectionUiProvider({ children }: PropsWithChildren) {
  const [showMoreUi, setShowMoreUi] = useState<{
    name: 'more' | 'reaction' | null;
    id: string | null;
  }>({
    name: null,
    id: null,
  });

  const [formCommentId, setFormCommentId] = useState<string | null>(null);

  const isShowingMore = useCallback(
    (id: string) => {
      return showMoreUi.name === 'more' && showMoreUi.id === id;
    },
    [showMoreUi],
  );

  const isShowingReaction = useCallback(
    (id: string) => {
      return showMoreUi.name === 'reaction' && showMoreUi.id === id;
    },
    [showMoreUi],
  );

  const toggleMore = useCallback((id: string) => {
    setShowMoreUi((prev) =>
      prev.name === 'more' && prev.id === id
        ? { name: null, id: null }
        : { name: 'more', id },
    );
  }, []);

  const toggleReaction = useCallback((id: string) => {
    setShowMoreUi((prev) =>
      prev.name === 'reaction' && prev.id === id
        ? { name: null, id: null }
        : { name: 'reaction', id },
    );
  }, []);

  const isShowingForm = useCallback(
    (id: string | null) => {
      return formCommentId === id;
    },
    [formCommentId],
  );

  const toggleForm = useCallback((id: string) => {
    setFormCommentId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <CommentSectionUiContext.Provider
      value={{
        isShowingMore,
        toggleMore,

        isShowingReaction,
        toggleReaction,

        isShowingForm,
        toggleForm,
      }}
    >
      {children}
    </CommentSectionUiContext.Provider>
  );
}

export default function useCommentSectionUi() {
  const context = useContext(CommentSectionUiContext);
  if (!context) {
    throw new Error(
      'useCommentSectionUi는 CommentSectionUiProvider 내에서 사용되어야 합니다.',
    );
  }
  return context;
}
