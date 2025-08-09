import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';
import { DEFAULT_COMMENT_FORM_ID } from '../const';

type UiState = {
  showMore: Set<string>;
  showReaction: Set<string>;
  showForm: Set<string>;
};

type UiStore = {
  state: UiState;
  listeners: Set<() => void>;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => UiState;
  toggleMore: (id: string) => void;
  toggleReaction: (id: string) => void;
  toggleForm: (id: string) => void;
  isShowingMore: (id: string) => boolean;
  isShowingReaction: (id: string) => boolean;
  isShowingForm: (id: string) => boolean;
};

const CommentSectionUiContext = createContext<UiStore | null>(null);

export function CommentSectionUiProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<UiStore>(null);

  if (!storeRef.current) {
    const state: UiState = {
      showMore: new Set(),
      showReaction: new Set(),
      showForm: new Set([DEFAULT_COMMENT_FORM_ID]),
    };

    const listeners = new Set<() => void>();

    const notify = () => {
      listeners.forEach((listener) => listener());
    };

    storeRef.current = {
      state,
      listeners,
      subscribe: (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      getSnapshot: () => state,
      toggleMore: (id) => {
        if (state.showMore.has(id)) {
          state.showMore.delete(id);
        } else {
          state.showReaction.clear();
          state.showMore.clear();
          state.showMore.add(id);
        }
        notify();
      },
      toggleReaction: (id) => {
        if (state.showReaction.has(id)) {
          state.showReaction.delete(id);
        } else {
          state.showMore.clear();
          state.showReaction.clear();
          state.showReaction.add(id);
        }
        notify();
      },
      toggleForm: (id) => {
        if (state.showForm.size > 0) {
          if (state.showForm.has(id)) {
            state.showForm.clear();
            state.showForm.add(DEFAULT_COMMENT_FORM_ID);
          } else {
            state.showForm.clear();
            state.showForm.add(id);
          }
        } else {
          state.showForm.add(id);
        }

        notify();
      },
      isShowingMore: (id) => state.showMore.has(id),
      isShowingReaction: (id) => state.showReaction.has(id),
      isShowingForm: (id) => state.showForm.has(id),
    };
  }

  return (
    <CommentSectionUiContext.Provider value={storeRef.current}>
      {children}
    </CommentSectionUiContext.Provider>
  );
}

export function useCommentSectionUi(commentId: string) {
  const store = useContext(CommentSectionUiContext);
  if (!store) {
    throw new Error(
      'useCommentSectionUi는 CommentSectionUiProvider 내에서 사용되어야 합니다.',
    );
  }

  const isShowingMore = useSyncExternalStore(
    store.subscribe,
    useCallback(() => store.isShowingMore(commentId), [store, commentId]),
    useCallback(() => false, []),
  );

  const isShowingReaction = useSyncExternalStore(
    store.subscribe,
    useCallback(() => store.isShowingReaction(commentId), [store, commentId]),
    useCallback(() => false, []),
  );

  const isShowingForm = useSyncExternalStore(
    store.subscribe,
    useCallback(() => store.isShowingForm(commentId), [store, commentId]),
    useCallback(() => true, [store]),
  );

  const toggleMore = useCallback(
    () => store.toggleMore(commentId),
    [store, commentId],
  );
  const toggleReaction = useCallback(
    () => store.toggleReaction(commentId),
    [store, commentId],
  );
  const toggleForm = useCallback(
    () => store.toggleForm(commentId),
    [store, commentId],
  );

  return {
    isShowingMore,
    isShowingReaction,
    isShowingForm,
    toggleMore,
    toggleReaction,
    toggleForm,
  };
}
