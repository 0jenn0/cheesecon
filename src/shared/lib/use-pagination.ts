import { useState } from 'react';

export function usePagination(pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    offset,
    handlePageChange,
  };
}
