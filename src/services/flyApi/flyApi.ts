import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Fly,
  Imitatee,
  Metadata,
  PaginatedEntityResponse,
} from '~/services/flyApi/flyApi.types';

export const flyApi = createApi({
  reducerPath: 'flyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.238:3000/api/v1/' }),
  endpoints: builder => ({
    /* Flies */
    indexFlies: builder.query<PaginatedEntityResponse<Fly>, Metadata>({
      query: config =>
        `flies?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
    }),
    getFlyById: builder.query<Fly, number>({
      query: id => `flies/${id}`,
    }),

    /* Imitatees */
    indexImitatees: builder.query<PaginatedEntityResponse<Imitatee>, Metadata>({
      query: config =>
        `imitatees?pageNumber=${config.pageNumber}&pageSize=${config.pageSize}`,
    }),
    getImitateeById: builder.query<Imitatee, number>({
      query: id => `imitatees/${id}`,
    }),
  }),
});

export const {
  useIndexFliesQuery,
  useGetFlyByIdQuery,
  useIndexImitateesQuery,
  useGetImitateeByIdQuery,
} = flyApi;
