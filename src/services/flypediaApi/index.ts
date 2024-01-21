import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Fly,
  Imitatee,
  PaginatedEntityIndexParams,
  PaginatedEntityResponse,
} from '~/services/flypediaApi/types';
import * as keychain from '~/services/keychain';

export const flyApi = createApi({
  reducerPath: 'flyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.238:3000/api/v1/',
    prepareHeaders: async headers => {
      const token: string | false = await keychain.getSecureValue(
        'accessToken',
      );

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    /* Auth */
    login: builder.mutation<any, { email: string; password: string }>({
      query: body => ({
        url: 'auth/authenticate',
        method: 'POST',
        body,
      }),
    }),

    /* Flies */
    indexFlies: builder.query<
      PaginatedEntityResponse<Fly>,
      PaginatedEntityIndexParams
    >({
      query: config =>
        `flies?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.results.push(...newData.results);
        currentCache.metadata = newData.metadata;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getFlyById: builder.query<Fly, string>({
      query: id => `flies/${id}`,
    }),

    /* Imitatees */
    indexImitatees: builder.query<
      PaginatedEntityResponse<Imitatee>,
      PaginatedEntityIndexParams
    >({
      query: config =>
        `imitatees?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.results.push(...newData.results);
        currentCache.metadata = newData.metadata;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getImitateeById: builder.query<Imitatee, string>({
      query: id => `imitatees/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useIndexFliesQuery,
  useGetFlyByIdQuery,
  useIndexImitateesQuery,
  useGetImitateeByIdQuery,
} = flyApi;
