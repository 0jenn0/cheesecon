'use client';

import { useCallback } from 'react';
import { SelectField, TextAreaField, TextField } from '@/shared/ui/input';
import useEmoticonRegister from '../model/hook';

export default function EmoticonInfoForm() {
  const { setEmoticonSet, validationErrors } = useEmoticonRegister();

  // EmoticonInfoForm.tsx
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEmoticonSet((prev) => ({
        ...prev,
        [name]: value,
        is_private: prev.is_private || false,
      }));
    },
    [],
  );

  const handleTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEmoticonSet((prev) => ({
        ...prev,
        [name]: value,
        is_private: prev.is_private || false,
      }));
    },
    [],
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;

      const mapped =
        name === 'platform'
          ? value === '카카오톡'
            ? 'kakaotalk'
            : 'line'
          : name === 'type'
            ? value === '움직이는 이모티콘'
              ? 'animated'
              : 'static'
            : value;

      setEmoticonSet((prev) => ({
        ...prev,
        [name]: mapped,
        is_private: prev.is_private || false,
      }));
    },
    [],
  );

  const getFieldError = (fieldName: string) => {
    return validationErrors.emoticonSet?.[fieldName]?.[0];
  };

  const hasFieldError = (fieldName: string) => {
    return !!getFieldError(fieldName);
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-16'>
      <TextField
        name='title'
        label='이모티콘 이름'
        placeholder='이모티콘 이름'
        labelType='required'
        placeholderClassName='padding-y-12'
        direction='column'
        onChange={handleInputChange}
        variant={hasFieldError('title') ? 'error' : 'default'}
        helpMessage={
          hasFieldError('title')
            ? {
                default: '',
                success: '',
                error: getFieldError('title') || '',
              }
            : undefined
        }
      />
      <TextField
        name='author_name'
        label='이모티콘 작가명'
        placeholder='이모티콘 작가명'
        labelType='required'
        placeholderClassName='padding-y-12'
        direction='column'
        onChange={handleInputChange}
        variant={hasFieldError('author_name') ? 'error' : 'default'}
        helpMessage={
          hasFieldError('author_name')
            ? {
                default: '',
                success: '',
                error: getFieldError('author_name') || '',
              }
            : undefined
        }
      />
      <SelectField
        name='platform'
        label='이모티콘 플랫폼'
        placeholder='이모티콘 플랫폼'
        labelType='required'
        options={['카카오톡', '라인']}
        selectClassName='padding-y-12 text-body-sm'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        onChange={handleSelectChange}
        variant={hasFieldError('platform') ? 'error' : 'default'}
        helpMessage={
          hasFieldError('platform')
            ? {
                default: '',
                success: '',
                error: getFieldError('platform') || '',
              }
            : undefined
        }
      />
      <SelectField
        name='type'
        label='이모티콘 유형'
        placeholder='이모티콘 유형'
        labelType='required'
        options={['움직이는 이모티콘', '멈춰있는 이모티콘']}
        selectClassName='padding-y-12 text-body-sm'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        onChange={handleSelectChange}
        variant={hasFieldError('type') ? 'error' : 'default'}
        helpMessage={
          hasFieldError('type')
            ? {
                default: '',
                success: '',
                error: getFieldError('type') || '',
              }
            : undefined
        }
      />
      <TextAreaField
        name='description'
        label='이모티콘 설명'
        placeholder='이모티콘 설명'
        labelType='required'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        onChange={handleTextAreaChange}
        variant={hasFieldError('description') ? 'error' : 'default'}
        helpMessage={
          hasFieldError('description')
            ? {
                default: '',
                success: '',
                error: getFieldError('description') || '',
              }
            : undefined
        }
      />
    </div>
  );
}
