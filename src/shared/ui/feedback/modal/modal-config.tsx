import { DeleteCommentModal } from '@/feature/comment/ui';
import DeleteConfirmModal from '@/feature/register-emoticon/ui/delete-confirm-modal';
import ShareLinkModal from '@/feature/share-link/share-link-modal';
import ViewEmoticonImageModal from '@/feature/view-emoticon-image/view-emoticon-image-modal';
import { DangerModal } from './danger-modal';

export const MODAL_CONFIG = {
  deleteConfirm: DeleteConfirmModal,
  viewEmoticonImage: ViewEmoticonImageModal,
  shareLink: ShareLinkModal,
  danger: DangerModal,
  deleteComment: DeleteCommentModal,
} as const;

export type ModalConfigType = typeof MODAL_CONFIG;
