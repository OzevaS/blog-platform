import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IArticleResponse, IArticleArrayResponse } from '../types/Article';

export const articlesApi = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<IArticleArrayResponse, { page: number; limit: number }>({
      query: (params) => ({
        url: '/articles',
        params: { limit: params.limit, offset: (params.page - 1) * params.limit },
      }),
    }),
    fetchArticle: build.query<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
  }),
});
