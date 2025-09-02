'use client';

import { useCallback } from 'react';
import { SelectField, TextAreaField, TextField } from '@/shared/ui/input';
import { useDraft } from '../model/draft-context';

export default function EmoticonInfoForm() {
  const meta = useDraft((s) => s.meta);
  const metaErrors = useDraft((s) => s.metaErrors);
  const setMetaField = useDraft((s) => s.setMetaField);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMetaField(name as any, value);
    },
    [setMetaField],
  );

  const handleTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMetaField(name as any, value);
    },
    [setMetaField],
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;

      const mapped =
        name === 'platform'
          ? toPlatformCode(value)
          : name === 'type'
            ? toTypeCode(value)
            : value;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMetaField(name as any, mapped);
    },
    [setMetaField],
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
        variant={metaErrors.title ? 'error' : 'default'}
        onChange={handleInputChange}
        aria-invalid={!!metaErrors.title}
        helpMessage={{
          default: '',
          success: '',
          error: metaErrors.title ?? '',
        }}
        inputProps={{
          defaultValue: meta.title,
        }}
      />

      <TextField
        name='author_name'
        label='이모티콘 작가명'
        placeholder='이모티콘 작가명'
        labelType='required'
        placeholderClassName='padding-y-12'
        direction='column'
        variant={metaErrors.author_name ? 'error' : 'default'}
        onChange={handleInputChange}
        aria-invalid={!!metaErrors.author_name}
        helpMessage={{
          default: '',
          success: '',
          error: metaErrors.author_name ?? '',
        }}
        inputProps={{
          defaultValue: meta.author_name,
        }}
      />

      <SelectField
        name='platform'
        label='이모티콘 플랫폼'
        placeholder='이모티콘 플랫폼'
        labelType='required'
        options={['카카오톡', 'OGQ']}
        selectClassName='padding-y-8'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        variant={metaErrors.platform ? 'error' : 'default'}
        onChange={handleSelectChange}
        aria-invalid={!!metaErrors.platform}
        helpMessage={{
          default: '',
          success: '',
          error: metaErrors.platform ?? '',
        }}
        defaultValue={meta.platform === 'kakaotalk' ? '카카오톡' : 'OGQ'}
      />

      <SelectField
        name='type'
        label='이모티콘 유형'
        placeholder='이모티콘 유형'
        labelType='required'
        options={['움직이는 이모티콘', '멈춰있는 이모티콘']}
        selectClassName='padding-y-8'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        variant={metaErrors.type ? 'error' : 'default'}
        onChange={handleSelectChange}
        aria-invalid={!!metaErrors.type}
        helpMessage={{
          default: '',
          success: '',
          error: metaErrors.type ?? '',
        }}
        defaultValue={
          meta.type === 'static' ? '멈춰있는 이모티콘' : '움직이는 이모티콘'
        }
      />

      <TextAreaField
        name='description'
        label='이모티콘 설명'
        placeholder='이모티콘 설명'
        labelType='required'
        responsiveDirection={{ mobile: 'column', desktop: 'row' }}
        variant={metaErrors.description ? 'error' : 'default'}
        onChange={handleTextAreaChange}
        aria-invalid={!!metaErrors.description}
        helpMessage={{
          default: '',
          success: '',
          error: metaErrors.description ?? '',
        }}
        defaultValue={meta.description}
      />
    </div>
  );
}

function toPlatformCode(label: string) {
  return label === '카카오톡' ? 'kakaotalk' : 'ogq';
}
function toTypeCode(label: string) {
  return label === '움직이는 이모티콘' ? 'animated' : 'static';
}
