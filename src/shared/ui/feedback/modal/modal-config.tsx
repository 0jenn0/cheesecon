import DeleteCommentModal from '@/feature/comment/ui/delete-comment-modal';
import DeleteConfirmModal from '@/feature/register-emoticon/ui/delete-confirm-modal';
import ShareLinkModal from '@/feature/share-link/share-link-modal';
import ViewEmoticonImageModal from '@/feature/view-emoticon-image/view-emoticon-image-modal';

export const MODAL_CONFIG = {
  deleteConfirm: DeleteConfirmModal,
  deleteComment: DeleteCommentModal,
  viewEmoticonImage: ViewEmoticonImageModal,
  shareLink: ShareLinkModal,
} as const;

export type ModalConfigType = typeof MODAL_CONFIG;
