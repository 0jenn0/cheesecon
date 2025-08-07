// import { useCommentSectionUi } from '@/screen/emoticon/emoticon-comment-section/provider';
import CommentForm from './comment-form';

export default function DefaultCommentForm({
  emoticonSetId,
}: {
  emoticonSetId: string;
}) {
  //   const showCommentForm = useCommentSectionUi(
  //     (state) => state.commentFormCommentId === null,
  //   );

  return <>{<CommentForm emoticonSetId={emoticonSetId} />}</>;
}
