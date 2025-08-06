import DeleteCommentModal from '@/feature/comment/ui/delete-comment-modal';
import DeleteConfirmModal from '@/feature/register-emoticon/ui/delete-confirm-modal';

export const MODAL_CONFIG = {
  deleteConfirm: DeleteConfirmModal,
  deleteComment: DeleteCommentModal,
} as const;

export type ModalConfigType = typeof MODAL_CONFIG;
