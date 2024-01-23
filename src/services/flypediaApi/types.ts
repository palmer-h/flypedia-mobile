export type TransformedErrorResponse = {
  message: string;
  status: string;
};

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

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  userId: string;
  email: string;
  favouriteFlies: Array<Fly['id']>;
  accessToken: string;
  refreshToken: string;
};

export type RefreshAccessTokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export type IndexUserFavouriteFliesPayload = {
  pageNumber: Metadata['pageNumber'];
  pageSize: Metadata['pageSize'];
  userId: string;
};

export type AddRemoveUserFavouriteFlyPayload = {
  userId: string;
  flyId: Fly['id'];
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
