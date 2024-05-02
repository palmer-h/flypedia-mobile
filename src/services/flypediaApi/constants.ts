export const BASE_URL: string =
  'https://flypedia-api-a2cab70bc07d.herokuapp.com/api/v1/';

export const TIMEOUT_MS: number = 30000;

export const ACCESS_TOKEN_EXPIRED_HEADER_KEY: string = 'access-token-expired';
export const ACCESS_TOKEN_EXPIRED_HEADER_VALUE: string = 'true';

export const DEFAULT_ENTITY_PAGE_SIZE: number = 30;

export enum TagType {
  USER_FAVOURITE_FLIES = 'UserFavouriteFlies',
}
