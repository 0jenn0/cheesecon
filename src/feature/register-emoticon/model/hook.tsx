import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { ImageUrlWithOrder } from '@/shared/types';
import { CreateEmoticonSetForm } from '@/entity/emoticon-set';
import { validateEmoticonSet, validateImageUrls } from '../lib/validation';

interface ValidationErrors {
  emoticonSet?: Record<string, string[] | undefined>;
  imageUrls?: Record<string, string[] | undefined>;
}

interface EmoticonRegisterContextType {
  createEmoticonSetForm: CreateEmoticonSetForm;
  imageUrls: ImageUrlWithOrder[];
  setEmoticonSet: (
    next:
      | CreateEmoticonSetForm
      | ((prev: CreateEmoticonSetForm) => CreateEmoticonSetForm),
  ) => void;
  handleSetImageUrl: (newImageUrls: ImageUrlWithOrder[]) => void;
  validationErrors: ValidationErrors;
  isValid: boolean;
  validateField: (
    field: keyof CreateEmoticonSetForm,
    value: CreateEmoticonSetForm[keyof CreateEmoticonSetForm],
  ) => void;
  validateAll: () => boolean;
  clearValidationErrors: () => void;
}

const EmoticonRegisterContext = createContext<EmoticonRegisterContextType>({
  createEmoticonSetForm: {
    author_name: '',
    is_private: false,
    title: '',
    description: '',
    platform: '',
    type: '',
    representative_image: {
      image_url: '',
      blur_url: null,
      image_order: 0,
      is_representative: true,
      webp_url: null,
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
    useState<CreateEmoticonSetForm>({
      author_name: '',
      title: '',
      description: '',
      platform: '',
      type: '',
      is_private: false,
      representative_image: {
        image_url: '',
        blur_url: null,
        image_order: 0,
        is_representative: true,
        webp_url: null,
      },
    });
  const [imageUrls, setImageUrls] = useState<ImageUrlWithOrder[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isValid, setIsValid] = useState(false);

  const setEmoticonSet = useCallback(
    (
      next:
        | CreateEmoticonSetForm
        | ((prev: CreateEmoticonSetForm) => CreateEmoticonSetForm),
    ) => {
      setEmoticonSetState(next);
    },
    [],
  );

  const handleSetImageUrl = (newImageUrls: ImageUrlWithOrder[]) => {
    setImageUrls((prev) => {
      const updatedImageUrls = [...prev, ...newImageUrls];

      // 상태 업데이트 후 검증을 수행
      const emoticonSetResult = validateEmoticonSet(
        emoticonSetWithRepresentativeImage,
      );
      const imageUrlsResult = validateImageUrls(updatedImageUrls);
      const isValidResult =
        emoticonSetResult.success && imageUrlsResult.success;
      setIsValid(isValidResult);

      return updatedImageUrls;
    });
  };

  const validateField = (
    field: keyof CreateEmoticonSetForm,
    value: CreateEmoticonSetForm[keyof CreateEmoticonSetForm],
  ) => {
    const updatedEmoticonSet = {
      ...emoticonSetWithRepresentativeImage,
      [field]: value,
    };
    const result = validateEmoticonSet(updatedEmoticonSet);

    // 디버깅을 위한 로깅 추가
    if (!result.success) {
      console.log(`검증 실패 - 필드: ${field}, 값:`, value);
      console.log('검증 오류:', result.error.issues);
    }

    setValidationErrors((prev) => {
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

        return {
          ...prev,
          emoticonSet: errors,
        };
      } else {
        return {
          ...prev,
          emoticonSet: prev.emoticonSet
            ? {
                ...prev.emoticonSet,
                [field]: undefined,
              }
            : {},
        };
      }
    });

    // 전체 유효성 검사
    const emoticonSetResult = validateEmoticonSet(updatedEmoticonSet);
    const imageUrlsResult = validateImageUrls(imageUrls);
    const isValidResult = emoticonSetResult.success && imageUrlsResult.success;
    setIsValid(isValidResult);
  };

  const validateAll = (): boolean => {
    const emoticonSetResult = validateEmoticonSet(
      emoticonSetWithRepresentativeImage,
    );
    const imageUrlsResult = validateImageUrls(imageUrls);

    // 디버깅을 위한 로깅 추가
    if (!emoticonSetResult.success) {
      console.log(
        '전체 검증 실패 - 이모티콘 세트:',
        emoticonSetWithRepresentativeImage,
      );
      console.log('이모티콘 세트 검증 오류:', emoticonSetResult.error.issues);
    }
    if (!imageUrlsResult.success) {
      console.log('전체 검증 실패 - 이미지 URLs:', imageUrls);
      console.log('이미지 URLs 검증 오류:', imageUrlsResult.error.issues);
    }

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
        createEmoticonSetForm: emoticonSetWithRepresentativeImage,
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
