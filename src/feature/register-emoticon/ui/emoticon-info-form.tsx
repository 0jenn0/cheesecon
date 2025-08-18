'use client';

import { useCallback } from 'react';
import { SelectField, TextAreaField, TextField } from '@/shared/ui/input';

export default function EmoticonInfoForm() {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
    },
    [],
  );

  const handleTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
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
    },
    [],
  );

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
        variant='default'
      />
      <TextField
        name='author_name'
        label='이모티콘 작가명'
        placeholder='이모티콘 작가명'
        labelType='required'
        placeholderClassName='padding-y-12'
        direction='column'
        onChange={handleInputChange}
        variant='default'
      />
      <SelectField
        name='platform'
        label='이모티콘 플랫폼'
        placeholder='이모티콘 플랫폼'
        labelType='required'
        options={['카카오톡', '라인']}
        selectClassName='padding-y-8'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        onChange={handleSelectChange}
        variant='default'
      />
      <SelectField
        name='type'
        label='이모티콘 유형'
        placeholder='이모티콘 유형'
        labelType='required'
        options={['움직이는 이모티콘', '멈춰있는 이모티콘']}
        selectClassName='padding-y-8'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        onChange={handleSelectChange}
        variant='default'
      />
      <TextAreaField
        name='description'
        label='이모티콘 설명'
        placeholder='이모티콘 설명'
        labelType='required'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        onChange={handleTextAreaChange}
        variant='default'
      />
    </div>
  );
}
