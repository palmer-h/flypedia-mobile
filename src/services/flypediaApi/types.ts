export type Fly = {
  id: string;
  name: string;
  description: string;
  types: Array<FlyType>;
  imitatees?: Array<Imitatee>;
};

export type FlyType = {
  id: string;
  name: string;
};

export type Imitatee = {
  id: string;
  name: string;
  description: string;
  flies?: Array<Fly>;
};

export type LoginResponse = {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
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
  ids?: Array<number | string>;
};

export type PaginatedEntityResponse<T> = {
  results: Array<T>;
  metadata: Metadata;
};
