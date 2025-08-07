'use client';

import { useState } from 'react';

export function usePagination<T>(pageSize: number, data?: T[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const totalPages = Math.ceil((data?.length ?? 0) / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!data) {
    return {
      currentPage,
      offset,
      handlePageChange,
    };
  }

  return {
    totalPages,
    data: data.slice(offset, offset + pageSize),
    currentPage,
    offset,
    handlePageChange,
  };
}
