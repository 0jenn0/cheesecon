'use client';

import { useState } from 'react';
import { SelectField, TextAreaField, TextField } from '@/shared/ui/input';

export default function EmoticonInfoForm() {
  const [info, setInfo] = useState<Record<string, string>>({
    name: '',
    author: '',
    platform: '',
    type: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLSelectElement;
    const { name, value } = target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='flex flex-1 flex-col gap-24'>
      <TextField
        name='name'
        label='이모티콘 이름'
        placeholder='이모티콘 이름'
        direction='row'
        labelType='required'
        placeholderClassName='padding-y-12'
        onChange={handleInputChange}
      />
      <TextField
        name='author'
        label='이모티콘 작가명'
        placeholder='이모티콘 이름'
        direction='row'
        labelType='required'
        placeholderClassName='padding-y-12'
        onChange={handleInputChange}
      />
      <SelectField
        name='platform'
        label='이모티콘 플랫폼'
        placeholder='이모티콘 플랫폼'
        direction='row'
        labelType='required'
        options={['카카오톡', '라인']}
        selectClassName='padding-y-12 text-body-sm'
        onChange={handleSelectChange}
      />
      <SelectField
        name='type'
        label='이모티콘 유형'
        placeholder='이모티콘 유형'
        direction='row'
        labelType='required'
        options={['움직이는 이모티콘', '멈춰있는 이모티콘']}
        selectClassName='padding-y-12 text-body-sm'
        onChange={handleSelectChange}
      />
      <TextAreaField
        name='description'
        label='이모티콘 설명'
        placeholder='이모티콘 이름'
        direction='row'
        labelType='required'
        onChange={handleTextAreaChange}
      />
    </div>
  );
}
