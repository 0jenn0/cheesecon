import { useState } from 'react';
import { useCreateCommentMutation } from '@/entity/comment/query/comment-mutation';
import { CreateCommentParams } from '@/entity/comment/type';
import { useUploadImageMutation } from '@/feature/upload-image/model/upload-image-mutation';

export default function useCommentForm({
  emoticonSetId,
  parentCommentId,
}: {
  emoticonSetId: string;
  parentCommentId?: string;
}) {
  const [comment, setComment] = useState<CreateCommentParams>({
    content: '',
    set_id: emoticonSetId,
    parent_comment_id: parentCommentId ?? null,
    image_id: null,
    images: null,
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { mutate: createComment, isPending } = useCreateCommentMutation();
  const uploadImageMutation = useUploadImageMutation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ ...comment, content: e.target.value });
  };

  const handleImageUpload = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    const maxImages = 6;
    const currentCount = uploadedImages.length;
    const availableSlots = maxImages - currentCount;

    const filesToUpload = files.slice(0, availableSlots);

    if (files.length > maxImages) {
      // TODO: 토스트로 대체
      alert('최대 6장까지만 업로드할 수 있습니다.');
      setUploadedImages([]);
      return;
    }

    for (const file of filesToUpload) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const result = await uploadImageMutation.mutateAsync(formData);
        uploadedUrls.push(result.url);
      } catch (error) {
        console.error('Image upload error:', error);
      }
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.content.trim() && uploadedImages.length === 0) {
      return;
    }

    createComment(
      {
        comment: {
          ...comment,
          images: uploadedImages.length > 0 ? uploadedImages : null,
        },
      },
      {
        onSuccess: () => {
          setComment({
            content: '',
            set_id: emoticonSetId,
            parent_comment_id: null,
            image_id: null,
            images: null,
          });
          setUploadedImages([]);
        },
      },
    );
  };

  return {
    comment,
    setComment,
    uploadedImages,
    handleChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    isPending: isPending || uploadImageMutation.isPending,
  };
}
