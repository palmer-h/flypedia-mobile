export type Props = {
  pageNumber: number;
  totalPages: number;
  onGoToPage: (page: number) => void;
};
