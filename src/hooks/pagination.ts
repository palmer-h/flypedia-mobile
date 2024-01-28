import { useState } from 'react';

export const usePagination = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const goToFirstPage = (): void => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(1);
  };

  const goToPreviousPage = (): void => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };

  const goToNextPage = (totalPages: number): void => {
    if (pageNumber === totalPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const goToLastPage = (totalPages: number): void => {
    if (pageNumber === totalPages) {
      return;
    }
    setPageNumber(totalPages);
  };

  const goToPage = (page: number, totalPages: number): void => {
    if (page === pageNumber || page > totalPages) {
      return;
    }
    setPageNumber(page);
  };

  return {
    pageNumber,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    goToPage,
  };
};
