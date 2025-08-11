import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { ImageUrlWithOrder } from '@/shared/types';
import { EmoticonSetWithRepresentativeImage } from '@/entity/emoticon-set/type';
import { validateEmoticonSet, validateImageUrls } from '../lib/validation';

interface ValidationErrors {
  emoticonSet?: Record<string, string[] | undefined>;
  imageUrls?: Record<string, string[] | undefined>;
}

interface EmoticonRegisterContextType {
  emoticonSetWithRepresentativeImage: EmoticonSetWithRepresentativeImage;
  imageUrls: ImageUrlWithOrder[];
  setEmoticonSet: (emoticonSet: EmoticonSetWithRepresentativeImage) => void;
  handleSetImageUrl: (newImageUrls: ImageUrlWithOrder[]) => void;
  validationErrors: ValidationErrors;
  isValid: boolean;
  validateField: (
    field: keyof EmoticonSetWithRepresentativeImage,
    value: EmoticonSetWithRepresentativeImage[keyof EmoticonSetWithRepresentativeImage],
  ) => void;
  validateAll: () => boolean;
  clearValidationErrors: () => void;
}

const EmoticonRegisterContext = createContext<EmoticonRegisterContextType>({
  emoticonSetWithRepresentativeImage: {
    id: '',
    author_name: '',
    description: '',
    is_private: null,
    comments_count: null,
    likes_count: null,
    views_count: null,
    created_at: null,
    updated_at: null,
    platform: '',
    title: '',
    type: '',
    user_id: '',
    representative_image: {
      id: '',
      image_url: '',
      blur_url: null,
      image_order: 0,
      is_representative: false,
    },
  },
  imageUrls: [],
  validationErrors: {},
  isValid: false,
  handleSetImageUrl: () => {
    throw new Error('handleSetImageUrl 함수를 정의해주세요.');
  },
  setEmoticonSet: () => {
    throw new Error('setEmoticonSet 함수를 정의해주세요.');
  },
  validateField: () => {
    throw new Error('validateField 함수를 정의해주세요.');
  },
  validateAll: () => {
    throw new Error('validateAll 함수를 정의해주세요.');
  },
  clearValidationErrors: () => {
    throw new Error('clearValidationErrors 함수를 정의해주세요.');
  },
});

export function EmoticonRegisterProvider({ children }: PropsWithChildren) {
  const [emoticonSetWithRepresentativeImage, setEmoticonSetState] =
    useState<EmoticonSetWithRepresentativeImage>({
      id: '',
      author_name: '',
      description: '',
      is_private: null,
      comments_count: null,
      likes_count: null,
      views_count: null,
      created_at: null,
      updated_at: null,
      platform: '',
      title: '',
      type: '',
      user_id: '',
      representative_image: {
        id: '',
        image_url: '',
        blur_url: null,
        image_order: 0,
        is_representative: true,
      },
    });
  const [imageUrls, setImageUrls] = useState<ImageUrlWithOrder[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isValid, setIsValid] = useState(false);

  const setEmoticonSet = (
    newEmoticonSet: EmoticonSetWithRepresentativeImage,
  ) => {
    setEmoticonSetState(newEmoticonSet);

    const emoticonSetResult = validateEmoticonSet(newEmoticonSet);
    const imageUrlsResult = validateImageUrls(imageUrls);
    const isValidResult = emoticonSetResult.success && imageUrlsResult.success;
    setIsValid(isValidResult);
  };

  const handleSetImageUrl = (newImageUrls: ImageUrlWithOrder[]) => {
    setImageUrls((prev) => [...prev, ...newImageUrls]);

    const emoticonSetResult = validateEmoticonSet(
      emoticonSetWithRepresentativeImage,
    );
    const imageUrlsResult = validateImageUrls([...imageUrls, ...newImageUrls]);
    const isValidResult = emoticonSetResult.success && imageUrlsResult.success;
    setIsValid(isValidResult);
  };

  const validateField = (
    field: keyof EmoticonSetWithRepresentativeImage,
    value: EmoticonSetWithRepresentativeImage[keyof EmoticonSetWithRepresentativeImage],
  ) => {
    const updatedEmoticonSet = {
      ...emoticonSetWithRepresentativeImage,
      [field]: value,
    };
    const result = validateEmoticonSet(updatedEmoticonSet);

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === field) {
          const fieldName = issue.path[0] as string;
          if (!errors[fieldName]) {
            errors[fieldName] = [];
          }
          errors[fieldName].push(issue.message);
        }
      });

      setValidationErrors((prev) => ({
        ...prev,
        emoticonSet: errors,
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        emoticonSet: prev.emoticonSet
          ? {
              ...prev.emoticonSet,
              [field]: undefined,
            }
          : {},
      }));
    }

    const updatedEmoticonSetForValidation = {
      ...emoticonSetWithRepresentativeImage,
      [field]: value,
    };
    const emoticonSetResult = validateEmoticonSet(
      updatedEmoticonSetForValidation,
    );
    const imageUrlsResult = validateImageUrls(imageUrls);
    const isValidResult = emoticonSetResult.success && imageUrlsResult.success;
    setIsValid(isValidResult);
  };

  const validateAll = (): boolean => {
    const emoticonSetResult = validateEmoticonSet(
      emoticonSetWithRepresentativeImage,
    );
    const imageUrlsResult = validateImageUrls(imageUrls);

    const errors: ValidationErrors = {};

    if (!emoticonSetResult.success) {
      const emoticonSetErrors: Record<string, string[]> = {};
      emoticonSetResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!emoticonSetErrors[fieldName]) {
          emoticonSetErrors[fieldName] = [];
        }
        emoticonSetErrors[fieldName].push(issue.message);
      });
      errors.emoticonSet = emoticonSetErrors;
    }

    if (!imageUrlsResult.success) {
      const imageUrlsErrors: Record<string, string[]> = {};
      imageUrlsResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!imageUrlsErrors[fieldName]) {
          imageUrlsErrors[fieldName] = [];
        }
        imageUrlsErrors[fieldName].push(issue.message);
      });
      errors.imageUrls = imageUrlsErrors;
    }

    setValidationErrors(errors);
    const isValidResult = emoticonSetResult.success && imageUrlsResult.success;
    setIsValid(isValidResult);

    return isValidResult;
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
    setIsValid(false);
  };

  return (
    <EmoticonRegisterContext.Provider
      value={{
        emoticonSetWithRepresentativeImage,
        setEmoticonSet,
        imageUrls,
        handleSetImageUrl,
        validationErrors,
        isValid,
        validateField,
        validateAll,
        clearValidationErrors,
      }}
    >
      {children}
    </EmoticonRegisterContext.Provider>
  );
}

export default function useEmoticonRegister() {
  const context = useContext(EmoticonRegisterContext);
  if (!context) {
    throw new Error(
      'useEmoticonRegister는 EmoticonRegisterProvider 내에서 사용되어야 합니다.',
    );
  }
  return context;
}

export { EmoticonRegisterContext };
