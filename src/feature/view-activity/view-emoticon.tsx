'use client';

import { useRef, useState } from 'react';
import { usePagination } from '@/shared/lib/use-pagination';
import { IconButton, Placeholder, SelectField } from '@/shared/ui/input';
import { Pagination } from '@/shared/ui/navigation';
import { useEmoticonSetPaginationQuery } from '@/entity/emoticon-set';
import { useAuth } from '../auth/provider/auth-provider';
import {
  EmoticonViewItemClient,
  EmoticonViewItemSkeleton,
} from '../view-emotion/emoticon-view-section/ui';

const COUNT_PER_PAGE = 8;

interface ViewEmoticonProps {
  emoticonType: 'likes' | 'emoticons';
}

export default function ViewEmoticon({ emoticonType }: ViewEmoticonProps) {
  const { session } = useAuth();
  const { currentPage, handlePageChange } = usePagination(COUNT_PER_PAGE);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const prevIsPrivateRef = useRef(isPrivate);

  const { data, isLoading } = useEmoticonSetPaginationQuery({
    orderBy: 'created_at',
    order: 'desc',
    userId: session?.user?.id,
    page: currentPage,
    limit: COUNT_PER_PAGE,
    title: searchQuery,
    isLiked: emoticonType === 'likes',
    isPrivate,
  });

  const totalPages = data?.success ? data.data.totalPages : 0;

  const emoticons = data?.success ? data.data.data : [];

  if (prevIsPrivateRef.current !== isPrivate) {
    prevIsPrivateRef.current = isPrivate;
    if (currentPage !== 1) {
      handlePageChange(1);
    }
  }

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSearchQuery(search);
    handlePageChange(1);
  };

  return (
    <div className='tablet:gap-24 flex flex-col gap-16'>
      <form
        className='flex w-full items-stretch justify-center gap-16'
        onSubmit={handleSearch}
      >
        <Placeholder
          placeholder='이모티콘 제목 검색'
          isError={false}
          disabled={false}
          className='flex-1'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          icon='search'
          className='padding-x-24 max-h-[120px] flex-shrink-0'
          variant='secondary'
          type='submit'
        />
      </form>
      <div className='flex w-full items-center justify-between'>
        <div className='flex w-full items-center gap-8'>
          {searchQuery && (
            <span className='text-sm text-gray-500'>
              {searchQuery} 검색 결과 {data?.success ? data.data.total : 0}개
            </span>
          )}
          <span>총 {data?.success ? data.data.total : 0}개의 이모티콘</span>
        </div>
        <SelectField
          name='privacy'
          placeholder='공개 여부'
          className='w-[120px] flex-shrink-0'
          selectClassName='padding-y-8'
          options={['공개', '비밀']}
          onChange={(e) => {
            setIsPrivate(e.target.value === '비밀');
          }}
        />
      </div>

      <ul className='tablet:grid-cols-2 grid w-full grid-cols-1 gap-x-32 gap-y-16'>
        {emoticons.map((emoticon) => (
          <EmoticonViewItemClient
            key={emoticon.id}
            item={emoticon}
            hideLikes={true}
          />
        ))}
      </ul>
      {isLoading && (
        <ul className='tablet:grid-cols-2 grid w-full grid-cols-1 gap-x-32 gap-y-16'>
          {Array.from({ length: COUNT_PER_PAGE }).map((_, index) => (
            <EmoticonViewItemSkeleton key={index} index={index} />
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
