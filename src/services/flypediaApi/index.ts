import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  FetchBaseQueryMeta,
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
  RefreshAccessTokenResponse,
  TransformedErrorResponse,
} from '~/services/flypediaApi/types';
import * as keychain from '~/services/keychain';
import { logout } from '~/store/slices/user';

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

    // TOOD: Check if accessTokenExpired response header is present/truthy and add to below condition

    if (result.error && result.error.status === 401) {
      const refreshToken: string | false = await keychain.getSecureValue(
        'refreshToken',
      );

      if (!refreshToken) {
        api.dispatch(logout());
        return result;
      }

      const refreshResult: QueryReturnValue<
        RefreshAccessTokenResponse,
        FetchBaseQueryError,
        FetchBaseQueryMeta
      > = await baseQuery(
        {
          url: 'auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        await keychain.setSecureValue(
          ACCESS_TOKEN_KEYCHAIN_KEY,
          refreshResult.data.accessToken,
        );
        await keychain.setSecureValue(
          REFRESH_TOKEN_KEYCHAIN_KEY,
          refreshResult.data.accessToken,
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
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
  message: baseQueryReturnValue.data.message,
  status: baseQueryReturnValue.data.status,
});

export const flyApi = createApi({
  reducerPath: 'flyApi',
  baseQuery: baseQueryWithReauth,
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
      transformErrorResponse,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.results.push(...newData.results);
        currentCache.metadata = newData.metadata;
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
        currentCache.results.push(...newData.results);
        currentCache.metadata = newData.metadata;
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
        currentCache.results.push(...newData.results);
        currentCache.metadata = newData.metadata;
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
