import { DEFAULT_COMMENT_FORM_ID } from '@/screen/emoticon/emoticon-comment-section/const';
import { useCommentSectionUi } from '@/screen/emoticon/emoticon-comment-section/provider/use-comment-section-ui';
import CommentForm from './comment-form';

export default function DefaultCommentForm({
  targetId,
  targetType,
}: {
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
}) {
  const { isShowingForm } = useCommentSectionUi(DEFAULT_COMMENT_FORM_ID);

  return (
    <>
      {isShowingForm && (
        <CommentForm targetId={targetId} targetType={targetType} />
      )}
    </>
  );
}
