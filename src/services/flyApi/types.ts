export type Fly = {
  id: number;
  name: string;
  description: string;
  types: Array<FlyType>;
  imitatees?: Array<Imitatee>;
};

export type FlyType = {
  id: number;
  name: string;
};

export type Imitatee = {
  id: number;
  name: string;
  description: string;
  flies?: Array<Fly>;
};

export type Metadata = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
};

export type PaginatedEntityIndexParams = {
  pageNumber: Metadata['pageNumber'];
  pageSize: Metadata['pageSize'];
};

export type PaginatedEntityResponse<T> = {
  results: Array<T>;
  metadata: Metadata;
};
