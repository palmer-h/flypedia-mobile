import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  ACCESS_TOKEN_KEYCHAIN_KEY,
  REFRESH_TOKEN_KEYCHAIN_KEY,
} from '~/core/constants';
import type {
  AddRemoveUserFavouriteFlyPayload,
  Fly,
  Imitatee,
  IndexUserFavouriteFliesPayload,
  LoginPayload,
  LoginResponse,
  PaginatedEntityIndexParams,
  PaginatedEntityResponse,
  TransformedErrorResponse,
} from '~/services/flypediaApi/types';
import * as keychain from '~/services/keychain';
import { logout, setIsLoggedIn } from '~/store/slices/user';
import {
  ACCESS_TOKEN_EXPIRED_HEADER_KEY,
  ACCESS_TOKEN_EXPIRED_HEADER_VALUE,
  TagType,
} from '~/services/flypediaApi/constants';
import { RootState } from '~/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.1.238:3000/api/v1/',
  prepareHeaders: async headers => {
    const token: string | false = await keychain.getSecureValue(
      ACCESS_TOKEN_KEYCHAIN_KEY,
    );

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (!result.error || result.error.status !== 401) {
      return result;
    }

    const accessTokenIsExpired: string | null | undefined =
      result.meta?.response?.headers.get(ACCESS_TOKEN_EXPIRED_HEADER_KEY);

    if (accessTokenIsExpired === ACCESS_TOKEN_EXPIRED_HEADER_VALUE) {
      const refreshToken: string | false = await keychain.getSecureValue(
        REFRESH_TOKEN_KEYCHAIN_KEY,
      );

      if (!refreshToken) {
        api.dispatch(logout());
        return result;
      }

      const state: RootState = api.getState() as RootState;
      const userId = state.user.id;

      if (!userId) {
        api.dispatch(logout());
        return result;
      }

      const refreshResult = await baseQuery(
        {
          url: 'auth/refresh',
          method: 'POST',
          body: { refreshToken, userId },
        },
        api,
        extraOptions,
      );

      if (refreshResult.error) {
        api.dispatch(logout());
        return result;
      }

      await keychain.setSecureValue(
        ACCESS_TOKEN_KEYCHAIN_KEY,
        refreshResult.data.accessToken,
      );
      await keychain.setSecureValue(
        REFRESH_TOKEN_KEYCHAIN_KEY,
        refreshResult.data.refreshToken,
      );

      api.dispatch(setIsLoggedIn(true));

      result = await baseQuery(args, api, extraOptions);

      return result;
    }

    return result;
  } catch (e) {
    return e;
  }
};

const transformErrorResponse = (
  baseQueryReturnValue: FetchBaseQueryError,
  _meta: unknown,
  _arg: unknown,
): TransformedErrorResponse => ({
  message:
    'error' in baseQueryReturnValue
      ? baseQueryReturnValue.error
      : baseQueryReturnValue.data.message,
  status: String(baseQueryReturnValue.status),
});

export const flyApi = createApi({
  reducerPath: 'flyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [TagType.USER_FAVOURITE_FLIES],
  endpoints: builder => ({
    /* Auth */
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: body => ({
        url: 'auth/authenticate',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
    }),

    /* User */
    indexUserFavouriteFlies: builder.query<
      PaginatedEntityResponse<Fly>,
      IndexUserFavouriteFliesPayload
    >({
      query: config =>
        `users/${config.userId}/flies?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
      providesTags: [TagType.USER_FAVOURITE_FLIES],
      transformErrorResponse,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.metadata = newData.metadata;
        currentCache.results = newData.results;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    addFlyToUserFavourites: builder.mutation<
      string,
      AddRemoveUserFavouriteFlyPayload
    >({
      query: body => ({
        url: `users/${body.userId}/flies/${body.flyId}`,
        method: 'POST',
      }),
      invalidatesTags: [TagType.USER_FAVOURITE_FLIES],
      transformErrorResponse,
    }),
    removeFlyFromUserFavourites: builder.mutation<
      string,
      AddRemoveUserFavouriteFlyPayload
    >({
      query: body => ({
        url: `users/${body.userId}/flies/${body.flyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagType.USER_FAVOURITE_FLIES],
      transformErrorResponse,
    }),

    /* Flies */
    indexFlies: builder.query<
      PaginatedEntityResponse<Fly>,
      PaginatedEntityIndexParams
    >({
      query: config =>
        `flies?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
      transformErrorResponse,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.metadata = newData.metadata;
        currentCache.results = newData.results;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getFlyById: builder.query<Fly, Fly['id']>({
      query: id => `flies/${id}`,
      transformErrorResponse,
    }),

    /* Imitatees */
    indexImitatees: builder.query<
      PaginatedEntityResponse<Imitatee>,
      PaginatedEntityIndexParams
    >({
      query: config =>
        `imitatees?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
      transformErrorResponse,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.metadata = newData.metadata;
        currentCache.results = newData.results;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getImitateeById: builder.query<Imitatee, Imitatee['id']>({
      query: id => `imitatees/${id}`,
      transformErrorResponse,
    }),
  }),
});

export const {
  useLoginMutation,
  useIndexFliesQuery,
  useGetFlyByIdQuery,
  useIndexImitateesQuery,
  useGetImitateeByIdQuery,
  useIndexUserFavouriteFliesQuery,
  useAddFlyToUserFavouritesMutation,
  useRemoveFlyFromUserFavouritesMutation,
} = flyApi;
