'use client';

import { SelectField, TextAreaField, TextField } from '@/shared/ui/input';
import useEmoticonRegister from '../model/hook';

export default function EmoticonInfoForm() {
  const { emoticonSet, setEmoticonSet } = useEmoticonRegister();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmoticonSet({ ...emoticonSet, [name]: value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmoticonSet({ ...emoticonSet, [name]: value });
  };

  const handleSelectChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLSelectElement;
    const { name, value } = target;

    // 값 매핑
    let mappedValue = value;
    if (name === 'platform') {
      mappedValue = value === '카카오톡' ? 'kakao' : 'line';
    } else if (name === 'type') {
      mappedValue = value === '움직이는 이모티콘' ? 'emotion' : 'static';
    }

    setEmoticonSet({ ...emoticonSet, [name]: mappedValue });
  };

  return (
    <div className='flex flex-1 flex-col gap-16'>
      <TextField
        name='title'
        label='이모티콘 이름'
        placeholder='이모티콘 이름'
        direction='row'
        labelType='required'
        placeholderClassName='padding-y-12'
        onChange={handleInputChange}
      />
      <TextField
        name='author_name'
        label='이모티콘 작가명'
        placeholder='이모티콘 작가명'
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
        placeholder='이모티콘 설명'
        direction='row'
        labelType='required'
        onChange={handleTextAreaChange}
      />
    </div>
  );
}
