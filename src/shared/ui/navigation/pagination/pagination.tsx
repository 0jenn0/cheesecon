import React from 'react';
import { Icon } from '../../display';
import { Button } from '../../input';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {/* 이전 페이지 버튼 */}
      <Button
        variant='secondary'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className='h-8 w-8 p-0'
      >
        <Icon name='chevron-down' className='h-4 w-4 rotate-90' />
      </Button>

      {/* 페이지 번호들 */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className='px-2 py-1 text-sm text-gray-500'>...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'primary' : 'secondary'}
              size='sm'
              onClick={() => onPageChange(page as number)}
              className='h-8 w-8 p-0'
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      <Button
        variant='secondary'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className='h-8 w-8 p-0'
      >
        <Icon name='chevron-down' className='h-4 w-4 rotate-90' />
      </Button>
    </div>
  );
};
