'use client';

import { useState } from 'react';
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from '@/entity/comment/query/comment-mutation';
import { CreateCommentParams } from '@/entity/comment/type';
import { useUploadImageMutation } from '@/feature/upload-image/model/upload-image-mutation';

export default function useCommentForm({
  targetId,
  targetType,
  parentCommentId,
  commentId,
}: {
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  parentCommentId?: string;
  commentId?: string;
  isEditing?: boolean;
}) {
  const key = targetType === 'emoticon_set' ? 'set_id' : 'image_id';

  const [comment, setComment] = useState<CreateCommentParams>(() => ({
    content: '',
    [key]: targetId,
    parent_comment_id: parentCommentId ?? null,
    images: null,
  }));

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { mutate: createComment, isPending } = useCreateCommentMutation({
    [key]: targetId ?? '',
  });
  const { mutate: updateComment } = useUpdateCommentMutation({
    [key]: targetId ?? '',
  });

  const uploadImageMutation = useUploadImageMutation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prev) => ({ ...prev, content: e.target.value }));
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

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !commentId ||
      (!comment.content.trim() && uploadedImages.length === 0)
    ) {
      return;
    }

    updateComment(
      {
        commentId,
        content: comment.content,
        images: uploadedImages.length > 0 ? uploadedImages : null,
      },
      {
        onSuccess: () => {
          setComment({
            content: '',
            [key]: targetId,
            parent_comment_id: parentCommentId ?? null,
            image_id: null,
            images: null,
          });
          setUploadedImages([]);
        },
        onError: (error) => {
          console.error('Error updating comment:', error);
        },
      },
    );
  };
  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            [key]: targetId,
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
    handleUpdateSubmit,
    handleCreateSubmit,
    isPending: isPending || uploadImageMutation.isPending,
  };
}
